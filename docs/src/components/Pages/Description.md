# react-ui-validations (WIP) 
## Version: ${process.env.libraryVersion} [![Travis](https://img.shields.io/travis/skbkontur/react-ui-validations/${process.env.libraryVersion}.svg?maxAge=300&style=flat-square)](https://travis-ci.org/skbkontur/react-ui-validations)

Sources: https://github.com/skbkontur/react-ui-validations

Набор компонентов, реализующих поведение [валидаций по контур-гайдам](https://guides.kontur.ru/principles/validation/).
                
## Установка и использование

    npm install --save react-ui-validations

Пример использования:

    import {ValidationContainer, ValidationWrapperV1} from 'react-ui-validations';

    export default class MyAwesomeComponent extends React.Component {
        render() {
            return (
                <ValidationContainer>
                    <ValidationWrapperV1 validationInfo={{ message: "Wrong!" }}>
                        <Input value="Right?" />
                    </ValidationWrapperV1>
                </ValidationContainer>
            );
        }
    }

## Основные задачи

* Реализация *поведения* описанного в контур.гайдах.
* Упрощение использования совместно в библиотекой retail-ui.

## Как это работает

Библиотека не содержит никаких упрощающих создание валидаций функций и реализует только 
функциональность, ответственную за принятие решений о том,
когда и как показывать валидацию.

Поскольку контролы должны взаимодействовать между собой, область используется механизм работы
[через контекст](https://facebook.github.io/react/docs/context.html#parent-child-coupling).
