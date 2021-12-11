# Независимые валидации

По-умолчанию все валидации [зависимые](#/dependent-validation). Потеря фокуса у поля с любым типом валидации вызывает валидации у всех полей с типом `lostfocus` внутри `ValidationContainer`.

Но, если проверять поля на пустое значение, то при потере фокуса на одном поле - подсветятся все.

    const validate = (value: string): Nullable<ValidationInfo> => {
      if (!value)
        return { message: 'Не должно быть пустым', type: 'lostfocus' };
      return null;
    };

### Пример

    !!DemoWithCode!!./LostfocusDependent

Гайдами проверка на пустое значение по `lostfocus` [**не рекомендуется**⛔](https://guides.kontur.ru/principles/validation/#09).

Тем не менее, валидации типа `lostfocus` можно сделать независимыми.
Такие поля будут валидироваться только при потере собственного фокуса. И не будут вызывать валидации у других полей с типом `lostfocus`.

Для этого укажите независимость валидации свойством `independent` в объекте `validationInfo`:

    const validate = (value: string): Nullable<ValidationInfo> => {
      if (!value)
        return { message: 'Неправильный номер', type: 'lostfocus', independent: true };
      return null;
    };

    // Валидация объекта
    const validateObject = createValidator((b) => {
      b.prop(
        (x) => x.value,
        (b) => {
          b.invalid((x) => !x, {
            message: 'Не должно быть пустым',
            type: 'lostfocus',
            independent: true,
          });
        },
      );
    });


### Пример

    !!DemoWithCode!!./LostfocusIndependent

### Зависимые и независимые валидации в одной форме

    !!DemoWithCode!!./Mixture
