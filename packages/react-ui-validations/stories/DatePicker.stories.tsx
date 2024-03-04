import React from 'react';
import { Meta } from '@storybook/react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { DatePicker } from '@skbkontur/react-ui/components/DatePicker';
import { isNonNullable } from '@skbkontur/react-ui/lib/utils';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

export default {
  title: 'DatePicker',
} as Meta;

interface DatePickerStoryState {
  value: Date | string | null;
}

export const Example1 = () => {
  class DatePickerStory extends React.Component {
    public state: DatePickerStoryState = {
      value: null,
    };

    private container: ValidationContainer | null = null;

    public validateValue(): Nullable<ValidationInfo> {
      const { value } = this.state;
      if (isNonNullable(value)) {
        return { message: 'Должно быть не пусто', type: 'submit' };
      }
      return null;
    }

    public render() {
      return (
        <div style={{ padding: '20px 20px' }}>
          <ValidationContainer ref={this.refContainer}>
            <ValidationWrapper validationInfo={this.validateValue()}>
              <DatePicker value={this.state.value as any} onValueChange={(value) => this.setState({ value })} />
            </ValidationWrapper>
            <div style={{ padding: '100px 0' }}>
              <Button onClick={() => this.container && this.container.validate()}>Check</Button>
            </div>
          </ValidationContainer>
        </div>
      );
    }

    private refContainer = (el: ValidationContainer | null) => (this.container = el);
  }

  return <DatePickerStory />;
};
