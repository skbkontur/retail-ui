# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.1](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@1.1.0...react-ui-validations@1.1.1) (2020-02-06)

**Note:** Version bump only for package react-ui-validations





# [1.1.0](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@1.0.8...react-ui-validations@1.1.0) (2020-01-20)


### Features

* **telemetry:** add field for identifying components ([b7fec03](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/commit/b7fec03)), closes [#1838](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/issues/1838)





## [1.0.8](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@1.0.7...react-ui-validations@1.0.8) (2019-12-27)

**Note:** Version bump only for package react-ui-validations





## [1.0.7](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@1.0.6...react-ui-validations@1.0.7) (2019-12-02)

**Note:** Version bump only for package react-ui-validations





## [1.0.6](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@1.0.5...react-ui-validations@1.0.6) (2019-11-18)


### Bug Fixes

* **ValidationTooltip:** detection radiogroup, add inline-block wrapper ([b65227d](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/commit/b65227d)), closes [#1616](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/issues/1616)
* **ValidationWrapperInternal:** pass down focus event ([8cfc707](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/commit/8cfc707)), closes [#1735](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/issues/1735)





## [1.0.5](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@1.0.4...react-ui-validations@1.0.5) (2019-10-30)

**Note:** Version bump only for package react-ui-validations





## [1.0.4](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@1.0.3...react-ui-validations@1.0.4) (2019-10-02)

**Note:** Version bump only for package react-ui-validations





## [1.0.3](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@1.0.2...react-ui-validations@1.0.3) (2019-09-11)


### Bug Fixes

* don't copy source code into publishing package ([3a5e49f](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/commit/3a5e49f))





## [1.0.2](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@1.0.1...react-ui-validations@1.0.2) (2019-09-03)

**Note:** Version bump only for package react-ui-validations





## [1.0.1](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@1.0.0...react-ui-validations@1.0.1) (2019-07-02)


### Features

* Customization ([#1333](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/issues/1333)) ([15e9e8f](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/commit/15e9e8f))


### BREAKING CHANGES

* Upgrades.enableSizeMedium16px is no longer working: redefine fontSizeMedium
variable via ThemeProvider or by calling ThemeFactory.overrideDefaultTheme()

* refactor(ColorObject): remove require call

* style(Upgrades): fix lint error

* chore(storybook): use ThemeProvider instead of overrideDefaultTheme

* refactor(ThemeFactory): remove ThemesCache

* refactor(ThemeEditor): clear timeout on unmount

* refactor(variables.less): prepare for Date* controls convertion

* feat(DateSelect): customize with css-in-js

* refactor(DatePickerOld): rename less file to prevent confusion

* feat(DatePicker): customize with css-in-js

* refactor(DateInput): properly separate styles between components

* feat(DateInput): customize with css-in-js

* feat(Calendar): customize with css-in-js

* refactor(TokenInput): add -webkit-text-fill-color

* refactor(styles): remove rt-ie8, rt-ie9

* refactor(Calendar): rename classnames to cx

* refactor(variables.less): move mixins into separate file

* style(CustomComboBox): specify px for padding-bottom

* style(SidePage): fix variable typo

* refactor(styles): remove unnecessary imports

* refactor(FormatSourceCode): rewrite code in more readable way

* test(ComboBoxView): approve screens with new spinner gray color

* fix(Button): fix sizeMedium baseline regress

* test(Button): approve screenshots with 14px medium font-size

* test(ComboBox): approve darker spinner color while loading items

* refactor(TokenInput): simplify styles

* refactor(TokenInput): fix firefox placeholder opacity

* refactor(DateSelect): make active prevail over selected

* refactor(DatePicker): fix red color bug

* refactor(DatePicker): make weekend prevail over today

* refactor(DateFragmentsView): fix .delimiter.filled combination style

* style(AnotherInputsPlayground): remove underscores from private methods

* test(AnotherInputsPlayground): stable date for screenshots

* test(Customization): approve actual screenshots

* refactor(customization): separate ThemeProviderPlayground component

* docs(ThemeProviderPlayground ): add README

* docs(customization): add core README

# copied from PR

* build(styleguide): add customization section to config

* chore(ThemeProviderPlayground): fix import

* test(Button): approve 14px font-size for medium size in flat theme

* refactor(customization): introduce derived font sizes for button/input

* refactor(Button): use fontSize=16px for size=medium in flat theme

* test(Button): approve 16px font-size for medium size in flat theme

* test(Customization): approve 16px font-size in flat theme

* refactor(DateInput): remove isSizeMedium16pxEnabled() in favor of theme

* refactor(Upgrades): cleanup deprecated methods

* docs(customization): fix styleguide's components and sections

* docs(customization): hack-fix ordered lists

* docs(customization): remove broken links

* docs(customization): fix less formatting

* docs(customization): add some line-breaks

* docs(customization): emphasize inline <code> the way it's done at github

* docs(customization): switch 'jsx static' to 'typescript' for some blocks

* docs(customization): use monospace font for inline <code>

* chore(Button): fix baseline of flat medium Button

* docs(customization): fix typo

* style: format with prettier

* style: make stylelint ignore *.ts





# [1.0.0](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@0.9.1...react-ui-validations@1.0.0) (2019-07-02)


### Bug Fixes

* **react-ui-validations:** tooltip improvements ([278debf](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/commit/278debf)), closes [#1138](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/issues/1138) [#1102](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/issues/1102)
* **ValidationWrapper:** lostfocus tooltip behaviour ([be4e355](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/commit/be4e355)), closes [#1428](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/issues/1428)


### Code Refactoring

* **ValidationWrapper:** simplify ([0b3f630](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/commit/0b3f630))


### BREAKING CHANGES

* **ValidationWrapper:** ValidationWrapper api changed





## [0.9.1](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@0.9.0...react-ui-validations@0.9.1) (2019-06-04)

**Note:** Version bump only for package react-ui-validations





# [0.9.0](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@0.8.1...react-ui-validations@0.9.0) (2019-05-28)


### Features

* **react-ui-validations:** declarative validation description ([18416c7](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/commit/18416c7))
* **react-ui-validations:** docs rework ([ec76425](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/commit/ec76425))





## [0.8.1](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@0.8.0...react-ui-validations@0.8.1) (2019-04-16)

**Note:** Version bump only for package react-ui-validations





# [0.8.0](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/compare/react-ui-validations@0.7.3...react-ui-validations@0.8.0) (2019-04-08)


### Features

* **ValidationContainer:** add top, bottom, scroll offset ([b43df32](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations/commit/b43df32))





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
