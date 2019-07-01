import * as React from 'react';
import Button from 'retail-ui/components/Button';
import Input from 'retail-ui/components/Input';
import {
  ValidationContainer,
  ValidationWrapper,
  createValidator,
} from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import Form from '../../../Common/Form';

interface ContactInfo {
  name: string;
  email: string;
}

/* tslint:disable:no-shadowed-variable */
const validate = createValidator<ContactInfo>(b => {
  b.prop(
    x => x.name,
    b => {
      b.invalid(x => !x, 'Укажите имя', 'submit');
    },
  );
  b.prop(
    x => x.email,
    b => {
      b.invalid(x => !x, 'Укажите email', 'submit');
      b.invalid(x => !/^[a-z]+@[a-z]+\.[a-z]+$/.test(x), 'Неверный формат email');
    },
  );
});

/* tslint:enable:no-shadowed-variable */

interface State {
  contactInfo: ContactInfo;
}

export default class FlatObjectDemo extends React.Component<{}, State> {
  public state: State = {
    contactInfo: {
      name: '',
      email: '',
    },
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const { contactInfo } = this.state;
    const validation = validate(contactInfo);
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          <Form.Line title="Имя">
            <ValidationWrapper validationInfo={validation.getNode(x => x.name).get()}>
              <Input
                placeholder={'Любое'}
                value={contactInfo.name}
                onChange={(_, name) => this.handleChange({ name })}
              />
            </ValidationWrapper>
          </Form.Line>

          <Form.Line title="E-mail">
            <ValidationWrapper validationInfo={validation.getNode(x => x.email).get()}>
              <Input
                placeholder={'xxx@xxx.xx'}
                value={contactInfo.email}
                onChange={(_, email) => this.handleChange({ email })}
              />
            </ValidationWrapper>
          </Form.Line>

          <Form.ActionsBar>
            <Button use={'primary'} onClick={this.handleSubmit}>Submit</Button>
          </Form.ActionsBar>
        </Form>
      </ValidationContainer>
    );
  }

  private handleChange = (value: Partial<ContactInfo>): void => {
    this.setState({ contactInfo: { ...this.state.contactInfo, ...value } });
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
