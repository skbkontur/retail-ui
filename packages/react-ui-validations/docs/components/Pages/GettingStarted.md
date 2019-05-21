# Введение

## Установка

    npm install --save react-ui-validations

## Использование

Для работы необходимо обернуть контролы, для которых требуется показать валидацию в `ValidationWrapperV1`:

    import { ValidationWrapperV1 } from 'react-ui-validations';

    <ValidationWrapperV1 validationInfo={...}>
        <Input
            value={phone}
            onChange={value => setState({ phone: value })}
        />
    </ValidationWrapperV1>

Все контролы, обернутые в `ValidationWrapperV1`, должны находиться внутри `ValidationContainer`.

    import { ValidationContainer, ValidationWrapperV1 } from 'react-ui-validations';

    <ValidationContainer>
    // ...
        <ValidationWrapperV1 validationInfo={{ message: 'Сообщение об ошибке' }}>
            <Input
                value={phone}
                onChange={value => setState({ phone: value })}
            />
        </ValidationWrapperV1>
    // ...
    </ValidationContainer>

`ValidationWrapper` принимает параметр `validationInfo`, если значение `validationInfo` определено,
то данные в контроле считаются невалидными и, в зависимости от значения поля `type` в `validationInfo`, `ValidationWrapperV1`
будет отображать сообщения об ошибке (в виде тултипа) и подсвечивать контрол красным в нужные моменты времени.

Отметим, что `ValidationWrapper` не решает, когда необходимо вызывать функцию валидации. Вместо этого он принимает текущее состояние
валидности данных. Один из вариантов использования вот такой:

    // ...
        <ValidationWrapperV1
            validationInfo={/\d+/.test(phone) ? { message: 'Сообщение об ошибке' } : null}>
            <Input
                value={phone}
                onChange={value => setState({ phone: value })}
            />
        </ValidationWrapperV1>
    // ...

Поэтому нет необходимости передавать `validationInfo` в нужные моменты времени, например, на `onBlur` или отправку формы. Достаточно
валидировать модель и передавать `validationInfo` всегда, а `ValidationWrapper` решит, когда её нужно показывать.

Для указания поведения валидации необходимо в `validationInfo` передать её поведение:

    // ...
        <ValidationWrapperV1 validationInfo={{ type: 'submit', message: '...' }}>
    // ...

Для изменения внешнего вида ошибки используется prop `renderMessage`:

    //...
    <ValidationWrapperV1 validationInfo={{ ... }} renderMessage={text('right')}>
    //...

Библиотека заточена исключительно под [retail-ui](http://tech.skbkontur.ru/react-ui/) контролы и управляет состоянием контролов
через передачу ему props-а `error` и использует другие, заранее известные prop-ы (`onChange`, `onBlur`, `onFocus` и др.),
для управления состоянием валидаций.
