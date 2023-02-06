import React from 'react';

// import { emptyHandler } from '../../lib/utils';
import { ButtonRoot, ButtonRootType } from './views/ButtonRoot';

export interface ButtonViewsContextProps {
  Root: ButtonRootType;
}

export const ButtonContext = React.createContext<ButtonViewsContextProps>({
  Root: ButtonRoot,
});

ButtonContext.displayName = 'ButtonViewsContext';
