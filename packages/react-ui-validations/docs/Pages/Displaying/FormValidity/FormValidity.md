# Валидность формы

Чтобы провалидировать форму и узнать результат валидации, нужно вызвать метод `validate` на компоненте `ValidationContainer`.
Метод `validate` асинхронный, возвращает `Promise<boolean>`.

    <ValidationContainer ref={this.сontainer}>
      //...
    </ValidationContainer>

    <Button use={'primary'} onClick={this.handleSubmit}>Submit</Button>

    handleSubmit = async () => {
      const isValid = await this.container.validate();
      //...
    };

### Пример

    !!DemoWithCode!!./FormValidity
