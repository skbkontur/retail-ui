# API reference

## ValidationContainer

Контейнер, внутри которого находятся валидируемые контролы.

### `submit(): Promise<void>`

При вызове этой функции загораются все невалидные контролы. Необходимо для реализации
сценария [валидации при отправке формы](https://guides.kontur.ru/principles/validation/#07).

    <ValidationContainer ref='container'>
        // ...
        <Button onClick={() => this.refs.container.submit()}>Сохранить</Button>
    </ValidationContainer>

### `validate(): Promise<boolean>`

При вызове этой функции загораются все невалидные контролы так же как и при вызове
функции `submit()`. Кроме того функция возвращает признак валидности формы.

    async handleSubmit() {
        const isValid = await this.refs.container.validate();
        if (isValid) {
            await this.save();
        }
    }

    render() {
        return (
            <ValidationContainer ref='container'>
                // ...
                <Button onClick={() => this.refs.container.submit()}>Сохранить</Button>
            </ValidationContainer>
        );
    }

### `children`

Предполагается, что в дочерних узлах содержатся контролы, поведением
которых будет управлять контейнер. В контекст добавляется объект,
в котором регистрируется дочерние контролы и реагируют на вызовы функций submit
и validate. Так же через контекст осуществляется
управление [поведением баллунов](https://guides.kontur.ru/principles/validation/#16).

### `onValidationUpdated?: (isValid: boolean) => void`

Данный callback вызывается в случае изменения состояния валидности дочерних контролов.

## ValidationWrapper

Обертка для контрола, осуществляет управление свойствами контрола, ответственными за
валидацию.

### `children: React.Node`

Дочерний компонент должен быть ровно один. ValidationWrapper контролирует его поведение путём передачи
prop-ов, используя соглашения retail-ui. Для отрисовки tooltip-а используется стандартный
[Tooltip](http://tech.skbkontur.ru/react-ui/#/components/Tooltip). Для работы с компонентом используется
[React.cloneElement()](https://facebook.github.io/react/docs/react-api.html#cloneelement);

### `validationInfo: ?ValidationInfo`

где

    type ValidationInfo = {
        type?: 'immediate' | 'lostfocus' | 'submit';
        message: string;
    };

способ передать результат валидаций в ValidationWrapper. Если значение определено, контрол считается
невалидным. Поле `type` используется для задания поведения валидации (значение по умолчанию: `lostfocus`).

### `renderMessage?: RenderErrorMessage`

где

    type RenderErrorMessage =
        (
            control: React.Node,
            hasError: boolean,
            validation: ?Validation
        ) => React.Node;

Способ кастомизации отображения сообщения об ошибке (не путать с
[подсветкой контрола](https://guides.kontur.ru/principles/validation/#13)).
Для задания определённых в Контур.Гайдах способа отображения ошибок используйте функции `tooltip` и `text`
(значение по умолчанию: `tooltip('right middle')`).

Например,

    // ...
    <ValidationWrapper
        renderMessage={tooltip('top center')}
        validationInfo={{ ... }}>
    // ...
    </ValidationWrapper>

## tooltip(pos: string): RenderErrorMessage

Возвращает функцию для рендеринга сообщения об ошибке в виде тултипа. Используется для передачи в renderMessage.

Аргументы:

- `pos`: строка передаваемая в соответствующий prop [retail-ui Tooltip-а](http://tech.skbkontur.ru/react-ui/#/components/Tooltip).

## text(pos: 'right' | 'bottom'): RenderErrorMessage

Возвращает функцию для рендеринга сообщения о ошибке в виде текстового блока рядом с контролом.
Используется для передачи в renderMessage.

Аргументы:

- `pos`: управляет положением текста и принимает значения 'right' или 'bottom' для отображения сообщения справа или внизу соответственно.
