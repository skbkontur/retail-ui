# Отправка формы

Валидация по отправке формы может состоять из двух частей: проверка данных до отправки отправки и проверка данных на сервере во время их обработки.
Валидация данных до отправки была рассмотрена ранее.
Она задается с помощью метода `invalid` с типом валидации `submit`.

    const validation = createValidation<string>(b => {
      b.invalid(x => !x 'Укажите значение', 'submit');
    });

Вычисление валидации на основе ответа отправки данных на сервер задается с помощью метода `submitted`.

    interface SubmitResult {
      invalidFormat: boolean;
    }

    const validation = createValidation<string, unknown, SubmitResult>(b => {
      b.invalid(x => !x 'Укажите значение', 'submit');
      b.submitted(x => x.invalidFormat, 'Неверный формат');
    });

    validator = validation.createValidator(/*...*/);

    <ValidationContainer ref={this.refContainer}>
      //...
    </ValidationContainer>

    <Button onClick={this.handleSubmit}>Submit</Button>

    handleSubmit = () => {
      const submitToServer = (): Promise<SubmitResult> => submitToServer(this.state.value);
      const validate = (): Promise<boolean> => this.container.validate();
      const isValid: boolean = await this.validator.submit(validate, submitToServer);
    }

Метод `submitted` задает фугкцию валидации и сообщение об ошибке.
Тип аргумента функции валидации задаетс третьим generic-аргументом функции `createValidation`.

    const validation = createValidation<string, unknown, SubmitResult>(b => {
      b.submitted(x => x.invalidFormat, 'Неверный формат');
    });

Локальная функция `submitToServer` отправляет данные на сервер и возвращает контракт данных типа `SubmitResult`.

    const submitToServer = (): Promise<SubmitResult> => submitToServer(this.state.value);

Локальная функция `validate` отображает валидации внутри компонента `ValidationContainer`.
Функция возвращает результат валидации формы.

    const validate = (): Promise<boolean> => this.container.validate();

Метод `validator.submit(...)` запускает вычисление клиентсвкой валидации, отображение валидаций и отправку данных на сервер.

    const isValid: boolean = await this.validator.submit(validate, submitToServer);

Алгоритм работы метода `validator.submit(...)`:

1. Валидатор вычисляет клиентскую валидацию, описанную в методах `b.invalid(...)`
1. Вызывается колбэк изменения валидации - происходит перерисовка компонента
1. Вызывается метод `container.validate()` - подсвечиваются все невалидные контролы
1. Если форма валидна, то вызывается функция `submitToServer` - данные отправляются на сервер
  1. Результат колбэка `submitToServer` обрабатывается правилами валидатора `b.submitted(...)`
  1. Вызывается колбэк изменения валидации - происходит перерисовка компонента
  1. Вызывается метод `container.validate()` - подсвечиваются все невалидные контролы
1. Метод `validator.submit` возвращает результат последнего вызова метода `container.validate()`

### Пример

    !!DemoWithCode!!./Submit
