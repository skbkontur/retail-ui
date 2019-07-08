import * as React from 'react';
import Button from 'retail-ui/components/Button';
import Gapped from 'retail-ui/components/Gapped';
import Input from 'retail-ui/components/Input';
import { text, ValidationInfo } from '../../src';
import ValidationContainer from '../../src/ValidationContainer';
import ValidationWrapper from '../../src/ValidationWrapper';
import { Nullable } from '../../typings/Types';
import { ValidationState } from '../ValidationHelper';

interface LostfocusDependentValidationState {
  sending: boolean;
  valueA: string;
  valueB: string;
  validation: ValidationState;
}

export default class LostfocusDependentValidation extends React.Component<{}, LostfocusDependentValidationState> {
  public state: LostfocusDependentValidationState = {
    sending: false,
    valueA: '',
    valueB: '',
    validation: 'none',
  };

  private container: ValidationContainer | null = null;

  public validateA(): Nullable<ValidationInfo> {
    if (this.state.valueA.substr(0, 3) === 'bad') {
      return {
        message: 'incorrect value',
        type: 'lostfocus',
      };
    }
    if (this.state.valueA && this.state.valueB && this.state.valueA === this.state.valueB) {
      return {
        message: 'duplicate value',
        type: 'lostfocus',
      };
    }
    return null;
  }

  public validateB(): Nullable<ValidationInfo> {
    if (this.state.valueB.substr(0, 3) === 'bad') {
      return {
        message: 'incorrect value',
        type: 'submit',
      };
    }
    if (this.state.valueA && this.state.valueB && this.state.valueA === this.state.valueB) {
      return {
        message: 'duplicate value',
        type: 'submit',
      };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer ref={this.refContainer}>
        <div style={{ padding: 30 }}>
          <Gapped vertical>
            <Gapped>
              <b>A</b>
              <ValidationWrapper data-tid="InputAValidation" validationInfo={this.validateA()} renderMessage={text()}>
                <Input
                  data-tid={'InputA'}
                  value={this.state.valueA}
                  onChange={(_, value) => this.setState({ valueA: value })}
                />
              </ValidationWrapper>
            </Gapped>
            <Gapped>
              <b>B</b>
              <ValidationWrapper data-tid="InputBValidation" validationInfo={this.validateB()} renderMessage={text()}>
                <Input
                  data-tid={'InputB'}
                  value={this.state.valueB}
                  onChange={(_, value) => this.setState({ valueB: value })}
                />
              </ValidationWrapper>
            </Gapped>
            <Gapped>
              <Button data-tid={'SubmitButton'} loading={this.state.sending} onClick={this.handleSubmit}>
                Submit
              </Button>
              <span data-tid={'ValidationState'}>{this.state.validation}</span>
            </Gapped>
          </Gapped>
        </div>
      </ValidationContainer>
    );
  }

  public handleSubmit = () => {
    this.setState({ sending: true, validation: 'validating' }, async () => {
      if (this.container) {
        const isValid = await this.container.validate();
        this.setState({ sending: false, validation: isValid ? 'valid' : 'invalid' });
      }
    });
  };

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}
