import React from 'react';
import { Button, Checkbox } from '@skbkontur/react-ui';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { ValidationsFeatureFlagsContext } from '../../../../lib/featureFlagsContext';

interface CheckboxState {
  checked: boolean;
}

export default class FeatureFlagsExampleValidationsWrapperAndContainerRemoveExtraSpan extends React.Component {
  public state: CheckboxState = {
    checked: false,
  };

  public validateSex(): Nullable<ValidationInfo> {
    const { checked } = this.state;
    if (checked === false) {
      return { message: 'Поле обязательно', type: 'submit' };
    }
    return null;
  }
  private container: Nullable<ValidationContainer> = null;

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);

  render() {
    return (
      <ValidationsFeatureFlagsContext.Provider
        value={{ ValidationsRemoveExtraSpans: true }}
      >
        <ValidationContainer ref={this.refContainer}>
          <ValidationWrapper validationInfo={this.validateSex()}>
            <Checkbox
              checked={this.state.checked ? this.state.checked : false}
              onValueChange={(v) => this.setState({ checked: v })}
            >
              Checkbox
            </Checkbox>
          </ValidationWrapper>
          <Button onClick={() => this.container && this.container.validate()}>
            Check
          </Button>
        </ValidationContainer>
      </ValidationsFeatureFlagsContext.Provider>
    );
  }
}
