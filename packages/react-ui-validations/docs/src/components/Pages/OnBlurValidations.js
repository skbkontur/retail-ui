// @flow
import React from 'react';

import Input from 'retail-ui/components/Input';
import Button  from 'retail-ui/components/Button';

import Form from '../Form/Form';

import { ValidationContainer, ValidationWrapperV1 } from 'react-ui-validations';

import type {
    ContactInfo,
    ContactInfoValidationInfo,
    FormEditorProps,
} from '../../Domain/ContactInfo';

function FormEditor({ data, validationInfo, onChange }: FormEditorProps): React.Element<*> {
    return (
        <Form>
            <Form.Line title='Имя'>
                <ValidationWrapperV1 validationInfo={validationInfo.name}>
                    <Input
                        value={data.name}
                        onChange={(e, value) => onChange({ name: value })}
                    />
                </ValidationWrapperV1>
            </Form.Line>
            <Form.Line title='Email'>
                <ValidationWrapperV1 validationInfo={validationInfo.email}>
                    <Input
                        value={data.email}
                        onChange={(e, value) => onChange({ email: value })}
                    />
                </ValidationWrapperV1>
            </Form.Line>
        </Form>
    );
}

function validate(data: ContactInfo): ContactInfoValidationInfo {
    const result = {};
    if (data.name.split(' ').length !== 2) {
        result.name = { message: 'Имя должно состоять из двух слов' };
    }
    if (!data.email.includes('@')) {
        result.email = { message: 'Почта указана неверно' };
    }
    return result;
}

export default class OnBlurValidations extends React.Component {
    state = {
        data: {
            name: 'Иван Иванов',
            email: 'ivanov@mail.ru',
            phone: '',
            sex: null,
        },
    };

    handleSubmit() {

    }

    render(): React.Element<*> {
        return (
            <ValidationContainer>
                <div>
                    <h1>Валидации по потере фокуса</h1>
                    <FormEditor
                        data={this.state.data}
                        validationInfo={validate(this.state.data)}
                        onChange={update => this.setState({ data: { ...this.state.data, ...update } })}
                    />
                    <Form.ActionsBar>
                        <Button use='primary' onClick={() => this.handleSubmit()}>Сохранить</Button>
                    </Form.ActionsBar>
                </div>
            </ValidationContainer>
        );
    }
}
