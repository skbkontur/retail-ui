# Единый репозиторий react-ui и react-ui-validations

## Пакеты

- **retail-ui:** библиотека компонентов ([readme](packages/retail-ui/README.md), [changelog](packages/retail-ui/CHANGELOG.md), [roadmap](packages/retail-ui/ROADMAP.md))
- **react-ui-validations** - библиотека валидации ([readme](packages/react-ui-validations/README.md))
- **react-ui-screenshot-tests** - пакет для скриншотных тестов библиотеки компонентов
- **react-ui-codemodes** - коллекция кодмод для разных целей и задач

## Установка и запуск

Для управления репозиторием и пакетами используется **[lernajs](https://lernajs.io/)** (используется для публикаци **retail-ui** в npm) и **[yarn workspace](https://yarnpkg.com/lang/en/docs/workspaces/)**.

Установка зависимостей для всех пакетов:

```sh
$ yarn
```

Пример запуска **storybook** в retail-ui:

```sh
$ yarn workspace retail-ui storybook
```
