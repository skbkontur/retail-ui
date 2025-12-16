import { DocsContext } from '@storybook/addon-docs';
import type { ModuleExports } from '@storybook/types';
import React, { useContext, useEffect } from 'react';
import { FlagAIcon16Light } from '@skbkontur/icons/icons/FlagAIcon/FlagAIcon16Light';
import { LocationGlobeIcon16Light } from '@skbkontur/icons/icons/LocationGlobeIcon/LocationGlobeIcon16Light';
import { WeatherMoonIcon16Light } from '@skbkontur/icons/icons/WeatherMoonIcon/WeatherMoonIcon16Light';
import { WeatherSunIcon16Light } from '@skbkontur/icons/icons/WeatherSunIcon/WeatherSunIcon16Light';
import { WeatherSunMoonIcon16Light } from '@skbkontur/icons/icons/WeatherSunMoonIcon/WeatherSunMoonIcon16Light';
import { ArrowUiCornerOutUpRightIcon16Light } from '@skbkontur/icons/icons/ArrowUiCornerOutUpRightIcon/ArrowUiCornerOutUpRightIcon16Light';
import { linkTo } from '@storybook/addon-links';

import { DropdownMenu } from '../components/DropdownMenu';
import { MenuItem } from '../components/MenuItem';
import { Toggle } from '../components/Toggle';
import { MenuHeader } from '../components/MenuHeader';
import { MenuSeparator } from '../components/MenuSeparator';
import { css } from '../lib/theming/Emotion';
import { reactUIFeatureFlagsDefault } from '../lib/featureFlagsContext';
import * as ALL_LIGHT_THEMES from '../lib/theming/themes/LightTheme';
import * as ALL_DARK_THEMES from '../lib/theming/themes/DarkTheme';

const languages = [
  { icon: '🇷🇺', caption: 'Russian', value: 'ru' },
  { icon: '🇬🇧', caption: 'English', value: 'en' },
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

const styles = {
  menuWrap: css`
    height: 20px;
  `,
  menu: css`
    position: fixed;
    display: flex;
    gap: 8px;
    padding: 4px 8px;
    align-items: center;
    width: 100%;
    top: 0;
    left: 0;
    background: white;
    border-bottom: 1px solid #e0e6ea;
    z-index: 1;
    font-size: 11px;
  `,
  menuSelect: css`
    color: #73818c;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 16px;

    &:hover {
      background: rgba(0, 0, 0, 0.06);
    }

    &:active {
      background: rgba(0, 0, 0, 0.1);
    }
  `,
  menuItem: css`
    position: relative;
    width: 100%;
    min-width: 250px !important;
    overflow: hidden;
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
    font-size: 10px !important;
    color: white;
    position: relative;
    top: -0.5px;
    margin-left: 4px !important;
    vertical-align: middle;
    border-radius: 8px;
    line-height: 1;
    padding: 2px 4px 1px;
    font-weight: 600;
  `,
};

export const Meta = ({ of }: { of?: ModuleExports }) => {
  const context = useContext(DocsContext);

  if (of && !context.componentStories().some((x) => x.title === of.default.title)) {
    context.referenceMeta(of, true);
  }

  useEffect(() => {
    let url;

    try {
      url = new URL(window.parent.location.toString());
      if (url.hash) {
        const element = document.getElementById(url.hash.substring(1));
        if (element) {
          // Introducing a delay to ensure scrolling works when it's a full refresh.
          window.setTimeout(() => {
            const yOffset = -65; // custom toolbar height + padding
            const top = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top, behavior: 'smooth' });
          }, 2000);
        }
      }
    } catch (err) {
      // pass
    }
  });

  //@ts-expect-error: store is not public
  const currentTheme = themes.find((theme) => theme.value === context.store.userGlobals.globals.theme);
  //@ts-expect-error: store is not public
  const currentLocale = languages.find((language) => language.value === context.store.userGlobals.globals.locale);
  //@ts-expect-error: store is not public
  const currentFeatureFlags: string[] = context.store.userGlobals.globals.featureFlags;

  const renderMenuItem = (props: { caption: string; value: string; icon?: React.ReactNode; onClick: () => void }) => (
    <MenuItem
      className={styles.menuItem}
      comment={<div className={styles.menuComment}>{props.value}</div>}
      onClick={props.onClick}
    >
      {props.caption}
      {props.icon && <div className={styles.menuIcon}>{props.icon}</div>}
    </MenuItem>
  );

  return (
    <div className={styles.menuWrap}>
      <div className={styles.menu}>
        <DropdownMenu
          caption={
            <div className={styles.menuSelect}>
              <WeatherSunMoonIcon16Light /> {currentTheme ? currentTheme.type : themes[0].type}
              {currentTheme?.version && <span className={styles.menuCountry}>{currentTheme?.version}</span>}
            </div>
          }
        >
          <MenuHeader>Темы по умолчанию</MenuHeader>
          {themes
            .filter((x) => x.version === null)
            .map(({ icon, type, value }) =>
              renderMenuItem({
                caption: type,
                value,
                icon,
                onClick: () => context.channel.emit('updateGlobals', { globals: { theme: value } }),
              }),
            )}

          <MenuSeparator />

          <MenuHeader>Темы для предыдущих версий</MenuHeader>
          {themes
            .filter((x) => x.version !== null)
            .sort((a, b) => (a.version as string).localeCompare(b.version as string))
            .slice(0, -2)
            .map(({ icon, type, version, value }) =>
              renderMenuItem({
                caption: `${version} ${type}`,
                value,
                icon,
                onClick: () => context.channel.emit('updateGlobals', { globals: { theme: value } }),
              }),
            )}

          <MenuSeparator />
          <MenuItem onClick={linkTo('Information/Theme')} style={{ cursor: 'pointer' }}>
            <ArrowUiCornerOutUpRightIcon16Light /> Подробнее о темах
          </MenuItem>
        </DropdownMenu>
        <DropdownMenu
          caption={
            <div className={styles.menuSelect}>
              <LocationGlobeIcon16Light /> {currentLocale ? currentLocale.caption : languages[0].caption}
            </div>
          }
        >
          {languages.map(({ icon, caption, value }) =>
            renderMenuItem({
              caption,
              value,
              icon,
              onClick: () => context.channel.emit('updateGlobals', { globals: { locale: value } }),
            }),
          )}
          <MenuSeparator />
          <MenuItem onClick={linkTo('Information/Locale')} style={{ cursor: 'pointer' }}>
            <ArrowUiCornerOutUpRightIcon16Light /> Подробнее о локализации
          </MenuItem>
        </DropdownMenu>
        <DropdownMenu
          caption={
            <div className={styles.menuSelect}>
              <FlagAIcon16Light /> Feature flags{' '}
              {currentFeatureFlags.length !== 0 && (
                <span className={styles.menuCountry}>{currentFeatureFlags.length}</span>
              )}
            </div>
          }
        >
          {allFeatureFlags.map((flag) => (
            <MenuItem key={flag} className={styles.menuItem}>
              <Toggle
                id={flag}
                checked={currentFeatureFlags.includes(flag)}
                onValueChange={(newValue) => {
                  if (newValue) {
                    context.channel.emit('updateGlobals', {
                      globals: { featureFlags: [...currentFeatureFlags, flag] },
                    });
                  } else {
                    context.channel.emit('updateGlobals', {
                      globals: {
                        featureFlags: currentFeatureFlags.filter((featureFlag) => featureFlag !== flag),
                      },
                    });
                  }
                }}
              />
              <label htmlFor={flag} className={styles.menuItemLabel}>
                {flag}
              </label>
            </MenuItem>
          ))}
          {allFeatureFlags.length !== 0 && <MenuSeparator />}
          <MenuItem onClick={linkTo('Information/Feature flags')} style={{ cursor: 'pointer' }}>
            <ArrowUiCornerOutUpRightIcon16Light /> Подробнее о фича-флагах
          </MenuItem>
        </DropdownMenu>
      </div>
    </div>
  );
};
