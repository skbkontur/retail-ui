import * as React from 'react';

import { InputProps } from '../Input';

export interface FxInputProps extends InputProps {
  auto?: boolean;
}

export interface FxInputState {}

export default class FxInput extends React.Component<
  FxInputProps,
  FxInputState
> {}
