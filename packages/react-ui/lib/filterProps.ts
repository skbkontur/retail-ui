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

export function extractProps<
  Props extends Record<string, any>,
  WantedKeys extends Record<string, any>,
  WantedKeysThatExist extends Extract<keyof WantedKeys, keyof Props>,
  ExtractedProps extends Pick<Props, WantedKeysThatExist>,
  RestProps extends Omit<Props, WantedKeysThatExist>
>(props: Props, keys: WantedKeys): [ExtractedProps, RestProps] {
  const extractedProps = {} as ExtractedProps;
  const restProps = {} as RestProps;

  for (const key in props) {
    const prop = props[key];
    if (Object.prototype.hasOwnProperty.call(keys, key)) {
      // @ts-ignore
      extractedProps[key] = prop;
    } else {
      // @ts-ignore
      restProps[key] = prop;
    }
  }

  return [extractedProps, restProps];
}
