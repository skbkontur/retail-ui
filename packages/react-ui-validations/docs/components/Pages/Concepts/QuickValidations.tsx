import * as React from 'react';
import Helmet from 'react-helmet';
import Code from 'react-syntax-highlighter';
import Button from 'retail-ui/components/Button';
import Link from 'retail-ui/components/Link';
import { ValidationContainer } from '../../../../src';
import { DatePicker, Input, lessThanDate } from '../../../Domain/ControlsWithValidations';
import Demo from '../../Demo';
import Form from '../../Form';

export interface ContactInfo {
  name: string;
  email: string;
  born: string;
}

export interface FormEditorProps {
  data: ContactInfo;
  onChange: (update: Partial<ContactInfo>) => void;
}

const FormEditor: React.SFC<FormEditorProps> = ({ data, onChange }) => {
  return (
    <Form>
      <Form.Line title="Имя">
        <Input required value={data.name} onChange={(_, value) => onChange({ name: value })} />
      </Form.Line>
      <Form.Line title="Email">
        <Input required email value={data.email} onChange={(_, value) => onChange({ email: value })} />
      </Form.Line>
      <Form.Line title="Дата рождения">
        <DatePicker
          required
          validations={[lessThanDate(new Date('2010-01-01'))]}
          value={data.born}
          onChange={(_, value) => onChange({ born: value })}
        />
      </Form.Line>
    </Form>
  );
};

interface QuickValidationsState {
  data: ContactInfo;
}

export default class QuickValidations extends React.Component<{}, QuickValidationsState> {
  public state: QuickValidationsState = {
    data: {
      name: '',
      email: '',
      born: '',
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
        <Helmet title="Быстрые inline-валидации" />
        <h1>Быстрые inline-валидации</h1>
        <p>
          Интерфейс библиотеки устроен так, что валидации можно делать внешними по отношению к контролу формы, так и
          писать их прямо внутри формы.
        </p>
        <p>
          Однако это может быть не всегда удобно. Для этого можно сделать реэкспорт контролов, которые уже завёрнуты в
          ValidationWrapper, и предоставляют более удобный интерфейс для валидации значений.
        </p>

        <p>В итоге код может выглядеть как-то так:</p>

        <Code>{`
import { Input } from './ControlsWithValidations';

// ...

<Form.Line title='Email'>
    <Input
        required
        email
        value={data.email}
        onChange={(e, value) => onChange({ email: value })}
    />
</Form.Line>
                `}</Code>

        <p>или так:</p>

        <Code>{`
import { DatePicker, lessThan } from './ControlsWithValidations';

// ...

<Form.Line title='Дата рождения'>
    <DatePicker
        required
        validations={[lessThan(new Date('2010-01-01'))]}
        value={data.born}
        onChange={(e, value) => onChange({ born: value })}
    />
</Form.Line>
                `}</Code>

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
