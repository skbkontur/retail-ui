# react-ui-codemod

Пакет с кодмодами для помощи с трансформацией кода при обновлении библиотеки.

## Использование

С помощью [npx](https://www.npmjs.com/package/npx):

```
npx react-ui-codemod CODEMOD [JSCODESHIFT_OPTIONS] [CODEMOD_OPTIONS]
```

или с установкой пакета:

```
yarn add react-ui-codemod
yarn react-ui-codemod CODEMOD [JSCODESHIFT_OPTIONS] [CODEMOD_OPTIONS]
```

## Опции

`CODEMOD` - относительный путь до кодмода внутри пакета.

В качестве `JSCODESHIFT_OPTIONS` принимаются [все опции](https://github.com/facebook/jscodeshift#usage-cli) jscodeshift, кроме `-t (--transform)`. По умолчанию трансформируются файлы с расширением "js, jsx", используя "babel" в качестве парсера. Для typescript и flow файлов стоит передавать соответствующие опции: `--extensions="ts,tsx" --parser=tsx` и `--parser=flow`.

Некоторые кодмоды также могут иметь свои опции (`CODEMOD_OPTIONS`).

## Список кодмодов

### react-ui-2.0/transformImportsAndExports.ts

Правит импорты и реэкспорты из библиотеки в соответствии с изменениями #1828 #1932.

Трансформации в общих чертах:

- все компоненты импортируются из `@skbkontur/react-ui`
- дефолтные импорты/экспорты из библиотеки заменяются на именованные
- публичные компоненты импортируются из корня пакета
- все internal-компоненты перенесены в "@skbkontur/react-ui/internal"

```
npx react-ui-codemod react-ui-2.0/transformImportsAndExports.ts FILES_PATH
```

| Опции    | Описание                                                                                   | По умолчанию          |
| -------- | ------------------------------------------------------------------------------------------ | --------------------- |
| `alias`  | Имя пакета контролов, который используется в проекте, или его alias. Например, "retail-ui" | `@skbkontur/react-ui` |
| `dedupe` | Объединять ли ипорты/экспорты из одного источника в общий после трансформации              | `true`                |

<a name="transformOnChange"></a>**Внимание**: импорты некоторых непубличных модулей, например `@skbkontur/react-ui/components/DatePicker/DatePickerHelpers`, будут так же трансформированы в импорты из индекса `@skbkontur/react-ui` и сломаются. Такие места нужно будет поправить вручную.

### react-ui-2.0/transformOnChange.ts

Трансформирует пропы "onChange" в соответствии с изменениями #1859. Смотри таблицу изменений в #1843.

```
npx react-ui-codemod react-ui-2.0/transformOnChange.ts FILES_PATH
```

### react-ui-2.0/moveToAddons.ts

> Применяется только после `transformInputsAndExports`

Правит импорты специфичных компонентов в соответствии с изменениями #1848. Может быть применен к отдельным компонентам.

Трансформации в общих чертах:

- компоненты Fias, FiasSearch, Logotype, TopBar, Spinner ипортируются из пакета "@skbkontur/react-ui-addons"

```
npx react-ui-codemod react-ui-2.0/moveToAddons.ts FILES_PATH --component=COMPONENT
```

| Опции       | Описание                                                     | По умолчанию                                 |
| ----------- | ------------------------------------------------------------ | -------------------------------------------- |
| `component` | Имя отдельного компонента для трансформации, например "Fias" | По умелчанию применяется ко всем компонентам |

### react-ui-2.0/addCloudProp.ts

Добавляет проп "cloud" на Loader и Spinner в соответствии с изменениями #1848. Может быть применен к отдельным компонентам.

```
npx react-ui-codemod react-ui-2.0/addPropCloud.ts FILES_PATH --component=COMPONENT
```

| Опции       | Описание                                                       | По умолчанию                                 |
| ----------- | -------------------------------------------------------------- | -------------------------------------------- |
| `component` | Имя отдельного компонента для трансформации, например "Loader" | По умелчанию применяется ко всем компонентам |

### customization/variablesConverter.js

Конвертирует less-переменные в js-объект.

Перед запуском скрипт необходимо скачать и положить в папку с проектом. В процессе конвертации используется пакет [less.js](https://www.npmjs.com/package/less), который скрипт возьмет из зависимостей проекта.

```shell
node variablesConverter.js variables=../../less/myVariables.less output=../theme/theme.js
```

## Примеры

```
npx react-ui-codemod font-to-svf/transform.js ./src
npx react-ui-codemod react-ui-2.0/transformImportsAndExports.ts ./src --alias=retail-ui
npx react-ui-codemod react-ui-2.0/addCloudProp.ts ./src --extensions=ts,tsx --parser=tsx --component=Spinner
npx react-ui-codemod react-ui-2.0/moveToAddons.ts ./src --parser=flow
```
