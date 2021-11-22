export type Nullable<T> = T | null | undefined;

export type Shape<T> = Pick<T, keyof T>;

// * DO NOT use Override for defining type of component's props.
// * That will not let PropTypes generate automatically.
// * Explicitly use the right side of the expression below instead.
export type Override<T, U> = Omit<T, keyof U> & U;

export type Entries<T, K> = (o: { [k: string]: K }) => Array<[T, K]>;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
