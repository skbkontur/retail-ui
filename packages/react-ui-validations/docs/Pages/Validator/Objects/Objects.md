# Валидация объектов

Контракт валидируемой фомы может состоять из нескольких полей, иметь вложенные объекты и массивы.
У одного поля может быть несколько валидаций, а сами валидации могут зависеть от нескольких полей.
В таких случаях описание валидаций может стать громоздким и трудно поддерживаемым.

Validator позволяет декларативно описать все валидации на модели.
Гарантирует правильный порядок их выполнения.
Описание наглядно, а код типизирован.

## Плоский объект

### Описание правил валидаций

    interface ContactInfo {
      name: string;
      email: string;
    }

    const validate = createValidator<ContactInfo>(b => {
      b.prop(x => x.name, b => {
        b.invalid(x => !x, "Укажите имя", "submit");
      });
      b.prop(x => x.email, b => {
        b.invalid(x => !x, "Укажите email", "submit");
        b.invalid(x => !/^[a-z]+@[a-z]+\.[a-z]+$/.test(x), "Неверный формат email");
      });
    });

Метод `createValidator` создает функцию валидации контракта данных указанного типа.

    const validate = createValidator<ContactInfo>(b => {
      //...
    });

Метод `prop` прогружается до нужного узла контракта.

    b.prop(x => x.name, b => {
      //...
    });

Метод `invalid` задает критерий невалидности для узла, сообщение об ошибке и тип валидации.

    b.invalid(x => !x, "Укажите имя", "submit");

Можно задать несколько критериев на один узел контракта.
Критерии применяются последовательно до первого сработавшего.

    b.prop(x => x.email, b => {
      b.invalid(x => !x, "Укажите email", "submit");
      b.invalid(x => !/^[a-z]+@[a-z]+\.[a-z]+$/.test(x), "Неверный формат email");
    });

### Получение объектов валидаций

Функция `validate` возвращает дерево валидаций по контракту данных.

    const validation = validate(contactInfo);

Метод `getNode` прогружается до конкретного узла дерева, а метод `get` возвращает объект валидации узла.

    const validationInfo = validation.getNode(x => x.name).get();

Объект валидации `validationInfo` можно передать в проп компонента `ValidationWrapper`.

    <ValidationWrapper validationInfo={validationInfo}>
      <Input/>
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./FlatObject

## Примитивный тип

Валидация данных примитивного типа является вырожденным случаем.
При описании и чтении валидации не потребуется прогрузка до вложенных полей.

    const validateEmail = createValidator<string>(b => {
      b.invalid(x => !x, "Укажите email", "submit");
      b.invalid(x => !/^[a-z]+@[a-z]+\.[a-z]+$/.test(x), "Неверный формат email");
    });

Объект валидации извлекается из корневого узла дерева валидаций.

    const validation = validateEmail(email);
    const validationInfo = validation.get();

### Пример

    !!DemoWithCode!!./PrimitiveType

## Объект со вложенностью

Для валидации контракта данных со вложенным объектами используются вложенные прогрузки с помощью метода `prop`.

    interface FullName {
      surname: string;
      name: string;
    }

    interface ContactInfo {
      fullName: FullName;
      email: string;
    }

    const validateContact = createValidator<ContactInfo>(b => {
      b.prop(x => x.fullName, b => {
        b.prop(x => x.name, b => {
          b.invalid(x => !x, "Укажите имя", "submit");
        });
        b.prop(x => x.surname, b => {
          b.invalid(x => !x, "Укажите фамилию", "submit");
        });
      });
      b.prop(x => x.email, b => {
        b.invalid(x => !x, "Укажите email", "submit");
        b.invalid(x => !/^[a-z]+@[a-z]+\.[a-z]+$/.test(x), "Неверный формат email");
      });
    });

Чтение объекта валидации осуществляется через прогрузку до узла методом `getNode`.

    const validation = validateContact(contactInfo);
    const fullNameNode = validation.getNode(x => x.fullName);
    const nameNode = fullNameNode.getNode(x => x.name);
    const validationInfo = nameNode.get();

Прогрузку до узла можно записать одим выражением.

    const validation = validateContact(contactInfo);
    const validationInfo = validation.getNode(x => x.fullName.name).get();

### Пример

    !!DemoWithCode!!./NestedObject
