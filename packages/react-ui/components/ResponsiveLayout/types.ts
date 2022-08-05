export type CustomMediaQueries = Record<string, string>;

export interface ResponsiveLayoutOptions {
  customMediaQueries?: CustomMediaQueries;
}

export type ResponsiveLayoutFlags<T extends Record<string, string>> = {
  [K in keyof T]: boolean;
} &
  ResponsiveLayoutFlagsInternal;

export type ResponsiveLayoutFlagsInternal = {
  isMobile: boolean;
};
