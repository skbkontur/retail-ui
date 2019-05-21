# Начало работы

[![Version](https://img.shields.io/badge/npm-${process.env.libraryVersionEscaped}-orange.svg?style=flat-square)](https://www.npmjs.com/package/react-ui-validations)

Исходный код [на GitHub](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations).

Библиотека реализует поведение [валидаций по Контур.Гайдам](https://guides.kontur.ru/principles/validation/).

Библиотека совместима с контролами из библиотеки [retail-ui](https://tech.skbkontur.ru/react-ui/).

## Установка

    npm install --save react-ui-validations

## Использование

Для отображения валидаций используется два компонента `ValidationWrapperV1` и `ValidationContainer`.
Компонент `ValidationWrapperV1` оборачивает контрол, для которого должна отобразиться валидация.
Компонент `ValidationContainer` оборачивает всю валидируемую форму, внутри которой используются компоненты `ValidationWrapperV1`.

    <ValidationContainer>
      //...
        <ValidationWrapperV1 validationInfo={...}>
          <Input/>
        </ValidationWrapperV1>
      //...
    </ValidationContainer>

Значение валидации задается через проп `validationInfo` компонента `ValidationWrapperV1`.

Невалидное состояние задается объектом валидации `validationInfo={{message: "..."}}`.
Поле `message` имеет тип ReactNode, то есть в него можно передать строку, React-компонент и т.п.

    <ValidationWrapperV1 validationInfo={{message: <b>Ошибка</b>}}>
      <Input/>
    </ValidationWrapperV1>

Валидное состояние задается значением `validationInfo={null}`.

    <ValidationWrapperV1 validationInfo={null}>
      <Input/>
    </ValidationWrapperV1>

### Пример

    !!DemoWithCode!!./StaticValidation

Обычно валидация вычисляется динамически по текущему значению контрола.
Для корректоного отображения нужно передавать всегда актуальное состояние валидации.
Компонент `ValidationWrapperV1` сам в соответствии с Контур.Гайдами принимает решение, когда подсветить котрол и отобразить сообщение об ошибке.

    const value = this.state.value;
    const validationInfo = !isValid(value) ? {message: "Error"} : null;

    <ValidationWrapperV1 validationInfo={validationInfo}>
      <Input value={value} />
    </ValidationWrapperV1>

### Пример

    !!DemoWithCode!!./ConditionalValidation
