# Виды валидаций

[Описание видов валидаций в Контур.Гайдах](https://guides.kontur.ru/principles/validation/#Vidi_validatsii)

Вид валидации задается с помощью свойства `type` в объекте `validationInfo`.

    <ValidationWrapper validationInfo={{type: "...", message: "..."}}>
      //...
    </ValidationWrapper>

Допустимые значения: `"immediate" | "lostfocus" | "submit"`.

## Мгновенная

Мгновенная валидация отображается всегда.

    <ValidationWrapper validationInfo={{type: "immediate", message: "..."}}>
      //...
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./ImmediateValidation

## По потере фокуса

Валидация по потере фокуса отображается, когда контрол находится не в фокусе.

    <ValidationWrapper validationInfo={{type: "lostfocus", message: "..."}}>
      //...
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./LostfocusValidation


### Валидации на других элементах тоже будут вызваны

Подробнее - [зависимые валидации](#/dependent-validation)

    !!DemoWithCode!!./LostfocusDependentValidation

## По потере фокуса одного элемента

Валидация отображается только для элемента, который потерял фокус.

    <ValidationWrapper validationInfo={{type: "selflostfocus", message: "..."}}>
      //...
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./SelflostfocusValidation

## По отправке формы

Валидация по отправке формы отображается при вызове метода `submit` на компоненте `ValidationContainer`.

    <ValidationContainer ref={this.container}>
      <ValidationWrapper validationInfo={{type: "submit", message: "..."}}>
        //...
      </ValidationWrapper>
    </ValidationContainer>

    <Button onClick={this.handleSubmit}>
      Submit
    </Button>

    handleSubmit = async () => {
      await this.container.current.submit();
    }

### Пример

    !!DemoWithCode!!./SubmitValidation
