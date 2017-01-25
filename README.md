# react-ui-validations

Набор компонентов, реализующих поведение валидаций по контур-гайдам.

## Установка

```
npm install --save react-ui-validations
```

## Использование

```
/.../
import {ValidationContainer, ValidationWrapperV1} from 'react-ui-validations';
 
export default class MyAwesomeComponent extends React.Component {
  render() {
    return (
      <ValidationContainer>
        <ValidationWrapperV1 validationInfo={{error: true, message: "Wrong!"}}>
          <Input value="Right?"/>
        </ValidationWrapperV1>
      </ValidationContainer>
    );
  }
}
```