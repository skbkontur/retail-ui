# Виды валидаций

[Описание видов валидаций в Контур.Гайдах](https://guides.kontur.ru/principles/validation/#Vidi_validatsii).

По умолчанию все валидации [зависимы](#/dependent-validation). Но их можно сделать [независимыми]
(#/independent-validation) свойством `independent`.

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
