import { DocsContext } from '@storybook/addon-docs';
import type { ModuleExports } from '@storybook/types';
import * as colors from '@skbkontur/colors/default-light';
import React, { useContext, useEffect } from 'react';
import { FlagAIcon16Light } from '@skbkontur/icons/icons/FlagAIcon/FlagAIcon16Light.js';
import { LocationGlobeIcon16Light } from '@skbkontur/icons/icons/LocationGlobeIcon/LocationGlobeIcon16Light.js';
import { WeatherMoonIcon16Light } from '@skbkontur/icons/icons/WeatherMoonIcon/WeatherMoonIcon16Light.js';
import { WeatherSunIcon16Light } from '@skbkontur/icons/icons/WeatherSunIcon/WeatherSunIcon16Light.js';
import type { Emotion } from '@emotion/css/create-instance';

import { useStyles } from '../lib/renderEnvironment/index.js';
import { DropdownMenu } from '../components/DropdownMenu/index.js';
import { MenuItem } from '../components/MenuItem/index.js';
import { Toggle } from '../components/Toggle/index.js';
import { MenuHeader } from '../components/MenuHeader/index.js';
import { MenuSeparator } from '../components/MenuSeparator/index.js';
import { Hint } from '../components/Hint/index.js';
import { reactUIFeatureFlagsDefault } from '../lib/featureFlagsContext/index.js';
import * as ALL_LIGHT_THEMES from '../lib/theming/themes/LightTheme.js';
import * as ALL_DARK_THEMES from '../lib/theming/themes/DarkTheme.js';

const languages = [
  { icon: '🇷🇺', caption: 'Russian', value: 'ru' },
  { icon: '🇬🇧', caption: 'English', value: 'en' },
];

const brands = [
  { caption: 'Red', value: 'red', color: colors.customizableBoldRed },
  { caption: 'Orange', value: 'orange', color: colors.customizableBoldOrange },
  { caption: 'Green', value: 'green', color: colors.customizableBoldGreen },
  { caption: 'Mint', value: 'mint', color: colors.customizableBoldMint },
  { caption: 'Blue', value: 'blue', color: colors.customizableBoldBlue },
  { caption: 'Blue Deep', value: 'blue-deep', color: colors.customizableBoldBlueDeep },
  { caption: 'Purple', value: 'purple', color: colors.customizableBoldPurple },
  { caption: 'Violet', value: 'violet', color: colors.customizableBoldViolet },
];

const accents = [
  { caption: 'Gray', value: 'gray' },
  { caption: 'Brand', value: 'brand' },
];

const themes = [...Object.keys(ALL_LIGHT_THEMES), ...Object.keys(ALL_DARK_THEMES)].map((themeName) => {
  const parseVersion = (str: string) => {
    const match = str.match(/_(\d+)_(\d+)$/);
    if (!match) {
      return null;
    }
    return `${match[1]}.${match[2]}`;
  };
  const themeType = themeName.includes('LIGHT') ? 'Light' : 'Dark';
  const themeIcon = themeType === 'Light' ? <WeatherSunIcon16Light /> : <WeatherMoonIcon16Light />;
  const themeVersion = parseVersion(themeName);
  return {
    icon: themeIcon,
    type: themeType,
    version: themeVersion,
    value: themeName,
  };
});

const allFeatureFlags = Object.keys(reactUIFeatureFlagsDefault);

const getStyles = ({ css }: Emotion) => ({
  menuWrap: css`
    height: 32px;
  `,
  menu: css`
    position: fixed;
    display: flex;
    gap: 4px;
    padding: 4px 12px;
    align-items: center;
    width: 100%;
    top: 0;
    left: 0;
    background: white;
    border-bottom: 1px solid #e0e6ea;
    z-index: 3;
  `,
  menuSelect: css`
    display: flex;
    align-items: center;
    gap: 4px;
    color: #73818c;
    cursor: pointer;
    padding: 4px 10px;
    border-radius: 6px;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  `,
  selectTextStack: css`
    display: flex;
    align-items: center;
    gap: 4px;
    line-height: 1.1;
  `,
  selectValue: css`
    font-size: 12px;
    color: #333;
    font-weight: 400;
  `,
  menuColor: css`
    width: 12px;
    height: 12px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
  `,
  menuItem: css`
    position: relative;
    width: 100%;
    min-width: 250px !important;
    overflow: hidden;
  `,
  menuItemContent: css`
    display: flex;
    align-items: baseline;
    gap: 4px;
  `,
  menuItemLabel: css`
    padding-left: 8px;
    &:before {
      content: '';
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `,
  menuComment: css`
    position: relative;
    font-size: 11px;
    margin-top: -4px;
    text-transform: uppercase;
  `,
  menuIcon: css`
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    font-size: 16px;
  `,
  menuCountry: css`
    display: inline-block;
    background: #3d3d3d;
    font-size: 11px !important;
    color: white;
    margin-left: 4px;
    border-radius: 4px;
    padding: 2px 4px 1px;
    font-weight: 700;
    vertical-align: middle;
  `,
});

export const Meta = ({ of }: { of?: ModuleExports }) => {
  const context = useContext(DocsContext);
  const styles = useStyles(getStyles);

  if (of && !context.componentStories().some((x) => x.title === of.default.title)) {
    context.referenceMeta(of, true);
  }

  useEffect(() => {
    try {
      const url = new URL(window.parent.location.toString());
      if (url.hash) {
        const element = document.getElementById(url.hash.substring(1));
        if (element) {
          window.setTimeout(() => {
            const yOffset = -65;
            const top = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top, behavior: 'smooth' });
          }, 2000);
        }
      }
    } catch (err) {
      // pass
    }
  });

  //@ts-expect-error
  const currentTheme = themes.find((t) => t.value === context.store.userGlobals.globals.theme);
  //@ts-expect-error
  const currentLocale = languages.find((l) => l.value === context.store.userGlobals.globals.locale);
  //@ts-expect-error
  const currentFeatureFlags = context.store.userGlobals.globals.featureFlags || [];
  //@ts-expect-error
  const currentBrand = brands.find((b) => b.value === context.store.userGlobals.globals.brand);
  //@ts-expect-error
  const currentAccent = accents.find((a) => a.value === context.store.userGlobals.globals.accent);

  const renderMenuItem = (props: any) => (
    <MenuItem
      key={props.value}
      className={styles.menuItem}
      comment={props.comment && <div className={styles.menuComment}>{props.comment}</div>}
      onClick={props.disabled ? undefined : props.onClick}
      style={props.disabled ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
    >
      <div className={styles.menuItemContent}>
        {props.color && <div className={styles.menuColor} style={{ background: props.color }} />}
        <span style={{ color: 'rgba(0, 0, 0, 0.88)' }}>{props.caption}</span>
      </div>
      {props.icon && <div className={styles.menuIcon}>{props.icon}</div>}
    </MenuItem>
  );

  return (
    <div className={styles.menuWrap}>
      <div className={styles.menu}>
        <DropdownMenu
          caption={
            <div className={styles.menuSelect}>
              <div className={styles.menuColor} style={{ background: currentBrand?.color }} />
              <div className={styles.selectTextStack}>
                Brand
                <span className={styles.selectValue}>{currentBrand?.caption || brands[0].caption}</span>
              </div>
            </div>
          }
        >
          {brands.map(({ caption, value, color }) =>
            renderMenuItem({
              caption,
              value,
              disabled: false,
              onClick: () => {
                const update: Record<string, any> = { brand: value };
                if (value === 'red' || value === 'orange') {
                  update.accent = 'gray';
                }
                context.channel.emit('updateGlobals', { globals: update });
              },
              color,
            }),
          )}
        </DropdownMenu>

        <DropdownMenu
          caption={
            <div className={styles.menuSelect}>
              <div
                className={styles.menuColor}
                style={{ background: currentAccent?.value === 'brand' ? currentBrand?.color : '#3d3d3d' }}
              />
              <div className={styles.selectTextStack}>
                Accent
                <span className={styles.selectValue}>{currentAccent?.caption || accents[0].caption}</span>
              </div>
            </div>
          }
        >
          {accents.map(({ caption, value }) => {
            const isDisabled = value === 'brand' && (currentBrand?.value === 'red' || currentBrand?.value === 'orange');
            const item = renderMenuItem({
              caption,
              value,
              disabled: isDisabled,
              onClick: () => context.channel.emit('updateGlobals', { globals: { accent: value } }),
              color: value === 'brand' ? currentBrand?.color : '#3d3d3d',
            });

            if (isDisabled) {
              return (
                <Hint key={value} text={<>Недоступно для&nbsp;brand со&nbsp;значениями red и orange</>} pos="right">
                  <div style={{ display: 'flex' }}>{item}</div>
                </Hint>
              );
            }
            return item;
          })}
        </DropdownMenu>

        <DropdownMenu
          caption={
            <div className={styles.menuSelect}>
              <div style={{ color: '#73818c', display: 'flex' }}>
                {currentTheme?.type === 'Dark' ? <WeatherMoonIcon16Light /> : <WeatherSunIcon16Light />}
              </div>
              <div className={styles.selectTextStack}>
                Theme
                <span className={styles.selectValue}>
                  {currentTheme?.type || themes[0].type}
                  {currentTheme?.version && <span className={styles.menuCountry}>{currentTheme?.version}</span>}
                </span>
              </div>
            </div>
          }
        >
          <MenuHeader>Темы по умолчанию</MenuHeader>
          {themes
            .filter((x) => x.version === null)
            .map((t) =>
              renderMenuItem({
                caption: t.type,
                comment: t.value,
                value: t.value,
                icon: t.icon,
                onClick: () => context.channel.emit('updateGlobals', { globals: { theme: t.value } }),
              }),
            )}
          <MenuSeparator />
          <MenuHeader>Темы для предыдущих версий</MenuHeader>
          {themes
            .filter((x) => x.version !== null)
            .sort((a, b) => (a.version as string).localeCompare(b.version as string))
            .slice(0, -2)
            .map((t) =>
              renderMenuItem({
                caption: `${t.version} ${t.type}`,
                comment: t.value,
                value: t.value,
                icon: t.icon,
                onClick: () => context.channel.emit('updateGlobals', { globals: { theme: t.value } }),
              }),
            )}
        </DropdownMenu>

        <DropdownMenu
          caption={
            <div className={styles.menuSelect}>
              <div style={{ color: '#73818c', display: 'flex' }}>
                <LocationGlobeIcon16Light />
              </div>
              <div className={styles.selectTextStack}>
                <span>{currentLocale?.caption || languages[0].caption}</span>
              </div>
            </div>
          }
        >
          {languages.map((l) =>
            renderMenuItem({
              caption: l.caption,
              value: l.value,
              icon: l.icon,
              onClick: () => context.channel.emit('updateGlobals', { globals: { locale: l.value } }),
            }),
          )}
        </DropdownMenu>

        <DropdownMenu
          caption={
            <div className={styles.menuSelect}>
              <div style={{ color: '#73818c', display: 'flex' }}>
                <FlagAIcon16Light />
              </div>
              <div className={styles.selectTextStack}>
                Feature flags
                <span className={styles.selectValue}>
                  {currentFeatureFlags.length > 0 && (
                    <span className={styles.menuCountry}>{currentFeatureFlags.length}</span>
                  )}
                </span>
              </div>
            </div>
          }
        >
          {allFeatureFlags.map((flag) => (
            <MenuItem key={flag} className={styles.menuItem}>
              <Toggle
                id={flag}
                checked={currentFeatureFlags.includes(flag)}
                onValueChange={(val) => {
                  const flags = val
                    ? [...currentFeatureFlags, flag]
                    : currentFeatureFlags.filter((f: string) => f !== flag);
                  context.channel.emit('updateGlobals', { globals: { featureFlags: flags } });
                }}
              />
              <label htmlFor={flag} className={styles.menuItemLabel}>
                {flag}
              </label>
            </MenuItem>
          ))}
        </DropdownMenu>
      </div>
    </div>
  );
};
