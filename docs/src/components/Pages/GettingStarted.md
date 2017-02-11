# Введение

## Установка 

    npm install --save react-ui-validations

## Использование

Для работы необходимо обернуть контролы, для которых будет показана валидацию в ValidationWrapperV1:

    import { ValidationWrapperV1 } from 'react-ui-validations';

    <ValidationWrapperV1 validationInfo={...}>
        <Input
            value={phone}
            onChange={value => setState({ phone: value })}
        />
    </ValidationWrapperV1>

Все контролы должны находиться внутри ValidationContainer'а.

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

ValidationWrapper принимает параметр validationInfo, если значение validationInfo определено, 
то данные в контроле считаются невалидными и в зависимости от поля type в validationInfo, ValidationWrapperV1 
будет добавлять сообщения об ошибке (в виде тултипа) и подсвечивать контрол красным в нужные моменты времени.

Библиотека заточена исключительно под [retail-ui](tech.skbkontur.ru/react-ui/) контролы и управляет состоянием контролов
через передачу ему props-а error и использую другие заранее известные prop-ы (onChange, onBlur, onFocus и др.) для управления 
состоянием валидаций.

Кроме того, нет необходимости передавать validationInfo в нужные моменты времени, например на onBlur или отправку форму. Достаточно
валидировать модель и передавать validationInfo всегда, а ValidationWrapper решит когда её нужно показывать.

Для указания поведения валидации необходимо в validationInfo педелать её поведение:

    // ...
        <ValidationWrapperV1 validationInfo={{ message: 'Сообщение об ошибке' }}>
    // ...
