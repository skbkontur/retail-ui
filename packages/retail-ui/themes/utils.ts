export type ControlState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';
export const CONTROL_STATES: ControlState[] = ['default', 'hover', 'active', 'focus', 'disabled'];

export type ThemeStyles<T extends string, S> = Partial<Record<T, S>>;

export type Source = 'meaning' | 'base' | 'gradients' | 'strokes' | 'shadows';

export function getThemeColor(
  colors: Record<Source, Record<string, string>>,
  colorToken: string
): string {
  const color = parseToken(colorToken, colors);

  return color || '';
}

const parseToken = (stringValue: string, colors: Record<Source, Record<string, string>>) => {
  if (!stringValue) {
    return '';
  }

  let colorValue = stringValue.replace(/\$\.(\w+)\.(\w+)/g, tokenReplacer.bind(null, colors));

  if (hasVariable(colorValue)) {
    colorValue = parseToken(colorValue, colors);
  }

  return colorValue;
};

const hasVariable = (token: string): boolean => {
  return token.indexOf('$.') > -1;
};

const tokenReplacer = (
  colors: Record<Source, Record<string, string>>,
  substring: string,
  ...args: any[]
): string => {
  if (args.length) {
    const path = args.slice(0, args.length - 2);

    return path.reduce((dict, item) => dict[item], colors);
  }
  return substring;
};
