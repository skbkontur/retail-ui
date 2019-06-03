import * as React from 'react';
import Button from 'retail-ui/components/Button';
import { ValidationContainer } from '../../../../src';
import { Input, DatePicker, lessThanDate } from './ControlsWithValidations';
import Form from '../../../Common/Form';
import { Nullable } from '../../../../typings/Types';

export interface ContactInfo {
  name: string;
  email: string;
  born: string;
}

interface State {
  data: ContactInfo;
}

export default class InlineValidationsDemo extends React.Component<{}, State> {
  public state: State = {
    data: {
      name: '',
      email: '',
      born: '',
    },
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const { data } = this.state;
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          <Form.Line title="Имя">
            <Input
              required
              value={data.name}
              onChange={(_, value) => this.handleChange({ name: value })}
            />
          </Form.Line>

          <Form.Line title="E-mail">
            <Input
              required
              email
              value={data.email}
              onChange={(_, value) => this.handleChange({ email: value })}
            />
          </Form.Line>

          <Form.Line title="Дата рождения">
            <DatePicker
              required
              validations={[lessThanDate(new Date('2010-01-01'))]}
              value={data.born}
              onChange={(_, value) => this.handleChange({ born: value })}
            />
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

  private handleChange = (data: Partial<ContactInfo>): void => {
    this.setState({ data: { ...this.state.data, ...data } });
  };

  private handleSubmit = async (): Promise<void> => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    if (await this.container.validate()) {
      alert('success');
    }
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
