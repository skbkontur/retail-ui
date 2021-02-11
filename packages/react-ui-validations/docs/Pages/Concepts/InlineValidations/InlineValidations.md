# Встраиваемые валидации

Интерфейс библиотеки устроен так, что валидации можно делать внешними по отношению к контролу формы, так и писать их прямо внутри формы.

Однако это может быть не всегда удобно.
Для этого можно сделать реэкспорт контролов, которые уже завёрнуты в `ValidationWrapper`, и предоставляют более удобный интерфейс для валидации значений.

В итоге код может выглядеть как-то так:

    <Form.Line title='Email'>
      <Input
        required
        email
        value={data.email}
        onValueChange={value => onChange({ email: value })}
      />
    </Form.Line>

или так:

    import { DatePicker, lessThan } from './ControlsWithValidations';

    <Form.Line title='Дата рождения'>
      <DatePicker
        required
        validations={[lessThan(new Date('2010-01-01'))]}
        value={data.born}
        onValueChange={value => onChange({ born: value })}
      />
    </Form.Line>

Реализацию можно посмотреть в [исходном коде документации](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/docs/Pages/Concepts/InlineValidations)

### Пример

    !!DemoWithCode!!./InlineValidations
