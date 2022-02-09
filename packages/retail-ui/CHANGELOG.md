# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.6.8](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.6.7...retail-ui@1.6.8) (2019-12-16)


### Bug Fixes

* **SidePageHeader:** fix maximum update depth ([548b894](https://github.com/skbkontur/retail-ui/commit/548b894))





## [1.6.7](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.6.6...retail-ui@1.6.7) (2019-12-10)


### Bug Fixes

* **TokenInput:** fix module import ([440d199](https://github.com/skbkontur/retail-ui/commit/440d199))





## [1.6.6](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.6.5...retail-ui@1.6.6) (2019-12-02)


### Bug Fixes

* **Loader:** correctly work with Sticky ([493cd18](https://github.com/skbkontur/retail-ui/commit/493cd18))
* **Modal:** added word-break: break-word to Modal.Header ([#1754](https://github.com/skbkontur/retail-ui/issues/1754)) ([96f5bc5](https://github.com/skbkontur/retail-ui/commit/96f5bc5))
* **Sticky:** correct work with other ZIndex components ([d198ee1](https://github.com/skbkontur/retail-ui/commit/d198ee1)), closes [#1750](https://github.com/skbkontur/retail-ui/issues/1750) [#1764](https://github.com/skbkontur/retail-ui/issues/1764)
* **ZIndex:** don't call remount children components ([5db3a29](https://github.com/skbkontur/retail-ui/commit/5db3a29)), closes [#1761](https://github.com/skbkontur/retail-ui/issues/1761)





## [1.6.5](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.6.4...retail-ui@1.6.5) (2019-11-26)


### Bug Fixes

* **Popup:** disable call findDOMNode when location is null ([da7cd1c](https://github.com/skbkontur/retail-ui/commit/da7cd1c))





## [1.6.4](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.6.3...retail-ui@1.6.4) (2019-11-25)


### Bug Fixes

* **Loader:** don't apply zIndex context in inactive state ([b170cd2](https://github.com/skbkontur/retail-ui/commit/b170cd2)), closes [#1746](https://github.com/skbkontur/retail-ui/issues/1746)
* **Popup:** don't render portal container on closed state ([bee3a28](https://github.com/skbkontur/retail-ui/commit/bee3a28))





## [1.6.3](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.6.2...retail-ui@1.6.3) (2019-11-18)


### Bug Fixes

* **Loader:** reset z-index only in active state ([8f1d936](https://github.com/skbkontur/retail-ui/commit/8f1d936)), closes [#1716](https://github.com/skbkontur/retail-ui/issues/1716) [#1722](https://github.com/skbkontur/retail-ui/issues/1722)
* **SidePage:** shadow always cover loader content ([eea3782](https://github.com/skbkontur/retail-ui/commit/eea3782)), closes [#1718](https://github.com/skbkontur/retail-ui/issues/1718)
* **Toggle:** checked and focused view ([#1727](https://github.com/skbkontur/retail-ui/issues/1727)) ([945d3cb](https://github.com/skbkontur/retail-ui/commit/945d3cb)), closes [#1682](https://github.com/skbkontur/retail-ui/issues/1682)
* **Tooltip:** added clear timeout to unmount method ([37fb81a](https://github.com/skbkontur/retail-ui/commit/37fb81a))





## [1.6.2](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.6.1...retail-ui@1.6.2) (2019-11-06)


### Bug Fixes

* **Sticky:** move fixed element on horizontal scroll ([85882e3](https://github.com/skbkontur/retail-ui/commit/85882e3)), closes [#1705](https://github.com/skbkontur/retail-ui/issues/1705)
* **Toast:** show above Loader ([5b6ccf7](https://github.com/skbkontur/retail-ui/commit/5b6ccf7)), closes [#1706](https://github.com/skbkontur/retail-ui/issues/1706)





## [1.6.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.6.0...retail-ui@1.6.1) (2019-10-30)


### Bug Fixes

* **MonthView:** wrong import colorFunctions ([24eeb1e](https://github.com/skbkontur/retail-ui/commit/24eeb1e))





# [1.6.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.5.0...retail-ui@1.6.0) (2019-10-30)


### Bug Fixes

* **Checkbox:** add calling onBlur in handleBlur ([47791d9](https://github.com/skbkontur/retail-ui/commit/47791d9)), closes [#1565](https://github.com/skbkontur/retail-ui/issues/1565)
* **ColorObject:** fix returning string from hsl color ([3d83c48](https://github.com/skbkontur/retail-ui/commit/3d83c48)), closes [#1695](https://github.com/skbkontur/retail-ui/issues/1695)
* **DatePicker:** fix color border-bottom of month ([89e69cf](https://github.com/skbkontur/retail-ui/commit/89e69cf)), closes [#1605](https://github.com/skbkontur/retail-ui/issues/1605)
* **MenuItem:** call onMouseEnter/Leave in cloned element ([ff397c9](https://github.com/skbkontur/retail-ui/commit/ff397c9))
* **RadioGroup:** pass onBlur into Radio ([20f9dcb](https://github.com/skbkontur/retail-ui/commit/20f9dcb)), closes [#1670](https://github.com/skbkontur/retail-ui/issues/1670)
* **Select:** add missing comment type ([bf89513](https://github.com/skbkontur/retail-ui/commit/bf89513))
* **Select:** fix color placeholder ([5e35c59](https://github.com/skbkontur/retail-ui/commit/5e35c59))
* **Sticky:** infinity render loop in IE ([85180dd](https://github.com/skbkontur/retail-ui/commit/85180dd))
* **Sticky:** maximum update depth exceeded ([75fb581](https://github.com/skbkontur/retail-ui/commit/75fb581)), closes [#1485](https://github.com/skbkontur/retail-ui/issues/1485)
* **Tooltip:** reset position on close ([4d03a22](https://github.com/skbkontur/retail-ui/commit/4d03a22)), closes [#1673](https://github.com/skbkontur/retail-ui/issues/1673)
* **TopBar:** fix noShadow prop ([1af4648](https://github.com/skbkontur/retail-ui/commit/1af4648)), closes [#1672](https://github.com/skbkontur/retail-ui/issues/1672)


### Features

* **ColorFunctions:** add fade function ([a10dcb9](https://github.com/skbkontur/retail-ui/commit/a10dcb9))
* **DefaultTheme:** add variable 'chbCheckedShadow' ([b2531b3](https://github.com/skbkontur/retail-ui/commit/b2531b3))
* **Emotion:** add 'prefixer' for classes ([6043228](https://github.com/skbkontur/retail-ui/commit/6043228))
* **FlatTheme:** add variables 'chbCheckedShadow' and 'chbBorderRadius' ([e3424e7](https://github.com/skbkontur/retail-ui/commit/e3424e7))
* **FlatTheme:** add vars 'chbShadowHover' and 'chbCheckedHoverShadow' ([62dad9c](https://github.com/skbkontur/retail-ui/commit/62dad9c))
* **FocusTrap:** add component FocusTrap ([1baf0c3](https://github.com/skbkontur/retail-ui/commit/1baf0c3))
* **Theme:** remove calendarMonthTitleBorderBottom ([3dcfb6f](https://github.com/skbkontur/retail-ui/commit/3dcfb6f))
* **ZIndex:** add layers priority ([68ea45b](https://github.com/skbkontur/retail-ui/commit/68ea45b)), closes [#776](https://github.com/skbkontur/retail-ui/issues/776)





# [1.5.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.4.0...retail-ui@1.5.0) (2019-10-09)


### Bug Fixes

* **ComboBox:** add offsetX for DropDownContainer ([6cbea25](https://github.com/skbkontur/retail-ui/commit/6cbea25)), closes [#1005](https://github.com/skbkontur/retail-ui/issues/1005)
* **CurrencyLabel:** fix defaultProps definition ([2794e1a](https://github.com/skbkontur/retail-ui/commit/2794e1a))
* **customization:** change 'blinkColor' ([03fd81f](https://github.com/skbkontur/retail-ui/commit/03fd81f)), closes [#1646](https://github.com/skbkontur/retail-ui/issues/1646)
* **Select:** fix calls prop onKeyDown ([6720eff](https://github.com/skbkontur/retail-ui/commit/6720eff)), closes [#1665](https://github.com/skbkontur/retail-ui/issues/1665)
* **TopBarDropDown:** make 'use' prop required ([fcea8b1](https://github.com/skbkontur/retail-ui/commit/fcea8b1))


### Features

* **Paging:** deprecate 'strings' prop ([6c84288](https://github.com/skbkontur/retail-ui/commit/6c84288))
* **Paging:** remove 'strings' prop ([58cabb7](https://github.com/skbkontur/retail-ui/commit/58cabb7)), closes [#1232](https://github.com/skbkontur/retail-ui/issues/1232)
* **ThemeContext:** exports ThemeContext ([ef0579b](https://github.com/skbkontur/retail-ui/commit/ef0579b)), closes [#1656](https://github.com/skbkontur/retail-ui/issues/1656)
* **TopBarDropDown:** added "default" "use" option ([74ef3b3](https://github.com/skbkontur/retail-ui/commit/74ef3b3))
* **TopBarDropDown:** added flow types ([f3909be](https://github.com/skbkontur/retail-ui/commit/f3909be))





# [1.4.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.3.1...retail-ui@1.4.0) (2019-10-02)


### Bug Fixes

* **Button:** isButton is undefined when use adapter ([0e41da9](https://github.com/skbkontur/retail-ui/commit/0e41da9))
* **CurrencyInput:** don't throw error if fractionDigits is zero/float ([3c70c20](https://github.com/skbkontur/retail-ui/commit/3c70c20)), closes [#1558](https://github.com/skbkontur/retail-ui/issues/1558)
* **DatePicker:** prepare PR to fork ([832fb7b](https://github.com/skbkontur/retail-ui/commit/832fb7b))
* **DatePicker:** remove console.log ([67951d7](https://github.com/skbkontur/retail-ui/commit/67951d7))
* **DatePicker:** simplify fallback structure for ie ([f9e27ed](https://github.com/skbkontur/retail-ui/commit/f9e27ed))
* **DatePicker:** Баг с кликом на день календаря в Edge [#1557](https://github.com/skbkontur/retail-ui/issues/1557) ([7b24f69](https://github.com/skbkontur/retail-ui/commit/7b24f69))
* **DatePicker:** Привел в порядок типизацию в DateInputFallback [#1557](https://github.com/skbkontur/retail-ui/issues/1557) ([dcebd76](https://github.com/skbkontur/retail-ui/commit/dcebd76))
* **docs:** fix code formatter of the ThemeShowcase ([42b99c2](https://github.com/skbkontur/retail-ui/commit/42b99c2))
* **Fias:** escape regexp spec chars ([cace4b6](https://github.com/skbkontur/retail-ui/commit/cace4b6)), closes [#1636](https://github.com/skbkontur/retail-ui/issues/1636)
* **Radio:** show label as disabled if context.disabled is true ([de64b32](https://github.com/skbkontur/retail-ui/commit/de64b32)), closes [#1275](https://github.com/skbkontur/retail-ui/issues/1275)
* **Toggle:** show tooltip on disabled toggle in ie ([3db9565](https://github.com/skbkontur/retail-ui/commit/3db9565)), closes [#1630](https://github.com/skbkontur/retail-ui/issues/1630)


### Features

* **Combobox:** add prop onInputKeyDown ([b804b84](https://github.com/skbkontur/retail-ui/commit/b804b84))
* **lib:** add key identification tools ([73479fe](https://github.com/skbkontur/retail-ui/commit/73479fe)), closes [#1429](https://github.com/skbkontur/retail-ui/issues/1429)
* **Select:** add prop onKeyDown ([ba41e73](https://github.com/skbkontur/retail-ui/commit/ba41e73))





## [1.3.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.3.0...retail-ui@1.3.1) (2019-09-24)


### Bug Fixes

* **Dropdown:** sync type of `width` prop type with proptypes checks ([47a5612](https://github.com/skbkontur/retail-ui/commit/47a5612))
* **Input:** avoid bug with transition in IE ([45f45d5](https://github.com/skbkontur/retail-ui/commit/45f45d5)), closes [#1614](https://github.com/skbkontur/retail-ui/issues/1614)
* **Popup:** deterministic open/close animation ([0415fa4](https://github.com/skbkontur/retail-ui/commit/0415fa4)), closes [#1372](https://github.com/skbkontur/retail-ui/issues/1372)
* **RenderContainer:** getRootId changed ([b0ce223](https://github.com/skbkontur/retail-ui/commit/b0ce223))
* **TokenInput:** make height equal to the Input ([92e9d8b](https://github.com/skbkontur/retail-ui/commit/92e9d8b)), closes [#1589](https://github.com/skbkontur/retail-ui/issues/1589)





# [1.3.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.2.0...retail-ui@1.3.0) (2019-09-11)


### Bug Fixes

* **Button:** change disabled bg & shadow for the FlatTheme ([765e9d4](https://github.com/skbkontur/retail-ui/commit/765e9d4))
* **Button:** fix emotion className interpolation warning ([ad5d2a2](https://github.com/skbkontur/retail-ui/commit/ad5d2a2))
* **Checkbox:** prevent styles reset, caused by code-splitting ([2161a4d](https://github.com/skbkontur/retail-ui/commit/2161a4d)), closes [#1556](https://github.com/skbkontur/retail-ui/issues/1556)
* **Select:** prevent arrow color reset, caused by code-splitting ([e7a6dc3](https://github.com/skbkontur/retail-ui/commit/e7a6dc3)), closes [#1568](https://github.com/skbkontur/retail-ui/issues/1568)


### Features

* **Logotype:** add props size and onArrowClick ([94fc027](https://github.com/skbkontur/retail-ui/commit/94fc027))





# [1.2.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.1.2...retail-ui@1.2.0) (2019-09-03)


### Bug Fixes

* **Button:** add disabled color to the "link" use ([20c002b](https://github.com/skbkontur/retail-ui/commit/20c002b)), closes [#1563](https://github.com/skbkontur/retail-ui/issues/1563)
* **Button:** fix arrow error/warning outline ([6a18b05](https://github.com/skbkontur/retail-ui/commit/6a18b05)), closes [#1531](https://github.com/skbkontur/retail-ui/issues/1531)
* **ComboBox:** spinner position by baseline ([5f144e8](https://github.com/skbkontur/retail-ui/commit/5f144e8)), closes [#1333](https://github.com/skbkontur/retail-ui/issues/1333)
* **DatePicker:** change year limits for better limit date validations ([1b552f3](https://github.com/skbkontur/retail-ui/commit/1b552f3)), closes [#1573](https://github.com/skbkontur/retail-ui/issues/1573)
* **Icon20px:** prevent from selecting ([763b5b8](https://github.com/skbkontur/retail-ui/commit/763b5b8))
* **react-ui:** support CRA css-modules convention: components ([c1d687a](https://github.com/skbkontur/retail-ui/commit/c1d687a)), closes [#1477](https://github.com/skbkontur/retail-ui/issues/1477)
* **react-ui:** support CRA css-modules convention: variables ([aace330](https://github.com/skbkontur/retail-ui/commit/aace330))
* **Token:** import react as namespace ([8b10014](https://github.com/skbkontur/retail-ui/commit/8b10014)), closes [#1519](https://github.com/skbkontur/retail-ui/issues/1519)


### Features

* **Fias:** render additional fields in the search results ([37fa2db](https://github.com/skbkontur/retail-ui/commit/37fa2db))
* **Fias:** search streets through not only direct parent ([7729fd7](https://github.com/skbkontur/retail-ui/commit/7729fd7))
* **ScrollContainer:** add scrollBehaviour prop ([ad4c7c9](https://github.com/skbkontur/retail-ui/commit/ad4c7c9))





## [1.1.2](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.1.1...retail-ui@1.1.2) (2019-08-07)


### Bug Fixes

* **ComboBox:** keep focus after Enter key press on the list item ([a9b62dd](https://github.com/skbkontur/retail-ui/commit/a9b62dd)), closes [#1532](https://github.com/skbkontur/retail-ui/issues/1532)
* **Group:** removed vertical-align ([2f8cad6](https://github.com/skbkontur/retail-ui/commit/2f8cad6))





## [1.1.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.1.0...retail-ui@1.1.1) (2019-07-31)


### Bug Fixes

* **Button:** changed style 'color' for disabled button to '#a0a0a0' ([521a4e8](https://github.com/skbkontur/retail-ui/commit/521a4e8)), closes [#a0a0a0](https://github.com/skbkontur/retail-ui/issues/a0a0a0) [#1415](https://github.com/skbkontur/retail-ui/issues/1415)
* **customization:** prevent js-styles from overriding by css-resets ([2a9c4ac](https://github.com/skbkontur/retail-ui/commit/2a9c4ac)), closes [#1514](https://github.com/skbkontur/retail-ui/issues/1514)
* **Radio:** decrease types checking time ([f18c74b](https://github.com/skbkontur/retail-ui/commit/f18c74b)), closes [#1518](https://github.com/skbkontur/retail-ui/issues/1518)





# [1.1.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.0.1...retail-ui@1.1.0) (2019-07-23)


### Bug Fixes

* **Button:** change 'background-color' and 'border-color' when hovering ([627b1e6](https://github.com/skbkontur/retail-ui/commit/627b1e6)), closes [#1416](https://github.com/skbkontur/retail-ui/issues/1416)
* **TokenInput:** add input's box-shadow ([6f0789f](https://github.com/skbkontur/retail-ui/commit/6f0789f))
* **TokenInput:** fix flat styles ([0fa0d52](https://github.com/skbkontur/retail-ui/commit/0fa0d52)), closes [#1493](https://github.com/skbkontur/retail-ui/issues/1493)
* **TokenInput:** remove hardcoded dataTid ([9e5151f](https://github.com/skbkontur/retail-ui/commit/9e5151f))


### Features

* **Switcher:** add prop 'size' ([a5e16ae](https://github.com/skbkontur/retail-ui/commit/a5e16ae)), closes [#1492](https://github.com/skbkontur/retail-ui/issues/1492)





## [1.0.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@1.0.0...retail-ui@1.0.1) (2019-07-16)


### Bug Fixes

* **Input:** add calling 'selectAll' via 'raf' ([#1496](https://github.com/skbkontur/retail-ui/issues/1496)) ([37b866d](https://github.com/skbkontur/retail-ui/commit/37b866d)), closes [#1413](https://github.com/skbkontur/retail-ui/issues/1413)
* **Tab:** add error/warning/primary hover borders to vertical tabs ([29f4bc2](https://github.com/skbkontur/retail-ui/commit/29f4bc2))
* **Tab:** remove hover border from disabled tabs ([2f98438](https://github.com/skbkontur/retail-ui/commit/2f98438)), closes [#1504](https://github.com/skbkontur/retail-ui/issues/1504)
* **Textarea:** add blocking Enter after reaching 'maxLength' ([2a862f5](https://github.com/skbkontur/retail-ui/commit/2a862f5))
* **ThemeShowcase:** make it fit enough to squize into styleguidist ([12f184b](https://github.com/skbkontur/retail-ui/commit/12f184b))
* **ThemeShowcase:** source code tooltip contents in production mode ([89c5183](https://github.com/skbkontur/retail-ui/commit/89c5183))





# [1.0.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.53.0...retail-ui@1.0.0) (2019-07-02)


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





# [0.53.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.52.1...retail-ui@0.53.0) (2019-07-02)


### Bug Fixes

* **CurrencyInput:** add 15-digit limit and warning about it ([b523ddf](https://github.com/skbkontur/retail-ui/commit/b523ddf))
* **CurrencyLabel:** add warning about 15-digit limit for fractionDigits ([adba185](https://github.com/skbkontur/retail-ui/commit/adba185))
* **DateInputFallback:** remove unnecessary call 'emitChange' ([cf28a56](https://github.com/skbkontur/retail-ui/commit/cf28a56)), closes [#1466](https://github.com/skbkontur/retail-ui/issues/1466)
* **DropdownContainer:** change calculations for positioning up ([0e9460e](https://github.com/skbkontur/retail-ui/commit/0e9460e)), closes [#1471](https://github.com/skbkontur/retail-ui/issues/1471)
* **Modal:** don't close by click on scrollbar ([d69fca6](https://github.com/skbkontur/retail-ui/commit/d69fca6)), closes [#757](https://github.com/skbkontur/retail-ui/issues/757) [#810](https://github.com/skbkontur/retail-ui/issues/810) [#1352](https://github.com/skbkontur/retail-ui/issues/1352) [#1456](https://github.com/skbkontur/retail-ui/issues/1456)


### Features

* **Fias:** expose FiasSearch ([075bd36](https://github.com/skbkontur/retail-ui/commit/075bd36))





## [0.52.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.52.0...retail-ui@0.52.1) (2019-06-18)

**Note:** Version bump only for package retail-ui





# [0.52.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.51.1...retail-ui@0.52.0) (2019-06-13)


### Bug Fixes

* **Button:**  fix paddings for medium size in flat theme ([3f99560](https://github.com/skbkontur/retail-ui/commit/3f99560)), closes [#1309](https://github.com/skbkontur/retail-ui/issues/1309) [#1451](https://github.com/skbkontur/retail-ui/issues/1451)
* **DropdownMenu:** added missing flow types props ([#1462](https://github.com/skbkontur/retail-ui/issues/1462)) ([eb1bc3e](https://github.com/skbkontur/retail-ui/commit/eb1bc3e))
* **MaskedInput:** add support prop 'defaultValue' ([e8b9436](https://github.com/skbkontur/retail-ui/commit/e8b9436))
* **RenderLayer:** add touchstart handling ([567f80b](https://github.com/skbkontur/retail-ui/commit/567f80b)), closes [#1439](https://github.com/skbkontur/retail-ui/issues/1439)
* **SidePage:** allow pass string to width prop ([#1447](https://github.com/skbkontur/retail-ui/issues/1447)) ([eff4f78](https://github.com/skbkontur/retail-ui/commit/eff4f78))
* **Spinner:** baseline and height are equal to icons ([996c365](https://github.com/skbkontur/retail-ui/commit/996c365))


### Features

* **DatePicker:** add localization ([10d30d0](https://github.com/skbkontur/retail-ui/commit/10d30d0))
* **DateSelect:** add localization ([00a5ea7](https://github.com/skbkontur/retail-ui/commit/00a5ea7))
* **Fias:** add localization ([cc5a7ef](https://github.com/skbkontur/retail-ui/commit/cc5a7ef))
* **lib:** add lib `MouseDrag` ([9e7d329](https://github.com/skbkontur/retail-ui/commit/9e7d329))
* **lib:** add tools for internationalizing dates ([aac2c0d](https://github.com/skbkontur/retail-ui/commit/aac2c0d))
* **LocaleHelper:** add getting locale with default langCode ([d25d2a3](https://github.com/skbkontur/retail-ui/commit/d25d2a3))
* **Tooltip:** add trigger type hover&focus ([422915e](https://github.com/skbkontur/retail-ui/commit/422915e))





## [0.51.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.51.0...retail-ui@0.51.1) (2019-06-04)


### Bug Fixes

* **Fias:** prevent the verification api from returning wrong fields ([d77dc2c](https://github.com/skbkontur/retail-ui/commit/d77dc2c)), closes [#1436](https://github.com/skbkontur/retail-ui/issues/1436)





# [0.51.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.50.0...retail-ui@0.51.0) (2019-05-28)


### Bug Fixes

* **DatePicker:** fix icon style ([3e092ef](https://github.com/skbkontur/retail-ui/commit/3e092ef))
* **MenuItem:** fix triggered `MouseEnter` from disabled button ([1c88969](https://github.com/skbkontur/retail-ui/commit/1c88969))
* **Tabs:** replace check on existence `focus` ([87e0443](https://github.com/skbkontur/retail-ui/commit/87e0443))


### Features

* **CurrencyInput:** add support prop `integerDigits` ([#1404](https://github.com/skbkontur/retail-ui/issues/1404)) ([165e822](https://github.com/skbkontur/retail-ui/commit/165e822)), closes [#685](https://github.com/skbkontur/retail-ui/issues/685)





# [0.50.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.49.1...retail-ui@0.50.0) (2019-05-22)


### Bug Fixes

* **Button:** add dropping `isTabPressed` by mouseDown ([#1400](https://github.com/skbkontur/retail-ui/issues/1400)) ([2d2b870](https://github.com/skbkontur/retail-ui/commit/2d2b870)), closes [#1013](https://github.com/skbkontur/retail-ui/issues/1013)


### Features

* **Toast:** toast is testable ([#1403](https://github.com/skbkontur/retail-ui/issues/1403)) ([5dcdf32](https://github.com/skbkontur/retail-ui/commit/5dcdf32))





## [0.49.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.49.0...retail-ui@0.49.1) (2019-05-16)


### Bug Fixes

* **Select:** bind public focus function to component instance ([5909b9e](https://github.com/skbkontur/retail-ui/commit/5909b9e))
* **Toggle:** fix overflow issue in Safari ([#1411](https://github.com/skbkontur/retail-ui/issues/1411)) ([7073cb5](https://github.com/skbkontur/retail-ui/commit/7073cb5))





# [0.49.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.48.0...retail-ui@0.49.0) (2019-05-14)


### Bug Fixes

* **flow:** update props ([c652880](https://github.com/skbkontur/retail-ui/commit/c652880))
* **Paging:** add autofocus for IE11 ([e434d80](https://github.com/skbkontur/retail-ui/commit/e434d80)), closes [#1358](https://github.com/skbkontur/retail-ui/issues/1358)
* **TokenInput:** add mapping `renderValue` before copying to clipboard ([79c76c0](https://github.com/skbkontur/retail-ui/commit/79c76c0)), closes [#1336](https://github.com/skbkontur/retail-ui/issues/1336)


### Features

* **TokenInput:** add prop `valueToString` ([9e7bf50](https://github.com/skbkontur/retail-ui/commit/9e7bf50))





# [0.48.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.47.0...retail-ui@0.48.0) (2019-04-30)


### Bug Fixes

* **ComboBox:** fix input text with single item behavior ([#1360](https://github.com/skbkontur/retail-ui/issues/1360)) ([c6fa7a5](https://github.com/skbkontur/retail-ui/commit/c6fa7a5)), closes [#992](https://github.com/skbkontur/retail-ui/issues/992)
* **Fias:** search postal Code through all fields ([7433d12](https://github.com/skbkontur/retail-ui/commit/7433d12))
* **Fias:** validate all fields ([8d126f9](https://github.com/skbkontur/retail-ui/commit/8d126f9))
* **flow:** add children to Modal props ([1e7e420](https://github.com/skbkontur/retail-ui/commit/1e7e420))
* **flow:** add missed props ([5538a61](https://github.com/skbkontur/retail-ui/commit/5538a61))
* **Modal:** change modal position according to the guides ([0e7e053](https://github.com/skbkontur/retail-ui/commit/0e7e053)), closes [#1331](https://github.com/skbkontur/retail-ui/issues/1331)
* **Modal:** fix closing on background click ([089bad0](https://github.com/skbkontur/retail-ui/commit/089bad0)), closes [#810](https://github.com/skbkontur/retail-ui/issues/810) [#1352](https://github.com/skbkontur/retail-ui/issues/1352)
* **Popup:** remove hardcoded maxWidth ([721b751](https://github.com/skbkontur/retail-ui/commit/721b751)), closes [#1343](https://github.com/skbkontur/retail-ui/issues/1343)
* **ScrollContainer:** do not access the DOM until it is surely ready ([2b59064](https://github.com/skbkontur/retail-ui/commit/2b59064)), closes [#1371](https://github.com/skbkontur/retail-ui/issues/1371)


### Features

* **ComboBox:** add prop `renderAddButton` ([#1365](https://github.com/skbkontur/retail-ui/issues/1365)) ([55345e1](https://github.com/skbkontur/retail-ui/commit/55345e1))
* **DropdownMenu:** add positions prop ([7fc607d](https://github.com/skbkontur/retail-ui/commit/7fc607d))
* **MenuItem:** add `link` prop ([d705f19](https://github.com/skbkontur/retail-ui/commit/d705f19))





# [0.47.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.46.2...retail-ui@0.47.0) (2019-04-22)


### Bug Fixes

* **Button:** add border radius & background styles in flat theme ([59486e3](https://github.com/skbkontur/retail-ui/commit/59486e3))
* **Button:** fix arrow position in flat version for small button ([2ce7b42](https://github.com/skbkontur/retail-ui/commit/2ce7b42))
* **Button:** fix border color at checked + focused state on hover ([bad4f08](https://github.com/skbkontur/retail-ui/commit/bad4f08))
* **Button:** fix border overlap in visually focused state with error/warning ([72d2787](https://github.com/skbkontur/retail-ui/commit/72d2787))
* **Button:** fix stylelint `eol-whitespace` error ([461850f](https://github.com/skbkontur/retail-ui/commit/461850f))
* **Button:** fixed disabled state shadow styles at flat version ([ad5db6f](https://github.com/skbkontur/retail-ui/commit/ad5db6f))
* **Button:** fixed flat styles in IE ([ad3f558](https://github.com/skbkontur/retail-ui/commit/ad3f558))
* **Input:** add background & border color styles in flat theme ([b106eb2](https://github.com/skbkontur/retail-ui/commit/b106eb2))
* **Paging:** changed detecting of pressed key ([f7b5f24](https://github.com/skbkontur/retail-ui/commit/f7b5f24))
* **Radio:** fixed outline padding in flat styles ([0baf333](https://github.com/skbkontur/retail-ui/commit/0baf333))
* **Textarea:** add background & border color styles in flat theme ([003c268](https://github.com/skbkontur/retail-ui/commit/003c268))
* **Toggle:** add white outline to focused box-shadow ([7b7a3c9](https://github.com/skbkontur/retail-ui/commit/7b7a3c9))


### Features

* **Button:** add arrow styles in flat version ([8e1d268](https://github.com/skbkontur/retail-ui/commit/8e1d268))
* **Button:** add arrows shadow & border styles in flat theme ([1889232](https://github.com/skbkontur/retail-ui/commit/1889232))
* **Button, Checkbox, Radio, Toggle:** add common outline color variable ([58fac79](https://github.com/skbkontur/retail-ui/commit/58fac79))





## [0.46.2](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.46.1...retail-ui@0.46.2) (2019-04-17)


### Bug Fixes

* **Tabs:** context provider render children for reac@15 ([f0df170](https://github.com/skbkontur/retail-ui/commit/f0df170))





## [0.46.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.46.0...retail-ui@0.46.1) (2019-04-16)


### Bug Fixes

* **Autocomplete:** restore lost focus in IE ([a232110](https://github.com/skbkontur/retail-ui/commit/a232110)), closes [#1075](https://github.com/skbkontur/retail-ui/issues/1075)
* **ComboBox:** add missing callbacks ([fab3ff6](https://github.com/skbkontur/retail-ui/commit/fab3ff6))
* **ComboBox:** restore lost focus to outer element on clickOutside in IE ([702f60c](https://github.com/skbkontur/retail-ui/commit/702f60c)), closes [#1075](https://github.com/skbkontur/retail-ui/issues/1075)
* **ComboBoxOld:** restore lost focus in IE ([dff471b](https://github.com/skbkontur/retail-ui/commit/dff471b)), closes [#1075](https://github.com/skbkontur/retail-ui/issues/1075)
* **Hint:** render popup even if no text provided ([cf4a473](https://github.com/skbkontur/retail-ui/commit/cf4a473))
* **Tabs:** correct work with FunctionalComponents ([93163db](https://github.com/skbkontur/retail-ui/commit/93163db)), closes [#1337](https://github.com/skbkontur/retail-ui/issues/1337)
* **Tabs:** error findDOMNode on unmounted active tab component ([90142cb](https://github.com/skbkontur/retail-ui/commit/90142cb))
* **TopBarDropdown:** added methods open & close ([9e7ddcc](https://github.com/skbkontur/retail-ui/commit/9e7ddcc))





# [0.46.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.45.0...retail-ui@0.46.0) (2019-04-08)


### Bug Fixes

* **Button:** compare elements reliable way ([0d7843e](https://github.com/skbkontur/retail-ui/commit/0d7843e)), closes [#1267](https://github.com/skbkontur/retail-ui/issues/1267)
* preventDefault inside passive event listener ([055eb48](https://github.com/skbkontur/retail-ui/commit/055eb48)), closes [#1326](https://github.com/skbkontur/retail-ui/issues/1326)
* safe components usage for SSR ([#1312](https://github.com/skbkontur/retail-ui/issues/1312)) ([0c8c91e](https://github.com/skbkontur/retail-ui/commit/0c8c91e))
* **ComboBoxOld:** args types for renderTotalCount and onInputChange ([4ddd480](https://github.com/skbkontur/retail-ui/commit/4ddd480))
* **Fias:** allow to fill stead and house without street ([9c728e5](https://github.com/skbkontur/retail-ui/commit/9c728e5)), closes [#1314](https://github.com/skbkontur/retail-ui/issues/1314)
* **Menu,InternalMenu:** compare elements reliable way ([4c60cb4](https://github.com/skbkontur/retail-ui/commit/4c60cb4)), closes [#1267](https://github.com/skbkontur/retail-ui/issues/1267)
* **Modal:** compare elements reliable way ([fdba164](https://github.com/skbkontur/retail-ui/commit/fdba164)), closes [#1267](https://github.com/skbkontur/retail-ui/issues/1267)


### Features

* **Fias:** add rooms search ([10843e1](https://github.com/skbkontur/retail-ui/commit/10843e1))





# [0.45.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.44.3...retail-ui@0.45.0) (2019-04-01)


### Bug Fixes

* **Autocomplete:** handle concurrent requests ([dd07ef4](https://github.com/skbkontur/retail-ui/commit/dd07ef4)), closes [#1299](https://github.com/skbkontur/retail-ui/issues/1299)
* **Logotype:** async load products widget script ([85312d9](https://github.com/skbkontur/retail-ui/commit/85312d9))
* **Popup:** children is not required by prop-types ([c976312](https://github.com/skbkontur/retail-ui/commit/c976312)), closes [#1292](https://github.com/skbkontur/retail-ui/issues/1292)
* **ScrollContainer:** multiple scrollbars on OSX ([#827](https://github.com/skbkontur/retail-ui/issues/827)) ([118b347](https://github.com/skbkontur/retail-ui/commit/118b347))
* **Tooltip:** deactivate RenderLayer by default ([0818973](https://github.com/skbkontur/retail-ui/commit/0818973)), closes [#1304](https://github.com/skbkontur/retail-ui/issues/1304)


### Features

* **flow:** add typings ([42f8fed](https://github.com/skbkontur/retail-ui/commit/42f8fed))


### Reverts

* **Popup:** fix regress with dynamically changing callbacks ([1b3bd4e](https://github.com/skbkontur/retail-ui/commit/1b3bd4e)), closes [#1297](https://github.com/skbkontur/retail-ui/issues/1297)
* **RenderLayer): "perf(RenderLayer:** less event subscriptions" ([8e492e8](https://github.com/skbkontur/retail-ui/commit/8e492e8)), closes [#1304](https://github.com/skbkontur/retail-ui/issues/1304)





## [0.44.3](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.44.2...retail-ui@0.44.3) (2019-03-27)


### Bug Fixes

* **Input:** don't show placeholder if mask is visible ([1c40f1d](https://github.com/skbkontur/retail-ui/commit/1c40f1d))
* **Input:** fix placeholder width for masked input ([8696f40](https://github.com/skbkontur/retail-ui/commit/8696f40)), closes [#1272](https://github.com/skbkontur/retail-ui/issues/1272)





## [0.44.2](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.44.1...retail-ui@0.44.2) (2019-03-26)


### Bug Fixes

* **ComboBoxOld:** bring typings back ([65d26cd](https://github.com/skbkontur/retail-ui/commit/65d26cd))
* **hint:** add pin offset ([9c68d44](https://github.com/skbkontur/retail-ui/commit/9c68d44)), closes [#1265](https://github.com/skbkontur/retail-ui/issues/1265)
* **Input:** fix input outlines in IE ([2594500](https://github.com/skbkontur/retail-ui/commit/2594500)), closes [#1197](https://github.com/skbkontur/retail-ui/issues/1197)
* **Popup:** call `onOpen` prop in right moment for react@15 ([07d98e7](https://github.com/skbkontur/retail-ui/commit/07d98e7)), closes [#1257](https://github.com/skbkontur/retail-ui/issues/1257)
* **Tooltip:** correct render invalid react element ([d49b9fd](https://github.com/skbkontur/retail-ui/commit/d49b9fd))
* **Tooltip:** loosing focus on show/hide content ([83b86f7](https://github.com/skbkontur/retail-ui/commit/83b86f7))


### Performance Improvements

* **Popup:** bind instead of field initializer ([e1bfba1](https://github.com/skbkontur/retail-ui/commit/e1bfba1))
* **Popup:** do not renderContent if closed ([49b03a6](https://github.com/skbkontur/retail-ui/commit/49b03a6))
* **Popup:** less event subscriptions ([eb30481](https://github.com/skbkontur/retail-ui/commit/eb30481))
* **Popup:** remove RenderLayer/onCloseRequest ([1763036](https://github.com/skbkontur/retail-ui/commit/1763036))
* **RenderContainer:** lazy domContainer ([7a193fe](https://github.com/skbkontur/retail-ui/commit/7a193fe))
* **RenderLayer:** bind instead of field initializer ([a7a940b](https://github.com/skbkontur/retail-ui/commit/a7a940b))
* **RenderLayer:** less event subscriptions ([f095eca](https://github.com/skbkontur/retail-ui/commit/f095eca))
* **Tooltip:** bind instead of field initializer ([e4a1ef5](https://github.com/skbkontur/retail-ui/commit/e4a1ef5))
* **Tooltip:** skip RenderLayer if unneeded ([9719e45](https://github.com/skbkontur/retail-ui/commit/9719e45))





## [0.44.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.44.0...retail-ui@0.44.1) (2019-03-19)


### Bug Fixes

* **retail-ui:** fix some imports for `[@skbkontur](https://github.com/skbkontur)/react-ui` ([d4c19a8](https://github.com/skbkontur/retail-ui/commit/d4c19a8))





# [0.44.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.43.0...retail-ui@0.44.0) (2019-03-19)


### Bug Fixes

* **ComboBox:** typings issues ([d51d66d](https://github.com/skbkontur/retail-ui/commit/d51d66d))
* **Group:** fix flexbox width bug in IE ([6b9dd7a](https://github.com/skbkontur/retail-ui/commit/6b9dd7a)), closes [#1199](https://github.com/skbkontur/retail-ui/issues/1199) [#1234](https://github.com/skbkontur/retail-ui/issues/1234)
* **Group:** pass "corners" prop only for Button ([54b9d13](https://github.com/skbkontur/retail-ui/commit/54b9d13)), closes [#1225](https://github.com/skbkontur/retail-ui/issues/1225)
* **retail-ui:** add optional for some props and default for generic ([07003a4](https://github.com/skbkontur/retail-ui/commit/07003a4))
* **SidePage:** change header paddings according to the guides ([722d00f](https://github.com/skbkontur/retail-ui/commit/722d00f))
* **SidePage:** fix scrollbar overlapping by the footer with wrong width ([f3468b1](https://github.com/skbkontur/retail-ui/commit/f3468b1))
* **SidePage:** remove empty space from the fixed header ([48a53f9](https://github.com/skbkontur/retail-ui/commit/48a53f9)), closes [#971](https://github.com/skbkontur/retail-ui/issues/971)


### Features

* **ComboBox:** add props `searchOnFocus` and `drawArrow` ([a605c22](https://github.com/skbkontur/retail-ui/commit/a605c22))





# [0.43.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.42.0...retail-ui@0.43.0) (2019-03-12)


### Bug Fixes

* **Button:** fix disabled link background ([9c2cdae](https://github.com/skbkontur/retail-ui/commit/9c2cdae)), closes [#1213](https://github.com/skbkontur/retail-ui/issues/1213)
* **ComboBox:** correct import specific icon, not all ([9f0fcbf](https://github.com/skbkontur/retail-ui/commit/9f0fcbf))
* **ComboBox:** repair blur when menu is not open ([0861a90](https://github.com/skbkontur/retail-ui/commit/0861a90))
* **ComboBoxMenu:** unique keys warning ([7ead9fc](https://github.com/skbkontur/retail-ui/commit/7ead9fc))
* **Modal:** enable adaptive style by default ([284ad95](https://github.com/skbkontur/retail-ui/commit/284ad95)), closes [#1164](https://github.com/skbkontur/retail-ui/issues/1164)
* **Tooltip:** fix svg icons click in ie11 ([d99676d](https://github.com/skbkontur/retail-ui/commit/d99676d)), closes [#1107](https://github.com/skbkontur/retail-ui/issues/1107)
* **Tooltip:** handleClickOutside detects content ([c69773b](https://github.com/skbkontur/retail-ui/commit/c69773b)), closes [#1210](https://github.com/skbkontur/retail-ui/issues/1210)


### Features

* **ComboBox:** add localization ([2bc0300](https://github.com/skbkontur/retail-ui/commit/2bc0300))
* **LocaleContext:** localization controls ([4d5a412](https://github.com/skbkontur/retail-ui/commit/4d5a412))
* **Logotype:** add localization ([47fa21e](https://github.com/skbkontur/retail-ui/commit/47fa21e))
* **Paging:** add localization ([ef982db](https://github.com/skbkontur/retail-ui/commit/ef982db))
* **Select:** add localization ([8a539be](https://github.com/skbkontur/retail-ui/commit/8a539be))
* **Spinner:** add localization ([265deee](https://github.com/skbkontur/retail-ui/commit/265deee))
* **TokenInput:** add localization ([49d7742](https://github.com/skbkontur/retail-ui/commit/49d7742))
* **TopBar:** add `TopBar.Logout` for localization ([18533e9](https://github.com/skbkontur/retail-ui/commit/18533e9))
* **TopBar:** add localization ([50accaf](https://github.com/skbkontur/retail-ui/commit/50accaf))





# [0.42.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.41.1...retail-ui@0.42.0) (2019-03-05)

### Bug Fixes

- **DatePicker:** fix clear selection on IE11 ([fe61312](https://github.com/skbkontur/retail-ui/commit/fe61312)), closes [#1205](https://github.com/skbkontur/retail-ui/issues/1205)
- **Fias:** fix textarea import ([2a1dd51](https://github.com/skbkontur/retail-ui/commit/2a1dd51))
- **retail-ui:** fix placeholders color according to the guides ([f29f9ac](https://github.com/skbkontur/retail-ui/commit/f29f9ac)), closes [#1166](https://github.com/skbkontur/retail-ui/issues/1166)
- **Tooltip:** reposition changed content ([39b641f](https://github.com/skbkontur/retail-ui/commit/39b641f)), closes [#962](https://github.com/skbkontur/retail-ui/issues/962)

### Features

- **DropdownMenu:** add header and footer props ([db8a428](https://github.com/skbkontur/retail-ui/commit/db8a428))
- **ScrollContainer:** add `onScrollStateChange` prop ([18366b7](https://github.com/skbkontur/retail-ui/commit/18366b7))
- **TooltipMenu:** add header and footer props ([578125d](https://github.com/skbkontur/retail-ui/commit/578125d))

## [0.41.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.41.0...retail-ui@0.41.1) (2019-02-27)

### Bug Fixes

- **Popup:** remove ambient types ([72fb736](https://github.com/skbkontur/retail-ui/commit/72fb736))

# [0.41.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.40.1...retail-ui@0.41.0) (2019-02-26)

### Bug Fixes

- **ComboBox:** fix `focusNextElement` call condition ([da8e007](https://github.com/skbkontur/retail-ui/commit/da8e007))
- **ComboBox:** fix open if blured ([6a63937](https://github.com/skbkontur/retail-ui/commit/6a63937))
- **ComboBox:** fixed menu item highlight on focus([#1100](https://github.com/skbkontur/retail-ui/issues/1100)) ([212cf2d](https://github.com/skbkontur/retail-ui/commit/212cf2d))
- **ComboBox:** use requestStatus and repeatRequest to highlight menu item properly ([c5dfd8f](https://github.com/skbkontur/retail-ui/commit/c5dfd8f))
- **DateInput:** add handle action `separator` ([c532008](https://github.com/skbkontur/retail-ui/commit/c532008)), closes [#1059](https://github.com/skbkontur/retail-ui/issues/1059)
- **Hint:** don't render Popup if text is empty ([f4b2e03](https://github.com/skbkontur/retail-ui/commit/f4b2e03))
- **PasswordInput:** remove not DOM prop `detectCapsLock` ([7d49446](https://github.com/skbkontur/retail-ui/commit/7d49446))
- **Popup:** closing 'hover' after dropdown selection ([c021e04](https://github.com/skbkontur/retail-ui/commit/c021e04))
- **Popup:** possible memory leak fix ([bd1bca4](https://github.com/skbkontur/retail-ui/commit/bd1bca4))
- **retail-ui:** fix input and button baseline (according to the guides) ([085d6af](https://github.com/skbkontur/retail-ui/commit/085d6af))
- **Token:** fix align text and icon ([#1182](https://github.com/skbkontur/retail-ui/issues/1182)) ([fe49699](https://github.com/skbkontur/retail-ui/commit/fe49699)), closes [#1158](https://github.com/skbkontur/retail-ui/issues/1158)
- **Tooltip:** don't render Popup without content ([a9fbdb5](https://github.com/skbkontur/retail-ui/commit/a9fbdb5))

### Features

- **ComboBox:** add `cancelSearch` public method ([dcafb27](https://github.com/skbkontur/retail-ui/commit/dcafb27))
- **ComboBox:** public blur method ([e3e3a8e](https://github.com/skbkontur/retail-ui/commit/e3e3a8e))
- **Fias:** support foreign addresses ([2641ca2](https://github.com/skbkontur/retail-ui/commit/2641ca2))

## [0.40.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.40.0...retail-ui@0.40.1) (2019-02-19)

### Bug Fixes

- **SidePage:** dynamic resolved types `Body` and `Footer` with context ([4ec286b](https://github.com/skbkontur/retail-ui/commit/4ec286b))

# [0.40.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.39.0...retail-ui@0.40.0) (2019-02-19)

### Bug Fixes

- **RenderContainer:** unique keys warning ([b2279b3](https://github.com/skbkontur/retail-ui/commit/b2279b3)), closes [#1149](https://github.com/skbkontur/retail-ui/issues/1149)
- **Tooltip:** fixed closing for `hoverAnchor` ([fd932f2](https://github.com/skbkontur/retail-ui/commit/fd932f2)), closes [#973](https://github.com/skbkontur/retail-ui/issues/973)

### Features

- **flow:** add typings ([#1160](https://github.com/skbkontur/retail-ui/issues/1160)) ([55d79c9](https://github.com/skbkontur/retail-ui/commit/55d79c9))
- **PasswordInput:** add support blur event ([#1162](https://github.com/skbkontur/retail-ui/issues/1162)) ([ddd8195](https://github.com/skbkontur/retail-ui/commit/ddd8195)), closes [#889](https://github.com/skbkontur/retail-ui/issues/889)
- **Popup:** add `ignoreHover` prop ([869f556](https://github.com/skbkontur/retail-ui/commit/869f556))
- **TokenInput:** add ability to directly render token component ([#1148](https://github.com/skbkontur/retail-ui/issues/1148)) ([6354b2a](https://github.com/skbkontur/retail-ui/commit/6354b2a))

<a name="0.39.0"></a>

# [0.39.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.38.0...retail-ui@0.39.0) (2019-02-12)

### Bug Fixes

- **DropdownContainer:** fixed initial position ([8eed80e](https://github.com/skbkontur/retail-ui/commit/8eed80e))
- **Menu:** not call `setState` after unmount ([dfd5152](https://github.com/skbkontur/retail-ui/commit/dfd5152))

### Features

- **ComboBox:** минимальное время показа лоадера ([279afac](https://github.com/skbkontur/retail-ui/commit/279afac))
- **Fias:** add fields settings ([31ea3d3](https://github.com/skbkontur/retail-ui/commit/31ea3d3))
- **Fias:** add postalCode field ([02f1498](https://github.com/skbkontur/retail-ui/commit/02f1498))
- **Fias:** move fields labels to the locale ([0bae0fd](https://github.com/skbkontur/retail-ui/commit/0bae0fd))
- **retail-ui:** add more flow typings ([#1137](https://github.com/skbkontur/retail-ui/issues/1137)) ([e72b3eb](https://github.com/skbkontur/retail-ui/commit/e72b3eb))

<a name="0.38.0"></a>

# [0.38.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.37.0...retail-ui@0.38.0) (2019-02-05)

### Bug Fixes

- **Button:** reset text styles ([0b7eec5](https://github.com/skbkontur/retail-ui/commit/0b7eec5)), closes [#1108](https://github.com/skbkontur/retail-ui/issues/1108)
- **Button:** text align center with custom width ([2150cc6](https://github.com/skbkontur/retail-ui/commit/2150cc6)), closes [#1121](https://github.com/skbkontur/retail-ui/issues/1121)
- **Combobox:** fix non-closing menu with disablePortal prop ([c5b5288](https://github.com/skbkontur/retail-ui/commit/c5b5288))
- **DateInput:** remove unecessary wrapper element ([908941e](https://github.com/skbkontur/retail-ui/commit/908941e)), closes [#1119](https://github.com/skbkontur/retail-ui/issues/1119)
- **Input:** reset text styles ([b7bd90b](https://github.com/skbkontur/retail-ui/commit/b7bd90b)), closes [#1108](https://github.com/skbkontur/retail-ui/issues/1108)
- **InputLikeText:** fix overflow inside flex container ([91f5c8a](https://github.com/skbkontur/retail-ui/commit/91f5c8a)), closes [#1116](https://github.com/skbkontur/retail-ui/issues/1116)
- **Kladr:** recover TypeScript typings ([948212d](https://github.com/skbkontur/retail-ui/commit/948212d)), closes [#1058](https://github.com/skbkontur/retail-ui/issues/1058)
- **RenderLayer:** disable catch events ([#1127](https://github.com/skbkontur/retail-ui/issues/1127)) ([f0a447c](https://github.com/skbkontur/retail-ui/commit/f0a447c))
- **Textarea:** define min-height, close [#1072](https://github.com/skbkontur/retail-ui/issues/1072) ([#1082](https://github.com/skbkontur/retail-ui/issues/1082)) ([01cf7d3](https://github.com/skbkontur/retail-ui/commit/01cf7d3))

### Features

- add flow typings ([9577790](https://github.com/skbkontur/retail-ui/commit/9577790))
- **Logotype:** add locale prop ([e39c7f7](https://github.com/skbkontur/retail-ui/commit/e39c7f7))

<a name="0.37.0"></a>

# [0.37.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.36.0...retail-ui@0.37.0) (2019-01-30)

### Bug Fixes

- **Fias:** allow to search for houses in planning structures ([3eeec85](https://github.com/skbkontur/retail-ui/commit/3eeec85)), closes [#1098](https://github.com/skbkontur/retail-ui/issues/1098)

### Features

- **Input:** поддержка префикса и суффикса ([fe9a1d8](https://github.com/skbkontur/retail-ui/commit/fe9a1d8))
- **Input:** флекс-верска инпута ([64deabc](https://github.com/skbkontur/retail-ui/commit/64deabc))
- **InputLikeText:** интерфейс пропсов наследуется от InputProps ([b4b7dce](https://github.com/skbkontur/retail-ui/commit/b4b7dce))

<a name="0.36.0"></a>

# [0.36.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.35.0...retail-ui@0.36.0) (2019-01-21)

### Bug Fixes

- **Hint:** fix unnecessary re-render ([c9160d4](https://github.com/skbkontur/retail-ui/commit/c9160d4)), closes [#1053](https://github.com/skbkontur/retail-ui/issues/1053)
- **SidePage:** update layout when the Body has been updated ([4477546](https://github.com/skbkontur/retail-ui/commit/4477546)), closes [#961](https://github.com/skbkontur/retail-ui/issues/961)
- **TopBar.Item:** при onlyIcon={true} не рендерятся дети, fix [#1019](https://github.com/skbkontur/retail-ui/issues/1019) ([49f52d2](https://github.com/skbkontur/retail-ui/commit/49f52d2))

### Features

- **Kebab:** add size medium ([9ea2d17](https://github.com/skbkontur/retail-ui/commit/9ea2d17))
- **Select:** add public focus method ([8f317e1](https://github.com/skbkontur/retail-ui/commit/8f317e1)), closes [#1063](https://github.com/skbkontur/retail-ui/issues/1063)
- **Select:** компонент принимает пропсы onFocus/onBlur ([2d4ba50](https://github.com/skbkontur/retail-ui/commit/2d4ba50))
- **SidePage:** add updateLayout method ([7fe9290](https://github.com/skbkontur/retail-ui/commit/7fe9290))

<a name="0.35.0"></a>

# [0.35.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.34.0...retail-ui@0.35.0) (2019-01-14)

### Bug Fixes

- **Calendar:** set box-sizing ([f3e7432](https://github.com/skbkontur/retail-ui/commit/f3e7432)), closes [#525](https://github.com/skbkontur/retail-ui/issues/525) [#762](https://github.com/skbkontur/retail-ui/issues/762)
- **ComboBox:** keep focus after click on refresh ([2effb7c](https://github.com/skbkontur/retail-ui/commit/2effb7c)), closes [#1012](https://github.com/skbkontur/retail-ui/issues/1012)
- **ComboBoxOld:** fix click on disabled arrow ([031281b](https://github.com/skbkontur/retail-ui/commit/031281b))
- **DropdownContainer:** remove listeners in disablePortal mode too ([51a611f](https://github.com/skbkontur/retail-ui/commit/51a611f)), closes [#1064](https://github.com/skbkontur/retail-ui/issues/1064)
- **Input:** pass formatChars to ReactInputMask ([747badf](https://github.com/skbkontur/retail-ui/commit/747badf))
- **Modal:** скрыта нативная рамка фокуса в ff ([f9fecb2](https://github.com/skbkontur/retail-ui/commit/f9fecb2))
- **Radio:** fix cursor in flat-theme, fix [#990](https://github.com/skbkontur/retail-ui/issues/990) ([0b21a21](https://github.com/skbkontur/retail-ui/commit/0b21a21))

### Features

- **Icon:** remove component ([cd229d3](https://github.com/skbkontur/retail-ui/commit/cd229d3)), closes [#1037](https://github.com/skbkontur/retail-ui/issues/1037)
- **retail-ui:** add brand color variables ([072f2f5](https://github.com/skbkontur/retail-ui/commit/072f2f5))
- **retail-ui:** add TokenInput component ([402c9bc](https://github.com/skbkontur/retail-ui/commit/402c9bc)), closes [#650](https://github.com/skbkontur/retail-ui/issues/650)

### BREAKING CHANGES

- **Icon:** Component `Icon` has been removed, please use icons from `@skbkontur/react-icons`

<a name="0.34.0"></a>

# [0.34.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.33.0...retail-ui@0.34.0) (2018-12-26)

### Bug Fixes

- **Autocomplete:** исправлен многократный вызов `source` ([6a73bc5](https://github.com/skbkontur/retail-ui/commit/6a73bc5)), closes [#937](https://github.com/skbkontur/retail-ui/issues/937)
- **ComboBox:** always close on clickOutside ([1715695](https://github.com/skbkontur/retail-ui/commit/1715695))
- **ComboBox:** run empty search on input click if closed ([75670b4](https://github.com/skbkontur/retail-ui/commit/75670b4))
- **CurrencyInput:** починено поведение фокуса ([ce3e1e9](https://github.com/skbkontur/retail-ui/commit/ce3e1e9)), closes [#932](https://github.com/skbkontur/retail-ui/issues/932)
- **DatePicker:** close if picker became disabled ([2b98084](https://github.com/skbkontur/retail-ui/commit/2b98084))
- **DatePicker:** do not open on focus if disabled ([03fb67d](https://github.com/skbkontur/retail-ui/commit/03fb67d))
- **DatePickerOld:** can't blur in ie11 ([f515c56](https://github.com/skbkontur/retail-ui/commit/f515c56)), closes [#1030](https://github.com/skbkontur/retail-ui/issues/1030)
- **DatePickerOld:** can't blur in safari ([194adca](https://github.com/skbkontur/retail-ui/commit/194adca))
- **DropdownContainer:** align dropdown in disablePortal mode ([ca8561f](https://github.com/skbkontur/retail-ui/commit/ca8561f)), closes [#590](https://github.com/skbkontur/retail-ui/issues/590)
- **Fias:** [FiasComboBox] update searchText on value change ([55cb808](https://github.com/skbkontur/retail-ui/commit/55cb808))
- **Fias:** disallow search through all parents for Street and lower ([09966ec](https://github.com/skbkontur/retail-ui/commit/09966ec))
- **Fias:** invalidate House if it wasn't chosen from the list ([2389155](https://github.com/skbkontur/retail-ui/commit/2389155)), closes [#905](https://github.com/skbkontur/retail-ui/issues/905)
- **Fias:** open list on focus after validation (if has items) ([7972960](https://github.com/skbkontur/retail-ui/commit/7972960))
- **InternalMenu:** focus on menu without scrollTo ([263091d](https://github.com/skbkontur/retail-ui/commit/263091d)), closes [#996](https://github.com/skbkontur/retail-ui/issues/996)
- **Logotype:** always render dropdown container ([dfc26cb](https://github.com/skbkontur/retail-ui/commit/dfc26cb)), closes [#631](https://github.com/skbkontur/retail-ui/issues/631)
- **Logotype:** display root as inline element when there is no widget ([b0f316f](https://github.com/skbkontur/retail-ui/commit/b0f316f))
- **Logotype:** init widget on props update ([109f562](https://github.com/skbkontur/retail-ui/commit/109f562))
- **Sticky:** infinity update loop in safari ([7c26f85](https://github.com/skbkontur/retail-ui/commit/7c26f85)), closes [#1033](https://github.com/skbkontur/retail-ui/issues/1033)
- **Textarea:** don't pass placeholder prop if it is polyfilled ([54d16bb](https://github.com/skbkontur/retail-ui/commit/54d16bb)), closes [#955](https://github.com/skbkontur/retail-ui/issues/955)
- **TopBar:** update User's links to cabinet.kontur.ru ([53d1024](https://github.com/skbkontur/retail-ui/commit/53d1024))

### Features

- **Fias:** show "select from list" message on validation if has items ([91dd8ba](https://github.com/skbkontur/retail-ui/commit/91dd8ba))
- **Popup:** add `onOpen` prop ([af52795](https://github.com/skbkontur/retail-ui/commit/af52795))
- **Spinner:** поддержка ReactNode в caption ([b0ba0cd](https://github.com/skbkontur/retail-ui/commit/b0ba0cd))
- **Textarea:** шрифт и отсутпы по гайдам ([ca61be6](https://github.com/skbkontur/retail-ui/commit/ca61be6))

<a name="0.33.0"></a>

# [0.33.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.32.1...retail-ui@0.33.0) (2018-12-17)

### Bug Fixes

- **ComboBox:** always keep textValue in sync with value, if not editing ([f9e6531](https://github.com/skbkontur/retail-ui/commit/f9e6531))
- **ComboBox:** fix getValueString function ([50accf1](https://github.com/skbkontur/retail-ui/commit/50accf1))
- **CustomComboBox:** made some props required ([dd1f90a](https://github.com/skbkontur/retail-ui/commit/dd1f90a))
- **MenuItem:** remove 'white-space: nowrap' property ([b4fb9e7](https://github.com/skbkontur/retail-ui/commit/b4fb9e7)), closes [#590](https://github.com/skbkontur/retail-ui/issues/590) [#959](https://github.com/skbkontur/retail-ui/issues/959)
- **paging:** починено поведение глобального листенера ([fddcc74](https://github.com/skbkontur/retail-ui/commit/fddcc74)), closes [#998](https://github.com/skbkontur/retail-ui/issues/998) [#976](https://github.com/skbkontur/retail-ui/issues/976)

### Features

- **ComboBox:** add search method ([bb3fa2e](https://github.com/skbkontur/retail-ui/commit/bb3fa2e)), closes [#991](https://github.com/skbkontur/retail-ui/issues/991)
- **ComboBox:** allow to open combobox with search ([c3b8965](https://github.com/skbkontur/retail-ui/commit/c3b8965))

<a name="0.32.1"></a>

## [0.32.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.32.0...retail-ui@0.32.1) (2018-12-11)

### Bug Fixes

- **DateSelect:** fix varialble name in styles ([542ab98](https://github.com/skbkontur/retail-ui/commit/542ab98)), closes [#975](https://github.com/skbkontur/retail-ui/issues/975)
- **Input:** fix regression around medium font-size ([a900f6e](https://github.com/skbkontur/retail-ui/commit/a900f6e))

<a name="0.32.0"></a>

# [0.32.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.31.0...retail-ui@0.32.0) (2018-12-10)

### Bug Fixes

- **ComboBox:** keep focus after item click and focus next after Enter ([50e5ef0](https://github.com/skbkontur/retail-ui/commit/50e5ef0)), closes [#907](https://github.com/skbkontur/retail-ui/issues/907)
- **Popup:** remove unwanted pin border in IE ([b9f3b90](https://github.com/skbkontur/retail-ui/commit/b9f3b90)), closes [#786](https://github.com/skbkontur/retail-ui/issues/786) [#943](https://github.com/skbkontur/retail-ui/issues/943)
- **RenderContainer:** correct store ids in data-attribute ([0dc7089](https://github.com/skbkontur/retail-ui/commit/0dc7089))
- **Tooltip:** reset opened state by trigger prop ([83d0132](https://github.com/skbkontur/retail-ui/commit/83d0132)), closes [#896](https://github.com/skbkontur/retail-ui/issues/896)

### Features

- **ComboBox:** add open/close methods ([7bbd941](https://github.com/skbkontur/retail-ui/commit/7bbd941)), closes [#957](https://github.com/skbkontur/retail-ui/issues/957)
- **Input:** blink on unexpected input ([7162ffa](https://github.com/skbkontur/retail-ui/commit/7162ffa))
- **lib:** add functions for getting focusable elements ([6ff8b71](https://github.com/skbkontur/retail-ui/commit/6ff8b71))

### Performance Improvements

- **ComboBox:** optimize focusNextElement method ([f8946f4](https://github.com/skbkontur/retail-ui/commit/f8946f4))

<a name="0.31.0"></a>

# [0.31.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.30.0...retail-ui@0.31.0) (2018-12-04)

### Bug Fixes

- **ComboBox:** don't do search on focus in autocomplete mode ([241195d](https://github.com/skbkontur/retail-ui/commit/241195d)), closes [#601](https://github.com/skbkontur/retail-ui/issues/601)
- **DatePickerOld:** fix firefox specific bug ([737262d](https://github.com/skbkontur/retail-ui/commit/737262d))
- **Modal:** generated docs use helper function as component ([ac0f9f3](https://github.com/skbkontur/retail-ui/commit/ac0f9f3))
- **Popup:** fix render child for react@15 ([b2364a6](https://github.com/skbkontur/retail-ui/commit/b2364a6))
- **Select:** fix text-overflow color ([4b100bd](https://github.com/skbkontur/retail-ui/commit/4b100bd)), closes [#543](https://github.com/skbkontur/retail-ui/issues/543)
- **Select:** less offset of arrow-icon ([d2e1183](https://github.com/skbkontur/retail-ui/commit/d2e1183)), closes [#542](https://github.com/skbkontur/retail-ui/issues/542)

### Features

- **Input:** improve masked input ([#900](https://github.com/skbkontur/retail-ui/issues/900)) ([f03fd28](https://github.com/skbkontur/retail-ui/commit/f03fd28)), closes [#463](https://github.com/skbkontur/retail-ui/issues/463) [#449](https://github.com/skbkontur/retail-ui/issues/449) [#499](https://github.com/skbkontur/retail-ui/issues/499) [#463](https://github.com/skbkontur/retail-ui/issues/463) [#449](https://github.com/skbkontur/retail-ui/issues/449) [#499](https://github.com/skbkontur/retail-ui/issues/499)
- **Modal:** add alignTop prop ([618b88b](https://github.com/skbkontur/retail-ui/commit/618b88b)), closes [#715](https://github.com/skbkontur/retail-ui/issues/715)

<a name="0.30.0"></a>

# [0.30.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.29.0...retail-ui@0.30.0) (2018-11-20)

### Bug Fixes

- **ComboBox:** fix blinking test by mocking lodash.debounce ([fef6e3e](https://github.com/skbkontur/retail-ui/commit/fef6e3e))
- **ComboBox:** prevent searching items after blur ([0a6153d](https://github.com/skbkontur/retail-ui/commit/0a6153d))
- **ComboBox:** show editing input text on focus instead of value ([6e0e8d4](https://github.com/skbkontur/retail-ui/commit/6e0e8d4))
- **Menu:** scroll till the container edges while moving through items ([32a6f94](https://github.com/skbkontur/retail-ui/commit/32a6f94)), closes [#860](https://github.com/skbkontur/retail-ui/issues/860)
- **Tooltip:** add shallow equal on shouldComponentUpdate ([647fd5b](https://github.com/skbkontur/retail-ui/commit/647fd5b)), closes [#899](https://github.com/skbkontur/retail-ui/issues/899)
- **TopBar:** pass href instead of logoHref prop to Logotype ([04b2d54](https://github.com/skbkontur/retail-ui/commit/04b2d54)), closes [#923](https://github.com/skbkontur/retail-ui/issues/923)

### Features

- **DatePicker:** поддержка праздничных дней ([#904](https://github.com/skbkontur/retail-ui/issues/904)) ([d1f4213](https://github.com/skbkontur/retail-ui/commit/d1f4213)), closes [#423](https://github.com/skbkontur/retail-ui/issues/423)
- **Hint:** add `useWrapper` prop ([142f684](https://github.com/skbkontur/retail-ui/commit/142f684))
- **Modal:** опциональное залипание шапки и футера ([#911](https://github.com/skbkontur/retail-ui/issues/911)) ([1e763cf](https://github.com/skbkontur/retail-ui/commit/1e763cf))
- **Popup:** allow use react component as anchorElement ([7b0b373](https://github.com/skbkontur/retail-ui/commit/7b0b373))
- **Tooltip:** add `useWrapper` prop ([71d803a](https://github.com/skbkontur/retail-ui/commit/71d803a)), closes [#721](https://github.com/skbkontur/retail-ui/issues/721)

<a name="0.29.0"></a>

# [0.29.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.28.0...retail-ui@0.29.0) (2018-11-13)

### Bug Fixes

- **ComboBox:** update textValue even if empty (autocomplete mode) ([#875](https://github.com/skbkontur/retail-ui/issues/875)) ([6981973](https://github.com/skbkontur/retail-ui/commit/6981973))

### Features

- **Button:** Новые стили для кнопок-стрелок ([#839](https://github.com/skbkontur/retail-ui/issues/839)) ([bcfe9c9](https://github.com/skbkontur/retail-ui/commit/bcfe9c9))
- **ComboBox:** allow use hover state in renderItem ([eacebc3](https://github.com/skbkontur/retail-ui/commit/eacebc3))
- **Fias:** новый компонент ФИАС, [#779](https://github.com/skbkontur/retail-ui/issues/779) ([74e7e04](https://github.com/skbkontur/retail-ui/commit/74e7e04))
- **FxInput:** add public method blur ([b4e167d](https://github.com/skbkontur/retail-ui/commit/b4e167d)), closes [#888](https://github.com/skbkontur/retail-ui/issues/888)

### BREAKING CHANGES

- **ComboBox:** second argument of renderItem not used and replaced by MenuItemState

<a name="0.28.0"></a>

# [0.28.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.27.0...retail-ui@0.28.0) (2018-11-08)

### Bug Fixes

- **CurrencyInput:** починено поведение плэйсхолдера ([84d2486](https://github.com/skbkontur/retail-ui/commit/84d2486))
- **FxInput:** mainInGroup works again ([9bfca93](https://github.com/skbkontur/retail-ui/commit/9bfca93))
- **HBVS:** only root component can update styles ([e12d32f](https://github.com/skbkontur/retail-ui/commit/e12d32f))
- **Hint:** remove inline-block style [#829](https://github.com/skbkontur/retail-ui/issues/829) ([c9fbdfb](https://github.com/skbkontur/retail-ui/commit/c9fbdfb))
- **Popup:** make disableAnimations working again ([c85db13](https://github.com/skbkontur/retail-ui/commit/c85db13))
- **SidePage:** work with react@15 ([9e811bd](https://github.com/skbkontur/retail-ui/commit/9e811bd))
- **Textarea:** поправлен интерфейс и пропсов, исправлена пара багов ([715d162](https://github.com/skbkontur/retail-ui/commit/715d162))
- **Tooltip:** click on svg in tooltip [#877](https://github.com/skbkontur/retail-ui/issues/877) ([3fa07e7](https://github.com/skbkontur/retail-ui/commit/3fa07e7))

### Features

- **Checkbox:** новое состояние WIP ([b443d5d](https://github.com/skbkontur/retail-ui/commit/b443d5d))
- **Hint:** add disableAnimations prop ([cd548a6](https://github.com/skbkontur/retail-ui/commit/cd548a6))
- **Paging:** global keydown listener ([b10df5d](https://github.com/skbkontur/retail-ui/commit/b10df5d))
- **Paging:** show navigation hints by condition ([232a5c2](https://github.com/skbkontur/retail-ui/commit/232a5c2))
- **PopupMenu:** add disableAnimation prop in PopupMenu-based components ([6602986](https://github.com/skbkontur/retail-ui/commit/6602986))

<a name="0.27.0"></a>

# [0.27.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.26.1...retail-ui@0.27.0) (2018-10-29)

### Bug Fixes

- **Button:** fix flat styles ([5ba5980](https://github.com/skbkontur/retail-ui/commit/5ba5980)), closes [#856](https://github.com/skbkontur/retail-ui/issues/856)
- **ComboBox:** public refs input/menu/inputLikeText ([f28b418](https://github.com/skbkontur/retail-ui/commit/f28b418))
- **FxInput:** fix warning from 'mainInGroup' prop ([2ad6e4e](https://github.com/skbkontur/retail-ui/commit/2ad6e4e))
- **Input:** filter props for HTMLInputElement, fix [#831](https://github.com/skbkontur/retail-ui/issues/831) ([fa94219](https://github.com/skbkontur/retail-ui/commit/fa94219))
- **Input:** filter props for HTMLInputElement, fix [#831](https://github.com/skbkontur/retail-ui/issues/831) ([b0f04af](https://github.com/skbkontur/retail-ui/commit/b0f04af))
- **Input:** input icons inside modal header [#861](https://github.com/skbkontur/retail-ui/issues/861) ([b69f0ab](https://github.com/skbkontur/retail-ui/commit/b69f0ab))
- **Input:** update typings ([34adf0a](https://github.com/skbkontur/retail-ui/commit/34adf0a)), closes [#845](https://github.com/skbkontur/retail-ui/issues/845)
- **Link:** fix types, fix [#841](https://github.com/skbkontur/retail-ui/issues/841) ([4a1e2b8](https://github.com/skbkontur/retail-ui/commit/4a1e2b8))
- **Modal:** fix after Sticky hotfix ([b354149](https://github.com/skbkontur/retail-ui/commit/b354149))
- **Modal:** not adaptive ([96178bd](https://github.com/skbkontur/retail-ui/commit/96178bd)), closes [#847](https://github.com/skbkontur/retail-ui/issues/847)
- **SidePage:** fix blockBackground=false ([4a78d94](https://github.com/skbkontur/retail-ui/commit/4a78d94))
- **SidePage:** fix blockBackground=false ([15a1763](https://github.com/skbkontur/retail-ui/commit/15a1763))
- **Sticky:** вернули старое поведение с бесконечной рекурсией ([c04f3f1](https://github.com/skbkontur/retail-ui/commit/c04f3f1))
- **Sticky:** вернули старое поведение с бесконечной рекурсией ([7cf7ebc](https://github.com/skbkontur/retail-ui/commit/7cf7ebc))
- **Sticky:** fix default value of allowChildWithMargins ([3e5856e](https://github.com/skbkontur/retail-ui/commit/3e5856e))
- **Sticky:** fix default value of allowChildWithMargins ([0ff54c6](https://github.com/skbkontur/retail-ui/commit/0ff54c6))

### Features

- **CustomComboBox:** добавил ref для InputLikeText ([c5cd653](https://github.com/skbkontur/retail-ui/commit/c5cd653))
- **Tooltip:** новое значение `trigger` ([391f715](https://github.com/skbkontur/retail-ui/commit/391f715)), closes [#818](https://github.com/skbkontur/retail-ui/issues/818)

<a name="0.26.3"></a>

## [0.26.3](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.26.1...retail-ui@0.26.3) (2018-10-25)

### Bug Fixes

- **Modal:** Modal.Footer и Modal.Header ипользуют Sticky с `allowChildWithMargins === true` ([8fee4c1](https://github.com/skbkontur/retail-ui/commit/8fee4c1bd5133e5b7419cb8951c08b46605a3985))

<a name="0.26.2"></a>

## [0.26.2](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.26.0...retail-ui@0.26.2) (2018-10-25)

### Bug Fixes

- **Sticky:** fix default value of allowChildWithMargins ([fffbea0](https://github.com/skbkontur/retail-ui/commit/fffbea0))
- **Sticky:** вернули старое поведение с бесконечной рекурсией ([ebbbeec](https://github.com/skbkontur/retail-ui/commit/ebbbeec))

<a name="0.26.1"></a>

## [0.26.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.26.0...retail-ui@0.26.1) (2018-10-24)

**Note:** Version bump only for package retail-ui

<a name="0.26.0"></a>

# [0.26.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.25.0...retail-ui@0.26.0) (2018-10-23)

### Bug Fixes

- **Button:** fix subpixel bug in chrome ([a757350](https://github.com/skbkontur/retail-ui/commit/a757350))
- **FxInput:** fix warning from 'mainInGroup' prop ([d24390c](https://github.com/skbkontur/retail-ui/commit/d24390c))
- **HBVS:** окончательно отремонтирован ([c8df8a5](https://github.com/skbkontur/retail-ui/commit/c8df8a5))
- **Modal:** fix modalClickTrap height, close [#810](https://github.com/skbkontur/retail-ui/issues/810) ([01497b5](https://github.com/skbkontur/retail-ui/commit/01497b5))

### Features

- **combobox:** accept onUnexpectedInput handler return value ([e6c1d37](https://github.com/skbkontur/retail-ui/commit/e6c1d37))
- **Icon:** use svg icons ([0690828](https://github.com/skbkontur/retail-ui/commit/0690828))

<a name="0.25.0"></a>

# [0.25.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.24.1...retail-ui@0.25.0) (2018-10-15)

### Bug Fixes

- **ComboBox:** onChange при потере фокуса ([c3353b0](https://github.com/skbkontur/retail-ui/commit/c3353b0)), closes [#680](https://github.com/skbkontur/retail-ui/issues/680)
- **HBVS:** пересчет размеров окна в каждом didUpdate, Closed [#717](https://github.com/skbkontur/retail-ui/issues/717) ([a162a03](https://github.com/skbkontur/retail-ui/commit/a162a03))
- **Input:** fix console.log warning in group ([2bd4287](https://github.com/skbkontur/retail-ui/commit/2bd4287))
- **Input:** повыщенный z-index при фокусе ([cf7f423](https://github.com/skbkontur/retail-ui/commit/cf7f423))
- **Kebab:** react warning of unitless number ([66c6f21](https://github.com/skbkontur/retail-ui/commit/66c6f21))
- **Modal:** fix click-handler ([cf84fd9](https://github.com/skbkontur/retail-ui/commit/cf84fd9)), closes [#757](https://github.com/skbkontur/retail-ui/issues/757)
- **Modal:** focusLock отключен в ie, fix [#784](https://github.com/skbkontur/retail-ui/issues/784) ([839c7fa](https://github.com/skbkontur/retail-ui/commit/839c7fa))
- **Popup:** change min-width to fix [#799](https://github.com/skbkontur/retail-ui/issues/799) ([4fb60a6](https://github.com/skbkontur/retail-ui/commit/4fb60a6))
- **ResizeDetector:** удален `removeEventListener` :green_apple: ([ab586f7](https://github.com/skbkontur/retail-ui/commit/ab586f7))
- **Tabs:** fix setState after unmount in Indicator component ([7444784](https://github.com/skbkontur/retail-ui/commit/7444784)), closes [#735](https://github.com/skbkontur/retail-ui/issues/735)

### Features

- **Calendar:** больше переменных в стилях ([212bd1f](https://github.com/skbkontur/retail-ui/commit/212bd1f)), closes [#755](https://github.com/skbkontur/retail-ui/issues/755)
- **Group:** added Group tests and Stories ([a669d7f](https://github.com/skbkontur/retail-ui/commit/a669d7f))
- **Input:** выделение значения ([1b68c7a](https://github.com/skbkontur/retail-ui/commit/1b68c7a))
- **Textarea:** выделение значения ([8282b37](https://github.com/skbkontur/retail-ui/commit/8282b37))

<a name="0.24.1"></a>

## [0.24.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.24.0...retail-ui@0.24.1) (2018-10-10)

### Bug Fixes

- **ComboBox:** PureComponent заменен на shouldComponentUpdate ([38d34fc](https://github.com/skbkontur/retail-ui/commit/38d34fc))
- **SidePage:** fix zIndex of footer, fixed [#714](https://github.com/skbkontur/retail-ui/issues/714) ([63a2b5d](https://github.com/skbkontur/retail-ui/commit/63a2b5d))

<a name="0.24.0"></a>

# [0.24.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.23.3...retail-ui@0.24.0) (2018-10-08)

### Bug Fixes

- **Button:** fix type link in flat mode ([dc1d505](https://github.com/skbkontur/retail-ui/commit/dc1d505))
- **ComboBox:** изменение значения после unexpectedInput ([c5379be](https://github.com/skbkontur/retail-ui/commit/c5379be)), closes [#730](https://github.com/skbkontur/retail-ui/issues/730)
- **Hint:** pin color for ie11 ([7361e20](https://github.com/skbkontur/retail-ui/commit/7361e20))
- **Input:** fix flat styles ([cbb4e55](https://github.com/skbkontur/retail-ui/commit/cbb4e55)), closes [#731](https://github.com/skbkontur/retail-ui/issues/731)
- **Tooltip:** allow customize color ([26af1d5](https://github.com/skbkontur/retail-ui/commit/26af1d5))

### Features

- **ComboBox:** add 'reset' method ([4ff05fa](https://github.com/skbkontur/retail-ui/commit/4ff05fa))
- onOpen & onClose props for DropDown Menu ([#771](https://github.com/skbkontur/retail-ui/issues/771)) ([9ae4bf0](https://github.com/skbkontur/retail-ui/commit/9ae4bf0)), closes [#769](https://github.com/skbkontur/retail-ui/issues/769) [#733](https://github.com/skbkontur/retail-ui/issues/733)

<a name="0.23.3"></a>

## [0.23.3](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.23.2...retail-ui@0.23.3) (2018-09-27)

**Note:** Version bump only for package retail-ui

<a name="0.23.2"></a>

## [0.23.2](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.23.1...retail-ui@0.23.2) (2018-09-26)

### Bug Fixes

- **Textarea:** fix % width ([d4dab33](https://github.com/skbkontur/retail-ui/commit/d4dab33))

<a name="0.23.1"></a>

## [0.23.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.23.0...retail-ui@0.23.1) (2018-09-24)

### Bug Fixes

- **Hint:** render method ([585d0b8](https://github.com/skbkontur/retail-ui/commit/585d0b8))
- **Input:** fix sizes in flat theme :lipstick:, fixed [#732](https://github.com/skbkontur/retail-ui/issues/732) ([2e35605](https://github.com/skbkontur/retail-ui/commit/2e35605))
- **Textarea:** pass width prop to wrapper, fixed [#724](https://github.com/skbkontur/retail-ui/issues/724) ([52611bd](https://github.com/skbkontur/retail-ui/commit/52611bd))
- **Tooltip:** fix positioning with inline-block caption, fix [#721](https://github.com/skbkontur/retail-ui/issues/721) ([6ba920e](https://github.com/skbkontur/retail-ui/commit/6ba920e))

<a name="0.23.0"></a>

# [0.23.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.22.0...retail-ui@0.23.0) (2018-09-17)

### Bug Fixes

- **Button:** removed z-index ([02ce734](https://github.com/skbkontur/retail-ui/commit/02ce734))
- **ComboBox:** clear textValue ([c66342c](https://github.com/skbkontur/retail-ui/commit/c66342c))
- **ComboBox:** don't focus if props.value changed with error ([1ce1235](https://github.com/skbkontur/retail-ui/commit/1ce1235))
- **ComboBox:** test replace `is` to `exists` ([0c6247a](https://github.com/skbkontur/retail-ui/commit/0c6247a))
- **CurrencyInput:** missing blur method ([60edcdc](https://github.com/skbkontur/retail-ui/commit/60edcdc))
- **DatePicker:** fixed icon line-height, close [#493](https://github.com/skbkontur/retail-ui/issues/493) ([3c990e0](https://github.com/skbkontur/retail-ui/commit/3c990e0))
- **HBVS:** восстановление скролла контейнера при unmount ([faebf8f](https://github.com/skbkontur/retail-ui/commit/faebf8f))
- **Input:** remove `z-index` from styles ([1abcc3e](https://github.com/skbkontur/retail-ui/commit/1abcc3e))
- **MenuItem:** fix bounds ([34f879f](https://github.com/skbkontur/retail-ui/commit/34f879f)), closes [#662](https://github.com/skbkontur/retail-ui/issues/662)
- **Modal:** починено позиционирование футера ([aabdca6](https://github.com/skbkontur/retail-ui/commit/aabdca6)), closes [#683](https://github.com/skbkontur/retail-ui/issues/683) [#66](https://github.com/skbkontur/retail-ui/issues/66)
- **OldComboBox:** use placeholder color from variables ([3ac585b](https://github.com/skbkontur/retail-ui/commit/3ac585b))
- **retail-ui:** добавил fallback-анимацию для серого спиннера ([5bff386](https://github.com/skbkontur/retail-ui/commit/5bff386)), closes [#9b9b9](https://github.com/skbkontur/retail-ui/issues/9b9b9) [#671](https://github.com/skbkontur/retail-ui/issues/671)
- **Textarea:** fix adapter ([08e5104](https://github.com/skbkontur/retail-ui/commit/08e5104))
- **Toggle:** controlled/uncontrolled ([d0a7df1](https://github.com/skbkontur/retail-ui/commit/d0a7df1)), closes [#699](https://github.com/skbkontur/retail-ui/issues/699)
- **Toggle:** удален console.log, fixed [#689](https://github.com/skbkontur/retail-ui/issues/689) ([7169baf](https://github.com/skbkontur/retail-ui/commit/7169baf))
- **Tooltip:** порядок позиций по гайду ([af61858](https://github.com/skbkontur/retail-ui/commit/af61858)), closes [/guides.kontur.ru/controls/tooltip/#09](https://github.com//guides.kontur.ru/controls/tooltip//issues/09) [#178](https://github.com/skbkontur/retail-ui/issues/178)
- **TopBar:** дропдауны на основе Popup ([c38f520](https://github.com/skbkontur/retail-ui/commit/c38f520)), closes [#655](https://github.com/skbkontur/retail-ui/issues/655)

### Features

- **Modal:** `425px` теперь живет в `variables.less` ([21b7192](https://github.com/skbkontur/retail-ui/commit/21b7192))
- **PopupMenu:** функция в caption ([7dbea4e](https://github.com/skbkontur/retail-ui/commit/7dbea4e))
- **ResizeDetecter:** компонент для отслеживания ресайза элемента ([d9fc862](https://github.com/skbkontur/retail-ui/commit/d9fc862))

<a name="0.22.0"></a>

# [0.22.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.21.2...retail-ui@0.22.0) (2018-08-21)

### Bug Fixes

- **Kebab:** восстановление фокуса на кнопке после закрытия ([b3a4002](https://github.com/skbkontur/retail-ui/commit/b3a4002))

### Features

- **Button:** состояние error у button-link ([eb8d3ac](https://github.com/skbkontur/retail-ui/commit/eb8d3ac))
- **Toggle:** переделан компонент ([1a93003](https://github.com/skbkontur/retail-ui/commit/1a93003))

<a name="0.21.2"></a>

## [0.21.2](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.21.0...retail-ui@0.21.2) (2018-08-17)

### Bug Fixes

- **retail-ui:** fix confused publishing ([4d3051b](https://github.com/skbkontur/retail-ui/commit/4d3051b))

<a name="0.21.0"></a>

# [0.21.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.20.2...retail-ui@0.21.0) (2018-08-16)

### Bug Fixes

- **Combobox:** disabled в плоской теме вновь работает ([c083b34](https://github.com/skbkontur/retail-ui/commit/c083b34)), closes [#660](https://github.com/skbkontur/retail-ui/issues/660)
- **Hint:** позиционирование с блочным элементом ([6430b6f](https://github.com/skbkontur/retail-ui/commit/6430b6f)), closes [#637](https://github.com/skbkontur/retail-ui/issues/637)

### Features

- **retail-ui Calendar:** открывается ближайший доступный месяц ([a8e4858](https://github.com/skbkontur/retail-ui/commit/a8e4858)), closes [#658](https://github.com/skbkontur/retail-ui/issues/658)

<a name="0.20.2"></a>

## [0.20.2](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.20.1...retail-ui@0.20.2) (2018-08-06)

### Bug Fixes

- **datepicker:** disable values which are not between min/max date ([1a2a507](https://github.com/skbkontur/retail-ui/commit/1a2a507))
- **datepicker:** select works correct with january ([e2f3eac](https://github.com/skbkontur/retail-ui/commit/e2f3eac))
- **datepicker:** select works correct with january, added test ([682c35a](https://github.com/skbkontur/retail-ui/commit/682c35a))
- **Input:** flat-стили по гайдам ([1f51a19](https://github.com/skbkontur/retail-ui/commit/1f51a19))
- **Input:** стили по гайдам ([da6c464](https://github.com/skbkontur/retail-ui/commit/da6c464)), closes [#627](https://github.com/skbkontur/retail-ui/issues/627)
- **tabs:** added default export ([aad57fd](https://github.com/skbkontur/retail-ui/commit/aad57fd))
- **Textarea:** flat-стили ([829874d](https://github.com/skbkontur/retail-ui/commit/829874d))
- **tooltip:** dont show tail if render returns null ([dc82b86](https://github.com/skbkontur/retail-ui/commit/dc82b86))

<a name="0.20.1"></a>

## [0.20.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.20.0...retail-ui@0.20.1) (2018-07-31)

### Bug Fixes

- **Modal:** фокус внутри Modal ([59e3d82](https://github.com/skbkontur/retail-ui/commit/59e3d82)), closes [#645](https://github.com/skbkontur/retail-ui/issues/645)

<a name="0.20.0"></a>

# [0.20.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.19.1...retail-ui@0.20.0) (2018-07-26)

### Bug Fixes

- **Calendar:** Починен скролл около последнего доступного месяца ([aa0d6a7](https://github.com/skbkontur/retail-ui/commit/aa0d6a7)), closes [#619](https://github.com/skbkontur/retail-ui/issues/619)
- **Dropdown:** починен интерфейс пропсов ([ec37a07](https://github.com/skbkontur/retail-ui/commit/ec37a07)), closes [#633](https://github.com/skbkontur/retail-ui/issues/633)
- **Hint:** fix [#624](https://github.com/skbkontur/retail-ui/issues/624) ([64fa5c5](https://github.com/skbkontur/retail-ui/commit/64fa5c5))
- **InternalMenu:** исправлены тайпинги ([dc6e9cc](https://github.com/skbkontur/retail-ui/commit/dc6e9cc))
- **Loader:** position after window resize ([ed7884d](https://github.com/skbkontur/retail-ui/commit/ed7884d))
- **logotype:** fixed widget button in safari ([eeecacd](https://github.com/skbkontur/retail-ui/commit/eeecacd))
- **Menu:** исправлены тайпинги ([8e79032](https://github.com/skbkontur/retail-ui/commit/8e79032))
- **Modal:** fix top padding if no Header ([3c8d696](https://github.com/skbkontur/retail-ui/commit/3c8d696))
- **Popup:** fix \_updateLocation method ([b14740d](https://github.com/skbkontur/retail-ui/commit/b14740d))
- **textarea:** fixes [#564](https://github.com/skbkontur/retail-ui/issues/564) ([cb0cf4f](https://github.com/skbkontur/retail-ui/commit/cb0cf4f))
- **textarea:** fixes [#564](https://github.com/skbkontur/retail-ui/issues/564) ([b265343](https://github.com/skbkontur/retail-ui/commit/b265343))

### Features

- **CurrencyInput:** добавлен публичный метод focus ([5454a60](https://github.com/skbkontur/retail-ui/commit/5454a60))
- **FxInput:** возможность получить инстанс инпута через innerProp ([52b3072](https://github.com/skbkontur/retail-ui/commit/52b3072))
- **FxInput:** публичный метод focus ([25ebb0d](https://github.com/skbkontur/retail-ui/commit/25ebb0d))
- **input:** pass html attributes to input ([31311fe](https://github.com/skbkontur/retail-ui/commit/31311fe)), closes [#530](https://github.com/skbkontur/retail-ui/issues/530)
- **input:** pass html attributes to input ([332d376](https://github.com/skbkontur/retail-ui/commit/332d376)), closes [#530](https://github.com/skbkontur/retail-ui/issues/530)
- **MenuItem:** принимает Link из react-router-dom ([eab8056](https://github.com/skbkontur/retail-ui/commit/eab8056)), closes [#602](https://github.com/skbkontur/retail-ui/issues/602)
- **Modal:** фокус внутри модалки ([201cb8e](https://github.com/skbkontur/retail-ui/commit/201cb8e))
- **PopupMenu:** закрытие попапа ([97f399e](https://github.com/skbkontur/retail-ui/commit/97f399e))

### Reverts

- refactor(autocomplete): ChangeEvent in onChange ([4a01ff4](https://github.com/skbkontur/retail-ui/commit/4a01ff4))

<a name="0.19.1"></a>

## [0.19.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.19.0...retail-ui@0.19.1) (2018-07-19)

### Bug Fixes

- **ComboBox:** fixed onUnexpectedInput return type ([8ed6f1c](https://github.com/skbkontur/retail-ui/commit/8ed6f1c))
- **Modal:** fixed always enabled mobile styles ([741a719](https://github.com/skbkontur/retail-ui/commit/741a719))
- **RadioGroup:** value is no longer accepts only primitive ([a283d47](https://github.com/skbkontur/retail-ui/commit/a283d47))

<a name="0.19.0"></a>

# [0.19.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.18.14...retail-ui@0.19.0) (2018-07-19)

### Bug Fixes

- **adapters:** fixed all adapters ([9d8252b](https://github.com/skbkontur/retail-ui/commit/9d8252b))
- **Button:** change Button border-radius ([bfa5db8](https://github.com/skbkontur/retail-ui/commit/bfa5db8)), closes [#546](https://github.com/skbkontur/retail-ui/issues/546)
- **Calendar:** пофикшен скролл к максимальному месяцу ([326a2cc](https://github.com/skbkontur/retail-ui/commit/326a2cc))
- **datepicker:** correct keyboard and mouse events in date select ([b8694fb](https://github.com/skbkontur/retail-ui/commit/b8694fb))
- **datepicker:** removed add-event-listener, onmouseleave handler ([aaf620f](https://github.com/skbkontur/retail-ui/commit/aaf620f))
- **Hint:** принудительный перенос длинных слов ([7d5e171](https://github.com/skbkontur/retail-ui/commit/7d5e171)), closes [#596](https://github.com/skbkontur/retail-ui/issues/596)
- **scripts\_\_build:** fixed wrong import ([da2d951](https://github.com/skbkontur/retail-ui/commit/da2d951))
- **scripts\_\_build:** исправлено неверное определение TS файлов ([efd0032](https://github.com/skbkontur/retail-ui/commit/efd0032))
- **Tab:** исправлено попадание лишнего пропа в разметку ([4c03b09](https://github.com/skbkontur/retail-ui/commit/4c03b09)), closes [#605](https://github.com/skbkontur/retail-ui/issues/605)

### Features

- **modal:** адаптивная модалка ([bf76868](https://github.com/skbkontur/retail-ui/commit/bf76868))

<a name="0.18.14"></a>

## [0.18.14](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.18.13...retail-ui@0.18.14) (2018-07-15)

### Bug Fixes

- **combobox:** no focus on placeholder click if flat ([579d765](https://github.com/skbkontur/retail-ui/commit/579d765)), closes [#552](https://github.com/skbkontur/retail-ui/issues/552)
- loader behavior with long content ([a6a14cc](https://github.com/skbkontur/retail-ui/commit/a6a14cc))
- **combobox:** call onBlur if menu is opened ([c5ebde4](https://github.com/skbkontur/retail-ui/commit/c5ebde4))
- **date-picker:** fix [#595](https://github.com/skbkontur/retail-ui/issues/595) ([6880cd6](https://github.com/skbkontur/retail-ui/commit/6880cd6))
- **date-picker-old:** returned missed ts-declaration files ([97c8235](https://github.com/skbkontur/retail-ui/commit/97c8235))
- **datepicker-old:** first date changing shows correctly ([f6d2a10](https://github.com/skbkontur/retail-ui/commit/f6d2a10))
- **input:** fixed placeholder polyfill in flat ([e65ad6c](https://github.com/skbkontur/retail-ui/commit/e65ad6c))
- **link:** fixed props ts-type ([0996fc4](https://github.com/skbkontur/retail-ui/commit/0996fc4))
- **loader:** added Nullable type reference ([20c1da3](https://github.com/skbkontur/retail-ui/commit/20c1da3))
- **loader:** codestyle ([fe57238](https://github.com/skbkontur/retail-ui/commit/fe57238))
- **loader:** component and suffix are no longer required props ([5b9f625](https://github.com/skbkontur/retail-ui/commit/5b9f625))
- **loader:** fixed generating `import` types ([696ec64](https://github.com/skbkontur/retail-ui/commit/696ec64))
- **loader:** horizontal scroll content ([03dfdc8](https://github.com/skbkontur/retail-ui/commit/03dfdc8))
- **logotype:** component is no longer required prop ([520c2d2](https://github.com/skbkontur/retail-ui/commit/520c2d2))
- **password-input:** fixed generating `import` types ([d05f88e](https://github.com/skbkontur/retail-ui/commit/d05f88e))
- **select:** better definitions ([489f1cb](https://github.com/skbkontur/retail-ui/commit/489f1cb))
- **tab:** support [@types](https://github.com/types)/react@15 definitions ([5b120bb](https://github.com/skbkontur/retail-ui/commit/5b120bb))
- **top-bar:** better definitions ([e7fcb6e](https://github.com/skbkontur/retail-ui/commit/e7fcb6e))

<a name="0.18.13"></a>

## [0.18.13](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.18.12...retail-ui@0.18.13) (2018-07-09)

### Bug Fixes

- **ts-definitions:** replaced global types with local types ([bbda3c0](https://github.com/skbkontur/retail-ui/commit/bbda3c0))

<a name="0.18.12"></a>

## 0.18.12 (2018-07-09)

### Bug Fixes

- **lookup:** allow correctly work with recompose ([80ebb97](https://github.com/skbkontur/retail-ui/commit/80ebb97))
- **modal:** fixed paddings and close button ([e55e763](https://github.com/skbkontur/retail-ui/commit/e55e763))
- **popup:** fixed recursive updates for older react ([9309748](https://github.com/skbkontur/retail-ui/commit/9309748))
- **сurrency-input:** починка ввода циферок на андроиде и под selenium ([d3f0286](https://github.com/skbkontur/retail-ui/commit/d3f0286))
