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

Функция принимает два аргумента:

1. Позволяет задать позицию отображения тултипа. Может принимать все значения, которые принимает проп `pos` компонента `Tooltip`.
2. Объект с опциями. Позволяет задать кастомный `data-tid` тултипу. Возможные значения: `{ dataTid?: string }`.

Пример кода:

    <ValidationWrapper validationInfo={...} renderMessage={tooltip("top left", {dataTid: 'custom data-tid' })}>
      //...
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./TooltipValidation

## Тексты

[Описание в Контур.Гайдах](https://guides.kontur.ru/principles/validation/#Krasnie_teksti_na_stranitse)

Текстовое сообщение рендерится с помощью функции `text`.

Функция принимает два аргумента:

1. Позволяет задать позицию отображения текста. Если позициция не указана, `right` будет установлена в качестве позиции по умолчанию. Возможные значения: `bottom | right`.
2. Объект с опциями. Позволяет задать кастомный `data-tid` тексту. Возможные значения: `{ dataTid?: string }`.

Пример кода:

    <ValidationWrapper
      validationInfo={...}
      renderMessage={text("bottom", { dataTid: 'custom data-tid' })}
    >
      //...
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./TextValidation
