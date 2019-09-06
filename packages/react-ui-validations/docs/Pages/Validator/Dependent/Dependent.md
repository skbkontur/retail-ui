# Зависимые валидации

Валидация поля может зависить от значений других полей модели.
Например, значение `value` должно состоять только из цифр, если флаг `onlyDigits` установлен в значение `true`.

    interface Data {
      onlyDigits: boolean;
      value: string;
    }

    const validate = createValidator<Data>((b, root) => {
      b.prop(x => x.value, b => {
        b.invalid(x => root.onlyDigits && !/^\d*$/.test(x), "Только цифры");
      });
    });

Вторым аргументом правила валидации узла можно получить значение узла.

    const validate = createValidator<Data>((b, root) => {
      b.prop(x => x.value, (b, v) => {
        //...
      });
    });

Так в аргументе `root` будет вся модель, а в аргументе `v` значение узла `value`.
Значения аргументов `root` и `v` можно использовать в критерии валидации, для формирования текста ошибки и для вычисления типа валидации.
Аналогично в правиле конфигурирования элемента массива можно получить значение текущего элемента, его индекс и сам массив.

    const validate = createValidator<string[]>(b => {
      b.array(x => x, (b, value, index, array) => {
        //...
      });
    });

### Пример

    !!DemoWithCode!!./Dependent
