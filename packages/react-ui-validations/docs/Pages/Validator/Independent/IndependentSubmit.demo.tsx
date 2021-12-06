import React from 'react';
import { Button, Gapped, Input } from '@skbkontur/react-ui';

import { Nullable } from '../../../../typings/Types';
import { createValidator, ValidationContainer, ValidationWrapper } from '../../../../src';
import { Form } from '../../../Common/Form';

interface State {
  object: {
    value1: string;
    value2: string;
    value3: string;
  };
  validSubmitDefault: string;
  validSubmitWithoutIndependent: string;
  reset: number;
}

export default class IndependentSubmit extends React.Component<{}, State> {
  public state: State = {
    object: {
      value1: '',
      value2: '',
      value3: '',
    },
    validSubmitDefault: 'none',
    validSubmitWithoutIndependent: 'none',
    reset: 1,
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const { object, reset, validSubmitDefault, validSubmitWithoutIndependent } =
      this.state;

    const validation = this.validateObject(object);

    return (
      <ValidationContainer key={reset} ref={this.refContainer}>
        <Form>
          <Form.Line title="Независимая">
            <Gapped>
              <ValidationWrapper
                renderMessage={null}
                validationInfo={validation.getNode((x) => x.value1).get()}
              >
                <Input
                  placeholder="Не должно быть пустым"
                  value={object.value1}
                  onValueChange={(value) => this.handleChange({ value1: value })}
                />
              </ValidationWrapper>
              <code>submit</code>
            </Gapped>
          </Form.Line>
          <Form.Line title="Независимая">
            <Gapped>
              <ValidationWrapper
                renderMessage={null}
                validationInfo={validation.getNode((x) => x.value2).get()}
              >
                <Input
                  placeholder="Не должно быть пустым"
                  value={object.value2}
                  onValueChange={(value) => this.handleChange({ value2: value })}
                />
              </ValidationWrapper>
              <code>lostfocus</code>
            </Gapped>
          </Form.Line>
          <Form.Line title="Зависимая">
            <Gapped>
              <ValidationWrapper
                renderMessage={null}
                validationInfo={validation.getNode((x) => x.value3).get()}
              >
                <Input
                  placeholder="Не должно быть пустым"
                  value={object.value3}
                  onValueChange={(value) => this.handleChange({ value3: value })}
                />
              </ValidationWrapper>
              <code>lostfocus</code>
            </Gapped>
          </Form.Line>
          <Form.Line title="По умолчанию">
            <Gapped>
              <Button use="primary" onClick={this.submitWithIndependent}>
                <code>Submit 1</code>
              </Button>
              <span>{validSubmitDefault}</span>
            </Gapped>
          </Form.Line>
          <Form.Line title="Только зависимые">
            <Gapped>
              <Button use="primary" onClick={this.submitWithoutIndependent}>
                <code>Submit 2</code>
              </Button>
              <span>{validSubmitWithoutIndependent}</span>
            </Gapped>
          </Form.Line>
          <Form.Line title={null}>
            <Button use="pay" onClick={this.reset}>
              Очистить
            </Button>
          </Form.Line>
        </Form>
      </ValidationContainer>
    );
  }

  private validateObject = createValidator<State['object']>((b) => {
    b.prop(
      (x) => x.value1,
      (b, s) => {
        b.invalid((x) => !x, {
          message: null,
          type: 'submit',
          independent: true,
        });
      },
    );
    b.prop(
      (x) => x.value2,
      (b, s) => {
        b.invalid((x) => !x, {
          message: null,
          type: 'lostfocus',
          independent: true,
        });
      },
    );
    b.prop(
      (x) => x.value3,
      (b) => {
        b.invalid((x) => !x, {
          message: null,
          type: 'lostfocus',
          independent: false,
        });
      },
    );
  });

  private handleChange = (value: Partial<State['object']>): void => {
    this.setState({ object: { ...this.state.object, ...value } });
  };

  private handleSubmit = async (withoutIndependent: boolean): Promise<void> => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    const isValid = (await this.container.validate(false, withoutIndependent))
      ? '✅'
      : '❌';
    if (withoutIndependent) {
      this.setState({ validSubmitWithoutIndependent: isValid });
    } else {
      this.setState({ validSubmitDefault: isValid });
    }
  };

  private submitWithIndependent = async (): Promise<void> => {
    return await this.handleSubmit(false);
  };

  private submitWithoutIndependent = async (): Promise<void> => {
    return await this.handleSubmit(true);
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);

  private reset = () =>
    this.setState({
      reset: Math.random(),
      object: {
        value1: '',
        value2: '',
        value3: '',
      },
      validSubmitDefault: 'none',
      validSubmitWithoutIndependent: 'none',
    });
}
