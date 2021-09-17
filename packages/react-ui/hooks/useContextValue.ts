import { useMemo } from 'react';

export const useContextValue = <TContext extends object>(contextValue: TContext) => {
  return useMemo<TContext>(() => contextValue, Object.values(contextValue));
};
