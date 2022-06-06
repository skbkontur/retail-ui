import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { RadioGroup } from '@skbkontur/react-ui/components/RadioGroup';
import { Radio } from '@skbkontur/react-ui/components/Radio';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';
import { isNullable } from '../src/utils/isNullable';

storiesOf('RadioGroup', module)
  .add('Example1', () => <RadioGroupStory />)
  .add('RadioGroup with children', () => <RadioGroupChildrenStory />);

type Sex = 'male' | 'female';

type RadioGroupStoryState = {
  sex: Nullable<Sex>;
};
class RadioGroupStory extends React.Component {
  public state: RadioGroupStoryState = {
    sex: null,
  };

  private container: ValidationContainer | null = null;

  public validateSex(): Nullable<ValidationInfo> {
    const { sex } = this.state;
    if (isNullable(sex)) {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    return null;
  }

  public render() {
    return (
      <div style={{ padding: '20px 20px' }}>
        <ValidationContainer ref={this.refContainer}>
          <ValidationWrapper validationInfo={this.validateSex()}>
            <RadioGroup<RadioGroupStoryState['sex']>
              value={this.state.sex}
              items={['male', 'female'] as Sex[]}
              renderItem={(x) => <span>{x}</span>}
              onValueChange={(value) => this.setState({ sex: value })}
            />
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

class RadioGroupChildrenStory extends React.Component {
  public state: RadioGroupStoryState = {
    sex: null,
  };

  private container: ValidationContainer | null = null;

  public validateSex(): Nullable<ValidationInfo> {
    const { sex } = this.state;
    if (isNullable(sex)) {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    return null;
  }

  public render() {
    return (
      <div style={{ padding: '20px 20px' }}>
        <ValidationContainer ref={this.refContainer}>
          <ValidationWrapper validationInfo={this.validateSex()}>
            <RadioGroup<RadioGroupStoryState['sex']>
              value={this.state.sex}
              onValueChange={(value) => this.setState({ sex: value })}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Radio value={'male'}>male</Radio>
                <Radio value={'female'}>female</Radio>
              </div>
            </RadioGroup>
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
