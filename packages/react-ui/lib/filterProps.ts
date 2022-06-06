export type Filter<T, U> = T extends U ? T : never;

export type True<T> = { [K in keyof T]: T[K] extends true ? K : never }[keyof T];

export type AmbiguousBool<T> = { [K in keyof T]: T[K] extends false ? never : T[K] extends true ? never : K }[keyof T];

export function filterProps<
  Props,
  Allowed extends Record<string, boolean>,
  Specific extends Filter<keyof Props, True<Allowed>>,
  // If value neither true nor false, it should be optional
  Optional extends Filter<keyof Props, AmbiguousBool<Allowed>>,
  Result extends { [P in Specific]: Props[P] } & { [Q in Optional]?: Props[Q] }
>(props: Props, allowed: Allowed): Result {
  const filteredProps = {} as Record<string, unknown>;
  for (const key in props) {
    if (allowed[key]) {
      filteredProps[key] = props[key];
    }
  }

  return filteredProps as Result;
}
