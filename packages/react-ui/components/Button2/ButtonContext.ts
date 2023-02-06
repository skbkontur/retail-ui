import React from 'react';

// import { emptyHandler } from '../../lib/utils';
import { ButtonProps, ButtonState } from './Button';

export interface ButtonContextProps extends ButtonProps, ButtonState {}

export const ButtonContext = React.createContext<ButtonContextProps>({});

ButtonContext.displayName = 'ButtonContext';
