import React from 'react';
import { Button, Input } from '@skbkontur/react-ui';

import { Nullable } from '../../../../typings/Types';
import {
  createValidator,
  text,
  ValidationContainer,
  ValidationInfo,
  ValidationWrapper,
} from '../../../../src';
import { Form } from '../../../Common/Form';

interface State {
  value1: string;
  value2: string;
  object: {
    value3: string;
    value4: string;
  };
  reset: number;
}

export default class IndependentCompare extends React.Component<{}, State> {
  public state: State = {
    value1: '',
    value2: '',
    object: {
      value3: '',
      value4: '',
    },
    reset: 1,
  };

  public render() {
    const { value1, value2, object, reset } = this.state;

    const validation = this.validateObject(object);

    return (
      <ValidationContainer key={reset}>
        <Form>
          <Form.Line title="Зависимая">
            <ValidationWrapper
              renderMessage={text('right')}
              validationInfo={this.validate(value1)}
            >
              <Input
                placeholder="Не должно быть пустым"
                value={value1}
                onValueChange={(value) => this.handleChange({ value1: value })}
              />
            </ValidationWrapper>
          </Form.Line>
          <Form.Line title="Независимая">
            <ValidationWrapper
              renderMessage={text('right')}
              validationInfo={validation.getNode((x) => x.value3).get()}
            >
              <Input
                placeholder="Не должно быть пустым"
                value={object.value3}
                onValueChange={(value) => this.handleChange2({ value3: value })}
              />
            </ValidationWrapper>
          </Form.Line>
          <Form.Line title="Зависимая">
            <ValidationWrapper
              renderMessage={text('right')}
              validationInfo={this.validate(value2)}
            >
              <Input
                placeholder="Не должно быть пустым"
                value={value2}
                onValueChange={(value) => this.handleChange({ value2: value })}
              />
            </ValidationWrapper>
          </Form.Line>
          <Form.Line title="Независимая">
            <ValidationWrapper
              renderMessage={text('right')}
              validationInfo={validation.getNode((x) => x.value4).get()}
            >
              <Input
                placeholder="Не должно быть пустым"
                value={object.value4}
                onValueChange={(value) => this.handleChange2({ value4: value })}
              />
            </ValidationWrapper>
          </Form.Line>
          <Form.Line title="">
            <Button use="pay" onClick={this.reset}>
              Очистить
            </Button>
          </Form.Line>
        </Form>
      </ValidationContainer>
    );
  }

  private validate = (v: string): Nullable<ValidationInfo> => {
    if (v === '') return { message: 'Не должно быть пустым', type: 'lostfocus' };
    return null;
  };

  private validateObject = createValidator<State['object']>((b) => {
    b.prop(
      (x) => x.value3,
      (b, s) => {
        b.invalid((x) => !x, {
          message: 'Не должно быть пустым',
          type: 'lostfocus',
          independent: true,
        });
      },
    );
    b.prop(
      (x) => x.value4,
      (b) => {
        b.invalid((x) => !x, {
          message: 'Не должно быть пустым',
          type: 'lostfocus',
          independent: true,
        });
      },
    );
  });

  private handleChange = (value: Partial<State>) => {
    this.setState({ ...value, isValid: null } as any);
  };

  private handleChange2 = (value: Partial<State['object']>): void => {
    this.setState({ object: { ...this.state.object, ...value } });
  };

  private reset = () =>
    this.setState({
      reset: Math.random(),
      value1: '',
      value2: '',
      object: {
        value3: '',
        value4: '',
      },
    });
}
