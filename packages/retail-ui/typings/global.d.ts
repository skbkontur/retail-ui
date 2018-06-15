declare var global: Window;

declare type TimeoutID = number;

declare type Nullable<T> = T | null | undefined;

declare interface Window {
  jQuery: any
}