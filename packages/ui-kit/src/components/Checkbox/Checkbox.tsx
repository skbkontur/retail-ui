import React from 'react';
import { Omit } from '../../lib/types';
import {
  CheckboxBox,
  CheckboxCaption,
  CheckboxIcon,
  CheckboxInput,
  CheckboxLabel
} from './CheckboxView';

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'className' | 'style'
>;

class Checkbox extends React.Component<CheckboxProps> {
  public render() {
    const { children, ...rest } = this.props;
    return (
      <CheckboxLabel style={{ cursor: rest.disabled ? 'default' : 'pointer' }}>
        <CheckboxInput {...rest} />
        <CheckboxBox>
          <CheckboxIcon />
        </CheckboxBox>
        <CheckboxCaption>{children}</CheckboxCaption>
      </CheckboxLabel>
    );
  }
}

export default Checkbox;
