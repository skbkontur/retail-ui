export type Nullable<T> = T | null | undefined;

export type Shape<T> = Pick<T, keyof T>;

type ObjectKeyType = string | number | symbol;

export type Diff<T extends ObjectKeyType, U extends ObjectKeyType> = ({ [P in T]: P } & { [P in U]: never } & {
  [x: string]: never;
})[T];

export type Override<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;

export type Entries<T, K> = (o: { [k: string]: K }) => Array<[T, K]>;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type Merge<T, U> = Omit<T, keyof U> & U;
