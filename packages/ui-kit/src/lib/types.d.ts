export type DeepPartial<T extends {}> = Partial<
  { [K in keyof T]: T[K] extends {} ? DeepPartial<T[K]> : T[K] }
>;

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];

export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export type Override<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;
