import React from 'react';

import {TokenSize} from "../Token";

export interface TokenInputContextType<T> {
  size: TokenSize | undefined;
}

export const TokenInputContext = React.createContext<TokenInputContextType<any>>({
  size: 'small',
});

TokenInputContext.displayName = 'TokenInputContext';
