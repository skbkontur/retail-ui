export type Nullable<T> = T | null | undefined;

export type Shape<T> = Pick<T, keyof T>;

export type Entries<T, K> = (o: { [k: string]: K }) => Array<[T, K]>;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
