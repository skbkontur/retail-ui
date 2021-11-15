# Независимые валидации

По умолчанию все [валидации зависимы](#/dependent-validation). Но бывают случаи, когда такое поведение мешает.

Например, несколько полей проверяются на пустое значение, и тип валидации - `lostfocus`:

    interface Data {
      name: string;
      lastname: string;
    }

    private validate = (value: string): Nullable<ValidationInfo> => {
      if (!value)
        return { message: 'Не должно быть пустым', type: 'lostfocus' };
      return null;
    };

В таком случае, потеря фокуса на одном поле вызывает валидацию и на другом.

### Пример

    !!DemoWithCode!!./LostfocusDependentErrorValidation

Чтобы это исправить укажите независимость валидации свойством `independent` в объекте `validationInfo`:

    private validate = (value: string): Nullable<ValidationInfo> => {
      if (!value)
        return { message: 'Не должно быть пустым', type: 'lostfocus', independent: true };
      return null;
    };

### Пример

    !!DemoWithCode!!./LostfocusDependentErrorFixedValidation

В одной форме могут быть и зависимые и независимые валидации:

### Пример с `lostfocus`

    !!DemoWithCode!!./IndependentCompare

Методы `validate()` и `submit()` по-умолчанию валидируют все поля.
Чтобы исключить независимые поля надо вторым аргументом `withoutIndependent` передать `true`.

Первый аргумент `withoutFocus` по умолчанию `false`

    // validate(withoutFocus = false, withoutIndependent = false)
    this.container.validate(false, true);

    // submit(withoutFocus = false, withoutIndependent = false)
    await this.container.submit(false, true);

Если у независимого поля уже отображается валидация, то оно будет учитываться в любом случае.
Также, аргумент `withoutIndependent` будет игнорироваться для типа валидации `submit`.


### Пример с `submit`

    !!DemoWithCode!!./IndependentSubmit

