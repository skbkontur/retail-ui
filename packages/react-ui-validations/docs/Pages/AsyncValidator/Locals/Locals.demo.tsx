import * as React from 'react';
import Input from 'retail-ui/components/Input';
import { ValidationContainer, ValidationWrapperV1 } from '../../../../src';
import Form from '../../../Common/Form';
import { createValidation } from '../../../../stories/AsyncStories/Validations';

interface DataContract {
  value: string;
  left: string;
  right: string;
}

function delay(timeout: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(() => resolve(), timeout));
}

async function getFromServer(left: string, right: string): Promise<boolean> {
  await delay(500);
  return left === right;
}

/* tslint:disable:no-shadowed-variable */
const validation = createValidation<DataContract>(b => {
  const isValid = b.local(
    '',
    x => ({ left: x.left, right: x.right }),
    x => getFromServer(x.left, x.right),
  );
  b.prop(
    x => x.value,
    b => {
      b.invalid(async x => !/^\d*$/.test(x), 'Только цифры', 'lostfocus');
    },
  );
  b.prop(
    x => x.left,
    b => {
      b.invalid(async () => !(await isValid()), 'Укажите одинаковые', 'lostfocus');
    },
  );
  b.prop(
    x => x.right,
    b => {
      b.invalid(async () => !(await isValid()), 'Укажите одинаковые', 'lostfocus');
    },
  );
});

interface State {
  counter: boolean;
  data: DataContract;
}

export default class LocalsDemo extends React.Component<{}, State> {
  public state: State = {
    counter: false,
    data: {
      value: '',
      left: '',
      right: '',
    },
  };

  private validator = validation.createValidator(
    this.state.data,
    this.forceUpdate.bind(this),
  );

  public componentDidUpdate(): void {
    this.validator.setValue(this.state.data);
  }

  public render() {
    const reader = this.validator.reader;
    const { data } = this.state;
    return (
      <ValidationContainer>
        <Form>
          <Form.Line title="Номер">
            <ValidationWrapperV1 validationInfo={reader.getNode(x => x.value).get()}>
              <Input
                placeholder={'Только цифры'}
                value={data.value}
                onChange={(_, value) => this.handleChange({ value })}
                onBlur={this.handleBlur}
              />
            </ValidationWrapperV1>
          </Form.Line>
          <Form.Line title="Одинаковые">
            <ValidationWrapperV1 validationInfo={reader.getNode(x => x.left).get()}>
              <Input
                value={data.left}
                onChange={(_, left) => this.handleChange({ left })}
                onBlur={this.handleBlur}
              />
            </ValidationWrapperV1>
          </Form.Line>
          <Form.Line title="Одинаковые">
            <ValidationWrapperV1 validationInfo={reader.getNode(x => x.right).get()}>
              <Input
                value={data.right}
                onChange={(_, right) => this.handleChange({ right })}
                onBlur={this.handleBlur}
              />
            </ValidationWrapperV1>
          </Form.Line>
        </Form>
      </ValidationContainer>
    );
  }

  private handleChange = async (data: Partial<DataContract>) => {
    this.setState({ data: { ...this.state.data, ...data } });
  };

  private handleBlur = async () => {
    this.validator.lostfocus();
  };
}
