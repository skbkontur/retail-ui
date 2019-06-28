import * as React from 'react';
import Button from 'retail-ui/components/Button';
import Input from 'retail-ui/components/Input';
import { ValidationContainer, ValidationWrapper, ValidationInfo } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import Form from '../../../Common/Form';

function delay(timeout: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, timeout));
}

interface State {
  value: string;
  revision: number;
  pending: number;
}

export default class SubmitValidationDemo extends React.Component<{}, State> {
  public state: State = {
    value: '',
    revision: 0,
    pending: 0,
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          <Form.Line title="Состояние">
            {this.state.pending ? '||'.repeat(this.state.pending) : '—'}
          </Form.Line>
          <Form.Line title="Номер">
            <ValidationWrapper validationInfo={this.validate(this.state.value)}>
              <Input
                placeholder={'Только цифры'}
                value={this.state.value}
                onChange={this.handleChange}
              />
            </ValidationWrapper>
          </Form.Line>

          <Form.ActionsBar>
            <Button use={'primary'} onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form.ActionsBar>
        </Form>
      </ValidationContainer>
    );
  }

  private handleChange = (_: unknown, value: string) => {
    this.setState({ value, revision: this.state.revision + 1 }, async () => {
      const { revision } = this.state;
      for (let pending = 30; pending >= 0; --pending) {
        if (revision !== this.state.revision) {
          break;
        }
        this.setState({ pending });
        await delay(100);
      }
    });
  };

  private validate = (value: string): Nullable<ValidationInfo> => {
    if (this.state.pending) {
      return { pending: true };
    }
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'submit' } : null;
  };

  private handleSubmit = async (): Promise<void> => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    await this.container.submit();
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
