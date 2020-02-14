# Единый репозиторий react-ui и react-ui-validations

## Пакеты

- **react-ui:** библиотека компонентов ([readme](packages/react-ui/README.md), [changelog](packages/react-ui/CHANGELOG.md), [roadmap](packages/react-ui/ROADMAP.md))
- **react-ui-validations** - библиотека валидации ([readme](packages/react-ui-validations/README.md))
- **react-ui-selenium** - пакет для скриншотных тестов библиотеки компонентов
- **react-ui-codemodes** - коллекция кодмод для разных целей и задач

## Установка и запуск

Для управления репозиторием и пакетами используется **[lernajs](https://lernajs.io/)** (используется для публикации **react-ui** в npm) и **[yarn workspace](https://yarnpkg.com/lang/en/docs/workspaces/)**.

Установка зависимостей для всех пакетов:

```sh
$ yarn
```

Пример запуска **storybook** в react-ui:

```sh
$ yarn workspace @skbkontur/react-ui storybook
```
