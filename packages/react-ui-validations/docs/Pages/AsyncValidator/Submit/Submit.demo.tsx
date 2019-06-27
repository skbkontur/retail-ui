import * as React from 'react';
import Button from 'retail-ui/components/Button';
import Input from 'retail-ui/components/Input';
import Toast from 'retail-ui/components/Toast';
import { ValidationContainer, ValidationWrapperV1 } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import Form from '../../../Common/Form';
import { createValidation } from '../../../../stories/AsyncStories/Validations';

interface SubmitResult {
  invalidFormat: boolean;
}

function delay(timeout: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(() => resolve(), timeout));
}

async function submitToServer(value: string): Promise<SubmitResult> {
  await delay(1000);
  return { invalidFormat: !/^\d*$/.test(value) };
}

const validation = createValidation<string, unknown, SubmitResult>(b => {
  b.invalid(x => !x, 'Укажите значение', 'submit');
  b.submitted(x => x.invalidFormat, 'Сервер: Только цифры');
});

interface State {
  submitInProgress: boolean;
  value: string;
}

export default class SubmitDemo extends React.Component<{}, State> {
  public state: State = {
    submitInProgress: false,
    value: '',
  };

  private container: Nullable<ValidationContainer> = null;

  private validator = validation.createValidator(
    this.state.value,
    this.forceUpdate.bind(this),
  );

  public componentDidUpdate(): void {
    this.validator.setValue(this.state.value);
  }

  public render() {
    const reader = this.validator.reader;
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          <Form.Line title="Номер">
            <ValidationWrapperV1 validationInfo={reader.get()}>
              <Input
                placeholder={'Только цифры'}
                value={this.state.value}
                onChange={(_, value) => this.setState({ value })}
                disabled={this.state.submitInProgress}
              />
            </ValidationWrapperV1>
          </Form.Line>
          <Form.ActionsBar>
            <Button onClick={this.handleSubmit} loading={this.state.submitInProgress}>
              Submit
            </Button>
          </Form.ActionsBar>
        </Form>
      </ValidationContainer>
    );
  }

  private handleSubmit = async (): Promise<void> => {
    this.setState({ submitInProgress: true }, async () => {
      const valid = await this.validator.submit(this.handleValidate, this.submitToServer);
      this.setState({ submitInProgress: false }, () => {
        if (valid) {
          Toast.push('Success');
        }
      });
    });
  };

  private submitToServer = async (): Promise<SubmitResult> => {
    return submitToServer(this.state.value);
  };

  private handleValidate = async () => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    return await this.container.validate();
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
