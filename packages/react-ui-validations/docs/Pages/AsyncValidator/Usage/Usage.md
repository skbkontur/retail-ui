# Использование

Механизм описания асинхронных валидаций похож на [механизм описания синхронных валидаций](/#/object-validation), тем как описываются валидации, но отличается способом интеграции в react-компонент.

Механизм синхронных валидаций создает функцию валидации, которая мгновенно валидирует модель.
Поэтому валидацию модели можно производить непосредственно перед отрисовкой, прямо в методе `render` react-компонента.

Асинхронный механизм валидаций хранит в себе модель данных и вычисляет валидации по запросу.

## Интеграция

### Описание правил валидаций

Описание правил реализовано аналогично синхронному механизму.

    const validation = createValidation<{value: string}>(b => {
      b.prop(x => x.value, b => {
        b.invalid(async x => (await getFromServer(x)).isInvalid, 'message', 'lostfocus');
      });
    });

Метод `prop` прогружается до нужного узла контракта.
Метод `invalid` задает критерий невалидности для узла, сообщение об ошибке и тип валидации.
Критерий может быть асинхронной функцией.
Тип валидации `'immediate' | 'lostfocus' | 'submit'` является обязательным параметром.

### Инициализация валидатора

Метод `createValidation` создает набор правил валидации.
Затем с помощью метода `createValidator` создается валидатор.

    const handleChange = (callback: () => void): void => callback();
    const validator = validation.createValidator('initial value', handleChange);

Метод `createValidator` принимает аргументами начальное состояние валидируемой модели и обработчик изменения состояния валидаций.
Обработчик принимает аргументом колбэк.
Его вызов означет завершение обработки изменений валидации.

### Вычисление валидаций

Значение модели данных валидатора изменяется с помощью метода `setValue`

    validator.setValue({value: 'new value'});

Для валидации текущего значения модели нужно вызвать соответствующий метод.

    validator.immediate();
    validator.lostfocus();
    validator.submit();

### Получение объектов валидаций

Свойство `validator.reader` возвращает экземпляр `ValidationReader`.
Он предоставляет доступ к текущему состоянию валидации каждого узла модели.

    const validationReader = validator.reader;
    const validationInfo = validationReader.getNode(x => x.value).get();
    // => { loading: true }
    // => { level: 'error', type: 'lostfocus', message: '...' }

Интерфейс вазаимодействия, такой же как в синхронном варианте.
Метод `getNode` осуществляет прогрузку до узла.
Метод `get` возвращает объект типа `ValidationInfo`.
Если узел находится в процессе расчета валидации, то в объект `ValidationInfo` свйоство `loading` будет иметь значение `true`.

## Мгновенная валидация

Мгновенная валидация запускается методом `validator.immediate()`.
Вычисление валидаций запустится, если модель данных изменилась после последнего вычисления валидации.

    const validation = createValidation<string>(b => {
      b.invalid(x => isInvalid(x), '...', 'immediate');
    });

    validator = validation.createValidator(/*...*/);

    componentDidUpdate() {
      this.validator.setValue(this.state.value);
      this.validator.immediate();
    }

    <ValidationWrapperV1 validationInfo={this.validator.reader.get()}>
      //...
    </ValidationWrapperV1>

### Пример

    !!DemoWithCode!!./ImmediateValidation

## Валидация по потере фокуса

Валидация по потере фокуса запускается методом `validator.lostfocus()`.
Вычисление валидаций запустится, если модель данных изменилась после последнего вычисления валидации, либо если последний раз валидация вычислялась методом `immidiate()`.
Валидацию по потере фокуса можно запускать на `onBlur` каждого из контролов формы.

    const validation = createValidation<string>(b => {
      b.invalid(x => isInvalid(x), '...', 'lostfocus');
    });

    validator = validation.createValidator(/*...*/);

    componentDidUpdate() {
      this.validator.setValue(this.state.value);
    }

    <ValidationWrapperV1 validationInfo={this.validator.reader.get()}>
      <Input
        onBlur={() => this.validator.lostfocus()}
        //...
      />
    </ValidationWrapperV1>

### Пример

    !!DemoWithCode!!./LostfocusValidation

## Валидация по отправке формы

Валидация по отправке формы запускается методом `validator.submit()`.
Вычисление валидаций запускается безусловно.

    const validation = createValidation<string>(b => {
      b.invalid(x => isInvalid(x), '...', 'submit');
    });

    validator = validation.createValidator(/*...*/);

    componentDidUpdate() {
      this.validator.setValue(this.state.value);
    }

    <ValidationContainer ref={this.container}>
      <ValidationWrapperV1 validationInfo={this.validator.reader.get()}>
        //...
      </ValidationWrapperV1>
    </ValidationContainer>

    <Button onClick={this.handleSubmit}>Submit</Button>

    handleSubmit = async () => {
      const validate = (): Promise<boolean> => this.container.validate();
      const isValid: boolean = await this.validator.submit(validate);
    };

Метод `container.validate()` отображает валидацию на форме и возвращает результат валидации формы.
Метод `validator.submit(...)` вызовет функцию `validate` после валидации модели и вернет результат ее выполнения.

### Пример

    !!DemoWithCode!!./SubmitValidation

//todo

- local
- схлопывание onChange
- extra
- принудительное валидироваие // Расчет валидации можно запустить безусловно. Для этого нужно передать в метод валидации объект с флагом `force` установленным в занчение `true`.

//todo

- добавить на валидотор свойство submitInProgress
- тултип рано исчезает
- результат функции валидации: boolean | React.ReactNode | {message: React.ReactNode, level?: Nullable<ValidationLevel>};
