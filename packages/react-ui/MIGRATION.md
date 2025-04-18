# Migration

## @skbkontur/react-ui 4.x - 5.0

### Удаления в 5.0

В версии 5.0 удалены старые темы: `THEME_2022`, `DARK_THEME_2022`, `DEFAULT_THEME`, `DARK_THEME`, `DEFAULT_THEME_8PX_OLD`, `FLAT_THEME_8PX_OLD`, `THEME_2022_UPDATE_2024` и `THEME_2022_DARK_UPDATE_2024`. Подробнее о новых темах в следующем разделе.

Удалены устаревшие внутренние компоненты: `DropdownContainer`, `InternalMenu`, `Picker`. Их окончательно заменили `Popup`, `Menu` и `Calendar`. 

Удалены все [фиче-флаги](https://github.com/skbkontur/retail-ui/blob/4.x/packages/react-ui/lib/featureFlagsContext/FEATUREFLAGSCONTEXT.md) кроме `comboBoxAllowValueChangeInEditingState`. Краткий список вступивших в силу изменений:
  1. в `TokenInput` из дефолтных разделителей удалён пробел
  2. в `Hint` и `Kebab` убран pin
  3. в `Spinner` и `Loader` убран дефолтный `caption`
  4. в `SidePage` с пропом `blockBackground` активируется FocusLock
  5. `MenuItem` остаются активными даже после обертки во что-либо
  6. в `Textarea` фикс для Safari 17 применяется по умолчанию
  7. в `Link` добавлена обводка при фокусе
  8. `Hint` изменяет свое положения, если не попадает во viewport
  9. логика выбора позиции в `Hint` и `Tooltip` унифицирована


Удалены или переименованы устаревшие переменные темы. Полный список перечислен [тут](https://github.com/skbkontur/retail-ui/pull/3459). Для ускорения переезда доступен [кодмод](https://github.com/skbkontur/retail-ui/tree/5.x/packages/react-ui-codemod#react-ui-50renamethemevars). 

В `ScrollContainer` и `SideMenu` удален проп `hideScrollBar`. Вместо него следует использовать `showScrollBar`. 

Также удалены некоторые другие устаревшие сущности. Полный список доступен в [#3459](https://github.com/skbkontur/retail-ui/pull/3459) и [#3523](https://github.com/skbkontur/retail-ui/pull/3523). Самые значимые из них:
- удален проп `colors` из `Token` (рекомендуется использовать переменные `tokenBg`, `tokenColor`, `tokenBorderColor` и др.)
- удален проп `color` в `Toggle` (рекомендуется использовать переменную `toggleBgChecked`)
- удален проп `shouldBeVisibledWithLessThanTwoPages` в `Paging`

### Новые актуальные темы

Новые темы теперь называются: `LIGHT_THEME` и `DARK_THEME`. Они будут в себе содержать последние актуальные изменения дизайна библиотеки. А для тех, кто не хочет постоянно получать визуальные обновления, будут доступны отдельные темы, зафиксированные в определенном состоянии: `LIGHT_THEME_5_*` и `DARK_THEME_5_*`.

Список тем на момент выхода 5.0:

| Имя                     | Описание                     |
| ----------------------- | ---------------------------- |
| `LIGHT_THEME`           | Актуальная светлая тема      |
| `DARK_THEME`            | Актуальная темная тема       |

### ButtonLink 

В компоненты `Button` и `Link` добавлен проп `component`. Новые возможности и ломающие изменения описаны в [#3521](https://github.com/skbkontur/retail-ui/pull/3521).

### MaskedInput

Компонент значительно переработан. Кратко о ломающих изменениях:

1. По-умолчанию `value` содержит все символы маски, даже не введённые. Используйте проп `unmask` и символы `{}` в маске
   для манипуляций с `value`.
2. Событие `onChange` не вызывается. Используйте `onInput`.
3. Проп `maskChar` не принимает `null`, а `''` и `undefined` будут заменяться на дефолтный символ. Используйте пробел
   нулевой ширины `String.fromCharCode(0x2060)`.
4. IE11 не поддерживается.

Технические подробности можно почитать в [#3390](https://github.com/skbkontur/retail-ui/pull/3390), а примеры посмотреть
на [странице компонента](#/Components/MaskedInput).

Старые пропы маски в `Input`, такие, как `mask`, `maskChar`, `formatChars` и `alwaysShowMask`, уже были помечены
устаревшими ранее, но пока остаются в библиотеке.

### Другие небольшие улучшения

Подчеркивание в `Link` переделано на `text-decoration`. Подробнее в [#3462](https://github.com/skbkontur/retail-ui/pull/3462).

Публичный метод `scrollToMonth` в `DatePicker` и `Calendar` теперь принимает в аргумент номер месяца в формате `1-12`, а не `0-11`. Подробнее в [#3470](https://github.com/skbkontur/retail-ui/pull/3470).

Функция `ThemeFactory.create` по умолчанию принимает в аргумент только переменные, присутствующие в теме. Подробнее в [#3516](https://github.com/skbkontur/retail-ui/pull/3516).

В `Button` поменяны местами дата-тиды `Button__root` и `Button__rootElement` для консистентности с остальными компонентами. Подробнее в [#3520](https://github.com/skbkontur/retail-ui/pull/3520).

### Остальные визуальные изменения

Актуализированы цвета состояний `disabled`, `error` и `use="danger"`. Подробнее в [#3493](https://github.com/skbkontur/retail-ui/pull/3493).

Поправлены отступы в `Toast`. Подробнее в [#3494](https://github.com/skbkontur/retail-ui/pull/3494).

Поправлены стили `use="backless"` в `Button`. Подробнее в [#3465](https://github.com/skbkontur/retail-ui/pull/3465).

В `Select` исправлен цвет обводки при наведении. Подробнее в [#3504](https://github.com/skbkontur/retail-ui/pull/3504).

### Совместимость 5.0 с другими пакетами

В связи с ломающими изменениями совместимость с 5.0 других пакетов начинается с версий: 

| Пакет                             | Версия   |
| --------------------------------- | ---------|
| `@skbkontur/react-ui-validations` | `2.0.0`  |
| `@skbkontur/react-ui-addons`      | `5.0.0`  |
| `@skbkontur/side-menu`            | `3.0.0`  |

## @skbkontur/react-ui-validations 1.x - 2.0

Удалены все [фиче-флаги](https://github.com/skbkontur/retail-ui/blob/4.x/packages/react-ui-validations/docs/Pages/Displaying/FeatureFlags/FeatureFlagsContext.md). Краткий список вступивших в силу изменений:
  1. применены актуальные цвета 
  2. в компонентах обертки в span заменены на `div` c `display: inline`

Замена оберток на `div` решает проблемы с семантикой верстки и позиционированием сообщений валидации. Подробнее в [#3463](https://github.com/skbkontur/retail-ui/pull/3463).

В связи с ломающими изменениями совместимость с 2.0 других пакетов начинается с версий: 

| Пакет                             | Версия   |
| --------------------------------- | ---------|
| `@skbkontur/react-ui`             | `5.0.0`  |
| `@skbkontur/react-ui-addons`      | `5.0.0`  |

## 3.x - 4.0

### Новые темы

В версии 4.0 обновлён список доступных тем. Вместо двух отдельных (дефолтной и плоской) теперь осталась одна тема по умолчанию, которая базируется на плоской теме и использует обновлённую цветовую палитру. Также, добавилась официальная тёмная тема, и были удалены темы со старыми размерами (`DEFAULT_THEME_OLD` и `FLAT_THEME_OLD`). Предыдущие 8px-темы пока остаются в пакете, но планируются к удалению в 5.0. Они получили суффикс `_8PX_OLD` к своему имени.

Текущий список тем:

| Имя                     | Описание           |
| ----------------------- | ------------------ |
| `DEFAULT_THEME`         | Новая по умолчанию |
| `DARK_THEME`            | Темная             |
| `DEFAULT_THEME_8PX_OLD` | Старая дефолтная   |
| `FLAT_THEME_8PX_OLD`    | Старая плоская     |

Чтобы продолжить использовать предыдущую тему, просто включите ее вручную.

```jsx static
import { ThemeContext, DEFAULT_THEME_8PX } from '@skbkontur/react-ui';

<ThemeContext.Provider value={DEFAULT_THEME_8PX}>...</ThemeContext.Provider>;
```

### Адаптация под Lab Grotesque

Библиотека по умолчанию теперь ориентирована на использование шрифта `Lab Grotesque` вместо `Segoe UI`. В стили компонентов `Checkbox`, `Radio` и `Toggle` была добавлена компенсация базовой линии. Ее можно отключить переменной темы `labGrotesqueBaselineCompensation`, передав значение `"0"`. Старая компенсация для Segoe, которая присутствовала в компоненте `Button`, теперь отключена. Однако, прежнюю компенсацию в случае необходимости можно вернуть, передав переменной `fontFamilyCompensationBaseline` значение `"1"`.

### Мобильные версии компонентов

У таких компонентов, как `Select`, `Autocomplete`, `ComboBox`, `Modal`, `SidePage`, `Hint`, `Tooltip`, `TooltipMenu`, `Dropdown`, `DropdownMenu`, `Kebab` появились мобильные версии, которые активируются автоматически на мобильных устройствах. Подробнее об этом в [соответствующем разделе](https://github.com/skbkontur/retail-ui/blob/next/packages/react-ui/MOBILES.md) документации.

### Переименование label в caption

Для большей консистентности имен среди всех компонентов были произведены следующие переименования:

1. проп в Switcher

   | Было    | Стало     |
   | ------- | --------- |
   | `label` | `caption` |

2. переменные темы

   | Было                            | Стало                             |
   | ------------------------------- | --------------------------------- |
   | `checkboxLabelGap`              | `checkboxCaptionGap`              |
   | `radioLabelGap`                 | `radioCaptionGap`                 |
   | `radioLabelDisplay`             | `radioCaptionDisplay`             |
   | `switcherLabelFontSizeSmall`    | `switcherCaptionFontSizeSmall`    |
   | `switcherLabelFontSizeMedium`   | `switcherCaptionFontSizeMedium`   |
   | `switcherLabelFontSizeLarge`    | `switcherCaptionFontSizeLarge`    |
   | `switcherLabelLineHeightSmall`  | `switcherCaptionLineHeightSmall`  |
   | `switcherLabelLineHeightMedium` | `switcherCaptionLineHeightMedium` |
   | `switcherLabelLineHeightLarge`  | `switcherCaptionLineHeightLarge`  |
   | `switcherLabelGapSmall`         | `switcherCaptionGapSmall`         |
   | `switcherLabelGapMedium`        | `switcherCaptionGapMedium`        |
   | `switcherLabelGapLarge`         | `switcherCaptionGapLarge`         |

Для автоматической адаптации этих изменений доступны кодмоды: [react-ui-4.0/transformLabelToCaption](https://github.com/skbkontur/retail-ui/blob/next/packages/react-ui-codemod/README.md#react-ui-40transformlabeltocaption) и [react-ui-4.0/renameThemeVars](https://github.com/skbkontur/retail-ui/blob/next/packages/react-ui-codemod/README.md#react-ui-40renamethemevars).

### Механизм повышения специфичности перестал работать

Механизм повышения специфичности стилей (`Upgrade.setSpecificityLevel()`) не работает в версиях 4.х из-за внешнего [плагина](https://github.com/Andarist/stylis-plugin-extra-scope), который сломался с обновлением на `Emotion 11` и [никак пока не чинится](https://github.com/Andarist/stylis-plugin-extra-scope/pull/14). В данный момент не представляется возможным его починить до официального фикса плагина.


## 2.x - 3.0

### 8px-тема по умолчанию

Начиная с версии 3.0 в библиотеке по умолчанию включена 8px-тема. Прежние темы со старыми размерами пока остаются в пакете, но планируются к удалению в 4.0. Старые темы получили суффикс `_OLD` к своему имени.

Текущий список тем:

| Имя                 | Описание         |
| ------------------- | ---------------- |
| `DEFAULT_THEME`     | Дефолтная (8px)  |
| `FLAT_THEME`        | Плоская (8px)    |
| `DEFAULT_THEME_OLD` | Старая дефолтная |
| `FLAT_THEME_OLD`    | Старая плоская   |

Чтобы продолжить использовать старую тему, просто включите ее вручную.

```jsx static
import { ThemeContext, DEFAULT_THEME_OLD } from '@skbkontur/react-ui';

<ThemeContext.Provider value={DEFAULT_THEME_OLD}>...</ThemeContext.Provider>;
```

Также, во всех темах были обновлены иконки стрелок и дефолтный цвет текста. А в 8px-теме поменяли тени выпадашек и отступ у Gapped (теперь 8px вместо 10px).

### Удаление старых компонентов, переменных и пропов

В [2.0](#отдельный-пакет-для-контур-специфичных-компонентов) была начата работа по переносу Контур-специфичных компонентов в отдельный пакет `@skbkontur/react-ui-addons`. Начиная с 3.0 компоненты `TopBar`, `Logotype` и `Fias` полностью переехали из `react-ui`. Их кастомизация и локализация продолжат работать через соответсвующие контексты `react-ui`.

Также, были удалены [ранее помеченные](#нативный-reactcontext-для-themelocale-provider) как устаревшие компоненты:

- LocaleProvider
- ThemeConsumer
- ThemeProvider
- SpinnerOld

и пропы:

- alcoLink (MenuItem)
- diadocLinkIcon (DropDown, Select)
- cloud (Spinner, Loader)

Помимо этого, были переименованы некоторые переменные темы. Подробнее в [#2286](https://github.com/skbkontur/retail-ui/pull/2286).

### Обновленные кнопки

В 3.0 сделано много изменений в кнопках:

- Отказались от полупрозрачного фона в плоской теме
- Полностью обновили состояние загрузки
- Переверстали стрелки с меньшим количеством визуальных дефектов
- Переделали обводки в дефолтной теме на бордеры вместо теней

Скорей всего вам придется обновить свои скриншотные тесты.

### Зависимости

Обновили все зависимости, в том числе Emotion 11. Если вы используете SSR, то загляните в обновленную [инструкцию](https://github.com/skbkontur/retail-ui/blob/%40skbkontur/react-ui%403.0.0-beta.0/packages/react-ui/SSR.md).

### useWrapper в Tooltip и Hint

В 3.0 мы решили исправить давнюю проблему с неточным позиционированием Tooltip и Hint [#928](https://github.com/skbkontur/retail-ui/issue/928). На это влияет внутренняя обертка, контролируемая пропом `useWrapper`. Переключили значение пропа по умолчанию в `false` и скорректировали отступы компонентов по гайдам.

### Toggle

В компоненте Toggle проп `color` помечен устаревшим. Вместо него рекомендуется использовать переменную темы `toggleBgChecked`.

Также, состояния `warning` и `error` были переделаны с использованием внешней обводки вместо цвета фона.

## 1.x - 2.0

### Отказ от поддержки пакета `retail-ui`

Новая мажорная версия библиотеки будет поставляться только в виде пакета `@skbkontur/react-ui`. Пакет `retail-ui` будет обновляться только в рамках поддержи LTS версии. Рекомендуется перейти на использование `@skbkontur/react-ui`. Для этого достаточно заменить все импорты компонентов, например:

```js static
import Button from 'retail-ui/Button';
      |    |    |    |    |    |
      V    V    V    V    V    V
import Button from '@skbkontur/react-ui/Button';
```

### Именованные экспорты, ES6 модули и tree-shaking

В 2.0 исходный код библиотеки распространяется в виде ES6 модулей. Это необходимо для обеспечения правильной работы tree-shaking.

Кроме этого все публичные компоненты библиотеки доступны в виде именованных импортов из корня.

Было:

```js static
import Button from '@skbkontur/react-ui/Button';
import Input from '@skbkontur/react-ui/Input';
```

Стало:

```js static
import { Button, Input } from '@skbkontur/react-ui;
```

В случае использования typescript вам потребуется включить опцию `compilerOptions.esModuleInterop` в своем `tsconfgi.json` для корректной работы типизации.

Если вы загружаете компоненты библиотеки в nodejs, например, в unit тестах, вам необходимо настроить трансформацию в CommonJS модулей из `@skbkontur/react-ui`, чтобы избежать ошибки `Error [ERR_REQUIRE_ESM]: Must use import to load ES Module`. Для сборки бандла в webpack конфиге ничего дополнительно настраивать не нужно. В скором времени появится нативная поддержка [ES Modules в Jest](https://jestjs.io/blog/2020/01/21/jest-25.html#ecmascript-modules-support)

Публичными компонентами называются те, для которых есть страница с документацией на [витрине компонентов](https://tech.skbkontur.ru/kontur-ui/). Компоненты, которые отсутствуют на витрине считаются внутренними и не рекомендуются к использованию, для них не гарантируется сохранение обратной совместимости в рамках одной мажорной версии. Но если вам всё же необходимо использовать внутренний компонент, импортировать его можно из `@skbkontur/react-ui/internal/<ComponentName>`.

Для облегчения перевода проекта можно воспользоваться [кодмодом transformImportsAndExports](https://github.com/skbkontur/retail-ui/pull/1900#transformImportsAndExports)

### Сигнатура `onChange` и `onValueChange`

В 2.0 добавлен проп `onValueChange`, который полностью или частично заменяет `onChange`.

В компонентах, в которых есть возможность получить нативное событие `change`, проп `onChange` соответствует пропу из нативных HTML элементов. Список таких компонентов:

- Autocomplete
- Checkbox
- CurrencyInput
- FxInput
- Input
- PasswordInput
- Radio
- Textarea
- Toggle

Для остальных компонентов проп `onChange` был удален.

Это позволило уменьшить неоднозначность `onChange` и облегчить использования `Hooks API`

```jsx static
const [name, setName] = useState('');

<Input value={name} onValueChange={setName} />;
```

Мы подготовили [кодмод transformOnChange](https://github.com/skbkontur/retail-ui/pull/1900#transformOnChange) для перехода на новое API, в тех местах, где нельзя автоматически преобразовать `onChange` в `onValueChange` будет выводится сообщение о неудачной попытке трансформации и необходимости внести изменения вручную.

### Отдельный пакет для Контур-специфичных компонентов

Компоненты использующие фирменный стиль или api сервисов Контура с выпуском 2.0 переезжают в отдельный приватный [репозиторий](https://git.skbkontur.ru/ui/ui-parking) и пакет [@skbkontur/react-ui-addons](https://nexus.kontur.host/#browse/browse:kontur-npm:%40skbkontur%2Freact-ui-addons) в приватном npm-репозитории `nexus`.

_UPDATE: начиная с версии 1.5.0 @skbkontur/react-ui-addons переехал в [npm](https://www.npmjs.com/package/@skbkontur/react-ui-addons)._

Чтобы начать использовать пакет `@skbkontur/react-ui-addons` из `nexus` необходимо:

1. Создать в корне проекта файл `.npmrc` со следующим содержимым:

   ```shell static
   @skbkontur:registry = "https://nexus.kontur.host/repository/kontur-npm-group/"
   ```

2. Применить [кодмод moveToAddons](https://github.com/skbkontur/retail-ui/pull/1900#moveToAddons), исправляющий импорты Контур-специфичных компонентов на импорты из `@skbkontur/react-ui-addons`

**NOTE**: Если у вас нет возможности настроить nexus прямо сейчас, компоненты остаются в составе библиотеки до версии 3.0. Всё что вам нужно сделать, это вернуть старое отображение компонентов `Loader` и `Spinner` с помощью [кодмода addCloudProp](https://github.com/skbkontur/retail-ui/pull/1900#addCloudProp)

**WARN**: `moveToAddons` должен применятся только после применения `transformImportsAndExports`, иначе корректный результат не гарантируется.

### Нативный ReactContext для `Theme(Locale-)Provider`

Вместо использования отдельного `ThemeProvider/LocaleProvider` рекомендуется использовать `ThemeContext/LocaleContext` соответственно.

Было:

```jsx static
import LocaleProvider, { LangCodes } from '@skbkontur/react-ui/components/LocaleProvider'
import ThemeProvider from '@skbkontur/react-ui/components/ThemeProvider'

/* ... */
const MyTheme = { /* ... */ }

<ThemeProvider value={MyTheme}>
  <LocaleProvider landCode={LangCodes.en_GB}>
    {/* ... */}
  </LocalProvider>
</ThemeProvider>
```

Стало:

```jsx static
import { LocaleContext, LangCodes, ThemeContext, ThemeFactory } from '@skbkontur/react-ui'

/* ... */
const MyTheme = ThemeFactory.create({ /* ... */ })

<ThemeContext.Provider value={MyTheme}>
  <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
    {/* ... */}
  </LocaleContext.Provider>
</ThemeContext.Provider>
```

### Удален устаревший код

#### Flow типизация

Из библиотеки окончательно удалены типы на Flow. Все типы были перемещены в репозиторий [flow-typed](https://github.com/flow-typed/flow-typed). Если вы ещё используйте flow типизацию, то вы можете установить типы из `flow-typed`. Мы не планируем поддерживать актуальность этих типов.

#### Устаревшие компоненты и свойства

В 2.0 удалены компоненты `ComboBoxOld`, `DatePickerOld`, `Kladr`. Вместо них необходимо использовать `ComboBox`, `DatePicker` и `Fias` соответственно. Кроме этого были удалены следующие пропы:

- `Token` — больше не поддерживает старые наименования цветов для пропа `colors`
- `Sticky` — корректно работает без указания пропа `allowChildWithMargins`
- `ComboBox` — Проп `autocompelete` разделен на 2 отдельных флага `drawArrow` и `searchOnFocus`
- `Input/Button` — больше не используют проп `mainInGroup` для задания резиновости при расположении внутри компонента `Group`, вместо этого рекомендуется указывать ширину таким элементам в процентах
- `Fias` — вместо пропа `locale` использует механизм локализации через `LocaleContext`
- `Paging` - вместо пропа `strings` необходимо использовать проп `caption` или механизм локализации
- `TokenInput` — для большей гибкости отрисовки токенов вместо `renderTokenComponent` необходимо использовать проп `renderToken`
- `CurrencyInput` — проп `maxLength` не позволяло гибко настраивать вывод целой и десятичной части и было разделено на два отдельных пропа `integerDigits` и `fractionDigits`

#### `Lookup.js` и адаптеры для компонентов

Ранее библиотека включала в себя набор хелперов, призванных облегчить тестирование и предоставить публичный интерфейс для программного взаимодействия с компонентами на уровне тестов.

Было принято решение отказаться от этой функциональности из-за сложности поддержки, отсутствия типизации и малого количества использований.

Если ваш проект каким-то образом использует механизм связанный с адаптерами для компонентов, вы можете скопировать к себе последнюю реализацию адаптеров компонентов из 1.x версии библиотеки.

## 0.x - 1.0

### Переход с кастомизации с помощью `less`

Для перехода с кастомизации посредством переопределения less-переменных, необходимо превратить less-переменные в объект темы.
Это можно сделать с помощью <a target="_blank" href="https://raw.githubusercontent.com/skbkontur/retail-ui/master/packages/react-ui-codemod/customization/variablesConverter.js">скрипта</a>

Скрипту необходимо передать два параметра: `variables` - путь до файла с переменными и `output` - путь до файла, в который нужно записать объект темы. Если по пути, переданному в `output`, файла не существует, файл будет создан. В противном случае, он будет перезаписан.

Перед запуском скрипт необходимо скачать и положить в папку с проектом. В процессе конвертации используется пакет [less.js](https://www.npmjs.com/package/less), который скрипт возьмет из зависимостей проекта.

Пример использования:

```shell
node variablesConverter.js variables=../../less/myVariables.less output=../theme/theme.js
```

Для следующего содержимого myVariables.less:

```less
@btn-danger-bg: #e14c30;
@warning-main: #f69c00;
@error-main: #d70c17;
@border-color-gray-dark: rgba(0, 0, 0, 0.28);
@border-color-gray-light: rgba(0, 0, 0, 0.15);
@tab-color-hover-error: lighten(@btn-danger-bg, 20%);
@toggle-bg-warning: @warning-main;
@toggle-bg-error: @error-main;
```

Сгенерируется файл theme.js:

```typescript static
export default {
  btnDangerBg: '#e14c30',
  warningMain: '#f69c00',
  errorMain: '#d70c17',
  borderColorGrayDark: 'rgba(0, 0, 0, 0.28)',
  borderColorGrayLight: 'rgba(0, 0, 0, 0.15)',
  tabColorHoverError: '#ee9989',
  toggleBgWarning: '#f69c00',
  toggleBgError: '#d70c17',
};
```

Далее объект из `theme.js` нужно передавать в ThemeProvider:

```jsx static
import ReactDOM from 'react-dom';
import React from 'react';
import ThemeFactory from '@skbkontur/react-ui/lib/theming/ThemeFactory';
import ThemeProvider from '@skbkontur/react-ui/components/ThemeProvider';

import App from './components/App';
import theme from './theme/theme';

ReactDOM.render(
  <ThemeProvider value={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('app'),
);
```

В случае, если приложение не является полноценным React-приложением, и тему нужно переопределить единоразово, то можно воспользоваться методом `overrideDefaultTheme` в `ThemeFactory`:

```typescript static
// точка входа в приложение
...
import theme from './theme/theme';
import ThemeFactory from '@skbkontur/react-ui/lib/theming/ThemeFactory';

ThemeFactory.overrideDefaultTheme(theme);
...
```

### Подключение плоской темы

Плоскую тему можно было "включить" вызвав метод `Uprgades.enableFlatDesign()`.
На данный момент существует два механизма "включения" плоской темы:

1. Путь джедая:
   В начале времен, где-то в _App.(j|t)sx_

   ```jsx harmony static
   import ThemeProvider from '@skbkontur/react-ui/components/ThemeProvider';
   import FlatTheme from '@skbkontur/react-ui/lib/theming/themes/FlatTheme';

   const App = (
     <ThemeContext.Provider value={FLAT_THEME}>
       <div />
     </ThemeContext.Provider>
   );
   ```

2. Для ленивых:

   - выделить и скопировать "ThemeFactory.overrideDefaultTheme(FlatTheme)"
   - ctrl+shift+f -> "Uprgades.enableFlatDesign()" -> enter;
   - вставить "ThemeFactory.overrideDefaultTheme(FlatTheme)";
   - alt+enter 2 раза (add import statement).

   Должно получиться:

   ```typescript static
   import ThemeFactory from '@skbkontur/react-ui/lib/theming/ThemeFactory';
   import FlatTheme from '@skbkontur/react-ui/lib/theming/themes/FlatTheme';

   // вместо:
   // Uprgades.enableFlatDesign();
   ThemeFactory.overrideDefaultTheme(FLAT_THEME);
   ```
