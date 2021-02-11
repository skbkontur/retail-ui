import * as React from "react";

export const useContextValue = <TContext extends object>(contextValue: TContext) => {
  return React.useMemo<TContext>(() => contextValue, Object.values(contextValue));
};
