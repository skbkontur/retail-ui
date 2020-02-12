import { storiesOf } from '@storybook/react';
import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import { text, ValidationContainer, ValidationInfo, ValidationWrapper } from '../../src';
import { Nullable } from '../../typings/Types';

interface Example1State {
  value: string;
}

class Example1 extends React.Component<{}, Example1State> {
  public state: Example1State = {
    value: '',
  };

  public validateValue1(): Nullable<ValidationInfo> {
    const { value } = this.state;
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return { message: 'Значение должно состоять из двух слов', type: 'lostfocus' };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer>
        <div style={{ padding: 10 }}>
          <div
            data-tid="ClickArea"
            style={{ textAlign: 'center', marginBottom: 10, padding: 10, border: '1px solid #ddd' }}
          >
            Click here
          </div>
          <ValidationWrapper
            data-tid="ValidationWrapper"
            validationInfo={this.validateValue1()}
            renderMessage={text('bottom')}
          >
            <Input data-tid="SingleInput" value={this.state.value} onValueChange={value => this.setState({ value })} />
          </ValidationWrapper>
        </div>
      </ValidationContainer>
    );
  }
}

storiesOf('SingleInput', module).add('Example1', () => {
  return <Example1 />;
});
