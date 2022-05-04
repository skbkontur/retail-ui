import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

storiesOf('Checkbox', module).add('required', () => <CheckboxStory />);

interface CheckboxStoryState {
  checked: boolean;
}

class CheckboxStory extends React.Component {
  public state: CheckboxStoryState = {
    checked: false,
  };

  private container: ValidationContainer | null = null;

  public validateSex(): Nullable<ValidationInfo> {
    const { checked } = this.state;
    if (checked === false) {
      return { message: 'Поле обязательно', type: 'submit' };
    }
    return null;
  }

  public render() {
    return (
      <div style={{ padding: '20px 20px' }}>
        <ValidationContainer ref={this.refContainer}>
          <ValidationWrapper validationInfo={this.validateSex()}>
            <Checkbox
              checked={this.state.checked ? this.state.checked : false}
              onValueChange={(v) => this.setState({ checked: v })}
            >
              Checkbox
            </Checkbox>
          </ValidationWrapper>
          <div style={{ padding: '20px 0' }}>
            <Button onClick={() => this.container && this.container.validate()}>Check</Button>
          </div>
        </ValidationContainer>
      </div>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}
