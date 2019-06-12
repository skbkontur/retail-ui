# Переиспользуемые валидации

Описание валидации может повторяться на одной форме ввода или на разных.
Оно может быть сложным или большим по объему кода.
Тогда выражение валидации можно выделить в самостоятельную функцию.
Функцию можно протестировать и переиспользовать.

Для валидации e-mail можно выделить функцию `isValidEmail`.
Она может быть использована не только в UI-валидациях.

    const isValidEmail = (value: string): boolean => {
      return /^[a-z]+@[a-z]+\.[a-z]+$/.test(value);
    };

    const validate = createValidator<string>(b => {
      b.invalid(x => !x, "Укажите email", "submit");
      b.invalid(x => !isValidEmail(x), "Неверный формат email");
    });

Можно выделить каждую валидацию в отдельный метод.

    const emailRequired = (b: ValidationBuilder<unknown, string>): void => {
      b.invalid(x => !x, "Укажите email", "submit");
    };

    const emailFormat = (b: ValidationBuilder<unknown, string>): void => {
      b.invalid(x => !/^[a-z]+@[a-z]+\.[a-z]+$/.test(x), "Неверный формат email");
    };

    const validate = createValidator<string>(b => {
      emailRequired(b);
      emailFormat(b);
    });

Поле e-mail может присутствовать в разных формах ввода, но с одним набором валидаций.
Можно выделить все правило конфигурирования узла в отдельную функцию-правило.

    const validateEmail: ValidationRule<unknown, string> = b => {
      b.invalid(x => !x, "Укажите email", "submit");
      b.invalid(x => !/^[a-z]+@[a-z]+\.[a-z]+$/.test(x), "Неверный формат email");
    };

    const validate = createValidator<string>(validateEmail);

В выделяемые функции можно добавлять параметры для изменения их поведения.

    const validateEmail = (b: ValidationBuilder<unknown, string>, required: boolean): void => {
      b.invalid(x => required && !x, "Укажите email", "submit");
      b.invalid(x => !/^[a-z]+@[a-z]+\.[a-z]+$/.test(x), "Неверный формат email");
    };

    const validate = createValidator<string>(b => {
      validateEmail(b, true);
    });

Не стоит сразу же выделять валидации в отдельные функции.
Написание валидаций по месту делает их более наглядными.
В приведенном примере выделение функций с правилами не имеет смысла.
Это сделано исключительно в демонстрационных целях.

### Пример

    !!DemoWithCode!!./Reusable
