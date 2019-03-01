# react-ui-validations

[![Travis](https://img.shields.io/travis/skbkontur/react-ui-validations.svg?maxAge=300&style=flat-square)](https://travis-ci.org/skbkontur/react-ui-validations) [![npm](https://img.shields.io/npm/v/react-ui-validations.svg?maxAge=300&style=flat-square)](https://www.npmjs.com/package/react-ui-validations)

Набор компонентов, реализующих поведение [валидаций по контур-гайдам](https://guides.kontur.ru/principles/validation/).

## Документация

- [Docs & Demos](http://tech.skbkontur.ru/react-ui-validations/)
- [Validation guides](https://guides.kontur.ru/principles/validation/)

## Использование

```
npm install --save react-ui-validations
```

```
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
```

## Запуск примеров

```
git clone git@github.com:skbkontur/react-ui-validations.git
cd react-ui-validations
npm install
cd docs
npm install
npm start
```
