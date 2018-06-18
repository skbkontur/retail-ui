declare var global: Window;

declare type TimeoutID = number;

declare type Nullable<T> = T | null | undefined;

declare interface Window {
  jQuery: any;
}

declare type Shape<T> = Pick<T, keyof T>;
