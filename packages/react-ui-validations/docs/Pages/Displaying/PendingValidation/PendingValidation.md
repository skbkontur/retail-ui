# Ожидание валидаций

Валидация может вычисляться асинхронно.
Во время вычисления состояние валидации неизвестно.

    <ValidationWrapper validationInfo={{pending: true}}>
      //...
    </ValidationWrapper>

Для

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
