# Migration Guides

## colors 2.x → 3.0

- Значения синхронизированы с Figma: изменено 89 значений в light и 93 в dark
- Нейтральные заливки разделены на сплошные (`Solid`) и полупрозрачные (`Alpha`)
- У логотипов Контура и продукта отдельные токены
- Удалено 16 устаревших токенов

Изменения одинаковы для веба (JS, CSS, SCSS, LESS) и мобильных токенов Android и iOS (`tokens-mobile/*.json`). Исключение — токены с `Hover` и `Pressed`: в мобильных токенах их нет.

### Удалённые токены

| Было                                 | Стало                            | Комментарий                                              |
| ------------------------------------ | -------------------------------- | -------------------------------------------------------- |
| `shapeBoldNeutral`                   | `shapeBoldNeutralSolid`          |                                                          |
| `shapeBoldNeutralHover`              | `shapeBoldNeutralSolidHover`     |                                                          |
| `shapeBoldNeutralPressed`            | `shapeBoldNeutralSolidPressed`   | был полупрозрачным, стал сплошным: `#747474` / `#a4a4a4` |
| `shapeHeavyNeutral`                  | `shapeHeavyNeutralSolid`         |                                                          |
| `shapeOtherBacklessHover`            | `shapeOtherBacklessAlphaHover`   | прозрачность: light 0.06 → 0.05, dark 0.06 → 0.1         |
| `shapeOtherBacklessPressed`          | `shapeOtherBacklessAlphaPressed` | прозрачность: light 0.16 → 0.11, dark 0.04 → 0.05        |
| `shapeOtherNeutralFaintSolid`        | `shapeFaintNeutralSolid`         |                                                          |
| `shapeOtherNeutralFaintSolidHover`   | `shapeFaintNeutralSolidHover`    |                                                          |
| `shapeOtherNeutralFaintSolidPressed` | `shapeFaintNeutralSolidPressed`  |                                                          |
| `shapeOtherNeutralPaleSolid`         | `shapePaleNeutralSolid`          |                                                          |
| `shapeOtherNeutralPaleSolidHover`    | `shapePaleNeutralSolidHover`     |                                                          |
| `shapeOtherNeutralPaleSolidPressed`  | `shapePaleNeutralSolidPressed`   |                                                          |
| `shapeOtherNeutralSoftSolid`         | `shapeSoftNeutralSolid`          |                                                          |
| `shapeOtherNeutralSoftSolidHover`    | `shapeSoftNeutralSolidHover`     |                                                          |
| `shapeOtherNeutralSoftSolidPressed`  | `shapeSoftNeutralSolidPressed`   |                                                          |
| `textLogo`                           | `illustrationProductLogo`        |                                                          |

### Новые токены

| Токен                            | light              | dark                     | Комментарий                                      |
| -------------------------------- | ------------------ | ------------------------ | ------------------------------------------------ |
| `illustrationKonturLogo`         | `#222222`          | `#ffffff`                | логотип Контура                                  |
| `illustrationProductLogo`        | `#fe4c4c`          | `#fe4c4c`                | логотип продукта, цвет бренда; замена `textLogo` |
| `shapeBoldNeutralAlpha`          | `rgba(0,0,0,0.68)` | `rgba(255,255,255,0.7)`  |                                                  |
| `shapeBoldNeutralAlphaHover`     | `rgba(0,0,0,0.76)` | `rgba(255,255,255,0.82)` |                                                  |
| `shapeBoldNeutralAlphaPressed`   | `rgba(0,0,0,0.54)` | `rgba(255,255,255,0.57)` |                                                  |
| `shapeBoldNeutralSolid`          | `#525252`          | `#bebebe`                | замена `shapeBoldNeutral`                        |
| `shapeBoldNeutralSolidHover`     | `#3d3d3d`          | `#d7d7d7`                | замена `shapeBoldNeutralHover`                   |
| `shapeBoldNeutralSolidPressed`   | `#747474`          | `#a4a4a4`                | замена `shapeBoldNeutralPressed`                 |
| `shapeFaintNeutralSolid`         | `#f2f2f2`          | `#333333`                | замена `shapeOtherNeutralFaintSolid`             |
| `shapeFaintNeutralSolidHover`    | `#e4e4e4`          | `#3d3d3d`                | замена `shapeOtherNeutralFaintSolidHover`        |
| `shapeFaintNeutralSolidPressed`  | `#d7d7d7`          | `#333333`                | замена `shapeOtherNeutralFaintSolidPressed`      |
| `shapeHeavyNeutralAlpha`         | `rgba(0,0,0,0.84)` | `rgba(255,255,255,0.94)` |                                                  |
| `shapeHeavyNeutralSolid`         | `#292929`          | `#f2f2f2`                | замена `shapeHeavyNeutral`                       |
| `shapeOtherBacklessAlphaHover`   | `rgba(0,0,0,0.05)` | `rgba(255,255,255,0.1)`  | замена `shapeOtherBacklessHover`                 |
| `shapeOtherBacklessAlphaPressed` | `rgba(0,0,0,0.11)` | `rgba(255,255,255,0.05)` | замена `shapeOtherBacklessPressed`               |
| `shapeOtherBacklessSolidHover`   | `#f2f2f2`          | `#3d3d3d`                |                                                  |
| `shapeOtherBacklessSolidPressed` | `#e4e4e4`          | `#333333`                |                                                  |
| `shapePaleNeutralSolid`          | `#e4e4e4`          | `#3d3d3d`                | замена `shapeOtherNeutralPaleSolid`              |
| `shapePaleNeutralSolidHover`     | `#d7d7d7`          | `#484848`                | замена `shapeOtherNeutralPaleSolidHover`         |
| `shapePaleNeutralSolidPressed`   | `#cacaca`          | `#333333`                | замена `shapeOtherNeutralPaleSolidPressed`       |
| `shapeSoftNeutralSolid`          | `#d7d7d7`          | `#484848`                | замена `shapeOtherNeutralSoftSolid`              |
| `shapeSoftNeutralSolidHover`     | `#bebebe`          | `#5d5d5d`                | замена `shapeOtherNeutralSoftSolidHover`         |
| `shapeSoftNeutralSolidPressed`   | `#b1b1b1`          | `#3d3d3d`                | замена `shapeOtherNeutralSoftSolidPressed`       |

### Изменённые значения

| Токен                                   | light                                               | dark                                                |
| --------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `illustrationBlack`                     | `#0d0d0d` → `#000000`                               | `#0d0d0d` → `#000000`                               |
| `illustrationOnBrand`                   | `rgba(255,255,255,1)` → `#ffffff`                   | `rgba(255,255,255,1)` → `#ffffff`                   |
| `lineAccentBoldPressed`                 | `rgba(0,0,0,0.64)` → `rgba(0,0,0,0.63)`             | —                                                   |
| `lineAccentPale`                        | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             | —                                                   |
| `lineAccentPaleHover`                   | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              | `rgba(255,255,255,0.32)` → `rgba(255,255,255,0.3)`  |
| `lineAccentPalePressed`                 | —                                                   | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` |
| `lineAccentSoft`                        | `rgba(0,0,0,0.48)` → `rgba(0,0,0,0.5)`              | `rgba(255,255,255,0.48)` → `rgba(255,255,255,0.46)` |
| `lineAccentSoftHover`                   | `rgba(0,0,0,0.96)` → `rgba(0,0,0,0.92)`             | —                                                   |
| `lineAccentSoftPressed`                 | `rgba(0,0,0,0.96)` → `rgba(0,0,0,0.92)`             | —                                                   |
| `lineConstFaintBlack`                   | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.11)`             | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.11)`             |
| `lineConstFaintWhite`                   | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  |
| `lineConstPaleBlack`                    | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             |
| `lineConstPaleBlackHover`               | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              |
| `lineConstPaleWhiteHover`               | `rgba(255,255,255,0.32)` → `rgba(255,255,255,0.3)`  | `rgba(255,255,255,0.32)` → `rgba(255,255,255,0.3)`  |
| `lineConstPaleWhitePressed`             | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` |
| `lineInvertedAccentBoldPressed`         | —                                                   | `rgba(0,0,0,0.64)` → `rgba(0,0,0,0.63)`             |
| `lineInvertedAccentPale`                | —                                                   | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             |
| `lineInvertedAccentPaleHover`           | `rgba(255,255,255,0.32)` → `rgba(255,255,255,0.3)`  | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              |
| `lineInvertedAccentPalePressed`         | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` | —                                                   |
| `lineInvertedAccentSoft`                | `rgba(255,255,255,0.48)` → `rgba(255,255,255,0.46)` | `rgba(0,0,0,0.48)` → `rgba(0,0,0,0.5)`              |
| `lineInvertedAccentSoftHover`           | —                                                   | `rgba(0,0,0,0.96)` → `rgba(0,0,0,0.92)`             |
| `lineInvertedAccentSoftPressed`         | —                                                   | `rgba(0,0,0,0.96)` → `rgba(0,0,0,0.92)`             |
| `lineInvertedNeutralFaint`              | `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.1)`  | `rgba(0,0,0,0.08)` → `rgba(0,0,0,0.11)`             |
| `lineInvertedNeutralPale`               | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` | —                                                   |
| `lineInvertedNeutralPaleHover`          | —                                                   | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             |
| `lineInvertedNeutralPalePressed`        | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              |
| `lineNeutralFaint`                      | `rgba(0,0,0,0.08)` → `rgba(0,0,0,0.11)`             | `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.1)`  |
| `lineNeutralPale`                       | —                                                   | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` |
| `lineNeutralPaleHover`                  | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             | —                                                   |
| `lineNeutralPalePressed`                | —                                                   | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  |
| `lineOnAccentBoldFaint`                 | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.11)`             |
| `lineOnAccentBoldPale`                  | —                                                   | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             |
| `lineOnBrandOriginalFaint`              | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  |
| `shapeConstBacklessBlackHover`          | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.11)`             | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.11)`             |
| `shapeConstBacklessBlackPressed`        | `rgba(0,0,0,0.16)` → `rgba(0,0,0,0.11)`             | `rgba(0,0,0,0.16)` → `rgba(0,0,0,0.11)`             |
| `shapeConstBacklessWhiteHover`          | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  |
| `shapeConstBacklessWhitePressed`        | `rgba(255,255,255,0.06)` → `rgba(255,255,255,0.05)` | `rgba(255,255,255,0.06)` → `rgba(255,255,255,0.05)` |
| `shapeConstDisabledBlack`               | `rgba(0,0,0,0.06)` → `rgba(0,0,0,0.05)`             | `rgba(0,0,0,0.06)` → `rgba(0,0,0,0.05)`             |
| `shapeConstDisabledWhite`               | `rgba(255,255,255,0.06)` → `rgba(255,255,255,0.05)` | `rgba(255,255,255,0.06)` → `rgba(255,255,255,0.05)` |
| `shapeConstFaintBlack`                  | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.11)`             | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.11)`             |
| `shapeConstFaintBlackPressed`           | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             |
| `shapeConstFaintWhite`                  | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  |
| `shapeConstFaintWhiteHover`             | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` |
| `shapeConstFaintWhitePressed`           | `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.1)`  | `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.1)`  |
| `shapeConstHeavyBlackPressed`           | `rgba(0,0,0,0.64)` → `rgba(0,0,0,0.63)`             | `rgba(0,0,0,0.64)` → `rgba(0,0,0,0.63)`             |
| `shapeConstPaleBlackHover`              | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             |
| `shapeConstPaleBlackPressed`            | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              |
| `shapeConstPaleWhite`                   | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` |
| `shapeConstPaleWhitePressed`            | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  |
| `shapeConstSoftBlack`                   | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             |
| `shapeConstSoftBlackHover`              | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              |
| `shapeConstSoftWhiteHover`              | `rgba(255,255,255,0.32)` → `rgba(255,255,255,0.3)`  | `rgba(255,255,255,0.32)` → `rgba(255,255,255,0.3)`  |
| `shapeFaintAccent`                      | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.11)`             | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  |
| `shapeFaintAccentHover`                 | —                                                   | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` |
| `shapeFaintAccentPressed`               | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             | `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.1)`  |
| `shapeFaintNeutralAlpha`                | `rgba(0,0,0,0.06)` → `rgba(0,0,0,0.05)`             | `rgba(255,255,255,0.06)` → `rgba(255,255,255,0.05)` |
| `shapeFaintNeutralAlphaHover`           | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.11)`             | `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.1)`  |
| `shapeFaintNeutralAlphaPressed`         | —                                                   | `rgba(255,255,255,0.04)` → `rgba(255,255,255,0.05)` |
| `shapeInvertedBacklessHover`            | `rgba(255,255,255,0.06)` → `rgba(255,255,255,0.1)`  | `rgba(0,0,0,0.06)` → `rgba(0,0,0,0.05)`             |
| `shapeInvertedBacklessPressed`          | `rgba(255,255,255,0.04)` → `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.16)` → `rgba(0,0,0,0.11)`             |
| `shapeInvertedDisabled`                 | `rgba(255,255,255,0.06)` → `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.06)` → `rgba(0,0,0,0.05)`             |
| `shapeInvertedNeutralFaintAlpha`        | `rgba(255,255,255,0.06)` → `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.06)` → `rgba(0,0,0,0.05)`             |
| `shapeInvertedNeutralFaintAlphaHover`   | `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.1)`  | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.11)`             |
| `shapeInvertedNeutralFaintAlphaPressed` | `rgba(255,255,255,0.04)` → `rgba(255,255,255,0.05)` | —                                                   |
| `shapeInvertedNeutralHeavyPressed`      | `rgba(255,255,255,0.72)` → `rgba(255,255,255,0.7)`  | —                                                   |
| `shapeInvertedNeutralPaleAlpha`         | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.11)`             |
| `shapeInvertedNeutralPaleAlphaHover`    | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` | —                                                   |
| `shapeInvertedNeutralPaleAlphaPressed`  | `rgba(255,255,255,0.06)` → `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             |
| `shapeInvertedNeutralSoftAlpha`         | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` | —                                                   |
| `shapeInvertedNeutralSoftAlphaHover`    | —                                                   | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             |
| `shapeInvertedNeutralSoftAlphaPressed`  | `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.1)`  | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              |
| `shapeOtherAccentBoldDisabled`          | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              | `rgba(255,255,255,0.32)` → `rgba(255,255,255,0.3)`  |
| `shapeOtherBase`                        | —                                                   | `rgba(255,255,255,0.06)` → `rgba(255,255,255,0.05)` |
| `shapeOtherBaseHover`                   | —                                                   | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  |
| `shapeOtherBasePressed`                 | `rgba(255,255,255,0.32)` → `rgba(255,255,255,0.3)`  | `rgba(255,255,255,0.04)` → `rgba(255,255,255,0.05)` |
| `shapeOtherDisabled`                    | `rgba(0,0,0,0.06)` → `rgba(0,0,0,0.05)`             | `rgba(255,255,255,0.06)` → `rgba(255,255,255,0.05)` |
| `shapeOtherFieldHover`                  | —                                                   | `rgba(0,0,0,0.04)` → `rgba(0,0,0,0.03)`             |
| `shapeOtherFieldPressed`                | —                                                   | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.21)`             |
| `shapeOtherLow`                         | `rgba(0,0,0,0.06)` → `rgba(0,0,0,0.05)`             | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             |
| `shapeOtherLowHover`                    | `rgba(0,0,0,0.08)` → `rgba(0,0,0,0.11)`             | —                                                   |
| `shapeOtherLowPressed`                  | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.16)`             | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              |
| `shapePaleAccent`                       | —                                                   | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` |
| `shapePaleAccentHover`                  | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             | —                                                   |
| `shapePaleAccentPressed`                | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  |
| `shapePaleNeutralAlpha`                 | `rgba(0,0,0,0.12)` → `rgba(0,0,0,0.11)`             | `rgba(255,255,255,0.12)` → `rgba(255,255,255,0.1)`  |
| `shapePaleNeutralAlphaHover`            | —                                                   | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` |
| `shapePaleNeutralAlphaPressed`          | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.21)`             | `rgba(255,255,255,0.06)` → `rgba(255,255,255,0.05)` |
| `shapeSoftAccent`                       | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              | `rgba(255,255,255,0.32)` → `rgba(255,255,255,0.3)`  |
| `shapeSoftAccentHover`                  | —                                                   | `rgba(255,255,255,0.4)` → `rgba(255,255,255,0.41)`  |
| `shapeSoftAccentPressed`                | `rgba(0,0,0,0.48)` → `rgba(0,0,0,0.5)`              | —                                                   |
| `shapeSoftNeutralAlpha`                 | —                                                   | `rgba(255,255,255,0.16)` → `rgba(255,255,255,0.15)` |
| `shapeSoftNeutralAlphaHover`            | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             | —                                                   |
| `shapeSoftNeutralAlphaPressed`          | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              | `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.1)`  |
| `surfaceModalBackdrop`                  | `rgba(0,0,0,0.24)` → `rgba(0,0,0,0.26)`             | —                                                   |
| `textAccentHeavyHover`                  | `rgba(0,0,0,0.96)` → `rgba(0,0,0,0.92)`             | —                                                   |
| `textAccentHeavyPressed`                | `rgba(0,0,0,0.96)` → `rgba(0,0,0,0.92)`             | —                                                   |
| `textConstFaintBlack`                   | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              |
| `textConstFaintWhite`                   | `rgba(255,255,255,0.4)` → `rgba(255,255,255,0.41)`  | `rgba(255,255,255,0.4)` → `rgba(255,255,255,0.41)`  |
| `textConstPaleWhite`                    | `rgba(255,255,255,0.48)` → `rgba(255,255,255,0.46)` | `rgba(255,255,255,0.48)` → `rgba(255,255,255,0.46)` |
| `textConstSoftBlack`                    | `rgba(0,0,0,0.56)` → `rgba(0,0,0,0.54)`             | `rgba(0,0,0,0.56)` → `rgba(0,0,0,0.54)`             |
| `textInvertedAccentHeavyHover`          | —                                                   | `rgba(0,0,0,0.96)` → `rgba(0,0,0,0.92)`             |
| `textInvertedAccentHeavyPressed`        | —                                                   | `rgba(0,0,0,0.96)` → `rgba(0,0,0,0.92)`             |
| `textInvertedNeutralFaint`              | `rgba(255,255,255,0.4)` → `rgba(255,255,255,0.41)`  | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              |
| `textInvertedNeutralPale`               | `rgba(255,255,255,0.48)` → `rgba(255,255,255,0.46)` | —                                                   |
| `textInvertedNeutralSoft`               | —                                                   | `rgba(0,0,0,0.56)` → `rgba(0,0,0,0.54)`             |
| `textNeutralFaint`                      | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              | `rgba(255,255,255,0.4)` → `rgba(255,255,255,0.41)`  |
| `textNeutralPale`                       | —                                                   | `rgba(255,255,255,0.48)` → `rgba(255,255,255,0.46)` |
| `textNeutralSoft`                       | `rgba(0,0,0,0.56)` → `rgba(0,0,0,0.54)`             | —                                                   |
| `textOnAccentBoldFaint`                 | `rgba(255,255,255,0.4)` → `rgba(255,255,255,0.41)`  | `rgba(0,0,0,0.32)` → `rgba(0,0,0,0.3)`              |
| `textOnAccentBoldPale`                  | `rgba(255,255,255,0.48)` → `rgba(255,255,255,0.52)` | —                                                   |
| `textOnAccentBoldSoft`                  | —                                                   | `rgba(0,0,0,0.56)` → `rgba(0,0,0,0.54)`             |
| `textOnBrandOriginalFaint`              | `rgba(255,255,255,0.4)` → `rgba(255,255,255,0.41)`  | `rgba(255,255,255,0.4)` → `rgba(255,255,255,0.41)`  |
| `textOnBrandOriginalHeavy`              | `rgba(255,255,255,0.96)` → `rgba(255,255,255,0.94)` | `rgba(255,255,255,0.96)` → `rgba(255,255,255,0.94)` |
| `textOnBrandOriginalPale`               | `rgba(255,255,255,0.48)` → `rgba(255,255,255,0.52)` | `rgba(255,255,255,0.48)` → `rgba(255,255,255,0.52)` |
