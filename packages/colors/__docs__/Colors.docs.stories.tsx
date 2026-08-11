import { css, injectGlobal } from '@emotion/css';
import { IconArrowALeftRegular24 } from '@skbkontur/icons/IconArrowALeftRegular24';
import { IconCommentRectTextRegular24 } from '@skbkontur/icons/IconCommentRectTextRegular24';
import { IconDocTextRegular24 } from '@skbkontur/icons/IconDocTextRegular24';
import { IconMarketShoppingBasketRegular24 } from '@skbkontur/icons/IconMarketShoppingBasketRegular24';
import { IconNaturePlantFlowerSolid20 } from '@skbkontur/icons/IconNaturePlantFlowerSolid20';
import { IconPeople2Regular24 } from '@skbkontur/icons/IconPeople2Regular24';
import { IconQuestionCircleLight20 } from '@skbkontur/icons/IconQuestionCircleLight20';
import { IconSearchLoupeRegular16 } from '@skbkontur/icons/IconSearchLoupeRegular16';
import { IconSettingsGearRegular24 } from '@skbkontur/icons/IconSettingsGearRegular24';
import { IconStackHDownRegular24 } from '@skbkontur/icons/IconStackHDownRegular24';
import { IconWarningTriangleSolid20 } from '@skbkontur/icons/IconWarningTriangleSolid20';
import { IconWeatherMoonRegular16 } from '@skbkontur/icons/IconWeatherMoonRegular16';
import { IconWeatherSunRegular16 } from '@skbkontur/icons/IconWeatherSunRegular16';
import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox';
import { DropdownMenu } from '@skbkontur/react-ui/components/DropdownMenu/DropdownMenu';
import { Gapped } from '@skbkontur/react-ui/components/Gapped/Gapped';
import { Hint } from '@skbkontur/react-ui/components/Hint/Hint';
import { Input } from '@skbkontur/react-ui/components/Input/Input';
import { Link } from '@skbkontur/react-ui/components/Link/Link';
import { MenuHeader } from '@skbkontur/react-ui/components/MenuHeader/MenuHeader';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem/MenuItem';
import { Radio } from '@skbkontur/react-ui/components/Radio/Radio';
import { RadioGroup } from '@skbkontur/react-ui/components/RadioGroup/RadioGroup';
import { Select } from '@skbkontur/react-ui/components/Select/Select';
import { Tabs } from '@skbkontur/react-ui/components/Tabs/Tabs';
import { Toast } from '@skbkontur/react-ui/components/Toast/Toast';
import { Toggle } from '@skbkontur/react-ui/components/Toggle/Toggle';
import { Tooltip } from '@skbkontur/react-ui/components/Tooltip/Tooltip';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { DARK_THEME } from '@skbkontur/react-ui/lib/theming/themes/DarkTheme';
import { LIGHT_THEME } from '@skbkontur/react-ui/lib/theming/themes/LightTheme';
import { SideMenu } from '@skbkontur/side-menu';
import { CdnLogo } from '@skbkontur/ui-cdn-components';
import type { Meta } from '@storybook/react';
import { parse, differenceEuclidean, type Color, type Rgb } from 'culori';
import React from 'react';

import { getColors } from '../get-colors.js';
import { brand as brandSwatch } from '../lib/consts/default-swatch.js';
import type { ThemeKey } from '../lib/types/tokens.js';
import type { ColorFormat } from '../lib/utils/convert-color.js';

interface TokenPair {
  key: string;
  value: {
    light: string;
    dark: string;
  };
}

interface TokenPairWithMeta extends TokenPair {
  isFuzzy: boolean;
  matchPercent?: number;
}

injectGlobal(`
  [data-role=preview]:has([data-colors-controls]) {
    padding: 0 !important;
  };
`);

// oxlint-disable-next-line import/no-default-export
export default {
  title: 'Colors',
  parameters: {
    creevey: {
      skip: true,
    },
  },
} as Meta;

/**
 * Библиотека состоит из семантических переменных, которые настраиваются через 3 параметра:
 * - **brand** — брендовый цвет `red | orange | green | mint | blue | blueDeep | violet | purple | #custom-hex`
 * - **accent** — акцентный цвет `gray | brand | #custom-hex` (по умолчанию gray)
 * - **theme** — тема `light | dark` (по умолчанию light)
 */
export const ColorsExampleStory = () => {
  const styles: Record<string, string> = {
    colors: css`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 24px;
    `,
    colorGroup: css`
      margin-bottom: 64px;
    `,
    filterRow: css`
      position: sticky;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 16px;
      width: calc(100% - 32px);
      top: 0;
      background: white;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 14px;
    `,
    headerRow: css`
      display: flex;
      align-items: center;
      gap: 16px;
      width: calc(100% - 32px);
      margin-bottom: -24px;
      padding: 4px 16px 4px;
      font-weight: 600;
      color: #222;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 57px;
      z-index: 10;
      background: white;
      font-size: 14px;
      font-weight: 700;
      line-height: 1.2;
    `,
    dropdownRow: css`
      display: flex;
      align-items: center;
      gap: 16px;
      width: calc(100% - 16px);
      padding: 8px;
      margin: 0 8px;
      border-radius: 8px;
      cursor: pointer;
      background: none;
      border: none;
      text-align: left;
      transition: background 0.1s ease;
      font-family: inherit;
      &:hover {
        background: rgba(0, 0, 0, 0.06);
      }
      &:active {
        background: rgba(0, 0, 0, 0.1);
      }
    `,
    colorName: css`
      flex: 1;
    `,
    colorTileWrapper: css`
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      width: 140px;
    `,
    colorTile: css`
      height: 32px;
      width: 32px;
      border: 1px solid rgba(127, 127, 127, 0.3);
      border-radius: 8px;
      flex-shrink: 0;
    `,
    colorHex: css`
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      color: #8b8b8b;
    `,
    groupHeader: css`
      position: sticky;
      top: 57px;
      width: 50%;
      z-index: 10;
      background: white;
      font-size: 14px;
      line-height: 1;
      padding: 4px 16px;
      font-weight: bold;
    `,
    controls: css`
      position: sticky;
      z-index: 10;
      bottom: 0;
      padding: 8px;
      background: white;
      box-shadow: 0 -1px rgba(0, 0, 0, 0.15);
      margin-top: auto;
    `,
  };

  const defaultColorOptions = Object.keys(brandSwatch);
  const defaultBrandColor = 'mint';
  const defaultAccentColor = 'brand';
  const defaultTheme = 'dark';
  const colorOptions = [...defaultColorOptions, 'custom'];
  const baseAccentOptions = ['gray', 'brand', 'custom'];

  const [activeTab, setActiveTab] = React.useState<string>('tab-0');
  const [activeRadio, setActiveRadio] = React.useState<number>(1);
  const [checked, setChecked] = React.useState<boolean>(true);
  const [brand, setBrand] = React.useState(defaultBrandColor);
  const [accent, setAccent] = React.useState(defaultAccentColor);
  const [colorTheme, setColorTheme] = React.useState<ThemeKey>(defaultTheme);

  const [customBrandColor, setCustomBrandColor] = React.useState('#FFDD2D');
  const [customAccentColor, setCustomAccentColor] = React.useState('#FFDD2D');

  const toastRef = React.useRef<Toast>(null);

  const handleCustomBrandColorValueChange = React.useCallback((newColor: string) => {
    setCustomBrandColor(newColor);
  }, []);

  const handleCustomAccentColorValueChange = React.useCallback((newColor: string) => {
    setCustomAccentColor(newColor);
  }, []);

  const getBrandColorForSwatch = React.useCallback(() => {
    if (brand === 'custom') {
      return customBrandColor.trim() !== ''
        ? customBrandColor
        : brandSwatch[defaultBrandColor as keyof typeof brandSwatch];
    }
    return brandSwatch[brand as keyof typeof brandSwatch];
  }, [brand, customBrandColor]);

  const renderColorItem = (color: string, text: string) => {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <div
          style={{
            flexShrink: 0,
            background: color,
            width: 12,
            height: 12,
            borderRadius: 4,
          }}
        />
        {text}
      </div>
    );
  };

  const renderBrandItem = (value: string) => {
    if (value === 'custom') {
      const colorToDisplay = customBrandColor.trim() !== '' ? customBrandColor : '#999';
      return renderColorItem(colorToDisplay, '#custom-hex');
    }
    return renderColorItem(brandSwatch[value as keyof typeof brandSwatch], value);
  };

  const renderThemeItem = (value: ThemeKey) => {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {value === 'light' ? <IconWeatherSunRegular16 /> : <IconWeatherMoonRegular16 />}
        {value}
      </div>
    );
  };

  const brandColor = React.useMemo(() => {
    if (brand !== 'custom') {
      return brand;
    }
    return customBrandColor.trim() !== '' ? customBrandColor : defaultBrandColor;
  }, [brand, customBrandColor]);

  const safeAccentColor = React.useMemo(() => {
    if (accent !== 'custom') {
      return accent;
    }
    return customAccentColor.trim() !== '' ? customAccentColor : defaultAccentColor;
  }, [accent, customAccentColor]);

  const isAccentDisabled = (accentValue: string, currentBrand: string) => {
    return accentValue === 'brand' && (currentBrand === 'red' || currentBrand === 'orange');
  };

  const renderAccentItemValue = (value: string) => {
    if (value === 'custom') {
      const colorToDisplay = customAccentColor.trim() !== '' ? customAccentColor : '#999';
      return renderColorItem(colorToDisplay, '#custom-hex');
    }
    const color = value === 'gray' ? '#3d3d3d' : getBrandColorForSwatch();
    return renderColorItem(color, value);
  };

  const renderAccentMenuItem = (value: string) => {
    const content = renderAccentItemValue(value);
    return (
      <div key={value} style={{ opacity: isAccentDisabled(value, brand) ? 0.4 : 1 }}>
        {content}
      </div>
    );
  };

  const accentColor = React.useMemo(() => {
    if (isAccentDisabled(safeAccentColor, brandColor)) {
      return 'gray';
    }
    return safeAccentColor;
  }, [brandColor, safeAccentColor]);

  let c = getColors({
    brand: brandColor,
    accent: accentColor,
    theme: colorTheme,
  });

  const handleBrandChange = (value: string) => {
    if ((value === 'red' || value === 'orange') && accent === 'brand') {
      toastRef?.current?.push('Акцент brand недоступен для red и orange', { showTime: 3000 });
      setAccent('gray');
    }
    setBrand(value);
  };

  return (
    <div data-colors-controls>
      <Toast ref={toastRef} />
      <div className={styles.filterRow}>
        <Gapped>
          <label htmlFor="example-brand">Brand</label>
          <Select
            id="example-brand"
            items={colorOptions}
            value={brand}
            width={140}
            onValueChange={handleBrandChange}
            renderValue={renderBrandItem}
            renderItem={renderBrandItem}
          />

          {brand === 'custom' && (
            <Input
              maxLength={7}
              width={80}
              value={customBrandColor}
              onValueChange={handleCustomBrandColorValueChange}
              placeholder="#RRGGBB"
            />
          )}
        </Gapped>

        <Gapped>
          <label htmlFor="example-accent">Accent</label>
          <Select
            id="example-accent"
            width={140}
            items={baseAccentOptions}
            value={accent}
            onValueChange={setAccent}
            renderValue={renderAccentItemValue}
            renderItem={renderAccentMenuItem}
          />

          {accent === 'custom' && (
            <Input
              maxLength={7}
              width={80}
              value={customAccentColor}
              onValueChange={handleCustomAccentColorValueChange}
              placeholder="#RRGGBB"
            />
          )}
        </Gapped>
        <Gapped style={{ marginLeft: 'auto' }}>
          <label htmlFor="example-theme">Theme</label>

          <Select
            id="example-theme"
            width={140}
            items={['light', 'dark']}
            value={colorTheme}
            onValueChange={setColorTheme}
            renderValue={renderThemeItem}
            renderItem={renderThemeItem}
          />
        </Gapped>
      </div>
      <ThemeContext.Provider value={colorTheme === 'light' ? LIGHT_THEME : DARK_THEME}>
        <div style={{ color: c.textNeutralHeavy, background: c.surfaceHigh }} data-colors-selector>
          <div className="wrapper">
            <style>{`
            ${getColors({
              brand: brandColor,
              accent: accentColor,
              theme: colorTheme,
              output: 'css',
              outputSelectors: { light: '[data-colors-selector]', dark: '[data-colors-selector]' },
            })}
.wrapper {
  display: flex;
  height: 100%;
}

.wrapper > * {
  height: auto;
}

.container {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  box-sizing: border-box;
  padding-top: 24px;
  height: 100%;
  width: 100%;
  color: ${c.textNeutralHeavy};
  background: ${c.surfaceBase};
}

.header {
  display: flex;
  align-items: center;
}

.header__title {
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;
}

.panel {
  display: flex;
  align-items: center;
  gap: 8px;

  width: fit-content;

  margin-left: 40px;
  padding: 16px;
  border-radius: 8px;

  color: ${c.textOnBrandOriginalHeavy};
  background-color: ${c.shapeBoldBrandOriginal};
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 0 48px 48px;
}

.item {
  display: flex;
  gap: 8px;
}

.item__title {
  box-sizing: border-box;
  width: 88px;
  height: 40px;
  padding: 9px 0;

  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
}

.item__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item__toggle {
  box-sizing: border-box;
  height: 40px;
  padding: 9px 0;
}

.item__text {
  width: 376px;
  margin: 0;

  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
}

.footer {
  position: sticky;
  bottom: 0;

  display: flex;
  flex-direction: column;

  padding: 0 72px 0 48px;
  background-color: ${c.surfaceBase};
  border-top: 1px solid ${c.lineNeutralPale};
}

.footer__controls {
  display: flex;
  gap: 8px;

  padding: 16px 0;
}

.footer__warning-panel {
  display: flex;
  gap: 8px;

  margin-left: 16px;
  padding: 13px 16px;
  border-radius: 8px;

  background-color: ${c.shapeFaintWarning};
}
      `}</style>
            <SideMenu>
              <SideMenu.Header productLogo={<CdnLogo logo="product" />} />
              <SideMenu.Body>
                <SideMenu.Item icon={<IconDocTextRegular24 />} caption="Документы" />
                <SideMenu.Item icon={<IconPeople2Regular24 />} caption="Команда" />
                <SideMenu.Item icon={<IconCommentRectTextRegular24 />} caption="Сообщения" marker={1} />
                <SideMenu.Item icon={<IconMarketShoppingBasketRegular24 />} caption="Товары" />
              </SideMenu.Body>
              <SideMenu.Footer>
                <SideMenu.Organisations icon={<IconStackHDownRegular24 />} />
                <SideMenu.Item icon={<IconSettingsGearRegular24 />} caption="Настройки" />
                <SideMenu.Avatar userName="Кирилл Лаптев" />
              </SideMenu.Footer>
            </SideMenu>

            <div className="container">
              <header className="header">
                <Button use="text" icon={<IconArrowALeftRegular24 color={c.textNeutralHeavy} />} size="medium" />
                <span className="header__title">Иванов Иван Иванович</span>
              </header>
              <div className="panel">
                <IconNaturePlantFlowerSolid20 />
                Теперь появилась возможность разукрасить интерфейс!
              </div>
              <main className="content">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <Tabs.Tab id="tab-0">Настройки доступа</Tabs.Tab>
                  <Tabs.Tab id="tab-1">Безопасность</Tabs.Tab>
                  <Tabs.Tab id="tab-2">Подписки</Tabs.Tab>
                  <Tabs.Tab id="tab-3">Документы</Tabs.Tab>
                </Tabs>
                <div className="item">
                  <span className="item__title">Почта</span>
                  <Input size="medium" width={288} />
                </div>
                <div className="item">
                  <span className="item__title">Доступ</span>
                  <div className="item__body">
                    <div className="item__toggle">
                      <Toggle size="medium">Разрешить</Toggle>
                    </div>
                    <p className="item__text">
                      Мы обновили анкету участника, чтобы встречи становились ещё комфортнее.{' '}
                      <Link>Подробнее в статье</Link>
                    </p>
                  </div>
                </div>
                <div className="item">
                  <span className="item__title">Уровень</span>
                  <RadioGroup value={activeRadio} onValueChange={setActiveRadio}>
                    <Gapped vertical gap={0}>
                      <Radio size="medium" value={1}>
                        Администратор
                      </Radio>
                      <Radio size="medium" value={2}>
                        Пользователь
                      </Radio>
                      <Radio size="medium" value={3}>
                        Только чтение
                      </Radio>
                    </Gapped>
                  </RadioGroup>
                </div>
                <div className="item">
                  <span className="item__title">Другое</span>
                  <Checkbox size="medium" checked={checked} onValueChange={setChecked}>
                    Входить по умолчанию
                  </Checkbox>
                  <Tooltip
                    render={() => (
                      <div style={{ width: 200 }}>При входе в сервис сотруднику не придётся проходить авторизацию.</div>
                    )}
                  >
                    <IconQuestionCircleLight20 color={c.textNeutralHeavy} />
                  </Tooltip>
                </div>
              </main>
              <footer className="footer">
                <div className="footer__controls">
                  <Button use="accent" size="large">
                    Сохранить
                  </Button>
                  <Button use="outline" size="large">
                    Отменить
                  </Button>
                  <div className="footer__warning-panel">
                    <IconWarningTriangleSolid20 color={c.shapeBoldWarning} />
                    Укажите все данные для сохранения
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </div>
  );
};

ColorsExampleStory.storyName = 'Пример интерфейса';

/**
 * <a href="https://chromewebstore.google.com/detail/kontur-ui/oiekpgnfbdafebmcjlbaapekngfnjfom?authuser=0&hl=en&pli=1" target="_blank" style="font-size: 14px; padding: 8px 24px; border-radius: 8px; background: #F6F8FA; display: flex; align-items: center; gap: 12px;">
    <img width="24" height="24" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/60px-Google_Chrome_icon_%28February_2022%29.svg.png" alt=""> Chrome Extension для удобного копирования из Figma →
  </a>
 * Токены цветов состоят из 6 основных групп:
 * - **text** — переменные для текстов и иконок, которые являются частью текста
 * - **shape** — подложки, плашки, фоны и заливки
 * - **line** — линии, разделители, обводки, подчеркивания
 * - **surface** — крупные контентные области; поверхности, которые образуют лейаут
 * - **illustration** — иллюстрации, промо-материалы и всё связанное с коммуникационным дизайном
 * - **customizable** — произвольные цвета из палитры для схем/графиков и других сценариев
 *
 * ---
 *
 * Для покраски элемента необходимо подбирать токены по заложенному в них смыслу. Подробнее в [устройстве семантики →](https://www.figma.com/design/XVgPCAAFhEbIiQDDznkdat/%E2%9A%A1%EF%B8%8F-Kontur-Colors-2.0?node-id=6256-369539&t=t9J25uypIjGTMtLQ-4)
 */
export const ColorsPaletteStory = () => {
  const GROUPING_ROOTS = [
    'text',
    'texInverted',
    'textConst',
    'textOnAccent',
    'textOnBrand',
    'shape',
    'shapeInverted',
    'shapeConst',
    'line',
    'lineInverted',
    'lineConst',
    'surface',
    'illustration',
    'customizable',
  ];

  const diff = differenceEuclidean('oklch');

  const generateTokenList = (tokens: any): TokenPair[] => {
    const { light, dark } = tokens;
    const tokenList: TokenPair[] = [];

    for (const key in light) {
      if (dark[key] && typeof light[key] === 'string' && typeof dark[key] === 'string') {
        tokenList.push({
          key,
          value: {
            light: light[key],
            dark: dark[key],
          },
        });
      }
    }

    return tokenList;
  };

  const extractRootFromCamelCase = (key: string, roots: string[]): string | null => {
    const sortedRoots = [...roots].sort((a, b) => b.length - a.length);

    for (const root of sortedRoots) {
      if (key === root) {
        return root;
      }
      const rootEndIndex = root.length;
      if (key.startsWith(root) && key.length > rootEndIndex) {
        const nextChar = key[rootEndIndex];

        if (nextChar === nextChar.toUpperCase() && nextChar !== nextChar.toLowerCase()) {
          return root;
        }
      }
    }
    return null;
  };

  const groupTokensByRoot = (tokens: TokenPairWithMeta[]): Record<string, TokenPairWithMeta[]> => {
    const groupedByRoot: Record<string, TokenPairWithMeta[]> = {};
    const allRoots = GROUPING_ROOTS;

    const sortedTokens = tokens.sort((a, b) => a.key.localeCompare(b.key));

    for (const token of sortedTokens) {
      const tokenKey = token.key;
      let rootKey = 'other';

      const foundRoot = extractRootFromCamelCase(tokenKey, allRoots);

      if (foundRoot) {
        rootKey = foundRoot;
      } else {
        const match = tokenKey.match(/^[a-z]+/);
        if (match) {
          rootKey = match[0];
        } else if (tokenKey.includes('.')) {
          rootKey = tokenKey.split('.')[0];
        }
      }

      if (!rootKey || rootKey.length === 0) {
        rootKey = 'other';
      }

      if (!groupedByRoot[rootKey]) {
        groupedByRoot[rootKey] = [];
      }
      groupedByRoot[rootKey].push(token);
    }

    const finalGrouped: Record<string, TokenPairWithMeta[]> = {};

    for (const key of GROUPING_ROOTS) {
      if (groupedByRoot[key]) {
        finalGrouped[key] = groupedByRoot[key];
        delete groupedByRoot[key];
      }
    }

    for (const key in groupedByRoot) {
      if (groupedByRoot[key].length > 0) {
        finalGrouped[key] = groupedByRoot[key];
      }
    }

    return finalGrouped;
  };

  const styles: Record<string, string> = {
    colors: css`
      display: flex;
      flex-direction: column;
      height: 900px;
      min-height: 400px;
      max-height: calc(100vh - 120px);
      overflow-y: scroll;
    `,
    colorGroup: css`
      margin-bottom: 64px;
    `,
    filterRow: css`
      position: sticky;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 16px;
      width: calc(100% - 32px);
      top: 0;
      background: white;
      font-size: 14px;
    `,
    headerRow: css`
      display: flex;
      align-items: center;
      gap: 8px;
      width: calc(100% - 32px);
      padding: 4px 16px 4px;
      font-weight: 600;
      color: #222;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 57px;
      z-index: 10;
      background: white;
      font-size: 14px;
      font-weight: 700;
      line-height: 1.2;
    `,
    dropdownRow: css`
      display: flex;
      align-items: center;
      gap: 8px;
      width: calc(100% - 16px);
      padding: 3px 8px;
      margin: 0 8px;
      border-radius: 8px;
      cursor: pointer;
      background: none;
      border: none;
      text-align: left;
      transition: background 0.1s ease;
      font-family: inherit;
      &:hover {
        background: rgba(0, 0, 0, 0.06);
      }
      &:active {
        background: rgba(0, 0, 0, 0.1);
      }
    `,
    colorName: css`
      flex: 1;
    `,
    colorTileWrapper: css`
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      width: 140px;
    `,
    colorTile: css`
      height: 32px;
      width: 32px;
      border: 1px solid rgba(127, 127, 127, 0.3);
      border-radius: 8px;
      flex-shrink: 0;
    `,
    colorHex: css`
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      color: #8b8b8b;
    `,
    groupHeader: css`
      position: sticky;
      top: 62px;
      width: 50%;
      z-index: 10;
      background: white;
      font-size: 14px;
      line-height: 1;
      padding: 2px 16px;
      font-weight: bold;
    `,
    controls: css`
      position: sticky;
      z-index: 10;
      bottom: 0;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px;
      background: white;
      box-shadow: 0 -1px rgba(0, 0, 0, 0.15);
      margin-top: auto;
    `,
    matchBadge: css`
      position: relative;
      top: -1px;
      font-size: 10px;
      padding: 2px 5px;
      margin-left: 8px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.04);
      color: #555;
      font-weight: 600;
      white-space: nowrap;
    `,
  };

  const defaultColorOptions = Object.keys(brandSwatch);
  const defaultBrandColor = 'red';
  const defaultAccentColor = 'gray';

  const colorOptions = [...defaultColorOptions, 'custom'];
  const baseAccentOptions = ['gray', 'brand', 'custom'];

  const colorFormatOptions = ['Web (hex/rgba)', 'Web (oklch)', 'iOS/Android (hex-aarrggbb)'];

  const [brand, setBrand] = React.useState(defaultBrandColor);
  const [accent, setAccent] = React.useState(defaultAccentColor);
  const [filter, setFilter] = React.useState('');
  const [isSimilarSearch, setIsSimilarSearch] = React.useState(true);
  const [colorFormat, setColorFormat] = React.useState(colorFormatOptions[0]);

  const [customBrandColor, setCustomBrandColor] = React.useState('#FFDD2D');
  const [customAccentColor, setCustomAccentColor] = React.useState('#FFDD2D');

  const toastRef = React.useRef<Toast>(null);

  const handleCustomBrandColorValueChange = React.useCallback((newColor: string) => {
    setCustomBrandColor(newColor);
  }, []);

  const handleCustomAccentColorValueChange = React.useCallback((newColor: string) => {
    setCustomAccentColor(newColor);
  }, []);

  const getColorsFormat = (tokenKey: string) => {
    const kebabCaseKey = tokenKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

    return {
      CSS: `var(--k-color-${kebabCaseKey})`,
      SCSS: `$color-${kebabCaseKey}`,
      Less: `@color-${kebabCaseKey}`,
      'JS/TS': `colors.${tokenKey}`,
      'Android Compose': `KonturTheme.colors.${tokenKey}`,
    };
  };

  const copyColor = (colorValue: string) => {
    window.navigator.clipboard.writeText(colorValue);
    toastRef?.current?.push('Цвет скопирован', { showTime: 1000 });
  };

  const getOutputFormatParam = (format: string): ColorFormat => {
    switch (format) {
      case 'iOS/Android (hex-aarrggbb)':
        return 'hex-aarrggbb';
      case 'Web (oklch)':
        return 'oklch';
      case 'Web (hex/rgba)':
      default:
        return 'hex/rgba';
    }
  };

  const outputFormatParam = getOutputFormatParam(colorFormat);

  const safeBrandColor = React.useMemo(() => {
    if (brand !== 'custom') {
      return brand;
    }
    return customBrandColor.trim() !== '' ? customBrandColor : defaultBrandColor;
  }, [brand, customBrandColor]);

  const safeAccentColor = React.useMemo(() => {
    if (accent !== 'custom') {
      return accent;
    }
    return customAccentColor.trim() !== '' ? customAccentColor : defaultAccentColor;
  }, [accent, customAccentColor]);

  const isAccentDisabled = (accentValue: string, currentBrand: string) => {
    return accentValue === 'brand' && (currentBrand === 'red' || currentBrand === 'orange');
  };

  const getBrandColorForSwatch = React.useCallback(() => {
    if (brand === 'custom') {
      return customBrandColor.trim() !== ''
        ? customBrandColor
        : brandSwatch[defaultBrandColor as keyof typeof brandSwatch];
    }
    return brandSwatch[brand as keyof typeof brandSwatch];
  }, [brand, customBrandColor]);

  const renderAccentItemValuePalette = (value: string) => {
    if (value === 'custom') {
      const colorToDisplay = customAccentColor.trim() !== '' ? customAccentColor : '#999';
      return renderColorItem(colorToDisplay, '#custom-hex');
    }
    const color = value === 'gray' ? '#3d3d3d' : getBrandColorForSwatch();
    return renderColorItem(color, value);
  };

  const renderAccentMenuItemPalette = (value: string) => {
    const content = renderAccentItemValuePalette(value);
    return (
      <div key={value} style={{ opacity: isAccentDisabled(value, brand) ? 0.4 : 1 }}>
        {content}
      </div>
    );
  };

  const handleBrandChange = (value: string) => {
    if ((value === 'red' || value === 'orange') && accent === 'brand') {
      toastRef?.current?.push('Акцент brand недоступен для red и orange', { showTime: 3000 });
      setAccent('gray');
    }
    setBrand(value);
  };

  const effectiveAccentColor = React.useMemo(() => {
    if (isAccentDisabled(safeAccentColor, safeBrandColor)) {
      return 'gray';
    }
    return safeAccentColor;
  }, [safeBrandColor, safeAccentColor]);

  let tokenList: TokenPair[] = [];

  try {
    tokenList = generateTokenList({
      light: getColors({
        brand: safeBrandColor,
        accent: effectiveAccentColor,
        theme: 'light',
        format: outputFormatParam,
      }),
      dark: getColors({
        brand: safeBrandColor,
        accent: effectiveAccentColor,
        theme: 'dark',
        format: outputFormatParam,
      }),
    });
  } catch {
    tokenList = generateTokenList({
      light: getColors({
        brand: '#FFDD2D',
        accent: '#FFDD2D',
        theme: 'light',
        format: outputFormatParam,
      }),
      dark: getColors({
        brand: '#FFDD2D',
        accent: '#FFDD2D',
        theme: 'dark',
        format: outputFormatParam,
      }),
    });
  }
  const filterTokens = (tokens: TokenPair[]): TokenPairWithMeta[] => {
    const asMeta = (t: TokenPair, fuzzy: boolean, percent?: number) => ({
      ...t,
      isFuzzy: fuzzy,
      matchPercent: percent,
    });

    // Hide hover & pressed
    if (colorFormat === 'iOS/Android (hex-aarrggbb)') {
      // oxlint-disable-next-line no-param-reassign
      tokens = tokens.filter((t) => !t.key.endsWith('Hover') && !t.key.endsWith('Pressed'));
    }

    if (!filter) {
      return tokens.map((t) => asMeta(t, false));
    }

    const filterLower = filter.toLowerCase();
    const parsedFilter = parse(filter);
    const FUZZY_THRESHOLD = 0.09;

    const blendWithBackground = (colorStr: string, isDark: boolean): Color | undefined => {
      const parsed = parse(colorStr) as Rgb;
      if (!parsed) {
        return undefined;
      }

      const bgColor = isDark
        ? { mode: 'rgb', r: 0, g: 0, b: 0, alpha: 1 }
        : { mode: 'rgb', r: 1, g: 1, b: 1, alpha: 1 };

      if (parsed.alpha === undefined || parsed.alpha === 1) {
        return parsed;
      }

      const a = parsed.alpha;
      const rgb = {
        mode: 'rgb' as const,
        r: parsed.r * a + bgColor.r * (1 - a),
        g: parsed.g * a + bgColor.g * (1 - a),
        b: parsed.b * a + bgColor.b * (1 - a),
        alpha: 1,
      };

      return rgb;
    };

    const results: TokenPairWithMeta[] = [];

    for (const token of tokens) {
      let isStringMatch = false;
      if (
        token.key.toLowerCase().includes(filterLower) ||
        token.value.light.toLowerCase().includes(filterLower) ||
        token.value.dark.toLowerCase().includes(filterLower)
      ) {
        isStringMatch = true;
      }

      if (isStringMatch) {
        results.push(asMeta(token, false));
        continue;
      }

      if (isSimilarSearch && parsedFilter) {
        const lightBlended = blendWithBackground(token.value.light, false);
        const darkBlended = blendWithBackground(token.value.dark, true);

        let distLight = 1;
        let distDark = 1;

        if (lightBlended) {
          distLight = diff(parsedFilter, lightBlended) ?? 1;
        }
        if (darkBlended) {
          distDark = diff(parsedFilter, darkBlended) ?? 1;
        }

        const minDist = Math.min(distLight, distDark);

        if (minDist <= FUZZY_THRESHOLD) {
          const matchPercent = Math.max(0, Math.round((1 - minDist) * 100));
          results.push(asMeta(token, true, matchPercent));
        }
      }
    }

    return results.sort((a, b) => {
      if (a.isFuzzy && b.isFuzzy) {
        return (b.matchPercent || 0) - (a.matchPercent || 0);
      }
      if (a.isFuzzy && !b.isFuzzy) {
        return 1;
      }
      if (!a.isFuzzy && b.isFuzzy) {
        return -1;
      }
      return 0;
    });
  };

  const filteredList = filterTokens(tokenList);
  const groupedByRoot = groupTokensByRoot(filteredList);

  const renderColorItem = (color: string, text: string) => {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <div
          style={{
            flexShrink: 0,
            background: color,
            width: 12,
            height: 12,
            borderRadius: 4,
          }}
        />
        {text}
      </div>
    );
  };

  const renderBrandItem = (value: string) => {
    if (value === 'custom') {
      const colorToDisplay = customBrandColor.trim() !== '' ? customBrandColor : '#999';
      return renderColorItem(colorToDisplay, '#custom-hex');
    }
    return renderColorItem(brandSwatch[value as keyof typeof brandSwatch], value);
  };

  return (
    <div className={styles.colors} data-colors-controls>
      <Toast ref={toastRef} />
      <div className={styles.filterRow}>
        <Gapped>
          <label htmlFor="palette-brand">Brand</label>
          <Select
            id="palette-brand"
            items={colorOptions}
            value={brand}
            width={140}
            onValueChange={handleBrandChange}
            renderValue={renderBrandItem}
            renderItem={renderBrandItem}
          />
          {brand === 'custom' && (
            <Input
              maxLength={7}
              width={80}
              value={customBrandColor}
              onValueChange={handleCustomBrandColorValueChange}
              placeholder="#RRGGBB"
            />
          )}
        </Gapped>

        <Gapped>
          <label htmlFor="palette-accent">Accent</label>
          <Select
            id="palette-accent"
            width={140}
            items={baseAccentOptions}
            value={accent}
            onValueChange={setAccent}
            renderValue={renderAccentItemValuePalette}
            renderItem={renderAccentMenuItemPalette}
          />
          {accent === 'custom' && (
            <Input
              maxLength={7}
              width={80}
              value={customAccentColor}
              onValueChange={handleCustomAccentColorValueChange}
              placeholder="#RRGGBB"
            />
          )}
        </Gapped>

        <Gapped style={{ paddingLeft: 16, marginLeft: 'auto' }}>
          <Gapped>
            <label htmlFor="palette-format">Format</label>
            <Select
              width={238}
              id="palette-format"
              items={colorFormatOptions}
              value={colorFormat}
              onValueChange={setColorFormat}
            />
          </Gapped>
        </Gapped>
      </div>
      <div className={styles.headerRow}>
        <span className={styles.colorName}>Token</span>
        <div className={styles.colorTileWrapper} style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <span>Light</span>
        </div>
        <div className={styles.colorTileWrapper} style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <span>Dark</span>
        </div>
      </div>
      {Object.entries(groupedByRoot).map(([rootKey, tokens], i) => (
        <React.Fragment key={rootKey}>
          <div className={styles.groupHeader} style={{ margin: i !== 0 ? '24px 0 16px' : '12px 0 0' }}>
            {rootKey}
          </div>
          {tokens.map(({ key, value, isFuzzy, matchPercent }) => {
            const convertHexAlphaToWebFormat = (color: string) =>
              color.length === 9 ? '#' + color.slice(3, 9) + color.slice(1, 3) : color;
            const displayLightValue = value?.light;
            const displayDarkValue = value?.dark;
            const opacityFromMatchPercent = (matchPercent: number) => (matchPercent <= 94 ? 0.5 : 1);

            return (
              <DropdownMenu
                key={key}
                width="100%"
                caption={
                  <button className={styles.dropdownRow}>
                    <span
                      className={styles.colorName}
                      style={{
                        opacity: isFuzzy && matchPercent ? opacityFromMatchPercent(matchPercent) : undefined,
                      }}
                    >
                      {key}
                      {isFuzzy && matchPercent && (
                        <Hint text="Процент совпадения">
                          <span className={styles.matchBadge}>{matchPercent}%</span>
                        </Hint>
                      )}
                    </span>
                    <div className={styles.colorTileWrapper}>
                      <div
                        className={styles.colorTile}
                        style={{
                          backgroundColor:
                            colorFormat === 'iOS/Android (hex-aarrggbb)'
                              ? convertHexAlphaToWebFormat(displayLightValue)
                              : value?.light,
                        }}
                      />
                      <span className={styles.colorHex}>{displayLightValue}</span>
                    </div>
                    <div
                      className={styles.colorTileWrapper}
                      style={{
                        background: '#3d3d3d',
                        borderRadius: 4,
                        boxShadow: '0 0 0 2px #3d3d3d',
                      }}
                    >
                      <div
                        className={styles.colorTile}
                        style={{
                          backgroundColor:
                            colorFormat === 'iOS/Android (hex-aarrggbb)'
                              ? convertHexAlphaToWebFormat(displayDarkValue)
                              : value?.dark,
                        }}
                      />
                      <span className={styles.colorHex} style={{ color: 'white' }}>
                        {displayDarkValue}
                      </span>
                    </div>
                  </button>
                }
              >
                <MenuHeader>Скопировать переменную</MenuHeader>
                {Object.entries(getColorsFormat(key)).map(([lang, colorVar]) => (
                  <MenuItem key={lang} onClick={() => copyColor(colorVar)} comment={lang}>
                    <div style={{ minWidth: 270 }}>{colorVar}</div>
                  </MenuItem>
                ))}
              </DropdownMenu>
            );
          })}
        </React.Fragment>
      ))}
      <div className={styles.controls}>
        <Input
          width="50%"
          value={filter}
          onValueChange={setFilter}
          placeholder="Введите название токена или цвет в #hex/rgba/oklch"
          rightIcon={<IconSearchLoupeRegular16 />}
        />
        <Checkbox checked={isSimilarSearch} onValueChange={() => setIsSimilarSearch(!isSimilarSearch)}>
          Подбирать похожие цвета
        </Checkbox>
      </div>
    </div>
  );
};

ColorsPaletteStory.storyName = 'Список всех токенов';
