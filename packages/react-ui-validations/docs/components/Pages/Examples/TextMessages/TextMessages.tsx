import * as React from 'react';
import Helmet from 'react-helmet';
import Button from 'retail-ui/components/Button';
import Input from 'retail-ui/components/Input';
import { ValidationContainer, ValidationWrapperV1, text } from 'src/index';
import { ValidationResultFor } from '../Editors/ValidationBuilder';
import { ContactInfo, FormEditorProps } from 'docs/Domain/ContactInfo';
import Demo from 'docs/components/Demo';
import Form from 'docs/components/Form';

const FormEditor: React.FunctionComponent<FormEditorProps> = ({ data, validationInfo, onChange }) => {
  validationInfo = validationInfo || {};
  return (
    <Form>
      <Form.Line title="Имя">
        <ValidationWrapperV1 renderMessage={text()} validationInfo={validationInfo.name}>
          <Input value={data.name} onChange={(e, value) => onChange({ name: value })} />
        </ValidationWrapperV1>
      </Form.Line>
      <Form.Line title="Email">
        <ValidationWrapperV1 renderMessage={text()} validationInfo={validationInfo.email}>
          <Input value={data.email} onChange={(e, value) => onChange({ email: value })} />
        </ValidationWrapperV1>
      </Form.Line>
      <Form.Line title="Телефон">
        <ValidationWrapperV1 renderMessage={text('bottom')} validationInfo={validationInfo.phone}>
          <Input value={data.phone} onChange={(e, value) => onChange({ phone: value })} />
        </ValidationWrapperV1>
      </Form.Line>
    </Form>
  );
};

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

interface DifferentMessagesState {
  data: ContactInfo;
}

export default class DifferentMessages extends React.Component<{}, DifferentMessagesState> {
  public state: DifferentMessagesState = {
    data: {
      name: '',
      email: '',
      phone: '',
      sex: null,
    },
  };

  public handleSubmit() {
    (this.refs.container as ValidationContainer).submit();
  }

  public render() {
    return (
      <div>
        <Helmet title="Текстовые сообщения" />
        <h1>Текстовые сообщения</h1>
        <Demo>
          <ValidationContainer ref="container">
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
}
