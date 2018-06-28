
import React from 'react';
import Helmet from 'react-helmet';
import Code from 'react-syntax-highlighter';

import Input from 'retail-ui/components/Input';
import Button from 'retail-ui/components/Button';
import Link from 'retail-ui/components/Link';
import { validation } from '../../Examples/Editors/ValidationBuilder';

import type {
    FormEditorProps,
} from '../../../../Domain/ContactInfo';

import Demo from '../../../Demo';
import Form from '../../../Form';

import { ValidationContainer, ValidationWrapperV1, text } from 'react-ui-validations';

function FormEditor({ data, validationInfo, onChange }: FormEditorProps): React.Element<*> {
    validationInfo = validationInfo || {};
    return (
        <Form>
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
        </Form>
    );
}

const validate = validation()
    .property(x => x.name)
        .required()
        .satisfy(x => x.split(' ').length === 2, 'Имя должно состоять из двух слов')
    .property(x => x.email)
        .required()
        .satisfy(x => x.includes('@'), 'Почта указана неверно')
    .build();


export default class ValidationsBuilder extends React.Component {
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
                <Helmet title='Конструктор валидаций' />
                <h1>Конструктор валидаций</h1>
                <p>
                    Интерфейс библиотеки устроен так, что валидации можно делать внешними по отношению к
                    контролу формы, так и писать их прямо внутри формы.
                </p>
                <p>
                    Для того чтобы построить validationInfo для нескольких контрол, скорее всего нужно
                    написать функцию которая валидирует модель. Код такой функции может быть
                    очень громоздким и нечитаемым. Для этого можно использовать конструктор валидаций.
                    В итоге код может выглядеть такие образом:
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
function FormEditor({ data, validationInfo, onChange }: FormEditorProps): React.Element<*> {
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
                <p>
                    Потенциальные плюсы такого подхода:
                </p>
                <ul>
                    <li>Читаемость.</li>
                    <li>Прозрачная оптимизация. Можно валидировать только те части модели, которые изменились.</li>
                </ul>
                <p>Пример реализации можно найти в <Link href='https://github.com/skbkontur/react-ui-validations/tree/master/docs'>исходном коде документации</Link>.</p>
                <h2>Демо:</h2>
                <Demo>
                    <ValidationContainer ref='container'>
                        <FormEditor
                            data={this.state.data}
                            validationInfo={validate(this.state.data)}
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
