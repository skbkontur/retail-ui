import * as React from 'react';
import Button from 'retail-ui/components/Button';
import Input from 'retail-ui/components/Input';
import Toast from 'retail-ui/components/Toast';
import { ValidationContainer, ValidationWrapperV1 } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import Form from '../../../Common/Form';
import { createValidation } from '../../../../stories/AsyncStories/Validations';

const validation = createValidation<string>(b => {
  b.invalid(async x => !/^\d*$/.test(x), 'Только цифры', 'submit');
});

interface State {
  value: string;
}

export default class SubmitValidationDemo extends React.Component<{}, State> {
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

  private handleSubmit = async (): Promise<void> => {
    if (await this.validator.submit(this.handleValidate)) {
      Toast.push('Success');
    }
  };

  private handleValidate = async () => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    return await this.container.validate();
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
