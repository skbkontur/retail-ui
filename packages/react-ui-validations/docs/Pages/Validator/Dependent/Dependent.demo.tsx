import * as React from 'react';
import Input from 'retail-ui/components/Input';
import {
  ValidationContainer,
  ValidationWrapper,
  createValidator,
} from '../../../../src';
import Form from '../../../Common/Form';
import Toggle from 'retail-ui/components/Toggle';

interface Data {
  onlyDigits: boolean;
  value: string;
}

/* tslint:disable:no-shadowed-variable */
const validate = createValidator<Data>((b, root) => {
  b.prop(
    x => x.value,
    b => {
      b.invalid(x => root.onlyDigits && !/^\d*$/.test(x), 'Только цифры');
    },
  );
});

/* tslint:enable:no-shadowed-variable */

interface State {
  data: Data;
}

export default class LostfocusValidationDemo extends React.Component<{}, State> {
  public state: State = {
    data: {
      onlyDigits: false,
      value: '',
    },
  };

  public render() {
    const v = validate(this.state.data);
    return (
      <ValidationContainer>
        <Form>
          <Form.Line title="Только цифры">
            <Toggle
              checked={this.state.data.onlyDigits}
              onChange={onlyDigits => this.handleChange({ onlyDigits })}
            />
          </Form.Line>
          <Form.Line title="Значение">
            <ValidationWrapper validationInfo={v.getNode(x => x.value).get()}>
              <Input
                placeholder={
                  this.state.data.onlyDigits ? 'Только цифры' : 'Любые символы'
                }
                value={this.state.data.value}
                onChange={(_, value) => this.handleChange({ value })}
              />
            </ValidationWrapper>
          </Form.Line>
        </Form>
      </ValidationContainer>
    );
  }

  private handleChange = (data: Partial<Data>) => {
    this.setState({ data: { ...this.state.data, ...data } });
  };
}
