// @flow
import React from 'react';
import Helmet from 'react-helmet';
import Code from 'react-syntax-highlighter';
import Demo from '../../../Demo';
import Example from './Example';
import ExampleSource from '!raw-loader!./Example';

export default class OnBlurValidations extends React.Component {
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
                <Helmet title='Валидации по потере фокуса' />
                <h1>Валидации по потере фокуса</h1>
                <p>
                    Описание того какие есть валидации на форме
                </p>
                <p>Ожидаемое поведение:</p>
                <ul>
                    <li>Потеря фокуса</li>
                    <li>Нажатие субмита</li>
                    <li>Наведение на валидацию</li>
                    <li>Блюр с невалидного поля</li>
                    <li>Фокус на первом невалидном</li>
                    <li>Только два тултипа</li>
                    <li>Рекваед валидация срабатывает только по субмиту</li>
                </ul>
                <Demo>
                    <Example />
                </Demo>
                <Code language='javascript'>
                    {ExampleSource}
                </Code>
            </div>
        );
    }
}
