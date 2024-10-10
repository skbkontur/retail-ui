import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button, Gapped, Input } from '@skbkontur/react-ui';

import { ValidationContainer, ValidationWrapper, ValidationInfo, ValidationBehaviour, text } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default {
  title: 'Описание валидаций/Независимые валидации',
  parameters: { creevey: { skip: true } },
} as Meta;

export const LostfocusIndependent: Story = () => {
  class LostfocusDependentDemo extends React.Component {
    public state = {
      name: '',
      lastname: '',
    };

    private validate = (value: string): Nullable<ValidationInfo> => {
      if (!value) {
        return { message: 'Не должно быть пустым', type: 'lostfocus' };
      }
      return null;
    };

    public render() {
      return (
        <ValidationContainer>
          <Form>
            <Form.Line title="Имя">
              <ValidationWrapper validationInfo={this.validate(this.state.name)} renderMessage={text('right')}>
                <Input placeholder={'Иван'} value={this.state.name} onValueChange={(name) => this.setState({ name })} />
              </ValidationWrapper>
            </Form.Line>
            <Form.Line title="Фамилия">
              <ValidationWrapper validationInfo={this.validate(this.state.lastname)} renderMessage={text('right')}>
                <Input
                  placeholder={'Иванов'}
                  value={this.state.lastname}
                  onValueChange={(lastname) => this.setState({ lastname })}
                />
              </ValidationWrapper>
            </Form.Line>
          </Form>
        </ValidationContainer>
      );
    }
  }

  return <LostfocusDependentDemo />;
};

export const LostfocusDependent: Story = () => {
  interface LostfocusDependentErrorValidationDemoState {
    name: string;
    lastname: string;
  }
  class LostfocusDependentErrorValidationDemo extends React.Component {
    public state: LostfocusDependentErrorValidationDemoState = {
      name: '',
      lastname: '',
    };

    private validate = (value: string): Nullable<ValidationInfo> => {
      if (!value) {
        return { message: 'Не должно быть пустым', type: 'lostfocus', independent: true };
      }

      return null;
    };

    public render() {
      return (
        <ValidationContainer>
          <Form>
            <Form.Line title="Имя">
              <ValidationWrapper validationInfo={this.validate(this.state.name)} renderMessage={text('right')}>
                <Input placeholder={'Иван'} value={this.state.name} onValueChange={(name) => this.setState({ name })} />
              </ValidationWrapper>
            </Form.Line>
            <Form.Line title="Фамилия">
              <ValidationWrapper validationInfo={this.validate(this.state.lastname)} renderMessage={text('right')}>
                <Input
                  placeholder={'Иванов'}
                  value={this.state.lastname}
                  onValueChange={(lastname) => this.setState({ lastname })}
                />
              </ValidationWrapper>
            </Form.Line>
          </Form>
        </ValidationContainer>
      );
    }
  }

  return <LostfocusDependentErrorValidationDemo />;
};

export const Mixture: Story = () => {
  interface IndependentCompareState {
    dependents: {
      immediate: string;
      lostfocus: string;
      submit: string;
    };
    independents: {
      immediate: string;
      lostfocus: string;
      submit: string;
    };
    reset: number;
  }

  const initialState: IndependentCompareState = {
    dependents: {
      immediate: '',
      lostfocus: '',
      submit: '',
    },
    independents: {
      immediate: '',
      lostfocus: '',
      submit: '',
    },
    reset: 1,
  };

  class IndependentCompare extends React.Component {
    public state = initialState;

    private container: Nullable<ValidationContainer> = null;

    public render() {
      const { dependents, independents, reset } = this.state;

      return (
        <ValidationContainer key={reset} ref={this.refContainer}>
          <Form>
            <Form.Line title="">
              <code>immediate</code>
            </Form.Line>

            <Form.Line title="Зависимая">
              <ValidationWrapper
                renderMessage={text('right')}
                validationInfo={this.validate(dependents.immediate, 'immediate')}
              >
                <Input
                  placeholder="Не должно быть пустым"
                  value={dependents.immediate}
                  onValueChange={(value) => this.handleChangeDependents({ immediate: value })}
                />
              </ValidationWrapper>
            </Form.Line>

            <Form.Line title="Независимая">
              <ValidationWrapper
                renderMessage={text('right')}
                validationInfo={this.validate(independents.immediate, 'immediate', true)}
              >
                <Input
                  placeholder="Не должно быть пустым"
                  value={independents.immediate}
                  onValueChange={(value) => this.handleChangeIndependents({ immediate: value })}
                />
              </ValidationWrapper>
            </Form.Line>

            <Form.Line title="">
              <code>lostfocus</code>
            </Form.Line>

            <Form.Line title="Зависимая">
              <ValidationWrapper
                renderMessage={text('right')}
                validationInfo={this.validate(dependents.lostfocus, 'lostfocus')}
              >
                <Input
                  placeholder="Не должно быть пустым"
                  value={dependents.lostfocus}
                  onValueChange={(value) => this.handleChangeDependents({ lostfocus: value })}
                />
              </ValidationWrapper>
            </Form.Line>

            <Form.Line title="Независимая">
              <ValidationWrapper
                renderMessage={text('right')}
                validationInfo={this.validate(independents.lostfocus, 'lostfocus', true)}
              >
                <Input
                  placeholder="Не должно быть пустым"
                  value={independents.lostfocus}
                  onValueChange={(value) => this.handleChangeIndependents({ lostfocus: value })}
                />
              </ValidationWrapper>
            </Form.Line>

            <Form.Line title="">
              <code>submit</code>
            </Form.Line>

            <Form.Line title="Зависимая">
              <ValidationWrapper
                renderMessage={text('right')}
                validationInfo={this.validate(dependents.submit, 'submit')}
              >
                <Input
                  placeholder="Не должно быть пустым"
                  value={dependents.submit}
                  onValueChange={(value) => this.handleChangeDependents({ submit: value })}
                />
              </ValidationWrapper>
            </Form.Line>

            <Form.Line title="Независимая">
              <ValidationWrapper
                renderMessage={text('right')}
                validationInfo={this.validate(independents.submit, 'submit', true)}
              >
                <Input
                  placeholder="Не должно быть пустым"
                  value={independents.submit}
                  onValueChange={(value) => this.handleChangeIndependents({ submit: value })}
                />
              </ValidationWrapper>
            </Form.Line>

            <br />

            <Form.Line title="">
              <Gapped>
                <Button use="primary" onClick={this.submit}>
                  Submit
                </Button>
                <Button use="pay" onClick={this.reset}>
                  Очистить
                </Button>
              </Gapped>
            </Form.Line>
          </Form>
        </ValidationContainer>
      );
    }

    private validate = (v: string, type: ValidationBehaviour, independent = false): Nullable<ValidationInfo> => {
      if (v === '') {
        return { message: 'Не должно быть пустым', type, independent };
      }
      return null;
    };

    private handleChangeDependents = (value: Partial<IndependentCompareState['dependents']>) => {
      this.setState({ dependents: { ...this.state.dependents, ...value } });
    };

    private handleChangeIndependents = (value: Partial<IndependentCompareState['independents']>): void => {
      this.setState({ independents: { ...this.state.independents, ...value } });
    };

    private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);

    private submit = () => this.container?.validate();

    private reset = () => this.setState({ ...initialState, reset: Math.random() });
  }

  return <IndependentCompare />;
};
