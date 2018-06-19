declare var global: Window;

declare type TimeoutID = number;

declare type Nullable<T> = T | null | undefined;

declare interface Window {
  jQuery: any;
  RetailUIVerticalScrollCounter: number;
}

declare type Shape<T> = Pick<T, keyof T>;
