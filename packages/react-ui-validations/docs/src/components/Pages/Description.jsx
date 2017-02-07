// @flow
import React from 'react';
import Code from 'react-syntax-highlighter';
import cn from './Pages.less';

export default class Description extends React.Component {
    printVersion(): React.Element<*> | null {
        if (process.env.libraryVersion) {
            return (
                <span className={cn('version')}> {process.env.libraryVersion}</span>
            );
        }
        return null;
    }

    getLinkToBadge() {
        if (process.env.libraryVersion) {
            return `https://img.shields.io/travis/skbkontur/react-ui-validations/${process.env.libraryVersion}.svg?maxAge=300&style=flat-square`;
        }
        return 'https://img.shields.io/travis/skbkontur/react-ui-validations.svg?maxAge=300&style=flat-square';
    }

    render(): React.Element<*> {
        return (
            <div>
                <h1>
                    react-ui-validations{this.printVersion()} (WIP)
                    {' '}
                    <a href='https://travis-ci.org/skbkontur/react-ui-validations'>
                        <img src={this.getLinkToBadge()} />
                    </a>
                </h1>
                <p>
                    Набор компонентов, реализующих поведение <a href='https://guides.kontur.ru/principles/validation/'>валидаций по контур-гайдам</a>.
                </p>
                <h2>Установка и использование</h2>
                <Code language='bash'>npm install --save react-ui-validations</Code>
                <Code language='javascript'>
{`import {ValidationContainer, ValidationWrapperV1} from 'react-ui-validations';

export default class MyAwesomeComponent extends React.Component {
    render() {
        return (
            <ValidationContainer>
                <ValidationWrapperV1 validationInfo={{error: true, message: "Wrong!"}}>
                    <Input value="Right?" />
                </ValidationWrapperV1>
            </ValidationContainer>
        );
    }
}`}
                </Code>
                <h2>Основные задачи</h2>
                <ul>
                    <li>Реализация <em>поведения</em> описанного в контур.гайдах.</li>
                    <li>Упрощение использования совместно в библиотекой retail-ui.</li>
                    <li>
                        <strike>Реализация универсальной библиотеки валидаций.</strike>
                    </li>
                </ul>
                <h2>Как это работает</h2>
                <p>
                    Библиотека не содержит никаких упрощающих создание валидаций функций.
                    Библиотека реализует только функциональность, ответственную за принятие решений о том,
                    когда и как показывать валидацию.
                </p>
                <p>
                    Поскольку контролы должны взаимодействовать между собой область используется механизм работы
                    через контекст (https://facebook.github.io/react/docs/context.html#parent-child-coupling).
                </p>
            </div>
        );
    }
}
