# API reference

## ValidationContainer

Контейнер, внутри которого находятся валидируемые контролы.

### ``submit(): Promise<void>``


При вызове этой функции загораются все невалидные котролы. Необходимо для реализации
сценария [валиадации при отправке формы](https://guides.kontur.ru/principles/validation/#07).

    <ValidationContainer ref='container'>
        // ...
        <Button onClick={() => this.refs.container.submit()}>Сохранить</Button>
    </ValidationContainer>

### ``validate(): Promise<boolean>``

При вызове этой функции загораются все невалидные котролы так же как и при вызове
функции ``submit()``. Кроме того функция
возвращает признак валидности формы.

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

### ``children``

Предполагается, что в дочерних узлах содержатся контролы, поведением
валидация которых будет управлять контейнер. В контекст добавляется объект,
в котором регистрируется дочерние контролы и реагируют на вызовы функций submit
и validate. Так же через контекст осуществляется
управление [поведением баллунов](https://guides.kontur.ru/principles/validation/#16).

### ``onValidationUpdated?: (isValid: boolean) => void``

Данные callback вызывается в случае изменения состояния валдности дочерних контролов.


## ValidationWrapperV1

### ``children: React.Element<*>``

### ``validationInfo: ?ValidationInfo``

где

    type ValidationInfo = { type?: 'immediate' | 'lostfocus' | 'submit'; message: string; }

### ``renderMessage?: RenderErrorMessage``

где

    type RenderErrorMessage =
        (control: React.Element<*>, hasError: boolean, validation: ?Validation) => React.Element<*>;

## tooltip(pos: string)

## text(pos: string)
