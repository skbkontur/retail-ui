# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.7.3](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@0.7.2...react-ui-validations@0.7.3) (2019-04-01)

**Note:** Version bump only for package react-ui-validations





## [0.7.2](https://github.com/skbkontur/retail-ui/compare/react-ui-validations@0.7.1...react-ui-validations@0.7.2) (2019-03-26)

**Note:** Version bump only for package react-ui-validations

## 0.7.1 (2019-03-26)

### Bug Fixes

- **ComboBoxOld:** bring typings back ([65d26cd](https://github.com/skbkontur/retail-ui/commit/65d26cd))
- **ValidationWrapper:** scroll to element even if child ref is empty ([58ad2fc](https://github.com/skbkontur/retail-ui/commit/58ad2fc))
- **ValidationWrapper:** support different refs ([#1243](https://github.com/skbkontur/retail-ui/issues/1243)) ([b63038a](https://github.com/skbkontur/retail-ui/commit/b63038a))

v0.2.15

- Добавлены тайпинги для Typescript
- Сборка скриптов через rollup

v0.2.13

- [Fix] Исправление скроллинга в маленьких модальных окнах

v0.2.10

- [Fix] Починен HTMLElement polyfill для IE8

v0.2.9

- [Fix] Удалены лишние onValidationUpdated

v0.2.7

- [Fix] Корректная работа валидация для `DatePicker` (#12)
- [Fix] Исправлена проблема производительности для некоторых случаев (thx to @mr146)
- [Fix] Понятное сообщение если Wrapper вне контекса валидаций (#8)
- [Fix] Исправление для IE8: HTMLElement polyfill (#13, thx to @Frumcheg)

v0.2.5

- Используем [prop-types]
- [Fix] Возможность прокрутки к элементу, у которого нет метода `focus`
