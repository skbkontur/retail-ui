import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox';
import { CSFStory } from 'creevey';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

export default {
  title: 'Checkbox',
};

interface CheckboxStoryState {
  checked: boolean;
}

class CheckboxStory extends React.Component<{}, CheckboxStoryState> {
  public state: CheckboxStoryState = {
    checked: false,
  };

  private container: ValidationContainer | null = null;

  public validateSex(): Nullable<ValidationInfo> {
    const { checked } = this.state;
    if (!checked) {
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
              onValueChange={v => this.setState({ checked: v })}
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

export const CheckboxStoryComponent: CSFStory<JSX.Element> = () => {
  const [checked, update] = React.useState<boolean>(false);

  let container: ValidationContainer | null = null;

  const refContainer = (el: ValidationContainer | null) => (container = el);

  const validateSex = (): Nullable<ValidationInfo> => {
    if (!checked) {
      return { message: 'Поле обязательно', type: 'submit' };
    }
    return null;
  };
  return (
    <div style={{ padding: '20px 20px' }}>
      <ValidationContainer ref={refContainer}>
        <ValidationWrapper validationInfo={validateSex()}>
          <Checkbox checked={checked} onValueChange={update}>
            Checkbox
          </Checkbox>
        </ValidationWrapper>
        <div style={{ padding: '20px 0' }}>
          <Button onClick={() => container && container.validate()}>Check</Button>
        </div>
      </ValidationContainer>
    </div>
  );
};

CheckboxStoryComponent.story = {
  name: 'required',
  parameters: {
    creevey: {
      tests: {
        async idle() {
          await this.expect(await this.takeScreenshot()).to.matchImage('idle');
        },
      },
    },
  },
};
