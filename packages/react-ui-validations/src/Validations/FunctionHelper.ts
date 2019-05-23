const pathRegEx = /^function\s*\(\s*([A-Za-z0-9_]+)\s*\)\s*\{\s*(?:\"use strict\";|\'use strict\';)?\s*return\s+\1(?:[\.\[](.+?))?\s*;?\s*\}$/;

export type LambdaPath<T, TChild> = (x: NonNullable<T>) => TChild;

export function getPathTokens<T, TChild>(lambdaPath: LambdaPath<T, TChild>): string[] {
  const lambda = lambdaPath.toString();
  if (lambdaPath.length === 1) {
    const match = pathRegEx.exec(lambda);
    if (match && match.length === 3) {
      return (match[2] || '').split(/[\s\.\[\]]+/g).filter(x => x);
    }
  }
  throw new Error(`Not a lambda path: <${lambda}>`);
}
