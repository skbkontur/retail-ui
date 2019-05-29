import { clamp, floatFromPercent } from './ColorHelpers';
import { ColorFactory } from './ColorFactory';
import { ColorObject } from './ColorObject';

type SignType = '+' | '-';
type MethodType = 'absolute' | 'relative';

const DEFAULT_DARK = ColorFactory.create('#000');
const DEFAULT_LIGHT = ColorFactory.create('#fff');

const ColorFunctions = {
  lighten(colorString: string, amount: number | string, method?: MethodType) {
    const key = buildCacheKey('lighten', colorString, amount, method);
    if (ColorFunctionsCache[key] === undefined) {
      ColorFunctionsCache[key] = shiftColor(colorString, amount, '+', method);
    }
    return ColorFunctionsCache[key]!;
  },
  darken(colorString: string, amount: number | string, method?: MethodType) {
    const key = buildCacheKey('darken', colorString, amount, method);
    if (ColorFunctionsCache[key] === undefined) {
      ColorFunctionsCache[key] = shiftColor(colorString, amount, '-', method);
    }

    return ColorFunctionsCache[key]!;
  },
  contrast(colorString: string, darkString?: string, lightString?: string, threshold: number = 0.43) {
    const key = buildCacheKey('contrast', colorString, darkString, lightString, threshold);
    if (!colorString) {
      ColorFunctionsCache[key] = '';
    }
    if (ColorFunctionsCache[key] === undefined) {
      const color = ColorFactory.create(colorString);
      let dark = typeof darkString === 'undefined' ? DEFAULT_DARK : ColorFactory.create(darkString);
      let light = typeof lightString === 'undefined' ? DEFAULT_LIGHT : ColorFactory.create(lightString);

      // Figure out which is actually light and dark:
      if (dark.luma() > light.luma()) {
        [dark, light] = [light, dark];
      }

      if (color.luma() < threshold) {
        ColorFunctionsCache[key] = light.alpha < 1 ? light.toRGBString() : light.toHEXString();
      } else {
        ColorFunctionsCache[key] = dark.alpha < 1 ? dark.toRGBString() : dark.toHEXString();
      }
    }
    return ColorFunctionsCache[key]!;
  },
  red(colorString: string) {
    const color = ColorFactory.create(colorString);
    return color.rgb[0];
  },
  green(colorString: string) {
    const color = ColorFactory.create(colorString);
    return color.rgb[1];
  },
  blue(colorString: string) {
    const color = ColorFactory.create(colorString);
    return color.rgb[2];
  },
  alpha(colorString: string) {
    const color = ColorFactory.create(colorString);
    return color.alpha;
  },
  isValid(colorString: string) {
    try {
      ColorFactory.create(colorString);
      return true;
    } catch (e) {
      return false;
    }
  },
};


const ColorFunctionsCache: { [key: string]: string } = Object.create(null);
function buildCacheKey(name: string, ...args: any[]) {
  return `${name}(${args.join()})`;
}

function shiftColor(colorString: string, a: number | string, sign: SignType, method?: MethodType) {
  if (!colorString) {
    return '';
  }

  if (colorString.toLowerCase() === 'transparent') {
    return 'transparent';
  }

  let amount: number;
  if (typeof a === 'string') {
    amount = a.endsWith('%') ? floatFromPercent(a) : parseFloat(a);
  } else {
    amount = a;
  }
  amount = clamp(amount, 1);

  const color = ColorFactory.create(colorString);
  const hsl = color.toHSL();

  if (sign === '+') {
    hsl.l += method === 'relative' ? hsl.l * amount : amount;
  } else {
    hsl.l -= method === 'relative' ? hsl.l * amount : amount;
  }

  hsl.l = clamp(hsl.l);

  let newColor: ColorObject;
  if (color.alpha < 1) {
    newColor = ColorFactory.create(`hsla(${hsl.h}, ${hsl.s}, ${hsl.l}, ${hsl.a})`);
  } else {
    newColor = ColorFactory.create(`hsl(${hsl.h}, ${hsl.s}, ${hsl.l})`);
  }

  switch (color.type) {
    case 'rgb':
    case 'rgba': {
      return newColor.toRGBString();
    }
    case 'hsl':
    case 'hsla': {
      return newColor.toHSLString();
    }
    default:
      return newColor.toHEXString();
  }
}

export default ColorFunctions;
