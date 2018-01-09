import * as React from 'react';

import { InputProps } from '../Input';

export interface PasswordInputProps extends InputProps {
  detectCapsLock?: boolean;
}

export interface PasswordInputState {
  visible: boolean;
  capsLockEnabled?: boolean | null;
}

export default class PasswordInput extends React.Component<
  PasswordInputProps,
  PasswordInputState
> {
  focus(): void;
}
