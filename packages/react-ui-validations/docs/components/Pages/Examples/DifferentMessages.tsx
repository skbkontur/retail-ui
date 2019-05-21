import * as React from 'react';
import Helmet from 'react-helmet';
import Button from 'retail-ui/components/Button';
import Input from 'retail-ui/components/Input';
import { text, ValidationContainer, ValidationWrapperV1 } from '../../../../src';
import { ContactInfo, FormEditorProps } from '../../../Domain/ContactInfo';
import { ValidationResultFor } from '../../../Domain/ValidationBuilder';
import Demo from '../../Demo';
import Form from '../../Form';

function FormEditor({ data, validationInfo, onChange }: FormEditorProps) {
  validationInfo = validationInfo || {};
  return (
    <Form>
      <Form.Line title="Имя">
        <ValidationWrapperV1 renderMessage={text()} validationInfo={validationInfo.name}>
          <Input value={data.name} onChange={(_, value) => onChange({ name: value })} />
        </ValidationWrapperV1>
      </Form.Line>
      <Form.Line title="Email">
        <ValidationWrapperV1 validationInfo={validationInfo.email}>
          <Input value={data.email} onChange={(_, value) => onChange({ email: value })} />
        </ValidationWrapperV1>
      </Form.Line>
      <Form.Line title="Телефон">
        <ValidationWrapperV1 validationInfo={validationInfo.phone}>
          <Input value={data.phone} onChange={(_, value) => onChange({ phone: value })} />
        </ValidationWrapperV1>
      </Form.Line>
    </Form>
  );
}

function validate(data: ContactInfo): ValidationResultFor<ContactInfo> {
  const result: ValidationResultFor<ContactInfo> = {};
  if (data.name === '') {
    result.name = { type: 'submit', message: 'Имя надо указать' };
  } else if (data.name.split(' ').length !== 2) {
    result.name = { message: 'Имя должно состоять из двух слов' };
  }

  if (data.email === '') {
    result.email = { type: 'submit', message: 'Почту надо указать' };
  } else if (!data.email.includes('@')) {
    result.email = { message: 'Почта указана неверно' };
  }

  if (data.phone !== '' && !/^[\s\d\-\+\(\)]*$/.test(data.phone)) {
    result.phone = { message: 'Телефон должен состоять только из цифр, пробелов и знаков -,+,(,)' };
  }
  return result;
}

export default class DifferentMessages extends React.Component {
  public state = {
    data: {
      name: '',
      email: '',
      phone: '',
      sex: null,
    },
  };
  private container: ValidationContainer | null = null;

  public handleSubmit() {
    if (this.container) {
      this.container.submit();
    }
  }

  public render() {
    return (
      <div>
        <Helmet title="Разные типы сообщения в одной форме" />
        <h1>Разные типы сообщения в одной форме</h1>
        <Demo>
          <ValidationContainer ref={this.refContainer}>
            <FormEditor
              data={this.state.data}
              validationInfo={validate(this.state.data)}
              onChange={update => this.setState({ data: { ...this.state.data, ...update } })}
            />
            <Form.ActionsBar>
              <Button use="primary" onClick={() => this.handleSubmit()}>
                Сохранить
              </Button>
            </Form.ActionsBar>
          </ValidationContainer>
        </Demo>
      </div>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}
