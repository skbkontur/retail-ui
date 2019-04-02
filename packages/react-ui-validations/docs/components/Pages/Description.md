# react-ui-validations

[![Version](https://img.shields.io/badge/npm-${process.env.libraryVersionEscaped}-orange.svg?style=flat-square)](https://www.npmjs.com/package/react-ui-validations)

Исходный код: [на GitHub'е](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations).

Набор компонентов, реализующих поведение [валидаций по контур-гайдам](https://guides.kontur.ru/principles/validation/).

## Установка и использование

    npm install --save react-ui-validations

Пример использования:

    import { ValidationContainer, ValidationWrapperV1 } from 'react-ui-validations';

    export default class DataEditor extends React.Component {
        // ...
        render() {
            return (
                <ValidationContainer>
                    <ValidationWrapperV1
                        validationInfo={/\d+/.test(phone)
                            ? { message: 'Телефон должен состоять только из цифр' }
                            : null}>
                        <Input
                            value={phone}
                            onChange={value => setState({ phone: value })}
                        />
                    </ValidationWrapperV1>
                </ValidationContainer>
            );
        }
    }

## Основные задачи

- Реализация _поведения_ описанного в контур.гайдах.
- Упрощение использования совместно с библиотекой retail-ui.

## Как это работает

Библиотека не содержит никаких упрощающих создание валидаций функций и реализует только
функциональность, ответственную за принятие решений о том,
когда и как показывать валидацию.

Поскольку контролы должны взаимодействовать между собой, используется механизм работы
[через контекст](https://facebook.github.io/react/docs/context.html#parent-child-coupling).
