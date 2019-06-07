export type Nullable<T> = T | null | undefined;
export type Omit<T extends object, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ExtractItem<T> = T extends Array<infer TItem> ? TItem : never;
