export type TimeoutID = number;

export type Nullable<T> = T | null | undefined;

export type Shape<T> = Pick<T, keyof T>;

export type Primitive = number | string;

type ObjectKeyType = string | number | symbol;

export type Diff<T extends ObjectKeyType, U extends ObjectKeyType> = ({
  [P in T]: P
} &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export type Override<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;
