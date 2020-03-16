# react-ui-codemodes

Пакет с кодмодами для помощи с трансформацией кода при обновлении библиотеки.

### Использование

С помощью [npx](https://www.npmjs.com/package/npx):

```
npx react-ui-codemodes CODEMODE_PATH [JSCODESHIFT_OPTIONS] [CODEMODE_OPTIONS]
```

или с установкой пакета:

```
yarn add react-ui-codemodes
yarn react-ui-codemodes CODEMODE_PATH [JSCODESHIFT_OPTIONS] [CODEMODE_OPTIONS]
```

### Опции

`CODEMODE_PATH` - относительный путь до кодмода внутри пакета (см. [примеры использования](#примеры-использования)).

В качестве `JSCODESHIFT_OPTIONS` принимаются [все опции](https://github.com/facebook/jscodeshift#usage-cli) jscodeshift, кроме `-t (--transform)`. По умолчанию трансформируются файлы с расширением "js, jsx", используя "babel" в качестве парсера. Для typescript и flow файлов стоит передавать соответствующие опции: `--extensions="ts,tsx" --parser=tsx` и `--parser=flow`.

Некоторые кодмоды также имеют свои опции (`CODEMODE_OPTIONS`). Подробнее о них в [гайдах по миграции](../../MIGRATION.md).

### Примеры

```
npx react-ui-codemodes font-to-svf/transform.js ./src
npx react-ui-codemodes react-ui-2.0/transformImportsAndExports.ts ./src --alias=retail-ui
npx react-ui-codemodes react-ui-2.0/addCloudProp.ts ./src --extensions=ts,tsx --parser=tsx --component=Spinner
npx react-ui-codemodes react-ui-2.0/moveToAddons.ts ./src --parser=flow
```
