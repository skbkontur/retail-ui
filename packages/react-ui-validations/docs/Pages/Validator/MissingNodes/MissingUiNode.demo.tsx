import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';

import { ValidationContainer, ValidationWrapper, createValidator } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

interface ContactInfo {
  name: string;
  email: string;
}

interface Data {
  withContact: boolean;
  contact: ContactInfo;
}

const validate = createValidator<Data>(b => {
  b.prop(
    x => x.contact,
    b => {
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
    },
  );
});

interface State {
  data: Data;
}

export default class MissingObjectNode extends React.Component<{}, State> {
  public state: State = {
    data: {
      withContact: false,
      contact: {
        name: '',
        email: '',
      },
    },
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const { data } = this.state;
    const v = validate(data).getNode(x => x.contact);
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          <Form.Line title="Валидации">JSON</Form.Line>

          <Form.Line title="Имя">
            {JSON.stringify(v.getNode(x => x.name).get())}
          </Form.Line>

          <Form.Line title="E-mail">
            {JSON.stringify(v.getNode(x => x.email).get())}
          </Form.Line>

          <Form.LineBreak />

          <Form.Line title="Указать контакты">
            <Toggle
              checked={data.withContact}
              onValueChange={withContact => this.handleChange({ withContact })}
            />
          </Form.Line>

          {data.withContact && (
            <>
              <Form.Line title="Имя">
                <ValidationWrapper validationInfo={v.getNode(x => x.name).get()}>
                  <Input
                    placeholder={'Любое'}
                    value={data.contact.name}
                    onValueChange={name => this.handleContactChange({ name })}
                  />
                </ValidationWrapper>
              </Form.Line>

              <Form.Line title="E-mail">
                <ValidationWrapper validationInfo={v.getNode(x => x.email).get()}>
                  <Input
                    placeholder={'xxx@xxx.xx'}
                    value={data.contact.email}
                    onValueChange={email => this.handleContactChange({ email })}
                  />
                </ValidationWrapper>
              </Form.Line>
            </>
          )}

          <Form.ActionsBar>
            <Button use={'primary'} onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form.ActionsBar>
        </Form>
      </ValidationContainer>
    );
  }

  private handleContactChange = (value: Partial<ContactInfo>): void => {
    this.handleChange({ contact: { ...this.state.data.contact, ...value } });
  };

  private handleChange = (value: Partial<Data>): void => {
    this.setState({ data: { ...this.state.data, ...value } });
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
