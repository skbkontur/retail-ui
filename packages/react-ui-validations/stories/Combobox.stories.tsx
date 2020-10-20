import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { ComboBox } from '@skbkontur/react-ui/components/ComboBox';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

storiesOf('ComboBox', module).add('required', () => <ComboBoxStory />);

interface ValueType {
  id: number;
  name: string;
}
interface ComboBoxStoryState {
  value: string;
}

class ComboBoxStory extends React.Component<{}, ComboBoxStoryState> {
  public state: ComboBoxStoryState = {
    value: '',
  };

  private container: ValidationContainer | null = null;

  public validateSex(): Nullable<ValidationInfo> {
    const { value } = this.state;
    if (!value) {
      return { message: 'Поле обязательно', type: 'submit' };
    }
    if (value !== 'City 1') {
      return { message: 'Поле неправильно заполнено', type: 'submit' };
    }
    return null;
  }

  public render() {
    return (
      <div style={{ padding: '20px 20px' }}>
        <ValidationContainer ref={this.refContainer}>
          <ValidationWrapper validationInfo={this.validateSex()}>
            <ComboBox
              valueToString={x => x}
              renderValue={x => x}
              renderItem={x => x}
              itemToValue={x => x}
              value={this.state.value}
              onValueChange={value => this.setState({ value: value })}
              getItems={async query => {
                const cities = ['City 1', 'City 2', 'City 3'];
                return query ? cities.filter(x => x.toLocaleUpperCase().includes(query.toLocaleUpperCase())) : cities;
              }}
            >
              ComboBox
            </ComboBox>
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
