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

Чтобы это исправить, надо явно указать незивисимость валидации свойством `independent` в объекте `validationInfo`:

    private validate = (value: string): Nullable<ValidationInfo> => {
      if (!value)
        return { message: 'Не должно быть пустым', type: 'lostfocus', independent: true };
      return null;
    };

### Пример

    !!DemoWithCode!!./LostfocusDependentErrorFixedValidation

Однако, по умолчанию, при вызове методов `validate()` или `submit()`, будут валидироваться все поле.
Чтобы игнорировать независимые поля надо вторым аргументом `withoutIndependent` передать `true`.

Первый аргумент `withoutFocus` по умолчанию `false`

    this.container.validate(false, true);

    await this.container.submit(false, true);

Если у независимого поля уже отображается валидация, то оно будет учитываться в любом случае.
Также, аргумент `withoutIndependent` будет игнорироваться для типа валидации `submit`.

### Пример

    !!DemoWithCode!!./Independent
