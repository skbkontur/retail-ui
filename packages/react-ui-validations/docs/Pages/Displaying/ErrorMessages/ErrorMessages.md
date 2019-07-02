# Сообщения об ошибках

[Описание сообщения об ошибках в Контур.Гайдах](https://guides.kontur.ru/principles/validation/#Soobscheniya_ob_oshibkah)

По умолчанию сообщение об ошибке отображается в тултипе справа от контрола.
Это поведение переопределяется с помощью пропа `renderMessage` компонента `ValidationWrapper`.

    <ValidationWrapper validationInfo={...} renderMessage={...}>
      //...
    </ValidationWrapper>

## Тултипы

[Описание в Контур.Гайдах](https://guides.kontur.ru/principles/validation/#Tultipi)

Отображение сообщения в тултипе задается методом `tooltip`.
Позиция отображения тултипа задается аргуметом метода.

    <ValidationWrapper validationInfo={...} renderMessage={tooltip("top left")}>
      //...
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./TooltipValidation

## Тексты

[Описание в Контур.Гайдах](https://guides.kontur.ru/principles/validation/#Krasnie_teksti_na_stranitse)

Отображение сообщения текстом задается методом `text`.
Позиция отображения текста задается аргуметом метода.
Если позиция не указана, то умолчательной будет позиция `right`.

    <ValidationWrapper validationInfo={...} renderMessage={text("bottom")}>
      //...
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./TextValidation
