# Виды валидаций

[Описание видов валидаций в Контур.Гайдах](https://guides.kontur.ru/principles/validation/#Vidi_validatsii)

Вид валидации задается с помощью свойства `type` в объекте `validationInfo`.

    <ValidationWrapperV1 validationInfo={{type: "...", message: "..."}}>
      //...
    </ValidationWrapperV1>

Допустимые значения: `"immediate" | "lostfocus" | "submit"`.

## Мгновенная

Мгновенная валидация отображается всегда.

    <ValidationWrapperV1 validationInfo={{type: "immediate", message: "..."}}>
      //...
    </ValidationWrapperV1>

### Пример

    !!DemoWithCode!!./ImmediateValidation

## По потере фокуса

Валидация по потере фокуса отображается, когда контрол находится не в фокусе.

    <ValidationWrapperV1 validationInfo={{type: "lostfocus", message: "..."}}>
      //...
    </ValidationWrapperV1>

### Пример

    !!DemoWithCode!!./LostfocusValidation

## По отправке формы

Валидация по отправке формы отображается при вызове метода `submit` на компоненте `ValidationContainer`.

    <ValidationContainer ref={this.container}>
      <ValidationWrapperV1 validationInfo={{type: "submit", message: "..."}}>
        //...
      </ValidationWrapperV1>
    </ValidationContainer>

    <Button onClick={this.handleSubmit}>
      Submit
    </Button>

    handleSubmit = async () => {
      await this.container.current.submit();
    }

### Пример

    !!DemoWithCode!!./SubmitValidation
