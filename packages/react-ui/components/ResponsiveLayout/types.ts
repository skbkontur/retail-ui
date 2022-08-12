export type MediaQueriesType = Record<string, string>;

export interface ResponsiveLayoutOptions {
  customMediaQueries?: MediaQueriesType;
}

export type ResponsiveLayoutFlags<T extends MediaQueriesType> = {
  [K in keyof T]: boolean;
} &
  ResponsiveLayoutFlagsInternal;

export type ResponsiveLayoutFlagsInternal = {
  isMobile: boolean;
};
