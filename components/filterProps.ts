export type Filter<T, U> = T extends U ? T : never;

export type True<T> = {
  [K in keyof T]: T[K] extends true ? K : never
}[keyof T];

export type Optional<T> = {
  [K in keyof T]: T[K] extends false ? never : T[K] extends true ? never : K
}[keyof T];

export default function filterProps<
  // tslint:disable-next-line:no-any
  R extends { [key: string]: any }, // Props
  E extends { [key: string]: boolean }, // Allowed
  A extends Filter<keyof R, True<E>>, // Always passing props keys
  C extends Filter<keyof R, Optional<E>>, // Maybe passing props keys
  T extends { [P in keyof Pick<R, A>]: R[P] } &
    { [Q in keyof Pick<R, C>]?: R[Q] } // Result
>(props: R, allowed: E): T {
  const ret = {} as T;
  for (const key in props) {
    if (allowed[key]) {
      ret[key as A] = props[key];
    }
  }
  return ret;
}
