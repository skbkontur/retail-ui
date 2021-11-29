import { storiesOf } from '@storybook/react';
import React from 'react';
import { ComboBox } from '@skbkontur/react-ui/components/ComboBox/ComboBox';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

storiesOf('ComboBox', module).add('required', () => <ComboBoxStory />);

interface ComboBoxStoryState {
  selected: { value: string; label: string };
}

class ComboBoxStory extends React.Component<{}, ComboBoxStoryState> {
  public state: ComboBoxStoryState = {
    selected: { value: 'one', label: 'one' },
  };

  private items = [
    { value: 'one', label: 'one' },
    { value: 'two', label: 'two' },
    { value: 'three', label: 'three' },
  ];

  public validateValue(): Nullable<ValidationInfo> {
    const labels = this.items.map(({ label }) => label);
    return this.state.selected && labels.includes(this.state.selected.label)
      ? null
      : {
          message: 'Выберите значение из списка',
          type: 'lostfocus',
        };
  }

  public render() {
    return (
      <div style={{ padding: '20px 20px' }}>
        <ValidationContainer>
          <ValidationWrapper validationInfo={this.validateValue()}>
            <ComboBox
              onValueChange={(value) => this.setState({ selected: value })}
              getItems={() => Promise.resolve(this.items)}
              placeholder="Начните вводить название"
              value={this.state.selected}
              onUnexpectedInput={(unexpected) => this.setState({ selected: { value: unexpected, label: unexpected } })}
            />
          </ValidationWrapper>
        </ValidationContainer>
      </div>
    );
  }
}
