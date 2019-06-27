# Порядок выполнения

У одного узла могут быть все три типа валидации и может быть несколько валидаций одного типа.

    const validation = createValidation<string>(b => {
      b.invalid(async x => !/^\d*$/.test(x), 'Только цифры', 'immediate');
      b.invalid(async x => x.length > 3, 'Не больше трех цифр', 'lostfocus');
      b.invalid(async x => !x, 'Укажите номер', 'submit');
    });

    validator = validation.createValidator(/*...*/);

Валидации всегда применяются последовательно, в том порядке, в котором они описаны.
Некоторые валидации могут быть проигнорированы, в зависимости от вызываемого метода валидации.

- Метод `validator.immediate()` учитывает только валидации с типом `'immediate'`.
- Метод `validator.lostfocus()` учитывает только валидации с типами `'immediate'` и `'lostfocus'`.
- Метод `validator.submit()` учитывает валидации с любым типом: `'immediate'`, `'lostfocus'` и `'submit'`.

Вызов метода валидаци не всегда будет запускать расчет валидации.

- Метод `validator.immediate()` запускает расчет, только если данные в модели отличаются от данных, для которых последний раз запускался расчет валидации.
- Метод `validator.lostfocus()` запускает расчет, если данные в модели отличаются от данных, для которых последний раз запускался расчет валидации или если предыдущий расчет валидации был запущен методом `validator.immediate()`.
- Метод `validator.submit()` запускает расчет безусловно.

### Пример

    !!DemoWithCode!!./ExecutionOrder

## Проверка submit перед lostfocus

Валидировать поля на заполненонсть рекумендуется по отправке формы.
Но иногда проверку на наличие значения удобно сделать первой, чтобы предотвратить последующие проверки.

    const validation = createValidation<string>(b => {
      b.invalid(x => !x, 'Укажите номер', 'submit', {lostfocus: true});
      b.invalid(x => x.length === 3, 'Не больше трех цифр', 'lostfocus');
    });

Правилу с типом `submit` передается объект опций `{lostfocus: true}`.
Поэтому оно будет учтено при валидации методом `validator.lostfocus()`.
Функция валидации выполнится, но информация о валидаци не сохранится.

### Пример

    !!DemoWithCode!!./SubmitBeforeLostfocus

## Пропуск lostfocus на submit

При валидации по отправке формы можно иключить правила с типами `immediate` и `lostfocus`.

    const validation = createValidation<string, unknown, boolean>(b => {
      b.invalid(x => x.length > 3, 'Максимум три знака', 'lostfocus', { submit: false });
      b.submitted(x => !x, 'Server: Максимум три знака');
    });

Правилу с типом `lostfocus` передается объект опций `{ submit: false }`.
Поэтому оно будет проигнорировано при валидации методом `validator.submit()`.
Такое поведение может потребоваться, когда данные формы будут провалидированы на сервере во время их обработки.

### Пример

    !!DemoWithCode!!./IgnoreLostfocusOnSubmit
