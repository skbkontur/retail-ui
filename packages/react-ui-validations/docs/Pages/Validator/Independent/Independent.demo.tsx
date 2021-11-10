import React from 'react';
import { Button, Gapped, Input } from '@skbkontur/react-ui';

import { ValidationState } from '../../../../stories/ValidationHelper';
import { Nullable } from '../../../../typings/Types';
import {
  createValidator,
  ValidationContainer,
  ValidationInfo,
  ValidationWrapper,
} from '../../../../src';

interface State {
  value1: string;
  value2: string;
  object: {
    value3: string;
    value4: string;
  };
  submit: string;
  isValid: boolean | null;
  validation: ValidationState;
  reset: number;
}

export default class IndependentValidation extends React.Component<{}, State> {
  public state: State = {
    value1: '',
    value2: '',
    object: {
      value3: '',
      value4: '',
    },
    submit: '',
    isValid: null,
    validation: 'none',
    reset: 1,
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const { value1, value2, object, reset } = this.state;

    const validation = this.validateObject(object);

    return (
      <ValidationContainer key={reset} ref={this.refContainer}>
        <Gapped vertical>
          <Gapped>
            <ValidationWrapper validationInfo={this.validate(value1)}>
              <Input
                placeholder="Только цифры"
                value={value1}
                onValueChange={(value) => this.handleChange({ value1: value })}
              />
            </ValidationWrapper>
            <div>{this.getStatus(this.validate(value1))}</div>
          </Gapped>
          <Gapped>
            <ValidationWrapper validationInfo={this.validate(value2)}>
              <Input
                placeholder="Только цифры"
                value={value2}
                onValueChange={(value) => this.handleChange({ value2: value })}
              />
            </ValidationWrapper>
            <div>{this.getStatus(this.validate(value2))}</div>
          </Gapped>
          <Gapped>
            <ValidationWrapper validationInfo={validation.getNode((x) => x.value3).get()}>
              <Input
                placeholder="Только цифры"
                value={object.value3}
                onValueChange={(value) => this.handleChange2({ value3: value })}
              />
            </ValidationWrapper>
            <div>{this.getStatus(validation.getNode((x) => x.value3).get())}</div>
          </Gapped>
          <Gapped>
            <ValidationWrapper validationInfo={validation.getNode((x) => x.value4).get()}>
              <Input
                placeholder="Только цифры"
                value={object.value4}
                onValueChange={(value) => this.handleChange2({ value4: value })}
              />
            </ValidationWrapper>
            <div>{this.getStatus(validation.getNode((x) => x.value4).get())}</div>
          </Gapped>
          <Gapped wrap verticalAlign="middle">
            <Button use="primary" onClick={this.submitWithIndependent}>
              Submit 1
            </Button>
            <span>Все поля</span>
          </Gapped>
          <Gapped wrap verticalAlign="middle">
            <Button use="primary" onClick={this.submitWithoutIndependent}>
              Submit 2
            </Button>
            <span>Без независимых</span>
          </Gapped>
          <Gapped wrap verticalAlign="middle">
            <Button use="pay" onClick={this.reset}>
              Очистить валидации
            </Button>
          </Gapped>
          <span data-tid={'ValidationState'}>{this.state.validation}</span>
        </Gapped>
      </ValidationContainer>
    );
  }

  private getStatus = (validation: Nullable<ValidationInfo>): string => {
    if (validation) {
      const status = validation.independent === true ? 'Независимая' : 'Зависимая';
      const type = validation.type ?? 'lostfocus';
      return `${status}, ${type}`;
    }
    return '👍';
  };

  private validate = (v: string): Nullable<ValidationInfo> => {
    if (v === '')
      return { message: 'Не должно быть пустым', type: 'submit', independent: true };
    if (!/^\d*$/.test(v))
      return { message: 'Только цифры', type: 'lostfocus', independent: true };
    return null;
  };

  private validateObject = createValidator<State['object']>((b) => {
    b.prop(
      (x) => x.value3,
      (b, s) => {
        b.invalid((x) => !x, 'Не должно быть пустым', { independent: true });
        b.invalid((x) => !/^\d*$/.test(x), 'Только цифры', 'lostfocus');
      },
    );
    b.prop(
      (x) => x.value4,
      (b) => {
        b.invalid((x) => !x, 'Не должно быть пустым1', 'lostfocus');
        b.invalid((x) => !/^\d*$/.test(x), 'Только цифры', { independent: true });
      },
    );
  });

  private handleChange = (value: Partial<State>) => {
    this.setState({ ...value, isValid: null } as any);
  };

  private handleChange2 = (value: Partial<State['object']>): void => {
    this.setState({ object: { ...this.state.object, ...value } });
  };

  private handleSubmit = async (withoutIndependent: boolean): Promise<void> => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    const isValid = await this.container.validate(false, withoutIndependent);
    this.setState({ validation: isValid ? 'valid' : 'invalid' });
  };

  private submitWithIndependent = async (): Promise<void> => {
    return await this.handleSubmit(false);
  };

  private submitWithoutIndependent = async (): Promise<void> => {
    return await this.handleSubmit(true);
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);

  private reset = () => this.setState({ reset: Math.random() });
}
