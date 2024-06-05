export const tryGetBoolean = (value: unknown): boolean | undefined => (typeof value === 'boolean' ? value : undefined);
