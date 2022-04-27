import React from 'react';
import { Button, Gapped, Input } from '@skbkontur/react-ui';

import { Nullable } from '../../../../typings/Types';
import {
  text,
  ValidationBehaviour,
  ValidationContainer,
  ValidationInfo,
  ValidationWrapper,
} from '../../../../src';
import { Form } from '../../../Common/Form';

interface State {
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

const initialState: State = {
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

export default class IndependentCompare extends React.Component<unknown, State> {
  public state: State = initialState;

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
                onValueChange={(value) =>
                  this.handleChangeDependents({ immediate: value })
                }
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
                onValueChange={(value) =>
                  this.handleChangeIndependents({ immediate: value })
                }
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
                onValueChange={(value) =>
                  this.handleChangeDependents({ lostfocus: value })
                }
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
                onValueChange={(value) =>
                  this.handleChangeIndependents({ lostfocus: value })
                }
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
                onValueChange={(value) =>
                  this.handleChangeIndependents({ submit: value })
                }
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

  private validate = (
    v: string,
    type: ValidationBehaviour,
    independent = false,
  ): Nullable<ValidationInfo> => {
    if (v === '') return { message: 'Не должно быть пустым', type, independent };
    return null;
  };

  private handleChangeDependents = (value: Partial<State['dependents']>) => {
    this.setState({ dependents: { ...this.state.dependents, ...value } });
  };

  private handleChangeIndependents = (value: Partial<State['independents']>): void => {
    this.setState({ independents: { ...this.state.independents, ...value } });
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);

  private submit = () => this.container?.validate();

  private reset = () => this.setState({ ...initialState, reset: Math.random() });
}
