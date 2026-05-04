/** Минимальные объявления для tsc (без @types/node в пакете) */
declare const __dirname: string;
declare const process: { argv: string[] };

declare module 'less' {
  const less: { render: (input: string, options?: unknown) => Promise<{ css: string }> };
  export = less;
}
