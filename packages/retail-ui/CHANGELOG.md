# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.26.3"></a>
## [0.26.3](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.26.1...retail-ui@0.26.3) (2018-10-25)


### Bug Fixes

* **Sticky:** fix default value of allowChildWithMargins ([94dcfd1](https://github.com/skbkontur/retail-ui/commit/94dcfd1))




<a name="0.26.2"></a>
## [0.26.2](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.26.0...retail-ui@0.26.2) (2018-10-25)


### Bug Fixes

* **Sticky:** fix default value of allowChildWithMargins ([fffbea0](https://github.com/skbkontur/retail-ui/commit/fffbea0))
* **Sticky:** вернули старое поведение с бесконечной рекурсией ([ebbbeec](https://github.com/skbkontur/retail-ui/commit/ebbbeec))




<a name="0.26.1"></a>
## [0.26.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.26.0...retail-ui@0.26.1) (2018-10-24)




**Note:** Version bump only for package retail-ui

<a name="0.26.0"></a>
# [0.26.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.25.0...retail-ui@0.26.0) (2018-10-23)


### Bug Fixes

* **Button:** fix subpixel bug in chrome ([a757350](https://github.com/skbkontur/retail-ui/commit/a757350))
* **FxInput:** fix warning from 'mainInGroup' prop ([d24390c](https://github.com/skbkontur/retail-ui/commit/d24390c))
* **HBVS:** окончательно отремонтирован ([c8df8a5](https://github.com/skbkontur/retail-ui/commit/c8df8a5))
* **Modal:** fix modalClickTrap height, close [#810](https://github.com/skbkontur/retail-ui/issues/810) ([01497b5](https://github.com/skbkontur/retail-ui/commit/01497b5))


### Features

* **combobox:** accept onUnexpectedInput handler return value ([e6c1d37](https://github.com/skbkontur/retail-ui/commit/e6c1d37))
* **Icon:** use svg icons ([0690828](https://github.com/skbkontur/retail-ui/commit/0690828))




<a name="0.25.0"></a>
# [0.25.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.24.1...retail-ui@0.25.0) (2018-10-15)


### Bug Fixes

* **ComboBox:** onChange при потере фокуса ([c3353b0](https://github.com/skbkontur/retail-ui/commit/c3353b0)), closes [#680](https://github.com/skbkontur/retail-ui/issues/680)
* **HBVS:** пересчет размеров окна в каждом didUpdate, Closed [#717](https://github.com/skbkontur/retail-ui/issues/717) ([a162a03](https://github.com/skbkontur/retail-ui/commit/a162a03))
* **Input:** fix console.log warning in group ([2bd4287](https://github.com/skbkontur/retail-ui/commit/2bd4287))
* **Input:** повыщенный z-index при фокусе ([cf7f423](https://github.com/skbkontur/retail-ui/commit/cf7f423))
* **Kebab:** react warning of unitless number ([66c6f21](https://github.com/skbkontur/retail-ui/commit/66c6f21))
* **Modal:** fix click-handler ([cf84fd9](https://github.com/skbkontur/retail-ui/commit/cf84fd9)), closes [#757](https://github.com/skbkontur/retail-ui/issues/757)
* **Modal:** focusLock отключен в ie, fix [#784](https://github.com/skbkontur/retail-ui/issues/784) ([839c7fa](https://github.com/skbkontur/retail-ui/commit/839c7fa))
* **Popup:** change min-width to fix [#799](https://github.com/skbkontur/retail-ui/issues/799) ([4fb60a6](https://github.com/skbkontur/retail-ui/commit/4fb60a6))
* **ResizeDetector:** удален `removeEventListener` :green_apple: ([ab586f7](https://github.com/skbkontur/retail-ui/commit/ab586f7))
* **Tabs:** fix setState after unmount in Indicator component ([7444784](https://github.com/skbkontur/retail-ui/commit/7444784)), closes [#735](https://github.com/skbkontur/retail-ui/issues/735)


### Features

* **Calendar:** больше переменных в стилях ([212bd1f](https://github.com/skbkontur/retail-ui/commit/212bd1f)), closes [#755](https://github.com/skbkontur/retail-ui/issues/755)
* **Group:** added Group tests and Stories ([a669d7f](https://github.com/skbkontur/retail-ui/commit/a669d7f))
* **Input:** выделение значения ([1b68c7a](https://github.com/skbkontur/retail-ui/commit/1b68c7a))
* **Textarea:** выделение значения ([8282b37](https://github.com/skbkontur/retail-ui/commit/8282b37))




<a name="0.24.1"></a>
## [0.24.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.24.0...retail-ui@0.24.1) (2018-10-10)


### Bug Fixes

* **ComboBox:** PureComponent заменен на shouldComponentUpdate ([38d34fc](https://github.com/skbkontur/retail-ui/commit/38d34fc))
* **SidePage:** fix zIndex of footer, fixed [#714](https://github.com/skbkontur/retail-ui/issues/714) ([63a2b5d](https://github.com/skbkontur/retail-ui/commit/63a2b5d))




<a name="0.24.0"></a>
# [0.24.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.23.3...retail-ui@0.24.0) (2018-10-08)


### Bug Fixes

* **Button:** fix type link in flat mode ([dc1d505](https://github.com/skbkontur/retail-ui/commit/dc1d505))
* **ComboBox:** изменение значения после unexpectedInput ([c5379be](https://github.com/skbkontur/retail-ui/commit/c5379be)), closes [#730](https://github.com/skbkontur/retail-ui/issues/730)
* **Hint:** pin color for ie11 ([7361e20](https://github.com/skbkontur/retail-ui/commit/7361e20))
* **Input:** fix flat styles ([cbb4e55](https://github.com/skbkontur/retail-ui/commit/cbb4e55)), closes [#731](https://github.com/skbkontur/retail-ui/issues/731)
* **Tooltip:** allow customize color ([26af1d5](https://github.com/skbkontur/retail-ui/commit/26af1d5))


### Features

* **ComboBox:** add 'reset' method ([4ff05fa](https://github.com/skbkontur/retail-ui/commit/4ff05fa))
* onOpen & onClose props for DropDown Menu ([#771](https://github.com/skbkontur/retail-ui/issues/771)) ([9ae4bf0](https://github.com/skbkontur/retail-ui/commit/9ae4bf0)), closes [#769](https://github.com/skbkontur/retail-ui/issues/769) [#733](https://github.com/skbkontur/retail-ui/issues/733)




<a name="0.23.3"></a>
## [0.23.3](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.23.2...retail-ui@0.23.3) (2018-09-27)




**Note:** Version bump only for package retail-ui

<a name="0.23.2"></a>
## [0.23.2](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.23.1...retail-ui@0.23.2) (2018-09-26)


### Bug Fixes

* **Textarea:** fix % width ([d4dab33](https://github.com/skbkontur/retail-ui/commit/d4dab33))




<a name="0.23.1"></a>
## [0.23.1](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.23.0...retail-ui@0.23.1) (2018-09-24)


### Bug Fixes

* **Hint:** render method ([585d0b8](https://github.com/skbkontur/retail-ui/commit/585d0b8))
* **Input:** fix sizes in flat theme :lipstick:, fixed [#732](https://github.com/skbkontur/retail-ui/issues/732) ([2e35605](https://github.com/skbkontur/retail-ui/commit/2e35605))
* **Textarea:** pass width prop to wrapper, fixed [#724](https://github.com/skbkontur/retail-ui/issues/724) ([52611bd](https://github.com/skbkontur/retail-ui/commit/52611bd))
* **Tooltip:** fix positioning with inline-block caption, fix [#721](https://github.com/skbkontur/retail-ui/issues/721) ([6ba920e](https://github.com/skbkontur/retail-ui/commit/6ba920e))




<a name="0.23.0"></a>
# [0.23.0](https://github.com/skbkontur/retail-ui/compare/retail-ui@0.22.0...retail-ui@0.23.0) (2018-09-17)


### Bug Fixes

* **Button:** removed z-index ([02ce734](https://github.com/skbkontur/retail-ui/commit/02ce734))
* **ComboBox:** clear textValue ([c66342c](https://github.com/skbkontur/retail-ui/commit/c66342c))
* **ComboBox:** don't focus if props.value changed with error ([1ce1235](https://github.com/skbkontur/retail-ui/commit/1ce1235))
* **ComboBox:** test replace `is` to `exists` ([0c6247a](https://github.com/skbkontur/retail-ui/commit/0c6247a))
* **CurrencyInput:** missing blur method ([60edcdc](https://github.com/skbkontur/retail-ui/commit/60edcdc))
* **DatePicker:** fixed icon line-height, close [#493](https://github.com/skbkontur/retail-ui/issues/493) ([3c990e0](https://github.com/skbkontur/retail-ui/commit/3c990e0))
* **HBVS:** восстановление скролла контейнера при unmount ([faebf8f](https://github.com/skbkontur/retail-ui/commit/faebf8f))
* **Input:** remove `z-index` from styles ([1abcc3e](https://github.com/skbkontur/retail-ui/commit/1abcc3e))
* **MenuItem:** fix bounds ([34f879f](https://github.com/skbkontur/retail-ui/commit/34f879f)), closes [#662](https://github.com/skbkontur/retail-ui/issues/662)
* **Modal:** починено позиционирование футера ([aabdca6](https://github.com/skbkontur/retail-ui/commit/aabdca6)), closes [#683](https://github.com/skbkontur/retail-ui/issues/683) [#66](https://github.com/skbkontur/retail-ui/issues/66)
* **OldComboBox:** use placeholder color from variables ([3ac585b](https://github.com/skbkontur/retail-ui/commit/3ac585b))
* **retail-ui:** добавил fallback-анимацию для серого спиннера ([5bff386](https://github.com/skbkontur/retail-ui/commit/5bff386)), closes [#9b9b9](https://github.com/skbkontur/retail-ui/issues/9b9b9) [#671](https://github.com/skbkontur/retail-ui/issues/671)
* **Textarea:** fix adapter ([08e5104](https://github.com/skbkontur/retail-ui/commit/08e5104))
* **Toggle:** controlled/uncontrolled ([d0a7df1](https://github.com/skbkontur/retail-ui/commit/d0a7df1)), closes [#699](https://github.com/skbkontur/retail-ui/issues/699)
* **Toggle:** удален console.log, fixed [#689](https://github.com/skbkontur/retail-ui/issues/689) ([7169baf](https://github.com/skbkontur/retail-ui/commit/7169baf))
* **Tooltip:** порядок позиций по гайду ([af61858](https://github.com/skbkontur/retail-ui/commit/af61858)), closes [/guides.kontur.ru/controls/tooltip/#09](https://github.com//guides.kontur.ru/controls/tooltip//issues/09) [#178](https://github.com/skbkontur/retail-ui/issues/178)
* **TopBar:** дропдауны на основе Popup ([c38f520](https://github.com/skbkontur/retail-ui/commit/c38f520)), closes [#655](https://github.com/skbkontur/retail-ui/issues/655)


### Features

* **Modal:** `425px` теперь живет в `variables.less` ([21b7192](https://github.com/skbkontur/retail-ui/commit/21b7192))
* **PopupMenu:** функция в caption ([7dbea4e](https://github.com/skbkontur/retail-ui/commit/7dbea4e))
* **ResizeDetecter:** компонент для отслеживания ресайза элемента ([d9fc862](https://github.com/skbkontur/retail-ui/commit/d9fc862))




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
