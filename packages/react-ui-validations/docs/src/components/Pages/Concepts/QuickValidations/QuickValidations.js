
import React from 'react';
import Helmet from 'react-helmet';
import Code from 'react-syntax-highlighter';
import Button from 'retail-ui/components/Button';
import Link from 'retail-ui/components/Link';

import { Input, DatePicker, lessThan } from './ControlsWithValidations';

import type {
    FormEditorProps,
} from '../../../../Domain/ContactInfo';

import Demo from '../../../Demo';
import Form from '../../../Form';

import { ValidationContainer } from 'react-ui-validations';

function FormEditor({ data, onChange }: FormEditorProps): React.Element<*> {
    return (
        <Form>
            <Form.Line title='Имя'>
                <Input
                    required
                    value={data.name}
                    onChange={(e, value) => onChange({ name: value })}
                />
            </Form.Line>
            <Form.Line title='Email'>
                <Input
                    required
                    email
                    value={data.email}
                    onChange={(e, value) => onChange({ email: value })}
                />
            </Form.Line>
            <Form.Line title='Дата рождения'>
                <DatePicker
                    required
                    validations={[lessThan(new Date('2010-01-01'))]}
                    value={data.born}
                    onChange={(e, value) => onChange({ born: value })}
                />
            </Form.Line>
        </Form>
    );
}

export default class QuickValidations extends React.Component {
    state = {
        data: {
            name: '',
            email: '',
            phone: '',
            sex: null,
        },
    };

    handleSubmit() {
        this.refs.container.submit();
    }

    render(): React.Element<*> {
        return (
            <div>
                <Helmet title='Быстрые inline-валидации' />
                <h1>Быстрые inline-валидации</h1>
                <p>
                    Интерфейс библиотеки устроен так, что валидации можно делать внешними по отношению к
                    контролу формы, так и писать их прямо внутри формы.
                </p>
                <p>
                    Однако это может быть не всегда удобно. Для этого можно сделать реэкспорт контролов,
                    которые уже завёрнуты в ValidationWrapper, и предоставляют более удобный интерфейс для
                    валидации значений.
                </p>

                <p>
                    В итоге код может выглядеть как-то так:
                </p>

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


                <p>Пример реализации можно найти в <Link href='https://github.com/skbkontur/react-ui-validations/tree/master/docs'>исходном коде документации</Link>.</p>
                <h2>Демо:</h2>

                <Demo>
                    <ValidationContainer ref='container'>
                        <FormEditor
                            data={this.state.data}
                            onChange={update => this.setState({ data: { ...this.state.data, ...update } })}
                        />
                        <Form.ActionsBar>
                            <Button use='primary' onClick={() => this.handleSubmit()}>Сохранить</Button>
                        </Form.ActionsBar>
                    </ValidationContainer>
                </Demo>
            </div>
        );
    }
}
