import React from 'react';

import { Gapped, Select, Input } from '@skbkontur/react-ui';
import { SearchLoupeIcon16Regular } from '@skbkontur/icons/icons/SearchLoupeIcon/SearchLoupeIcon16Regular';
import type { Meta } from '@skbkontur/react-ui/typings/stories';

import { brand as brandSwatch } from '../lib/consts/default-swatch';
import { getColorsBase } from '../lib/get-colors-base';
import { getColors } from '../get-colors';
import type { TokensBase } from '../lib/types/tokens-base';
import type { ColorFormat } from '../lib/utils/convert-color';

import { type Emotion } from '@emotion/css/create-instance';
import { useStyles } from '@skbkontur/react-ui/lib/renderEnvironment';
import { css } from '@emotion/css';

interface TokenPair {
  key: string;
  value: {
    light: string;
    dark: string;
  };
}

interface BaseTokenDisplay {
  key: string;
  value: string;
}

type TTransformedTokens = Record<string, TokenPair>;

type TGroupedTokens = Record<string, { key: string; value: TokenPair }[]>;

const style = document.createElement('style');
style.innerHTML = `
  [data-role=preview]:has([data-colors-controls]) {
    padding: 0 !important;
  }
`;
document.head.appendChild(style);

export default {
  title: 'Colors API',
  parameters: {
    creevey: {
      skip: true,
    },
  },
} as Meta;

/**
 * Добавление/изменение токенов доступно через `overrides` с заполнением их базовыми значениями `base` и параметрами `params`
 */
export const ColorsPaletteOverridesStory = () => {
  const camelCaseToKebabCase = (str: string) => {
    return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  };

  const kebabCaseToCamelCase = (str: string) => {
    return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
  };

  function flattenObject(obj: any, prefix = ''): any {
    let result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = prefix ? `${prefix}-${camelCaseToKebabCase(key)}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          result = { ...result, ...flattenObject(obj[key], newKey) };
        } else {
          result[newKey] = obj[key];
        }
      }
    }
    return result;
  }

  function transformThemeObject(obj: any): TTransformedTokens {
    const transformed: TTransformedTokens = {};

    for (const mode in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, mode)) {
        const modeKeys = obj[mode];

        for (const prefixedKey in modeKeys) {
          if (Object.prototype.hasOwnProperty.call(modeKeys, prefixedKey)) {
            const value = modeKeys[prefixedKey];
            let unprefixedKey = prefixedKey;

            if (prefixedKey.startsWith(mode) && prefixedKey.length > mode.length) {
              const firstCharAfterPrefix = prefixedKey[mode.length];
              if (firstCharAfterPrefix === firstCharAfterPrefix.toUpperCase()) {
                unprefixedKey = prefixedKey.substring(mode.length);
              }
            }

            if (!transformed[unprefixedKey]) {
              transformed[unprefixedKey] = { key: unprefixedKey, value: { light: '', dark: '' } };
            }

            if (mode === 'light' || mode === 'dark') {
              transformed[unprefixedKey].value[mode] = value;
            }
          }
        }
      }
    }

    return transformed;
  }

  const groupTokensByFirstWord = (tokens: TTransformedTokens): TGroupedTokens => {
    return Object.entries(tokens).reduce((acc: TGroupedTokens, [fullTokenName, value]) => {
      const match = fullTokenName.match(/([A-Z][a-z0-9]+)/g);
      const firstWord = match && match.length >= 1 ? match[0] : '';

      if (!acc[firstWord]) {
        acc[firstWord] = [];
      }
      acc[firstWord].push({ key: fullTokenName, value });
      return acc;
    }, {});
  };

  const GROUP_HEADER_STICKY_TOP = '57px';
  const LIGHT_TEXT_COLOR = '#222';

  const getStyles = ({ css }: Emotion) => ({
    colors: css`
      display: flex;
      flex-direction: column;
    `,
    colorGroup: css`
      margin-bottom: 64px;
    `,
    filterRow: css`
      position: sticky;
      z-index: 10;
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      padding: 16px;
      top: 0;
      background: white;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 14px;
    `,
    headerRow: css`
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 4px 16px;
      font-weight: 700;
      line-height: 1.2;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: sticky;
      top: ${GROUP_HEADER_STICKY_TOP};
      z-index: 10;
      background: white;
      color: ${LIGHT_TEXT_COLOR};
      font-size: 14px;
    `,
    displayRow: css`
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 8px 16px;
      font-size: 14px;
      margin: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);
      background: none;
      text-align: left;
      font-family: inherit;
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
      border: 1px solid rgba(0, 0, 0, 0.08);
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
      top: ${GROUP_HEADER_STICKY_TOP};
      z-index: 10;
      background: white;
      color: ${LIGHT_TEXT_COLOR};
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
  });

  const styles = useStyles(getStyles);

  const colorOptions = Object.keys(brandSwatch);
  const defaultBrandColor = colorOptions[0];
  const defaultAccentColor = 'brand';
  const colorFormatOptions = ['Web (hex/rgba)', 'Web (oklch)', 'iOS/Android (hex-aarrggbb)'];
  const baseAccentOptions = ['gray', 'brand', 'custom'];

  const [brand, setBrand] = React.useState(defaultBrandColor);
  const [accent, setAccent] = React.useState(defaultAccentColor);
  const [colorFormat, setColorFormat] = React.useState(colorFormatOptions[0]);
  const [customBrandColor, setCustomBrandColor] = React.useState('#FFDD2D');
  const [customAccentColor, setCustomAccentColor] = React.useState('#FFDD2D');

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
    return <div key={value}>{content}</div>;
  };

  const handleCustomBrandColorValueChange = React.useCallback((newColor: string) => {
    setCustomBrandColor(newColor);
  }, []);

  const handleCustomAccentColorValueChange = React.useCallback((newColor: string) => {
    setCustomAccentColor(newColor);
  }, []);

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

  const effectiveAccentColor = safeAccentColor;

  const overrides = (base?: TokensBase) => ({
    light: {
      textCustom1: base?.accent?.palette?.normal[40] || base?.whiteAlpha[20],
      textCustom2: base?.brand.palette.normal[56],
    },
    dark: {
      textCustom1: base?.accent?.palette?.vivid[72] || base?.blackAlpha[20],
      textCustom2: base?.brand.palette?.vivid[88],
    },
  });

  let KonturColors = Object.entries(
    flattenObject({
      light: getColors({
        brand: safeBrandColor,
        accent: effectiveAccentColor,
        theme: 'light',
        overrides,
        format: outputFormatParam,
      }),
      dark: getColors({
        brand: safeBrandColor,
        accent: effectiveAccentColor,
        theme: 'dark',
        overrides,
        format: outputFormatParam,
      }),
    })
  ).reduce((acc: any, [key, value]) => {
    acc[kebabCaseToCamelCase(key)] = value;
    return acc;
  }, {}) as Record<string, string>;

  const colorGroups = Object.entries(KonturColors).reduce(
    (acc: Record<string, Record<string, string>>, [colorKey, colorValue]) => {
      const firstWord =
        ['greenMint', 'blueDark'].find((color) => colorKey.match(color)) || colorKey.match(/^[a-z]+/)![0]!;
      acc[firstWord] = { ...acc[firstWord], [colorKey]: colorValue };
      return acc;
    },
    {} as Record<string, Record<string, string>>
  );

  const allGroupedTokens = groupTokensByFirstWord(transformThemeObject(colorGroups));

  const convertHexAlphaToWebFormat = (color: string) =>
    color.length === 9 ? '#' + color.slice(3, 9) + color.slice(1, 3) : color;

  return (
    <>
      <div className={styles.colors} data-colors-controls>
        <textarea
          disabled
          style={{
            height: 230,
            padding: 4,
            border: 0,
            borderBottom: '1px solid rgba(0,0,0,.1)',
            resize: 'none',
          }}
        >
          {`getColors({
  brand: '${brand}',
  accent: '${accent}',
  format: '${outputFormatParam}',
  overrides: (base) => ({
    light: {
      textCustom1: base.accent?.palette?.normal[40],
      textCustom2: base.brand.palette?.normal[56],
    },
    dark: {
      textCustom1: base.accent?.palette?.vivid[72],
      textCustom2: base.brand.palette?.vivid[88],
    }
  })
})`}
        </textarea>
        <div className={styles.filterRow}>
          <Gapped>
            <label htmlFor="overrides-brand">Brand</label>
            <Select
              id="overrides-brand"
              items={[...colorOptions, 'custom']}
              value={brand}
              width={140}
              onValueChange={setBrand}
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
            <label htmlFor="overrides-accent">Accent</label>
            <Select
              id="overrides-accent"
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

          <Gapped style={{ marginLeft: 'auto' }}>
            <label htmlFor="overrides-format">Format</label>
            <Select
              width={238}
              id="overrides-format"
              items={colorFormatOptions}
              value={colorFormat}
              onValueChange={setColorFormat}
            />
          </Gapped>
        </div>
        <div>
          <div className={styles.headerRow}>
            <span className={styles.colorName}>Token</span>
            <div className={styles.colorTileWrapper} style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <span>Light</span>
            </div>
            <div className={styles.colorTileWrapper} style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <span>Dark</span>
            </div>
          </div>
          <div style={{ paddingBottom: 68 }}>
            {Object.entries(allGroupedTokens).map(([groupName, tokens], i) => (
              <React.Fragment key={groupName}>
                <div className={styles.groupHeader} style={{ margin: i !== 0 ? '24px 0 16px' : '12px 0 0' }}>
                  {groupName}
                </div>
                {tokens.map(({ key, value }) => (
                  <div key={key} className={styles.displayRow}>
                    <span className={styles.colorName}>{key}</span>
                    <div className={styles.colorTileWrapper}>
                      <div
                        className={styles.colorTile}
                        style={{
                          backgroundColor:
                            colorFormat === 'iOS/Android (hex-aarrggbb)'
                              ? convertHexAlphaToWebFormat(value?.value.light)
                              : value?.value.light,
                        }}
                      />
                      <span className={styles.colorHex} style={{ color: LIGHT_TEXT_COLOR }}>
                        {value?.value.light?.replace(/, /g, ',')}
                      </span>
                    </div>
                    <div
                      className={styles.colorTileWrapper}
                      style={{ background: '#3d3d3d', borderRadius: 4, boxShadow: '0 0 0 2px #3d3d3d' }}
                    >
                      <div
                        className={styles.colorTile}
                        style={{
                          backgroundColor:
                            colorFormat === 'iOS/Android (hex-aarrggbb)'
                              ? convertHexAlphaToWebFormat(value?.value.dark)
                              : value?.value.dark,
                        }}
                      />
                      <span className={styles.colorHex} style={{ color: 'white' }}>
                        {value?.value.dark?.replace(/, /g, ',')}
                      </span>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

ColorsPaletteOverridesStory.storyName = 'Кастомные токены';

/**
 * Список токенов базовой палитры. Переменные подставляются в семантические токены через `overrides`
 */
export const BaseTokensStory = () => {
  const camelCaseToKebabCase = (str: string) => {
    return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  };

  const kebabCaseToCamelCase = (str: string) => {
    return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
  };

  function flattenObject(obj: any, prefix = ''): any {
    let result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = prefix ? `${prefix}-${camelCaseToKebabCase(key)}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          result = { ...result, ...flattenObject(obj[key], newKey) };
        } else {
          result[newKey] = obj[key];
        }
      }
    }
    return result;
  }

  const convertHexAlphaToWebFormat = (color: string) =>
    color.length === 9 ? '#' + color.slice(3, 9) + color.slice(1, 3) : color;

  const GROUP_HEADER_STICKY_TOP = '57px';
  const LIGHT_TEXT_COLOR = '#222';

  const styles: Record<string, string> = {
    colors: css`
      display: flex;
      flex-direction: column;
      height: 900px;
      min-height: 400px;
      max-height: calc(100vh - 120px);
      overflow-y: auto;
      overflow-x: hidden;
    `,
    colorGroup: css`
      margin-bottom: 64px;
    `,
    filterRow: css`
      position: sticky;
      z-index: 10;
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      padding: 16px;
      top: 0;
      background: white;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 14px;
    `,
    headerRow: css`
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 4px 16px;
      font-weight: 700;
      line-height: 1.2;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: sticky;
      top: ${GROUP_HEADER_STICKY_TOP};
      z-index: 10;
      background: white;
      color: ${LIGHT_TEXT_COLOR};
      font-size: 14px;
    `,
    displayRow: css`
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 8px 16px;
      font-size: 14px;
      margin: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);
      background: none;
      text-align: left;
      font-family: inherit;
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
      border: 1px solid rgba(0, 0, 0, 0.08);
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
      top: ${GROUP_HEADER_STICKY_TOP};
      z-index: 10;
      background: white;
      color: ${LIGHT_TEXT_COLOR};
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

  const colorOptions = Object.keys(brandSwatch);
  const defaultBrandColor = colorOptions[0];
  const defaultAccentColor = 'brand';
  const baseAccentOptions = ['gray', 'brand', 'custom'];
  const colorFormatOptions = ['Web (hex/rgba)', 'Web (oklch)', 'iOS/Android (hex-aarrggbb)'];

  const [brand, setBrand] = React.useState(defaultBrandColor);
  const [accent, setAccent] = React.useState(defaultAccentColor);
  const [filter, setFilter] = React.useState('');
  const [colorFormat, setColorFormat] = React.useState(colorFormatOptions[0]);
  const [customBrandColor, setCustomBrandColor] = React.useState('#FFDD2D');
  const [customAccentColor, setCustomAccentColor] = React.useState('#FFDD2D');

  const handleCustomBrandColorValueChange = React.useCallback((newColor: string) => {
    setCustomBrandColor(newColor);
  }, []);

  const handleCustomAccentColorValueChange = React.useCallback((newColor: string) => {
    setCustomAccentColor(newColor);
  }, []);

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
    return <div key={value}>{content}</div>;
  };

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

  const effectiveAccentColor = safeAccentColor;

  const baseTokensRaw = React.useMemo(() => {
    return getColorsBase({
      brand: safeBrandColor,
      accent: effectiveAccentColor,
      format: outputFormatParam,
    });
  }, [safeBrandColor, effectiveAccentColor, outputFormatParam]);

  const tokensToDisplay: BaseTokenDisplay[] = React.useMemo(() => {
    const flattened = flattenObject(baseTokensRaw);
    const result: BaseTokenDisplay[] = [];
    const uniqueKeys = new Set<string>();

    const formatKey = (flatKey: string) => {
      const scaleMatch = flatKey.match(/^(gray|whiteAlpha|blackAlpha|onBrand|onAccent)-(\d+)$/);
      if (scaleMatch) {
        const root = kebabCaseToCamelCase(scaleMatch[1]);
        const scale = scaleMatch[2];
        return `${root}[${scale}]`;
      }

      const customizablePaletteMatch = flatKey.match(/(.*)-(vivid|normal|dim)-(\d+)/);
      if (customizablePaletteMatch) {
        const root = customizablePaletteMatch[1].replace(/-/g, '.');
        const palette = customizablePaletteMatch[2];
        const scale = customizablePaletteMatch[3];
        return `${root}.${palette}[${scale}]`;
      }

      const themedMatch = flatKey.match(/^(.*)-(light|dark)$/);
      if (themedMatch) {
        const root = themedMatch[1].replace(/-/g, '.');
        const theme = themedMatch[2];
        return `${root}.${theme}`;
      }

      return flatKey.replace(/-/g, '.');
    };

    for (const key in flattened) {
      if (Object.prototype.hasOwnProperty.call(flattened, key)) {
        let value = flattened[key];

        if (value === null || value === undefined) {
          continue;
        }

        if (typeof value === 'string') {
          const displayKey = formatKey(key);

          if (!uniqueKeys.has(displayKey)) {
            result.push({
              key: displayKey,
              value: value,
            });
            uniqueKeys.add(displayKey);
          }
        }
      }
    }

    return result.sort((a, b) => a.key.localeCompare(b.key));
  }, [baseTokensRaw]);

  const filterBaseTokens = (tokens: BaseTokenDisplay[]) => {
    if (!filter) return tokens;

    const filterLower = filter.toLowerCase();

    return tokens.filter((token) => {
      return token.key.toLowerCase().includes(filterLower) || token.value.toLowerCase().includes(filterLower);
    });
  };

  const groupTokensByRootBase = (tokens: BaseTokenDisplay[]): Record<string, BaseTokenDisplay[]> => {
    return tokens.reduce((acc: Record<string, BaseTokenDisplay[]>, token) => {
      const match = token.key.match(/^([a-z]+)/i);
      const root = match ? match[1] : 'other';

      if (!acc[root]) {
        acc[root] = [];
      }
      acc[root].push(token);
      return acc;
    }, {});
  };

  const filteredTokens = filterBaseTokens(tokensToDisplay);
  const groupedBaseTokens = groupTokensByRootBase(filteredTokens);

  const BASE_TOKEN_ORDER = [
    'brand',
    'accent',
    'warning',
    'error',
    'success',
    'gray',
    'whiteAlpha',
    'blackAlpha',
    'onBrand',
    'customizable',
  ];

  const sortedGroupedTokens: Record<string, BaseTokenDisplay[]> = {};

  BASE_TOKEN_ORDER.forEach((root) => {
    if (groupedBaseTokens[root]) {
      sortedGroupedTokens[root] = groupedBaseTokens[root];
      delete groupedBaseTokens[root];
    }
  });
  Object.assign(sortedGroupedTokens, groupedBaseTokens);

  return (
    <div className={styles.colors} data-colors-controls>
      <div className={styles.filterRow}>
        <Gapped>
          <label htmlFor="base-brand">Brand</label>
          <Select
            id="base-brand"
            items={[...colorOptions, 'custom']}
            value={brand}
            width={140}
            onValueChange={setBrand}
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
          <label htmlFor="base-accent">Accent</label>
          <Select
            id="base-accent"
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

        <Gapped style={{ marginLeft: 'auto' }}>
          <label htmlFor="base-format">Format</label>
          <Select
            width={238}
            id="base-format"
            items={colorFormatOptions}
            value={colorFormat}
            onValueChange={setColorFormat}
          />
        </Gapped>
      </div>
      <div className={styles.headerRow}>
        <span className={styles.colorName}>Token</span>
        <div className={styles.colorTileWrapper} style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <span>Value</span>
        </div>
      </div>
      {Object.entries(sortedGroupedTokens).map(([groupName, tokens], i) => (
        <React.Fragment key={groupName}>
          <div className={styles.groupHeader} style={{ margin: i !== 0 ? '24px 0 16px' : '12px 0 0' }}>
            {groupName}
          </div>
          {tokens.map(({ key, value }) => (
            <div key={key} className={styles.displayRow}>
              <span className={styles.colorName}>{key}</span>
              <div className={styles.colorTileWrapper}>
                <div
                  className={styles.colorTile}
                  style={{
                    backgroundColor:
                      colorFormat === 'iOS/Android (hex-aarrggbb)' ? convertHexAlphaToWebFormat(value) : value,
                  }}
                />
                <span className={styles.colorHex} style={{ color: LIGHT_TEXT_COLOR }}>
                  {value?.replace(/, /g, ',')}
                </span>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
      <div className={styles.controls}>
        <Input
          width="50%"
          value={filter}
          onValueChange={setFilter}
          placeholder="Введите название токена или цвет"
          rightIcon={<SearchLoupeIcon16Regular />}
        />
      </div>
    </div>
  );
};

BaseTokensStory.storyName = 'Токены базовой палитры';
