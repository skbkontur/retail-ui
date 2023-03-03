# Сообщения об ошибках

[Описание сообщения об ошибках в Контур.Гайдах](https://guides.kontur.ru/principles/validation/#Soobscheniya_ob_oshibkah)

По умолчанию сообщение об ошибке отображается в тултипе справа от контрола.
Это поведение переопределяется с помощью пропа `renderMessage` компонента `ValidationWrapper`.

    <ValidationWrapper validationInfo={...} renderMessage={...}>
      //...
    </ValidationWrapper>

## Тултипы

[Описание в Контур.Гайдах](https://guides.kontur.ru/principles/validation/#Tultipi)

Сообщение внутри тултипа рендерится с помощью функции `tooltip`.

Функция принимает один аргумент, который позволяет задать позицию отображения тултипа. Может принимать все значения, которые принимает проп `pos` компонента `Tooltip`.

Пример кода:

    <ValidationWrapper validationInfo={...} renderMessage={tooltip("top left")}>
      //...
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./TooltipValidation

## Тексты

[Описание в Контур.Гайдах](https://guides.kontur.ru/principles/validation/#Krasnie_teksti_na_stranitse)

Текстовое сообщение рендерится с помощью функции `text`.

Функция принимает один аргумент, который позволяет задать позицию отображения текста. Если позициция не указана, позиция `right` будет установлена в качестве позиции по умолчанию. Возможные значения: `bottom | right`.

Пример кода:

    <ValidationWrapper
      validationInfo={...}
      renderMessage={text("bottom")}
    >
      //...
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./TextValidation
