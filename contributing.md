# Styleguides

## Git Commit Messages

В проекте используется [commitlint](http://marionebl.github.io/commitlint/#/). Формат сообщений [таков](https://conventionalcommits.org/).

К коммитам стоит относиться внимательно, т.к. на их основе будет формироваться `changelog` и версионирование библиотек.
Для упрощения написания коммитов стоит использовать команду `yarn commit`.

## Pre-require

Для разработки необходимо

- Установить `git-lfs` https://git-lfs.github.com
- `Windows`:
  - `yarn global add windows-build-tools`
- `OS X`:
  - `xcode-select install`

## Tests/Build/Storybook

- `yarn workspace retail-ui <command>`
  - `test` — Юнит тесты `Jest` + `Enzyme`
  - `lint` — `tsc --noEmit` + `tslint` + `eslint` + `stylelint` + `flow --check`
  - `build` — Сборка библиотеки
  - `storybook` — Storybook
  - `styleguide` — Styleguidist server
- `yarn workspace react-ui-testing <command>`
  - `start` — Старт приложения для интеграционных тестов (используется собранная версия библиотеки)
  - `test` — Интеграционные тесты с использованием `SeleniumTesting` (работает только во внутренней сети Контура)
- `yarn workspace react-ui-screenshot-tests test:gui` — Скриншотные тесты (для работы необходим API ключ от SauceLabs. Спросить можно у @wKich)

## TypesScript

Используется `tslint` и `strict mode`. Не стоит злоупотреблять флагами `/* tslint:disable */`
