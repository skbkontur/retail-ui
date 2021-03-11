# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.6](https://github.com/skbkontur/retail-ui/compare/react-ui-codemod@1.0.5...react-ui-codemod@1.0.6) (2020-12-03)

**Note:** Version bump only for package react-ui-codemod





## [1.0.5](https://github.com/skbkontur/retail-ui/compare/react-ui-codemod@1.0.4...react-ui-codemod@1.0.5) (2020-07-08)


### Bug Fixes

* **react-ui-codemod:** don't change unmodified sources ([9738f61](https://github.com/skbkontur/retail-ui/commit/9738f617be4724120882e67a447aa95e3f7da46c))





## 1.0.4 (2020-03-24)

**Note:** Version bump only for package react-ui-codemod





## [1.0.2](https://github.com/skbkontur/retail-ui/compare/react-ui-codemodes@1.0.1...react-ui-codemodes@1.0.2) (2019-07-02)


### Features

* Customization ([#1333](https://github.com/skbkontur/retail-ui/issues/1333)) ([15e9e8f](https://github.com/skbkontur/retail-ui/commit/15e9e8f))


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





## [1.0.1](https://github.com/skbkontur/retail-ui/compare/react-ui-codemodes@1.0.0...react-ui-codemodes@1.0.1) (2019-03-12)

**Note:** Version bump only for package react-ui-codemodes
