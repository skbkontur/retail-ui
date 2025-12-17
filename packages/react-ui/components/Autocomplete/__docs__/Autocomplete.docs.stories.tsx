import React from 'react';
import { SearchLoupeIcon16Light } from '@skbkontur/icons/SearchLoupeIcon16Light';
import { Autocomplete, Button, Gapped } from '@skbkontur/react-ui';
import { UiFilterFunnelIcon16Regular } from '@skbkontur/icons/icons/UiFilterFunnelIcon/UiFilterFunnelIcon16Regular';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/Autocomplete',
  component: Autocomplete,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  const items = ['Абакан', 'Алексин', 'Алматы', 'Альметьевск', 'Алтайский край', 'Амурская область'];

  const [value, setValue] = React.useState('');

  return <Autocomplete source={items} value={value} onValueChange={setValue} placeholder="Введите город на букву А" />;
};

/** Размер автокомплита задаётся пропом `size`. По умолчанию `"small"`. */
export const ExampleSize: Story = () => {
  const items = ['Маленький', 'Средний', 'Большой'];

  const [valueSmall, setValueSmall] = React.useState('Маленький');
  const [valueMedium, setValueMedium] = React.useState('Средний');
  const [valueLarge, setValueLarge] = React.useState('Большой');

  return (
    <Gapped vertical>
      <Autocomplete source={items} value={valueSmall} onValueChange={setValueSmall} size={'small'} />
      <Autocomplete source={items} value={valueMedium} onValueChange={setValueMedium} size={'medium'} />
      <Autocomplete source={items} value={valueLarge} onValueChange={setValueLarge} size={'large'} />
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

/**  Проп `menuWidth` задаёт ширину выпадающего списка. */
export const ExampleMenuWidth: Story = () => {
  const items = ['Абакан', 'Алексин', 'Алматы', 'Альметьевск', 'Алтайский край', 'Амурская область'];

  const [valuePercent, setValuePercent] = React.useState('');
  const [valueNumber, setValueNumber] = React.useState('');

  return (
    <Gapped vertical>
      <Autocomplete
        source={items}
        value={valuePercent}
        onValueChange={setValuePercent}
        placeholder="Введите город на букву А"
        menuWidth={'120%'}
      />
      <Autocomplete
        source={items}
        value={valueNumber}
        onValueChange={setValueNumber}
        placeholder="Введите город на букву А"
        menuWidth={'300px'}
      />
    </Gapped>
  );
};
ExampleMenuWidth.storyName = 'Ширина выпадающего списка';

/** Проп `menuMaxHeight` фиксирует максимальную высоту выпадающего списка. */
export const ExampleMenuMaxHeight: Story = () => {
  const items = ['Абакан', 'Алексин', 'Алматы', 'Альметьевск', 'Алтайский край', 'Амурская область'];

  const [value, setValue] = React.useState('');

  return (
    <Autocomplete
      source={items}
      value={value}
      onValueChange={setValue}
      placeholder="Введите город на букву А"
      menuMaxHeight={'100px'}
    />
  );
};
ExampleMenuMaxHeight.storyName = 'Высота выпадающего списка';

/** По умолчанию список раскрывается под полем, а если список находится близко к нижней границе страницы, то он динамически меняет расположение и раскрывается над полем.
 *  Расположение выпадающего списка можно зафиксировать вручную через проп `menuPos`. Оно может быть под полем — `"bottom"` или над полем — `"top"`. В таком случае расположение будет зафиксировано и не будет меняться при близости к границе страницы. */
export const ExampleMenuPos: Story = () => {
  const items = ['Абакан', 'Алексин', 'Алматы', 'Альметьевск', 'Алтайский край', 'Амурская область'];

  const [value, setValue] = React.useState('');

  return (
    <Autocomplete
      source={items}
      value={value}
      onValueChange={setValue}
      placeholder="Введите город на букву А"
      menuPos={'top'}
    />
  );
};
ExampleMenuPos.storyName = 'Расположение выпадающего списка';

/** Проп `menuAlign` выравнивает выпадающий список. Выпадающий список может быть прикреплен к левому краю — "left" или к правому — "right". */
export const ExampleMenuAlign: Story = () => {
  const items = ['Выпадающее меню выравнивается по левому краю', 'Выпадающее меню выравнивается по правому краю'];

  const [valueLeft, setValueLeft] = React.useState('Выпадающее меню выравнивается по левому краю');
  const [valueRight, setValueRight] = React.useState('Выпадающее меню выравнивается по правому краю');

  return (
    <Gapped vertical>
      <Autocomplete source={items} value={valueLeft} onValueChange={setValueLeft} menuAlign="left" />
      <Autocomplete source={items} value={valueRight} onValueChange={setValueRight} menuAlign="right" />
    </Gapped>
  );
};
ExampleMenuAlign.storyName = 'Выравнивание выпадающего списка';

/** Проп `borderless` убирает обводку у поля. */
export const ExampleBorderless: Story = () => {
  const items = ['Абакан', 'Алексин', 'Алматы', 'Альметьевск', 'Алтайский край', 'Амурская область'];

  const [value, setValue] = React.useState('Амурская область');

  return (
    <Autocomplete
      source={items}
      value={value}
      onValueChange={setValue}
      placeholder="Введите город на букву А"
      borderless
    />
  );
};
ExampleBorderless.storyName = 'Поле без обводки';

/** Проп `align` задаёт выравнивание текста в поле. Выравнивается только текст внутри поля, проп не влияет на выравнивание значений в выпадающем списке. */
export const ExampleAlign: Story = () => {
  const items = ['Слева', 'По центру', 'Справа'];

  const [valueSmall, setValueSmall] = React.useState('Слева');
  const [valueMedium, setValueMedium] = React.useState('По центру');
  const [valueLarge, setValueLarge] = React.useState('Справа');

  return (
    <Gapped vertical>
      <Autocomplete source={items} value={valueSmall} onValueChange={setValueSmall} align="left" />
      <Autocomplete source={items} value={valueMedium} onValueChange={setValueMedium} align="center" />
      <Autocomplete source={items} value={valueLarge} onValueChange={setValueLarge} align="right" />
    </Gapped>
  );
};
ExampleAlign.storyName = 'Выравнивание текста в поле';

/** Для автокомплита может быть задана маска. Автокомплит наследует от [MaskedInput](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_input-data-maskedinput--docs) пропсы:
 * - `mask` — определяет шаблон маски, используемый для форматирования и проверки корректности вводимых данных в поле.
 * - `maskChar` — задаёт cимвол маски. Он отображается в шаблоне маски в качестве плейсхолдера
 * - `formatChars` — задаёт словарь символов-регулярок. С помощью него вы можете настроить собственный словарь символов.
 */
export const ExampleMask: Story = () => {
  const [value, setValue] = React.useState<string>('');

  const getOnlyDigits = (value: string) => value.match(/\d+/g)?.join('') || '';
  const items: string[] = ['+7 912 043-98-27', '+7 912 999-11-22', '+7 912 444-55-99'];

  return (
    <Autocomplete
      value={value}
      width="150"
      mask="+7 999 999-99-99"
      placeholder="+7"
      alwaysShowMask
      source={(pattern) => {
        const numbers = getOnlyDigits(pattern);
        return new Promise((resolve) => {
          resolve(items.filter((item) => getOnlyDigits(item).startsWith(numbers)));
        });
      }}
      onValueChange={setValue}
    />
  );
};
ExampleMask.storyName = 'Маска ввода';

/** Проп `selectAllOnFocus` добавляет автовыделение значения: всё значение внутри поля выделяется при фокусе на нем. Может быть полезно для полей, в которых пользователи могут часто копировать значение. */
export const ExampleSelectAllOnFocus: Story = () => {
  const items = ['Абакан', 'Алексин', 'Алматы', 'Альметьевск', 'Алтайский край', 'Амурская область'];

  const [value, setValue] = React.useState('Амурская область');

  return <Autocomplete source={items} value={value} onValueChange={setValue} selectAllOnFocus />;
};
ExampleSelectAllOnFocus.storyName = 'Выделение всего значения при фокусе';

/** В поле можно передать иконку.
 * Иконка может находиться в начале поля — проп `leftIcon`, в конце — проп `rightIcon`.
 * Под разный размер полей используйте подходящие начертания и размер иконок:
 * - Small — Light 16
 * - Medium — Light 20
 * - Large — Regular 24 */
export const ExampleIcon: Story = () => {
  const items = ['Абакан', 'Алексин', 'Алматы', 'Альметьевск', 'Алтайский край', 'Амурская область'];

  const [valueLeft, setValueLeft] = React.useState('');
  const [valueRight, setValueRight] = React.useState('');

  return (
    <Gapped>
      <Autocomplete
        source={items}
        value={valueLeft}
        onValueChange={setValueLeft}
        placeholder="Введите город на букву А"
        leftIcon={<SearchLoupeIcon16Light />}
      />
      <Autocomplete
        source={items}
        value={valueRight}
        onValueChange={setValueRight}
        placeholder="Введите город на букву А"
        rightIcon={<SearchLoupeIcon16Light />}
      />
    </Gapped>
  );
};
ExampleIcon.storyName = 'Иконка';

/** Очистить значение в поле можно только с помощью пустой строки. */
export const ExampleClear: Story = () => {
  const items = ['Абакан', 'Алексин', 'Алматы', 'Альметьевск', 'Алтайский край', 'Амурская область'];

  const [value, setValue] = React.useState('Алматы');

  return (
    <Gapped>
      <Autocomplete source={items} value={value} onValueChange={setValue} />
      <Button onClick={() => setValue('')}>Передать пустое значение</Button>
    </Gapped>
  );
};
ExampleClear.storyName = 'Очистка поля';

/** Проп `showClearIcon` добавляет в поле иконку очистки, по нажатию на иконку поле будет очищаться.
 *
 * Доступные значения:
 *
 * - `"always"` — всегда показывает иконку очистки в заполненном поле, при очистке значения возвращается стрелка для раскрытия списка;
 * - `"auto"` — показывает иконку в заполненном поле, только когда оно в состоянии hover или focus;
 * - `"never"` (по умолчанию) — не показывает иконку очистки.
 *
 * При одновременной настройке `rightIcon` и `showClearIcon` иконка очистки заменит иконку справа.
 */
export const ExampleShowClearIcon: Story = () => {
  const items = [
    'showClearIcon="auto"',
    'showClearIcon="always"',
    'showClearIcon="never"',
    'showClearIcon="auto" + rightIcon',
  ];

  const [valueAlways, setValueAlways] = React.useState(items[0]);
  const [valueAuto, setValueAuto] = React.useState(items[1]);
  const [valueNever, setValueNever] = React.useState(items[2]);
  const [valueWithIcon, setValueWithIcon] = React.useState(items[3]);
  return (
    <Gapped vertical>
      <Autocomplete
        showClearIcon="always"
        source={items}
        value={valueAlways}
        onValueChange={setValueAlways}
        width="350px"
      />
      <Autocomplete showClearIcon="auto" source={items} value={valueAuto} onValueChange={setValueAuto} width="350px" />
      <Autocomplete
        showClearIcon="never"
        source={items}
        value={valueNever}
        onValueChange={setValueNever}
        width="350px"
      />
      <br />
      <Autocomplete
        showClearIcon="auto"
        source={items}
        value={valueWithIcon}
        onValueChange={setValueWithIcon}
        width="350px"
        rightIcon={<UiFilterFunnelIcon16Regular />}
      />
    </Gapped>
  );
};
ExampleShowClearIcon.storyName = 'Иконка очистки поля';
