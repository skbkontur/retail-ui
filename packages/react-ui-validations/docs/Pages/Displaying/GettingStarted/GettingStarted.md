# Начало работы

[![Version](https://img.shields.io/badge/npm-${process.env.libraryVersionEscaped}-orange.svg?style=flat-square)](https://www.npmjs.com/package/react-ui-validations)

Исходный код [на GitHub](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations).

Библиотека реализует поведение валидаций форм и отображение найденных ошибок описанное в [Контур.Гайдах](https://guides.kontur.ru/principles/validation/).

Библиотека совместима с контролами из библиотеки [React UI](https://tech.skbkontur.ru/react-ui/).

## Установка

    npm install --save @skbkontur/react-ui-validations

## Использование

Для отображения валидаций используется два компонента `ValidationWrapper` и `ValidationContainer`.
Компонент `ValidationWrapper` оборачивает контрол, для которого должна отобразиться валидация.
Компонент `ValidationContainer` оборачивает всю валидируемую форму, внутри которой используются компоненты `ValidationWrapper`.

    <ValidationContainer>
      //...
      <ValidationWrapper validationInfo={...}>
        <Input/>
      </ValidationWrapper>
      //...
    </ValidationContainer>

Значение валидации задается через проп `validationInfo` компонента `ValidationWrapper`.
Для обратной совместимости компонент `ValidationWrapper` дополнительно экспортируется как `ValidationWrapperV1`.

Невалидное состояние задается объектом валидации `validationInfo={{message: "..."}}`.
Поле `message` имеет тип ReactNode, то есть в него можно передать строку, React-компонент и т.п.

    <ValidationWrapper validationInfo={{message: <b>Ошибка</b>}}>
      <Input/>
    </ValidationWrapper>

Валидное состояние задается значением `validationInfo={null}`.

    <ValidationWrapper validationInfo={null}>
      <Input/>
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./StaticValidation

Обычно валидация вычисляется динамически по текущему значению контрола.
Для корректоного отображения нужно передавать всегда актуальное состояние валидации.
Компонент `ValidationWrapper` сам в соответствии с Контур.Гайдами принимает решение, когда подсветить котрол и отобразить сообщение об ошибке.

    const value = this.state.value;
    const validationInfo = !isValid(value) ? {message: "Error"} : null;

    <ValidationWrapper validationInfo={validationInfo}>
      <Input value={value} />
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./ConditionalValidation
