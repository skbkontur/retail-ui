# react-ui-validations

[![npm](https://img.shields.io/npm/v/react-ui-validations.svg?maxAge=300&style=flat-square)](https://www.npmjs.com/package/react-ui-validations)

Набор компонентов, реализующих поведение [валидаций по контур-гайдам](https://guides.kontur.ru/principles/validation/).

## Документация

- [Docs & Demos](http://tech.skbkontur.ru/react-ui-validations/)
- [Validation guides](https://guides.kontur.ru/principles/validation/)

## Использование

```shell
npm install --save react-ui-validations
```

```jsx
import { ValidationContainer, ValidationWrapperV1 } from 'react-ui-validations';

export default class DataEditor extends React.Component {
  // ...
  render() {
    return (
      <ValidationContainer>
        <ValidationWrapperV1
          validationInfo={/\d+/.test(phone) ? { message: 'Телефон должен состоять только из цифр' } : null}
        >
          <Input value={phone} onChange={value => setState({ phone: value })} />
        </ValidationWrapperV1>
      </ValidationContainer>
    );
  }
}
```

## Запуск примеров

```shell
yarn start:docs
```
