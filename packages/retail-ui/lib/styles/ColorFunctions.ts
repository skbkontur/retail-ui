import { clamp, floatFromPercent } from './ColorHelpers';
import { ColorFactory } from './ColorFactory';
import { ColorObject } from './ColorObject';

type SignType = '+' | '-';
type MethodType = 'absolute' | 'relative';

function shiftColor(colorString: string, a: number | string, sign: SignType, method?: MethodType) {
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

const ColorFunctions = {
  lighten(colorString: string, amount: number | string, method?: MethodType) {
    return shiftColor(colorString, amount, '+', method);
  },
  darken(colorString: string, amount: number | string, method?: MethodType) {
    return shiftColor(colorString, amount, '-', method);
  },
  contrast(colorString: string, darkString?: string, lightString?: string, threshold: number = 0.43) {
    const color = ColorFactory.create(colorString);
    let dark = typeof darkString === 'undefined' ? ColorFactory.create('#000') : ColorFactory.create(darkString);
    let light = typeof lightString === 'undefined' ? ColorFactory.create('#fff') : ColorFactory.create(lightString);

    // Figure out which is actually light and dark:
    if (dark.luma() > light.luma()) {
      [dark, light] = [light, dark];
    }

    if (color.luma() < threshold) {
      return light;
    } else {
      return dark;
    }
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
};

export default ColorFunctions;
