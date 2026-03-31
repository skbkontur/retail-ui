import React from 'react';

import { Gapped, Select, Input } from '@skbkontur/react-ui';
import { IconSearchLoupeRegular16 } from '@skbkontur/icons/IconSearchLoupeRegular16';
import type { Meta } from '@skbkontur/react-ui/typings/stories';

import { brand as brandSwatch } from '../lib/consts/default-swatch';
import { getColorsBase } from '../lib/get-colors-base';
import { getColors } from '../get-colors';
import type { TokensBase } from '../lib/types/tokens-base';
import type { ColorFormat } from '../lib/utils/convert-color';
import { differenceEuclidean } from 'culori';
import { parse } from '@babel/core';

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

export const GetColorsConfiguratorStory = () => {
  const [brand, setBrand] = React.useState('blue');
  const [customBrand, setCustomBrand] = React.useState('#0077FF');
  const [accent, setAccent] = React.useState('gray');
  const [customAccent, setCustomAccent] = React.useState('#808080');
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'all'>('all');

  const [warning, setWarning] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const [format, setFormat] = React.useState<ColorFormat>('hex/rgba');
  const [output, setOutput] = React.useState<'object' | 'css'>('css');

  const [selLight, setSelLight] = React.useState("[data-k-brand='$brand'][data-k-accent='$accent']");
  const [selDark, setSelDark] = React.useState(
    "[data-k-brand='$brand'][data-k-accent='$accent'][data-k-theme='$theme']"
  );

  const config = {
    brand: brand === 'custom' ? customBrand : brand,
    accent: accent === 'custom' ? customAccent : accent,
    theme,
    system:
      warning || error || success
        ? {
            warning: warning || '#FDAA00',
            error: error || '#E62B34',
            success: success || '#009A40',
          }
        : undefined,
    overrides: undefined,
    format,
    output,
    ...(output === 'css' && {
      outputSelectors: { light: selLight, dark: selDark },
    }),
  };

  let result: any = '';
  let errorMessage = '';

  try {
    result = getColors(config as any);
  } catch (e: any) {
    errorMessage = e.message || 'Error';
  }

  const styles = {
    textarea: css`
      display: block;
      width: 100%;
      box-sizing: border-box;
      margin-top: 8px;
      margin-bottom: 16px;
      padding: 12px;
      border: 1px solid #d0d7de;
      border-radius: 6px;
      background: #f6f8fa;
      white-space: pre-wrap;
      font-family: monospace;
      font-size: 11px;
      line-height: 1.4;
      max-height: 50vh;
      overflow-y: auto;
    `,
  };

  const rowStyle = { display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' };
  const labelStyle = { width: '150px', flexShrink: 0, fontSize: '14px', marginTop: '8px' };
  const controlWidth = 140;

  return (
    <div style={{ padding: '16px 16px 0 16px' }}>
      <div style={rowStyle}>
        <label htmlFor="brand-select" style={labelStyle}>
          Brand
        </label>
        <Gapped>
          <Select
            id="brand-select"
            width={controlWidth}
            items={[...Object.keys(brandSwatch), 'custom']}
            value={brand}
            onValueChange={setBrand}
          />
          {brand === 'custom' && <Input width={controlWidth} value={customBrand} onValueChange={setCustomBrand} />}
        </Gapped>
      </div>

      <div style={rowStyle}>
        <label htmlFor="accent-select" style={labelStyle}>
          Accent
        </label>
        <Gapped>
          <Select
            id="accent-select"
            width={controlWidth}
            items={['gray', 'brand', 'custom']}
            value={accent}
            onValueChange={setAccent}
          />
          {accent === 'custom' && <Input width={controlWidth} value={customAccent} onValueChange={setCustomAccent} />}
        </Gapped>
      </div>

      <div style={rowStyle}>
        <label htmlFor="theme-select" style={labelStyle}>
          Theme
        </label>
        <Select
          id="theme-select"
          width={controlWidth}
          items={['light', 'dark', 'all']}
          value={theme}
          onValueChange={(v: any) => setTheme(v)}
        />
      </div>

      <div style={rowStyle}>
        <label style={labelStyle}>System</label>
        <Gapped>
          <Input
            width={controlWidth}
            value={warning}
            onValueChange={setWarning}
            placeholder="warning #FDAA00"
            title="warning"
          />
          <Input
            width={controlWidth}
            value={error}
            onValueChange={setError}
            placeholder="error #E62B34"
            title="error"
          />
          <Input
            width={controlWidth}
            value={success}
            onValueChange={setSuccess}
            placeholder="success #009A40"
            title="success"
          />
        </Gapped>
      </div>

      <div style={rowStyle}>
        <label htmlFor="format-select" style={labelStyle}>
          Format
        </label>
        <Select
          id="format-select"
          width={controlWidth}
          items={['hex/rgba', 'oklch', 'hex-aarrggbb']}
          value={format}
          onValueChange={(v: any) => setFormat(v)}
        />
      </div>

      <div style={rowStyle}>
        <label htmlFor="output-select" style={labelStyle}>
          Output
        </label>
        <Select
          id="output-select"
          width={controlWidth}
          items={['object', 'css']}
          value={output}
          onValueChange={(v: any) => setOutput(v)}
        />
      </div>

      {output === 'css' && (
        <>
          <div style={rowStyle}>
            <label htmlFor="sel-light" style={labelStyle}>
              Output selector light
            </label>
            <div>
              <Input id="sel-light" value={selLight} onValueChange={setSelLight} width={450} />
            </div>
          </div>
          <div style={rowStyle}>
            <label htmlFor="sel-dark" style={labelStyle}>
              Output selector dark
            </label>
            <div>
              <Input id="sel-dark" value={selDark} onValueChange={setSelDark} width={450} />
            </div>
          </div>
        </>
      )}

      <div style={rowStyle}>
        <label style={labelStyle}>Overrides</label>
        <span style={{ color: '#999', fontSize: '12px', marginTop: '8px' }}>
          Переопределение токенов со ссылкой на базовые палитры (см. ниже в разделе «Переопределение токенов overrides»)
        </span>
      </div>

      <div style={{ marginTop: '24px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Код генерации</div>
        <pre className={styles.textarea}>
          {`getColors(${JSON.stringify(config, (k, v) => (v === undefined ? undefined : v), 2)})`}
        </pre>

        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Результат</div>
        {errorMessage && <div style={{ color: '#d32f2f', marginBottom: '4px', fontSize: '12px' }}>{errorMessage}</div>}
        <pre className={styles.textarea} style={{ marginBottom: 0 }}>
          {output === 'object' ? JSON.stringify(result, null, 2) : result}
        </pre>
      </div>
    </div>
  );
};

GetColorsConfiguratorStory.storyName = 'Конфигуратор getColors()';

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

ColorsPaletteOverridesStory.storyName = 'Переопределение токенов overrides';

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
      display: flex;
      align-items: center;
      gap: 8px;
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
      padding: 16px;
      background: white;
      box-shadow: 0 -1px rgba(0, 0, 0, 0.15);
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 16px;
    `,
    similarityBadge: css`
      padding: 2px 6px;
      background: #eee;
      border-radius: 10px;
      font-size: 11px;
      color: #666;
      font-weight: normal;
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
  const [isSimilarSearch, setIsSimilarSearch] = React.useState(true);
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

  const renderColorItem = (color: string, text: string) => (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <div style={{ flexShrink: 0, background: color, width: 12, height: 12, borderRadius: 4 }} />
      {text}
    </div>
  );

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
    if (brand !== 'custom') return brand;
    return customBrandColor.trim() !== '' ? customBrandColor : defaultBrandColor;
  }, [brand, customBrandColor]);

  const safeAccentColor = React.useMemo(() => {
    if (accent !== 'custom') return accent;
    return customAccentColor.trim() !== '' ? customAccentColor : defaultAccentColor;
  }, [accent, customAccentColor]);

  const baseTokensRaw = React.useMemo(() => {
    return getColorsBase({
      brand: safeBrandColor,
      accent: safeAccentColor,
      format: outputFormatParam,
    });
  }, [safeBrandColor, safeAccentColor, outputFormatParam]);

  const tokensToDisplay = React.useMemo(() => {
    const flattened = flattenObject(baseTokensRaw);
    const result: BaseTokenDisplay[] = [];
    const uniqueKeys = new Set<string>();

    const formatKey = (flatKey: string) => {
      const scaleMatch = flatKey.match(/^(gray|whiteAlpha|blackAlpha|onBrand|onAccent)-(\d+)$/);
      if (scaleMatch) return `${kebabCaseToCamelCase(scaleMatch[1])}[${scaleMatch[2]}]`;
      const customizablePaletteMatch = flatKey.match(/(.*)-(vivid|normal|dim)-(\d+)/);
      if (customizablePaletteMatch)
        return `${customizablePaletteMatch[1].replace(/-/g, '.')}.${customizablePaletteMatch[2]}[${
          customizablePaletteMatch[3]
        }]`;
      const themedMatch = flatKey.match(/^(.*)-(light|dark)$/);
      if (themedMatch) return `${themedMatch[1].replace(/-/g, '.')}.${themedMatch[2]}`;
      return flatKey.replace(/-/g, '.');
    };

    for (const key in flattened) {
      const displayKey = formatKey(key);
      if (!uniqueKeys.has(displayKey) && typeof flattened[key] === 'string') {
        result.push({ key: displayKey, value: flattened[key] });
        uniqueKeys.add(displayKey);
      }
    }
    return result.sort((a, b) => a.key.localeCompare(b.key));
  }, [baseTokensRaw]);

  const filteredTokens = React.useMemo(() => {
    const cleanFilter = filter.trim().toLowerCase();
    if (!cleanFilter) return tokensToDisplay;

    const parsedFilterColor = parse(cleanFilter);

    return tokensToDisplay
      .map((token) => {
        const isNameMatch = token.key.toLowerCase().includes(cleanFilter);
        const isValueMatch = token.value.toLowerCase().includes(cleanFilter);
        let similarity = 0;

        if (isSimilarSearch && parsedFilterColor) {
          const tokenColor = parse(token.value);
          if (tokenColor) {
            const distance = differenceEuclidean('rgb')(parsedFilterColor, tokenColor);
            similarity = Math.max(0, Math.round((1 - distance) * 100));
          }
        }

        return { ...token, similarity, isDirectMatch: isNameMatch || isValueMatch };
      })
      .filter((t) => t.isDirectMatch || t.similarity >= 90)
      .sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
  }, [filter, isSimilarSearch, tokensToDisplay]);

  const groupTokensByRootBase = (tokens: any[]): Record<string, any[]> => {
    return tokens.reduce((acc: Record<string, any[]>, token) => {
      const match = token.key.match(/^([a-z]+)/i);
      const root = match ? match[1] : 'other';
      if (!acc[root]) acc[root] = [];
      acc[root].push(token);
      return acc;
    }, {});
  };

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
  const sortedGroupedTokens: Record<string, any[]> = {};
  BASE_TOKEN_ORDER.forEach((root) => {
    if (groupedBaseTokens[root]) sortedGroupedTokens[root] = groupedBaseTokens[root];
  });
  Object.keys(groupedBaseTokens).forEach((k) => {
    if (!BASE_TOKEN_ORDER.includes(k)) sortedGroupedTokens[k] = groupedBaseTokens[k];
  });

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
          {tokens.map((token) => (
            <div key={token.key} className={styles.displayRow}>
              <div className={styles.colorName}>
                {token.key}
                {token.similarity > 0 && !token.isDirectMatch && (
                  <span className={styles.similarityBadge}>{token.similarity}%</span>
                )}
              </div>
              <div className={styles.colorTileWrapper}>
                <div
                  className={styles.colorTile}
                  style={{
                    backgroundColor:
                      colorFormat === 'iOS/Android (hex-aarrggbb)'
                        ? convertHexAlphaToWebFormat(token.value)
                        : token.value,
                  }}
                />
                <span className={styles.colorHex} style={{ color: LIGHT_TEXT_COLOR }}>
                  {token.value?.replace(/, /g, ',')}
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
          rightIcon={<IconSearchLoupeRegular16 />}
        />
        <Checkbox checked={isSimilarSearch} onValueChange={setIsSimilarSearch}>
          Искать похожие
        </Checkbox>
      </div>
    </div>
  );
};

BaseTokensStory.storyName = 'Токены базовой палитры';
