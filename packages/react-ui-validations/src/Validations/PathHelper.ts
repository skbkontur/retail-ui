const classicFunctionRegEx = /^\s*function\s*\(\s*([A-Za-z0-9_]+)\s*\)\s*\{\s*(?:(?:"use strict"|'use strict');?)?\s*return\s+\1\s*([.[].*?)?\s*;?\s*\}\s*$/;
const arrowFunctionRegEx = /^\s*\(?\s*([A-Za-z0-9_]+)\s*\)?\s*=>\s*\1\s*([.[].*?)?\s*$/;

type NonNullableRecursive<T> = { [K in keyof T]: T[K] extends object ? NonNullable<NonNullableRecursive<T[K]>> : NonNullable<T[K]> };

export type LambdaPath<T, TChild> = (x: NonNullable<NonNullableRecursive<T>>) => TChild;

export function extractPath(lambda: string): string {
  const match = classicFunctionRegEx.exec(lambda) || arrowFunctionRegEx.exec(lambda);
  if (match && match.length === 3) {
    return (match[2] || '').replace(/(^\.\s*)/g, '');
  }
  throw new Error(`Not supported or invalid path: <${lambda}>`);
}

export function extractTokens(path: string): string[] {
  return path.split(/[\s.[\]]+/g).filter(x => x);
}

export class PathTokensCache {
  private readonly cache = new Map<string, string[]>();

  public getOrAdd<T, TChild>(lambdaPath: LambdaPath<T, TChild>): string[] {
    const lambdaString = lambdaPath.toString();

    if (!this.cache.has(lambdaString)) {
      const path = extractPath(lambdaString);
      const tokens = extractTokens(path);
      this.cache.set(lambdaString, tokens);
    }

    return this.cache.get(lambdaString) as string[];
  }

  public has<T, TChild>(lambdaPath: LambdaPath<T, TChild>): boolean {
    const lambdaString = lambdaPath.toString();
    return this.cache.has(lambdaString);
  }

  public get size(): number {
    return this.cache.size;
  }
}
