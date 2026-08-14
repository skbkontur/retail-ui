# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.3](/compare/@skbkontur/typography@1.0.2...@skbkontur/typography@1.0.3) (2026-08-14)


### Bug Fixes

* **Typography:** add tslib to dependencies 60f1895





## [1.0.2](/compare/@skbkontur/typography@1.0.0...@skbkontur/typography@1.0.2) (2026-08-14)

**Note:** Version bump only for package @skbkontur/typography





## [1.0.1](/compare/@skbkontur/typography@1.0.0...@skbkontur/typography@1.0.1) (2026-06-10)


### Bug Fixes

* **Typography:** update typography heading tokens d854cfd





# [1.0.0](/compare/@skbkontur/typography@0.2.2...@skbkontur/typography@1.0.0) (2026-06-04)


### Features


New typography use `heading*` `body*`, `bodyWide*` styles from Kontur Typography Figma styles. Now use scale `use="heading-xs"` instead numbers `size={56}`.

Syles contains 3-4 base params: `font-size`, `line-height`, `font-weight`, `font-feauture-setting`. `noSpacing` have been removed, use resets and own spacings.


* **Common:** Add tabular-nums (monospace nums) for `body` style 703d87d
- **Common:** Add `reset` styles param; in React by default 703d87d
* **Common:** Add weight param React/CSS/SCSS/Less 64b00e7
* **Common:** Remove `wideColumn` param, work with `body-wide-*` d55fa4a
* **Common:** Remove `noSpacing` param 064805f 5505ef4
- **Common:** Rename modules: `t.css`, `t.module.css`, `t.scss`, `t.less` 703d87d
* **React:** add `<Heading>` component 703d87d
* **React:** add all HTMLElement props in React components 703d87d
* **React:** add `use` prop 3ae4a80
* **React:** rename `tag` → `as` prop 3ae4a80
* **React:** add more tag support in `as` prop 38b9fc7
* **React:** add defaults for `as` prop (Heading: `<div>`, Text: `<span>`) 3ae4a80
* **CSS:** use `.t-dash-case` format db1fbd9
* **CSS Modules:** use `t.camelCase` format, remove `t` prefix aafb59a
* **SCSS:** rename `@include t(56)` → `t-heading-*()` for better autocomplete 703d87d
* **Less:** rename `.t(56)` → `t-heading-*()` for better autocomplete 703d87d


### Bug Fixes

* **Typography:** remove legacy if(), deprecated in sass 1.95 10945e0
* **React:** use forwardRef for react-ui `Tooltip` / `Hint` compability 7008ebe




## [0.2.2](/compare/@skbkontur/typography@0.2.1...@skbkontur/typography@0.2.2) (2026-05-08)


### Bug Fixes

* update react & @skbkontur/react-ui peerDependency 21fad11





## [0.2.1](/compare/@skbkontur/typography@0.2.0...@skbkontur/typography@0.2.1) (2026-04-20)

**Note:** Version bump only for package @skbkontur/typography





# [0.2.0](/compare/@skbkontur/typography@0.1.3...@skbkontur/typography@0.2.0) (2026-03-31)

### BREAKING CHANGES

- adopt react-ui v6 renderEnvironment context ([0c119ec](https://git.skbkontur.ru/ui/ui-parking-2/-/commit/0c119ec))
- type module, esm-only build, exports ([60e9281](https://git.skbkontur.ru/ui/ui-parking-2/-/commit/60e9281))

## [0.1.3](https://git.skbkontur.ru/ui/ui-parking-2/compare/@skbkontur/typography@0.1.2...@skbkontur/typography@0.1.3) (2025-12-10)

### Bug Fixes

- **typography:** specified undefined type explicitly ([2806dca](https://git.skbkontur.ru/ui/ui-parking-2/commits/2806dca87d6cd5339987a3174663307c4a01c9d8))

## [0.1.2](https://git.skbkontur.ru/ui/ui-parking-2/compare/@skbkontur/typography@0.1.1...@skbkontur/typography@0.1.2) (2025-11-11)

### Bug Fixes

- **typography:** caption 12 line-height by design ([2a2a1d6](https://git.skbkontur.ru/ui/ui-parking-2/commits/2a2a1d674f0842f5f9a1e3e61bbef350dc9ea8f1))

## [0.1.1](https://git.skbkontur.ru/ui/ui-parking-2/compare/@skbkontur/typography@0.1.0...@skbkontur/typography@0.1.1) (2025-05-06)

**Note:** Version bump only for package @skbkontur/typography

# 0.1.0 (2025-04-02)

### Features

- **Typography:** new package @skbkontur/typography ([c86744a](https://git.skbkontur.ru/ui/ui-parking-2/commits/c86744a3300078ad6dbff68d9a29aaf909aeed01))
