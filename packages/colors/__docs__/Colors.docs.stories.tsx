import React from 'react';
import { KonturColors, TKonturColor } from '../src/colors';
import type { Meta } from '@skbkontur/react-ui/typings/stories';
import { css } from '@skbkontur/react-ui/lib/theming/Emotion';
import { DropdownMenu, MenuHeader, MenuItem, Toast } from '@skbkontur/react-ui';

export default {
  title: 'Colors',
  parameters: {
    creevey: {
      skip: true,
    },
  },
} as Meta;

export const ColorsPalletStory = () => {
  const styles: Record<string, string> = {
    colors: css`
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
    `,
    colorGroup: css`
      break-inside: avoid;
      margin-bottom: 64px;
    `,
    colorBlock: css`
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      border: none;
      text-align: left;
      background: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: 0.1s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.06);
      }

      &:active {
        background: rgba(0, 0, 0, 0.1);
      }
    `,
    colorTile: css`
      display: block;
      height: 32px;
      width: 32px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      flex-shrink: 0;
    `,
    groupTitle: css`
      display: block;
      font-size: 20px;
      font-weight: 600;
      margin: 0 8px 12px;
    `,
    title: css`
      display: block;
      padding: 1px 0 0 8px;
    `,
    colorName: css`
      display: block;
      font-size: 14px;
      line-height: 1.2;
    `,
    colorValue: css`
      display: block;
      font-size: 12px;
      color: #8b8b8b;
    `,
  };

  const colorGroups = Object.entries(KonturColors).reduce((acc, [colorKey, colorValue]) => {
    const firstWord =
      ['greenMint', 'blueDark'].find((color) => colorKey.match(color)) || colorKey.match(/^[a-z]+/)![0]!;

    acc[firstWord] = { ...acc[firstWord], [colorKey]: colorValue };

    return acc;
  }, {} as Record<string, object>);

  const getColors = (color: string) => {
    const colorDashCase = color
      .replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
      .replace(/\d/, (m) => `-${m}`)
      .replace('f-f-f', 'fff');

    return {
      'JavaScript / TypeScript': `KonturColors.${color}`,
      CSS: `var(--kontur-${colorDashCase})`,
      SCSS: `$${colorDashCase}`,
      Less: `@${colorDashCase}`,
    };
  };

  const copyColor = (color: string) => {
    window.navigator.clipboard.writeText(color);
    Toast.push('Цвет скопирован', null, 1000);
  };

  return (
    <div className={styles.colors}>
      {Object.entries(colorGroups).map(([group, colors]) => {
        return (
          <div className={styles.colorGroup}>
            <div className={styles.groupTitle}>{group}</div>
            {Object.keys(colors).map((colorName) => {
              const colorValue = KonturColors[colorName as TKonturColor];
              const colorTile = (
                <div className={styles.colorBlock}>
                  <span className={styles.colorTile} style={{ backgroundColor: colorValue }} />
                  <span>
                    <span className={styles.colorName}>{colorName}</span>
                    <span className={styles.colorValue}>{colorValue}</span>
                  </span>
                </div>
              );
              return (
                <div>
                  <DropdownMenu caption={colorTile} width="300">
                    <MenuHeader>Скопировать переменную</MenuHeader>
                    {Object.entries(getColors(colorName)).map(([lang, color]) => (
                      <MenuItem onClick={() => copyColor(color)} comment={lang}>
                        <div style={{ minWidth: 270 }}>{color}</div>
                      </MenuItem>
                    ))}
                  </DropdownMenu>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
ColorsPalletStory.storyName = 'Палитра';
