# react-ui-validations

[![Travis](https://img.shields.io/travis/skbkontur/react-ui-validations.svg?maxAge=300&style=flat-square)](https://travis-ci.org/skbkontur/react-ui-validations) [![npm](https://img.shields.io/npm/v/react-ui-validations.svg?maxAge=300&style=flat)](https://www.npmjs.com/package/react-ui-validations)

Набор компонентов, реализующих поведение [валидаций по контур-гайдам](https://guides.kontur.ru/principles/validation/).

## Документация

* [Docs & Demos](http://tech.skbkontur.ru/react-ui-validations/)
* [Validation guides](https://guides.kontur.ru/principles/validation/)

## Использование

```
npm install --save react-ui-validations
```

```
import {ValidationContainer, ValidationWrapperV1} from 'react-ui-validations';
 
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
}
```