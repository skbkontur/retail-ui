# Единый репозиторий react-ui и react-ui-validations

## Пакеты

- **retail-ui:** библиотека компонентов ([readme](packages/retail-ui/README.md))
- **react-ui-validations** - библиотека валидации ([readme](packages/react-ui-validations/README.md))
- **react-ui-screenshot-tests** - пакет для скриншотных тестов библиотеки компонентов
- **react-ui-codemodes** - коллекция кодмод для разных целей и задач

## Установка и запуск

Для управления репозиторием и пакетами используется **[lernajs](https://lernajs.io/)**, все команды выполняются через нее.

Установка зависимостей для всех пакетов:

```sh
$ yarn && yarn bootstrap
```

Очистка `node_modules` всех пакетов:

```sh
$ yarn clean
```

Пример запуска **storybook** в retail-ui:

```sh
$ yarn lerna --stream --scope retail-ui run storybook
```
