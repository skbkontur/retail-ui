declare type TimeoutID = number;

declare type Nullable<T> = T | null | undefined;

declare interface Window {
  jQuery: any;
  RetailUIVerticalScrollCounter: number;
  ReactTesting: any;
  __RetailUiZIndexes: number[];
}

declare type Shape<T> = Pick<T, keyof T>;

declare type Primitive = number | string;

type ObjectKeyType = string | number | symbol;

declare type Diff<T extends ObjectKeyType, U extends ObjectKeyType> = ({
  [P in T]: P
} &
  { [P in U]: never } & { [x: string]: never })[T];
declare type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
declare type Override<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;
