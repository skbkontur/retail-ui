export declare type Filter<T, U> = T extends U ? T : never;
export declare type True<T> = {
  [K in keyof T]: T[K] extends true ? K : never
}[keyof T];
export declare type AmbiguousBool<T> = {
  [K in keyof T]: T[K] extends false ? never : T[K] extends true ? never : K
}[keyof T];
export default function filterProps<
  Props extends Record<string, any>,
  Allowed extends Record<string, boolean>,
  Specific extends Filter<keyof Props, True<Allowed>>,
  Optional extends Filter<keyof Props, AmbiguousBool<Allowed>>,
  Result extends { [P in Specific]: Props[P] } & { [Q in Optional]?: Props[Q] }
>(props: Props, allowed: Allowed): Result;
export declare function unwidenBool<T extends Record<string, boolean>>(
  obj: T
): { [P in keyof T]: T[P] };
