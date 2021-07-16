import React from 'react';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import { Input } from '@skbkontur/react-ui/components/Input';

import { text, ValidationContainer, ValidationInfo, ValidationWrapper } from '../../src';
import { Nullable } from '../../typings/Types';

interface LostfocusDynamicValidationState {
  sending: boolean;
  valueA: string;
  valueB: string;
}

export class LostfocusDynamicValidation extends React.Component<{}, LostfocusDynamicValidationState> {
  public state: LostfocusDynamicValidationState = {
    sending: false,
    valueA: '',
    valueB: '',
  };

  private counter = 0;

  public validateA(): Nullable<ValidationInfo> {
    if (this.state.valueA.substr(0, 3) === 'bad') {
      return {
        message: 'incorrect times: ' + ++this.counter,
        type: 'lostfocus',
      };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer>
        <div style={{ padding: 30 }}>
          <Gapped vertical>
            <Gapped wrap verticalAlign="middle">
              <b>A</b>
              <ValidationWrapper data-tid="InputAValidation" validationInfo={this.validateA()} renderMessage={text()}>
                <Input
                  data-tid={'InputA'}
                  value={this.state.valueA}
                  onValueChange={(value) => this.setState({ valueA: value })}
                />
              </ValidationWrapper>
            </Gapped>
            <Gapped wrap verticalAlign="middle">
              <b>B</b>
              <ValidationWrapper
                data-tid="InputBValidation"
                validationInfo={null /*it is important to wrap input with ValidationWrapper*/}
              >
                <Input
                  data-tid={'InputB'}
                  value={this.state.valueB}
                  onValueChange={(value) => this.setState({ valueB: value })}
                />
              </ValidationWrapper>
            </Gapped>
          </Gapped>
        </div>
      </ValidationContainer>
    );
  }
}
