import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import { Input } from '@skbkontur/react-ui/components/Input';

import { createValidator, ValidationContainer, ValidationInfo, ValidationWrapper } from '../../src';
import { Nullable } from '../../typings/Types';
import { ValidationState } from '../ValidationHelper';

interface SelflostfocusDependentValidationState {
  value1: string;
  value2: string;
  object: {
    value3: string;
    value4: string;
  };
  submit: string;
  isValid: boolean | null;
  validation: ValidationState;
}

export class SelflostfocusDependentValidation extends React.Component<{}, SelflostfocusDependentValidationState> {
  public state: SelflostfocusDependentValidationState = {
    value1: '',
    value2: '',
    object: {
      value3: '',
      value4: '',
    },
    submit: '',
    isValid: null,
    validation: 'none',
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const { value1, value2, object } = this.state;

    const validation = this.validateObject(object);

    return (
      <ValidationContainer ref={this.refContainer}>
        <Gapped vertical>
          <ValidationWrapper validationInfo={this.validate(value1)}>
            <Input
              placeholder="Только цифры"
              value={value1}
              onValueChange={(value) => this.handleChange({ value1: value })}
            />
          </ValidationWrapper>
          <ValidationWrapper validationInfo={this.validate(value2)}>
            <Input
              placeholder="Только цифры"
              value={value2}
              onValueChange={(value) => this.handleChange({ value2: value })}
            />
          </ValidationWrapper>
          <ValidationWrapper validationInfo={validation.getNode((x) => x.value3).get()}>
            <Input
              placeholder="Только цифры"
              value={object.value3}
              onValueChange={(value) => this.handleChange2({ value3: value })}
            />
          </ValidationWrapper>
          <ValidationWrapper validationInfo={validation.getNode((x) => x.value4).get()}>
            <Input
              onBlur={() => console.log('blur')}
              placeholder="Только цифры"
              value={object.value4}
              onValueChange={(value) => this.handleChange2({ value4: value })}
            />
          </ValidationWrapper>
          <Gapped wrap verticalAlign="middle">
            <Button use="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
            <span data-tid={'ValidationState'}>{this.state.validation}</span>
          </Gapped>
        </Gapped>
      </ValidationContainer>
    );
  }

  private validate = (v: string): Nullable<ValidationInfo> => {
    if (v === '') return { message: 'Не должно быть пустым', type: 'selflostfocus' };
    if (!/^\d*$/.test(v)) return { message: 'Только цифры', type: 'selflostfocus' };
    return null;
  };

  private validateObject = createValidator<SelflostfocusDependentValidationState['object']>((b, v) => {
    b.prop(
      (x) => x.value3,
      (b, s) => {
        b.invalid((x) => !x, 'Не должно быть пустым', 'selflostfocus');
        b.invalid((x) => !/^\d*$/.test(x), 'Только цифры', 'selflostfocus');
      },
    );
    b.prop(
      (x) => x.value4,
      (b) => {
        b.invalid((x) => !x, 'Не должно быть пустым', 'selflostfocus');
        b.invalid((x) => !/^\d*$/.test(x), 'Только цифры', 'selflostfocus');
      },
    );
  });

  private handleChange = (value: Partial<SelflostfocusDependentValidationState>) => {
    this.setState({ ...value, isValid: null } as any);
  };

  private handleChange2 = (value: Partial<SelflostfocusDependentValidationState['object']>): void => {
    this.setState({ object: { ...this.state.object, ...value } });
  };

  private handleSubmit = async (): Promise<void> => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    const isValid = await this.container.validate();
    this.setState({ validation: isValid ? 'valid' : 'invalid' });
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
