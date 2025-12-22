# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://git.skbkontur.ru/ui/ui-parking-2/compare/@skbkontur/colors@1.1.1...@skbkontur/colors@2.0.0) (2025-12-22)


### Features

* **Colors:** add new semantic tokens with color shemes & dark themes (v2) ([6214338](https://git.skbkontur.ru/ui/ui-parking-2/commits/62143381754449459234e0508e5fd414f9d90f07))

- Color Schemes: Includes specific palettes for every brand color.
- Semantic Tokens: Built using a semantic logic for easier naming and use.
- Dark Mode: Full support for dark themes.
- Accessibility: Color contrast follows APCA W3 standards.
- Figma Sync: Completely synchronized with Figma Variables.
- Framework Agnostic: Compatible with any web framework.

**API**

- CSS Variables: Powered by standard variables like `var(--k-color-token-name)`, accessible via JS/TS, SCSS/Less.
- Multi-Scheme Config: Configure multiple schemes simultaneously using HTML attributes: `data-k-brand`, `data-k-accent`, and `data-k-theme`.
- Advanced JS API `getColors`: Generate custom palettes for any shade and create your own tokens via JS.

**Core Settings**

Both Figma and the code package rely on three main settings:
- brand: primary brand color (red, orange, green, mint, blue, blueDeep, violet, purple, or any #custom-hex).
- accent: UI accent color (gray, brand, or #custom-hex). Default is gray.
- theme: mode light or dark. Default is light.


## [1.1.1](https://git.skbkontur.ru/ui/ui-parking-2/compare/@skbkontur/colors@1.1.0...@skbkontur/colors@1.1.1) (2025-05-06)

**Note:** Version bump only for package @skbkontur/colors

# [1.1.0](https://git.skbkontur.ru/ui/ui-parking-2/compare/@skbkontur/colors@1.0.0...@skbkontur/colors@1.1.0) (2025-03-17)

### Features

- add new storybook documentation ([c267b12](https://git.skbkontur.ru/ui/ui-parking-2/commits/c267b12a86e845a219b173a4e69be6a04b972df8))

# [1.0.0](https://git.skbkontur.ru/ui/ui-parking/compare/@skbkontur/colors@0.5.1...@skbkontur/colors@1.0.0) (2024-08-08)

### Features

- **colors:** add scss and change naming ([ef3345f](https://git.skbkontur.ru/ui/ui-parking/commits/ef3345f5f54be830f284c9a2a53991e117b8ba0b))
- **colors:** add scss and change naming ([78b32b7](https://git.skbkontur.ru/ui/ui-parking/commits/78b32b7a22d260baf166195e7eb1adeea5b2c9f7))

### BREAKING CHANGES

- **colors:** change naming from camelCase to dash-case
- **colors:** change naming from camelCase to dash-case

## [0.5.1](https://git.skbkontur.ru/ui/ui-parking/compare/@skbkontur/colors@0.5.0...@skbkontur/colors@0.5.1) (2024-08-08)

**Note:** Version bump only for package @skbkontur/colors

# [0.5.0](https://git.skbkontur.ru/ui/ui-parking/compare/@skbkontur/colors@0.4.4...@skbkontur/colors@0.5.0) (2024-06-25)

### Features

- **colors:** update colors 2024 ([7020c9b](https://git.skbkontur.ru/ui/ui-parking/commits/7020c9b1311e4e37973847af70bad28cbbd2902d))

### Reverts

- remove screenshots in ie11 and obsolete packages ([57a6e89](https://git.skbkontur.ru/ui/ui-parking/commits/57a6e8962089825b6c71c1b96f4d09bc8a5a4ef7))

## [0.4.4](https://git.skbkontur.ru/ui/ui-parking/compare/@skbkontur/colors@0.4.3...@skbkontur/colors@0.4.4) (2023-08-11)

**Note:** Version bump only for package @skbkontur/colors

## [0.4.3](https://git.skbkontur.ru/ui/ui-parking/compare/@skbkontur/colors@0.4.2...@skbkontur/colors@0.4.3) (2023-08-11)

**Note:** Version bump only for package @skbkontur/colors

## [0.4.2](https://git.skbkontur.ru/ui/ui-parking/compare/@skbkontur/colors@0.4.1...@skbkontur/colors@0.4.2) (2023-08-11)

**Note:** Version bump only for package @skbkontur/colors

## [0.4.1](https://git.skbkontur.ru/ui/ui-parking/compare/@skbkontur/colors@0.4.0...@skbkontur/colors@0.4.1) (2023-06-29)

**Note:** Version bump only for package @skbkontur/colors

# [0.4.0](https://git.skbkontur.ru/ui/ui-parking/compare/@skbkontur/colors@0.3.0...@skbkontur/colors@0.4.0) (2023-05-22)

### Features

- **colors:** обновление grayscaleSecondaryText с [#858585](https://git.skbkontur.ru/ui/ui-parking/issues/858585) на [#757575](https://git.skbkontur.ru/ui/ui-parking/issues/757575) ([8f27457](https://git.skbkontur.ru/ui/ui-parking/commits/8f27457477e25ecd52dfb7ab9b1f521145b25125))

# [0.3.0](https://git.skbkontur.ru/ui/ui-parking/compare/@skbkontur/colors@0.1.1...@skbkontur/colors@0.3.0) (2023-05-12)

### Features

- **colors:** добавила новые цвета с прозрачностью ([9cd91ef](https://git.skbkontur.ru/ui/ui-parking/commits/9cd91ef608a9f619d02cfb818cf2a4dc2c410929))

# [0.2.0](https://git.skbkontur.ru/ui/ui-parking/compare/@skbkontur/colors@0.1.1...@skbkontur/colors@0.2.0) (2023-05-12)

### Features

- **colors:** добавила новые цвета с прозрачностью ([9cd91ef](https://git.skbkontur.ru/ui/ui-parking/commits/9cd91ef608a9f619d02cfb818cf2a4dc2c410929))

## [0.1.1](https://git.skbkontur.ru/ui/ui-parking/compare/@skbkontur/colors@0.1.0...@skbkontur/colors@0.1.1) (2023-02-06)

**Note:** Version bump only for package @skbkontur/colors

# 0.1.0 (2023-02-03)

### Features

- new package @skbkontur/colors ([e9e1a88](https://git.skbkontur.ru/ui/ui-parking/commits/e9e1a88b3f5cea124a770a9e18c5eef2524521dc))
