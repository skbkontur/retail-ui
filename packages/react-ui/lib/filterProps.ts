import { CommonProps } from '../typings/common';

export type Filter<T, U> = T extends U ? T : never;

export type True<T> = { [K in keyof T]: T[K] extends true ? K : never }[keyof T];

export type AmbiguousBool<T> = { [K in keyof T]: T[K] extends false ? never : T[K] extends true ? never : K }[keyof T];

export function filterProps<
  Props extends Record<string, any>,
  Allowed extends Record<string, boolean>,
  Specific extends Filter<keyof Props, True<Allowed>>,
  // If value neither true nor false, it should be optional
  Optional extends Filter<keyof Props, AmbiguousBool<Allowed>>,
  Result extends { [P in Specific]: Props[P] } & { [Q in Optional]?: Props[Q] }
>(props: Props, allowed: Allowed): Result {
  const ret = {} as any;
  for (const key in props) {
    if (allowed[key]) {
      // @ts-ignore
      ret[key] = props[key];
    }
  }
  return ret;
}

const isCommonProp = (name: string) => {
  switch (name) {
    case 'className':
    case 'style':
      return true;
    default:
      return false;
  }
};

const isDataProp = (name: string) => {
  return name.indexOf('data-') === 0;
};

export const extractCommonProps = <Props extends CommonProps, RestProps extends Omit<Props, keyof CommonProps>>(
  props: Props,
): [CommonProps, RestProps] => {
  const common = {} as CommonProps;
  const rest = {} as RestProps;

  for (const key in props) {
    if (isCommonProp(key) || isDataProp(key)) {
      // @ts-ignore
      common[key] = props[key];
    } else {
      // @ts-ignore
      rest[key] = props[key];
    }
  }

  return [common, rest];
};
