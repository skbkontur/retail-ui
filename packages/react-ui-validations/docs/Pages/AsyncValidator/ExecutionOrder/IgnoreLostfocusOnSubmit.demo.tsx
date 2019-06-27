import * as React from 'react';
import Button from 'retail-ui/components/Button';
import Input from 'retail-ui/components/Input';
import { ValidationContainer, ValidationWrapperV1 } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import Form from '../../../Common/Form';
import { createValidation } from '../../../../stories/AsyncStories/Validations';

const validation = createValidation<string, unknown, boolean>(b => {
  b.invalid(x => x.length > 3, 'Максимум три знака', 'lostfocus', { submit: false });
  b.submitted(x => !x, 'Server: Максимум три знака');
});

interface State {
  value: string;
}

export default class SubmitBeforeLostfocusDemo extends React.Component<{}, State> {
  public state: State = {
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
                onBlur={this.handleBlur}
              />
            </ValidationWrapperV1>
          </Form.Line>
          <Form.ActionsBar>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Form.ActionsBar>
        </Form>
      </ValidationContainer>
    );
  }

  private handleBlur = () => {
    this.validator.lostfocus();
  };

  private handleSubmit = async (): Promise<void> => {
    await this.validator.submit(this.handleValidate, this.submitToServer);
  };

  private submitToServer = async (): Promise<boolean> => {
    return this.state.value.length <= 3;
  };

  private handleValidate = async () => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    return await this.container.validate();
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
