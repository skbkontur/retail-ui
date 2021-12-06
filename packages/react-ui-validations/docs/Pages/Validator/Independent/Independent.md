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
