export interface ResponsiveLayoutOptions {
  customMediaQueries: Record<string, string>;
}

export type ResponsiveLayoutFlags<T extends Record<string, string>> = {
  [K in keyof T]: boolean;
} &
  ResponsiveLayoutFlagsInternal;

export type ResponsiveLayoutFlagsInternal = {
  isMobile: boolean;
};
