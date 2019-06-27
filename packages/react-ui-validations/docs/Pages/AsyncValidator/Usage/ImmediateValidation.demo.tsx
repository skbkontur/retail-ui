import * as React from 'react';
import Input from 'retail-ui/components/Input';
import { ValidationContainer, ValidationWrapperV1 } from '../../../../src';
import Form from '../../../Common/Form';
import { createValidation } from '../../../../stories/AsyncStories/Validations';

const validation = createValidation<string>(b => {
  b.invalid(async x => !/^\d*$/.test(x), 'Только цифры', 'immediate');
});

interface State {
  value: string;
}

export default class ImmediateValidationDemo extends React.Component<{}, State> {
  public state: State = {
    value: '',
  };

  private validator = validation.createValidator(
    this.state.value,
    this.forceUpdate.bind(this),
  );

  public componentDidUpdate(): void {
    this.validator.setValue(this.state.value);
    this.validator.immediate();
  }

  public render() {
    const reader = this.validator.reader;
    return (
      <ValidationContainer>
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
        </Form>
      </ValidationContainer>
    );
  }
}
