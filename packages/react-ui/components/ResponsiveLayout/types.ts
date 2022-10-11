export type MediaQueriesType = Record<string, string>;
export type EmptyObject = Record<never, never>;

export interface ResponsiveLayoutOptions<MQ extends MediaQueriesType> {
  customMediaQueries?: MQ;
}

export type ResponsiveLayoutFlags<T extends MediaQueriesType = EmptyObject> = {
  [K in keyof T]?: boolean;
} &
  ResponsiveLayoutFlagsInternal;

export interface ResponsiveLayoutFlagsInternal {
  isMobile: boolean;
}
