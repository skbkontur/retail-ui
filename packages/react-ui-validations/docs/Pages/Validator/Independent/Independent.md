# Независимые валидации

Зависимость валидаций может мешать, когда несколько полей имеют одинаковый шаблон проверки.
Например, поля проверяются на пустое значение (Гайдами такое поведение [не рекомендуется](https://guides.kontur.
ru/principles/validation/#09)).

Или, у полей одинаковый паттерн валидации, и это черновик. Т.е. пользователь уже вводил в этой форме данные, но не 
закончил. И вы не хотите сразу валидировать все поля:

    const validate = (value: string): Nullable<ValidationInfo> => {
      if (!/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(value))
        return { message: 'Неправильный номер', type: 'lostfocus' };
      return null;
    };

По умолчанию, потеря фокуса на одном поле вызовет валидацию и на другом.

### Пример

    !!DemoWithCode!!./LostfocusDependentErrorValidation

Чтобы это исправить укажите независимость валидации свойством `independent` в объекте `validationInfo`:

    const validate = (value: string): Nullable<ValidationInfo> => {
      if (!/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(value))
        return { message: 'Неправильный номер', type: 'lostfocus', independent: true };
      return null;
    };

### Пример

    !!DemoWithCode!!./LostfocusDependentErrorFixedValidation

В одной форме могут быть и зависимые и независимые валидации:

### Пример с пустыми значениями

    !!DemoWithCode!!./IndependentCompare
