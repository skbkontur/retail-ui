# Сообщения об ошибках

[Сообщения об ошибках по Контур.Гайдам](https://guides.kontur.ru/principles/validation/#Soobscheniya_ob_oshibkah)

По умолчанию сообщение об ошибке отображается в тултипе справа от контрола.
Это поведение переопределяется с помощью пропа `renderMessage` компонента `ValidationWrapperV1`.

    <ValidationWrapperV1 validationInfo={...} renderMessage={...}>
      //...
    </ValidationWrapperV1>

## Тултипы

[Отображение ошибок в тултипах по Контур.Гайдам](https://guides.kontur.ru/principles/validation/#Tultipi)

Отображение сообщения в тултипе задается методом `tooltip`.
Позиция отображения тултипа задается аргуметом метода.

    <ValidationWrapperV1 validationInfo={...} renderMessage={tooltip("top left")}>
      //...
    </ValidationWrapperV1>

### Пример

    !!DemoWithCode!!./TooltipValidation

## Тексты

[Отображение ошибок текстами по Контур.Гайдам](https://guides.kontur.ru/principles/validation/#Krasnie_teksti_na_stranitse)

Отображение сообщения текстом задается методом `text`.
Позиция отображения текста задается аргуметом метода.
Если позиция не указана, то умолчательной будет позиция `right`.

    <ValidationWrapperV1 validationInfo={...} renderMessage={text("bottom")}>
      //...
    </ValidationWrapperV1>

### Пример

    !!DemoWithCode!!./TextValidation
