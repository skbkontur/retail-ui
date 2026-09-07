import React from 'react';

import { PasswordInput } from '../../components/PasswordInput/index.js';
import type { PasswordInputProps } from '../../components/PasswordInput/index.js';

interface PasswordInputPlaygroundState {
  value: string;
}

export class PasswordInputPlayground extends React.Component<Partial<PasswordInputProps>> {
  public state: PasswordInputPlaygroundState = { value: 'пароль' };

  public render() {
    return (
      <PasswordInput
        placeholder="Пароль"
        width={160}
        {...this.props}
        value={this.state.value}
        onValueChange={this.handleChange}
      />
    );
  }

  private handleChange = (value: string) => {
    this.setState({ value });
  };
}
