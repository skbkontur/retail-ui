import { Toast } from '@skbkontur/react-ui/components/Toast';
import React from 'react';

import { brand as brandSwatch } from '../lib/consts/default-swatch';
import { getColors } from '../lib/get-colors';
import { getColorsBase } from '../lib/get-colors-base';

type ColorValue = string;

interface ThemeValues {
  light: ColorValue;
  dark: ColorValue;
}

interface TokenPair {
  key: string;
  value: ThemeValues;
}

interface ColorSection {
  [key: string]: ColorValue | ColorSection;
}

interface BaseTokenSection {
  [key: string]: ColorValue | BaseTokenSection;
}

interface BaseTokensObject {
  [key: string]: BaseTokenSection | { [key: string]: BaseTokenSection };
}

export default {
  title: 'Colors',
  parameters: {
    creevey: {
      skip: true,
    },
  },
};

export const SemanticTokensStory = () => {
  const allConfigs = Object.keys(brandSwatch).flatMap((color) =>
    ['brand', 'gray'].map((accent) => ({ color, accent }))
  );

  const cssStyles = `
    .configTitle {
      position: sticky;
      top: 0;
      margin: 0;
      padding: 4px 16px;
      font-size: 16px;
      font-weight: 700;
      color: #1f2937;
      background: #fff;
      border-bottom: 1px solid #d1d5db;
      z-index: 11;
    }

    .groupContainer {
      margin-bottom: 48px;
    }

    .groupTitle {
      position: sticky;
      top: 28px;
      z-index: 10;
      padding: 4px 0;
      background: white;
      border-bottom: 1px solid #d1d5db;
      margin: 0 0 10px 0;
      padding: 4px 16px;
      font-size: 14px;
      font-weight: 600;
      color: #4b5563;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 12px;
      padding: 8px 16px;
    }

    .tokenCard {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      padding: 8px;
      border: 1px solid #d1d5db; 
      background: #ffffff;
      text-align: left;
      transition: all 0.2s ease-in-out;
      margin: 0;
    }

    .tokenName {
      font-weight: 600;
      line-height: 1.4;
      margin-bottom: 8px;
      word-break: break-word;
      font-size: 13px;
      color: #1f2937;
      width: 100%;
    }

    .colorTilesContainer {
      display: flex;
      width: 100%;
    }

    .colorThemeWrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex-grow: 1;
      width: 50%;
      padding: 8px;
      border: 1px solid rgba(0,0,0,.1);
    }

    .colorThemeWrapper.light {
        background: transparent;
      }
      
      .colorThemeWrapper.dark {
        background: #1f2937;
        color: #d1d5db;
    }

    .colorSquare {
      width: 100%;
      height: 32px; 
    }

    .colorSquare.light {
      box-shadow: 0 0 0 1px rgba(0 0 0 / 0.1);
    }
    
    .colorSquare.dark {
      box-shadow: 0 0 0 1px rgba(255 255 255 / 0.2);
    }

    .colorValue {
      font-size: 11px;
      color: #6b7280;
      margin-top: 6px; 
    }

    .colorValue.dark {
      color: #d1d5db;
    }
  `;

  const transformTokens = (themes: any) => {
    const result = {} as any;

    for (const [themeName, tokens] of Object.entries(themes)) {
      for (const [tokenName, value] of Object.entries(tokens as any)) {
        if (!result[tokenName]) {
          result[tokenName] = {};
        }
        result[tokenName][themeName] = value;
      }
    }

    return result;
  };

  return (
    <>
      <style>{cssStyles}</style>
      {allConfigs.map(({ color, accent }) => {
        const grouped = transformTokens({
          light: getColors({
            brand: color,
            accent,
            theme: 'light',
          }),
          dark: getColors({
            brand: color,
            accent,
            theme: 'dark',
          }),
        });

        return (
          <div key={`${color}-${accent}`}>
            <h2 className="configTitle">
              Brand: {color}&nbsp;&nbsp;·&nbsp;&nbsp;Accent: {accent}
            </h2>

            <div className="grid">
              {Object.entries(grouped).map(([key, value]) => (
                <div className="tokenCard" key={key}>
                  <div className="tokenName">{key}</div>

                  <div className="colorTilesContainer">
                    <div className="colorThemeWrapper light">
                      <div
                        title={`Light: ${value.light}`}
                        className="colorSquare light"
                        style={{ backgroundColor: value.light }}
                      />
                      <small className="colorValue">{value.light}</small>
                    </div>

                    <div className="colorThemeWrapper dark">
                      <div
                        title={`Dark: ${value.dark}`}
                        className="colorSquare dark"
                        style={{ backgroundColor: value.dark }}
                      />
                      <small className="colorValue dark">{value.dark}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

SemanticTokensStory.storyName = 'Semantic tokens';

export const BaseTokensStory = () => {
  const isObject = (val: unknown): val is Record<string, unknown> =>
    typeof val === 'object' && val !== null && !Array.isArray(val);

  const generateBaseTokenList = (tokens: BaseTokensObject): TokenPair[] => {
    const tokenList: TokenPair[] = [];

    const traverseTokens = (section: BaseTokenSection, pathPrefix: string) => {
      for (const key in section) {
        if (!Object.prototype.hasOwnProperty.call(section, key)) {
          continue;
        }

        const currentPath = pathPrefix ? `${pathPrefix}.${key}` : key;
        const value = section[key];

        const isNode = isObject(value);
        const isLeaf = typeof value === 'string';

        if (isNode) {
          traverseTokens(value, currentPath);
        } else if (isLeaf) {
          tokenList.push({
            key: currentPath,
            value: {
              light: value,
              dark: value,
            },
          } as TokenPair);
        }
      }
    };

    for (const rootKey in tokens) {
      if (rootKey !== 'customizable' && Object.prototype.hasOwnProperty.call(tokens, rootKey)) {
        traverseTokens(tokens[rootKey] as BaseTokenSection, rootKey);
      }
    }

    if (tokens.customizable) {
      for (const colorKey in tokens.customizable) {
        if (Object.prototype.hasOwnProperty.call(tokens.customizable, colorKey)) {
          traverseTokens(tokens.customizable[colorKey] as BaseTokenSection, `customizable.${colorKey}`);
        }
      }
    }

    return tokenList;
  };

  const groupTokensByRoot = (tokens: TokenPair[]): Record<string, TokenPair[]> =>
    tokens.reduce(
      (acc, t) => {
        const parts = t.key.split('.');
        const rootKey = parts[0] === 'customizable' ? `${parts[0]}.${parts[1]}` : parts[0];

        acc[rootKey] = [...(acc[rootKey] || []), t];
        return acc;
      },
      {} as Record<string, TokenPair[]>
    );

  const copyColor = (v: string) => {
    window.navigator.clipboard.writeText(v);
    Toast.push('Скопировано', null, 1000);
  };

  const allConfigs = Object.keys(brandSwatch).flatMap((color) =>
    ['brand', 'gray'].map((accent) => ({ color, accent }))
  );

  const cssStyles = `
    .configTitle {
      position: sticky;
      top: 0;
      margin: 0;
      padding: 4px 16px;
      font-size: 16px;
      font-weight: 700;
      color: #1f2937;
      background: #fff;
      border-bottom: 1px solid #d1d5db;
      z-index: 11;
    }

    .groupContainer {
      margin-bottom: 48px;
    }

    .groupTitle {
      position: sticky;
      top: 28px;
      z-index: 10;
      padding: 4px 0;
      background: white;
      border-bottom: 1px solid #d1d5db;
      margin: 0 0 10px 0;
      padding: 4px 16px;
      font-size: 14px;
      font-weight: 600;
      color: #4b5563;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 12px;
      padding: 8px 16px;
    }

    .tokenCard {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 8px;
      border: 1px solid #d1d5db;
      background: #ffffff;
      text-align: left;
      transition: all 0.2s ease-in-out;
      margin: 0;
    }

    .tokenName {
      font-weight: 600;
      line-height: 1.4;
      margin-bottom: 8px;
      word-break: break-word;
      font-size: 13px;
      color: #1f2937;
      width: 100%;
    }

    .colorTilesContainer {
      display: flex;
      width: 100%;
    }

    .colorThemeWrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex-grow: 1;
      width: 50%;
      padding: 8px;
      border: 1px solid rgba(0,0,0,.1);
    }

    .colorThemeWrapper.light {
      background: transparent;
    }

    .colorThemeWrapper.dark {
      background: #1f2937;
      color: #d1d5db;
    }

    .colorSquare {
      width: 100%;
      height: 32px;
      box-shadow: 0 0 0 1px rgba(0 0 0 / 0.1);
    }

    .colorValue {
      font-size: 11px;
      color: #6b7280;
      margin-top: 6px;
    }

    .singleColorWrapper {
        flex-grow: 1;
        width: 100%;
        padding: 8px;
        border: 1px solid rgba(0,0,0,.1);
        background: transparent;
        color: #1f2937;
    }
    .singleColorWrapper .colorValue {
        color: #1f2937;
    }
  `;

  return (
    <>
      <style>{cssStyles}</style>
      {allConfigs.map(({ color, accent }) => {
        const baseTokens = getColorsBase({ brand: color, accent }) as unknown as BaseTokensObject;
        const grouped = groupTokensByRoot(generateBaseTokenList(baseTokens));

        return (
          <div key={`${color}-${accent}`}>
            <h2 className="configTitle">
              Brand: {color}&nbsp;&nbsp;·&nbsp;&nbsp;Accent: {accent}
            </h2>

            {Object.entries(grouped).map(([rK, tokens]) => (
              <div key={rK} className="groupContainer">
                <h3 className="groupTitle">{rK}</h3>

                <div className="grid">
                  {tokens.map(({ key, value }) => {
                    return (
                      <div key={key}>
                        <div className="tokenCard">
                          <div className="tokenName">{key}</div>

                          <div className="colorTilesContainer">
                            <div className="singleColorWrapper">
                              <div
                                title={`${value.light}`}
                                className="colorSquare light"
                                style={{ backgroundColor: value.light }}
                              />
                              <small className="colorValue">{value.light}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

BaseTokensStory.storyName = 'Base tokens';
