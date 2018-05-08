export type Filter<T, U> = T extends U ? T : never;

export type True<T> = {
  [K in keyof T]: T[K] extends true ? K : never
}[keyof T];

export type AmbiguousBool<T> = {
  [K in keyof T]: T[K] extends false ? never : T[K] extends true ? never : K
}[keyof T];

export default function filterProps<
  // tslint:disable-next-line:no-any
  Props extends Record<string, any>,
  Allowed extends Record<string, boolean>,
  Specific extends Filter<keyof Props, True<Allowed>>,
  // If value neither true nor false, it should be optional
  Optional extends Filter<keyof Props, AmbiguousBool<Allowed>>,
  Result extends { [P in Specific]: Props[P] } & { [Q in Optional]?: Props[Q] }
>(props: Props, allowed: Allowed): Result {
  const ret = {} as Result;
  for (const key in props) {
    if (allowed[key]) {
      ret[key as Specific | Optional] = props[key];
    }
  }
  return ret;
}

// TypeScript widens types, so `true` becomes `boolean`
export function unwidenBool<T extends Record<string, boolean>>(
  obj: T
): { [P in keyof T]: T[P] } {
  return obj;
}
