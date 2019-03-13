import * as React from 'react';
import Helmet from 'react-helmet';
import Code from 'react-syntax-highlighter';
import Button from 'retail-ui/components/Button';
import Input from 'retail-ui/components/Input';
import Link from 'retail-ui/components/Link';
import { text, ValidationContainer, ValidationWrapperV1 } from '../../../../src';
import { ContactInfo, FormEditorProps } from '../../../Domain/ContactInfo';
import { validation } from '../../../Domain/ValidationBuilder';
import Demo from '../../Demo';
import Form from '../../Form';

const FormEditor: React.SFC<FormEditorProps> = ({ data, validationInfo, onChange }) => {
  const validationInfoValue = validationInfo || {};
  return (
    <Form>
      <Form.Line title="Имя">
        <ValidationWrapperV1 renderMessage={text()} validationInfo={validationInfoValue.name}>
          <Input value={data.name} onChange={(_, value) => onChange({ name: value })} />
        </ValidationWrapperV1>
      </Form.Line>
      <Form.Line title="Email">
        <ValidationWrapperV1 validationInfo={validationInfoValue.email}>
          <Input value={data.email} onChange={(_, value) => onChange({ email: value })} />
        </ValidationWrapperV1>
      </Form.Line>
    </Form>
  );
};

const validate = validation<ContactInfo>()
  .property(x => x.name)
  .required()
  .satisfy(x => x.split(' ').length === 2, 'Имя должно состоять из двух слов')
  .property(x => x.email)
  .required()
  .satisfy(x => x.includes('@'), 'Почта указана неверно')
  .build();

interface ValidationsBuilderState {
  data: ContactInfo;
}

export default class ValidationsBuilder extends React.Component<{}, ValidationsBuilderState> {
  public state: ValidationsBuilderState = {
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
        <Helmet title="Конструктор валидаций" />
        <h1>Конструктор валидаций</h1>
        <p>
          Интерфейс библиотеки устроен так, что валидации можно делать внешними по отношению к контролу формы, так и
          писать их прямо внутри формы.
        </p>
        <p>
          Для того чтобы построить validationInfo для нескольких контролов, скорее всего нужно написать функцию которая
          валидирует модель. Код такой функции может быть очень громоздким и нечитаемым. Для этого можно использовать
          конструктор валидаций. В итоге код может выглядеть такие образом:
        </p>
        <Code>{`
// Код построения функции валидации:
const validate = validation()
    .property(x => x.name)
        .required()
        .satisfy(x => x.split(' ').length === 2, 'Имя должно состоять из двух слов')
    .property(x => x.email)
        .required()
        .satisfy(x => x.includes('@'), 'Почта указана неверно')
    .build();

// Код вызова функции валидации:
<FormEditor
    data={this.state.data}
    validationInfo={validate(this.state.data)}
    onChange={update => this.setState({ data: { ...this.state.data, ...update } })}
/>

// Использование результатов валидации
function FormEditor({ data, validationInfo, onChange }: FormEditorProps): React.Node {
    return (
        //...
        <Form.Line title='Имя'>
            <ValidationWrapperV1
                renderMessage={text()}
                validationInfo={validationInfo.name}>
                <Input
                    value={data.name}
                    onChange={(e, value) => onChange({ name: value })}
                />
            </ValidationWrapperV1>
        </Form.Line>
        <Form.Line title='Email'>
            <ValidationWrapperV1
                validationInfo={validationInfo.email}>
                <Input
                    value={data.email}
                    onChange={(e, value) => onChange({ email: value })}
                />
            </ValidationWrapperV1>
        </Form.Line>
        //...
    );
}
                `}</Code>
        <p>Потенциальные плюсы такого подхода:</p>
        <ul>
          <li>Читаемость.</li>
          <li>Прозрачная оптимизация. Можно валидировать только те части модели, которые изменились.</li>
        </ul>
        <p>
          Пример реализации можно найти в{' '}
          <Link href="https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/docs">
            исходном коде документации
          </Link>
          .
        </p>
        <h2>Демо:</h2>
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
