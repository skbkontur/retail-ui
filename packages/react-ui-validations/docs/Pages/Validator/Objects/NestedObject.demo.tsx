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

interface FullName {
  surname: string;
  name: string;
}

interface ContactInfo {
  fullName: FullName;
  email: string;
}

/* tslint:disable:no-shadowed-variable */
const validate = createValidator<ContactInfo>(b => {
  b.prop(
    x => x.fullName,
    b => {
      b.prop(
        x => x.name,
        b => {
          b.invalid(x => !x, 'Укажите имя', 'submit');
        },
      );
      b.prop(
        x => x.surname,
        b => {
          b.invalid(x => !x, 'Укажите фамилию', 'submit');
        },
      );
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

export default class NestedObjectDemo extends React.Component<{}, State> {
  public state: State = {
    contactInfo: {
      fullName: {
        name: '',
        surname: '',
      },
      email: '',
    },
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const { contactInfo } = this.state;
    const v = validate(contactInfo);
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          <Form.Line title="Имя">
            <ValidationWrapper validationInfo={v.getNode(x => x.fullName.name).get()}>
              <Input
                placeholder={'Любое'}
                value={contactInfo.fullName.name}
                onChange={(_, name) => this.handleFullNameChange({ name })}
              />
            </ValidationWrapper>
          </Form.Line>

          <Form.Line title="Фамилия">
            <ValidationWrapper
              validationInfo={v.getNode(x => x.fullName.surname).get()}
            >
              <Input
                placeholder={'Любая'}
                value={contactInfo.fullName.surname}
                onChange={(_, surname) => this.handleFullNameChange({ surname })}
              />
            </ValidationWrapper>
          </Form.Line>

          <Form.Line title="E-mail">
            <ValidationWrapper validationInfo={v.getNode(x => x.email).get()}>
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

  private handleFullNameChange = (value: Partial<FullName>): void => {
    this.handleChange({ fullName: { ...this.state.contactInfo.fullName, ...value } });
  };

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
