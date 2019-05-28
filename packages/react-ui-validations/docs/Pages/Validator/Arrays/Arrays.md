# Валидация массивов

Описание валидаций элементов массива реализовано аналогично описанию [валидаций полей объекта](/#/object-validation).

## Массив примитивных типов

### Описание правил валидаций

    const validate = createValidator<string[]>(b => {
      b.array(x => x, b => {
        b.invalid(x => !x, "Укажите email", "submit");
        b.invalid(x => !/^[a-z]+@[a-z]+\.[a-z]+$/.test(x), "Неверный формат email");
      });
    });

Метод `array` прогружается до узла содержащего массив.
В колбэке задается правило для конфигурирования элемента массива.
Правило последовательно применяется ко всем элементам массива.

    b.array(x => x, b => {
      //правило для конфигурирования элемента массива
    });

В приведенном примере корневой узел является массивом.
Поэтому прогрузка сделана до текущего узла c помощью выражения `x => x`.

### Получение объектов валидаций

Метод `validate` возвращает дерево валидаций.
Метод `getNodeByIndex` возвращает узел дерева по индексу массива.
Объект валидации из узла дерева извлекается методом `get`.

    const validation = validate(emails);
    const validationInfo = validation.getNodeByIndex(0).get();

Получить узел можно и через индексатор в пути метода `getNode`.
**Это возможно только при явном указании индекса числом, без переменных, констант и замыканий.**

    const item = validation.getNode(x => x[0]).get();

**Код ниже работать не будет, потому что путь содержит замыкание.**

    const index = 0;
    const item = validation.getNode(x => x[index]).get();

Поэтому в общем виде, например, в цикле, обращение к узлу по индексу возможно только с помощью метода `getNodeByIndex`.

### Пример

    !!DemoWithCode!!./PrimitiveTypeArray

## Массив объектов

Если элементом массива является объект, то прогрузка до вложенных узлов осуществляется методом `prop`.

    interface ContactInfo {
      name: string;
      email: string;
    }

    const validate = createValidator<ContactInfo[]>(b => {
      b.array(x => x, b => {
        b.prop(x => x.name, b => {
          //...
        });
        b.prop(x => x.email, b => {
          //...
        });
      });
    });

### Пример

    !!DemoWithCode!!./ObjectArray

## Вариации

Массив может находиться внутри объекта.
Прогрузку до массива можно указать прямо в методе `array`.

    interface Root {
      items: string[];
    }

    const validate = createValidator<Root>(b => {
      b.array(x => x.items, b => {
        //...
      });
    });

Можно задать валидацию не только для элементов массива, но и для узла, в котором лежит массив.

    interface Root {
      items: string[];
    }

    const validate = createValidator<Root>(b => {
      b.prop(x => x.items, b => {
        b.invalid(...); //правило для узла items
        b.array(x => x, b => {
          //...
        });
      });
    });

    const validation = validate(root);
    const validationInfo = validation.getNode(x => x.items).get();
