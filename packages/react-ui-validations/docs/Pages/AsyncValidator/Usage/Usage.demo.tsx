import * as React from 'react';
import Input from 'retail-ui/components/Input';
import { ValidationContainer, ValidationWrapperV1 } from '../../../../src';
import Form from '../../../Common/Form';
import { createValidation } from '../../../../stories/AsyncStories/Validations';

function delay(timeout: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(() => resolve(), timeout));
}

async function isDuplicateNumber(value: string): Promise<boolean> {
  await delay(2000);
  return ['1', '11'].includes(value);
}

const validation = createValidation<string>(b => {
  b.invalid(async x => !/^\d*$/.test(x), 'Только цифры', 'lostfocus');
  b.invalid(async x => x.length > 3, 'Не больше трех символов', 'lostfocus');
  b.invalid(async x => isDuplicateNumber(x), 'Укажите другой номер', 'lostfocus');
});

interface State {
  value: string;
}

export default class UsageDemo extends React.Component<{}, State> {
  public state: State = {
    value: '',
  };

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
      <ValidationContainer>
        <Form>
          <Form.Line title="Номер" comment="Номера 1 и 11 недопустимы">
            <ValidationWrapperV1 validationInfo={reader.get()}>
              <Input
                placeholder={'Только цифры'}
                value={this.state.value}
                onChange={(_, value) => this.setState({ value })}
                onBlur={this.handleBlur}
              />
            </ValidationWrapperV1>
          </Form.Line>
        </Form>
      </ValidationContainer>
    );
  }

  private handleBlur = () => {
    this.validator.lostfocus();
  };
}
