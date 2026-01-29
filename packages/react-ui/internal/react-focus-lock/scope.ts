import { createContext } from 'react';

interface FocusScopeContext {
  observed: React.MutableRefObject<undefined>;
  shards: Array<React.RefObject<Element>>;
  enabled: boolean;
  active: boolean;
}

export const FocusScope = createContext<FocusScopeContext | undefined>(undefined);
