import { DocsContext } from '@storybook/blocks';
import type { ModuleExports } from '@storybook/types';
import React, { useContext, useEffect } from 'react';
import { FlagAIcon16Light } from '@skbkontur/icons/icons/FlagAIcon/FlagAIcon16Light';
import { LocationGlobeIcon16Light } from '@skbkontur/icons/icons/LocationGlobeIcon/LocationGlobeIcon16Light';
import { WeatherMoonIcon16Light } from '@skbkontur/icons/icons/WeatherMoonIcon/WeatherMoonIcon16Light';
import { WeatherSunIcon16Light } from '@skbkontur/icons/icons/WeatherSunIcon/WeatherSunIcon16Light';
import { WeatherSunMoonIcon16Light } from '@skbkontur/icons/icons/WeatherSunMoonIcon/WeatherSunMoonIcon16Light';
import { ArrowUiCornerOutUpRightIcon16Light } from '@skbkontur/icons/icons/ArrowUiCornerOutUpRightIcon/ArrowUiCornerOutUpRightIcon16Light';

import { DropdownMenu } from '../components/DropdownMenu';
import { MenuItem } from '../components/MenuItem';
import { Toggle } from '../components/Toggle';
import { css } from '../lib/theming/Emotion';
import { reactUIFeatureFlagsDefault } from '../lib/featureFlagsContext';
import { MenuSeparator } from '../components/MenuSeparator';

import { getCurrentVersion, VersionsLibrary } from './VersionsDropdown/Versions';

const urlPath = window.location.origin + window.location.pathname.replace('/iframe.html', '');

const languages = [
  { icon: '🇷🇺', caption: 'Russian', value: 'ru' },
  { icon: '🇬🇧', caption: 'English', value: 'en' },
];
const themes = [
  { icon: <WeatherSunIcon16Light />, caption: 'Light', value: 'LIGHT_THEME' },
  { icon: <WeatherMoonIcon16Light />, caption: 'Dark', value: 'DARK_THEME' },
];
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

    &:hover {
      background: rgba(0, 0, 0, 0.06);
    }

    &:active {
      background: rgba(0, 0, 0, 0.1);
    }
  `,
  menuItem: css`
    min-width: 250px !important;
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
  menuContuer: css`
    display: inline-block;
    background: #3d3d3d;
    font-size: 10px !important;
    color: white;
    position: relative;
    top: -0.5px;
    margin-left: 4px !important;
    vertical-align: middle;
    border-radius: 50%;
    line-height: 11px;
    padding: 2px 4px 1px;
    font-weight: 600;
  `,
};

let storyKeyCache = '';

export const Meta = ({ of }: { of: ModuleExports }) => {
  const context = useContext(DocsContext);

  const key = of.default.title;
  if (storyKeyCache !== key && of) {
    context.referenceMeta(of, true); // todo разобраться почему если делать несколько раз attach -- дублируются истории на странице
    storyKeyCache = key;
  }

  useEffect(
    () => () => {
      storyKeyCache = '';
    },
    [],
  );
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
  const currentTheme = themes.find((theme) => theme.value === context.store.globals.globals.theme);
  //@ts-expect-error: store is not public
  const currentLocale = languages.find((language) => language.value === context.store.globals.globals.locale);
  //@ts-expect-error: store is not public
  const currentFeatureFlags: string[] = context.store.globals.globals.featureFlags;

  return (
    <div className={styles.menuWrap}>
      <div className={styles.menu}>
        <DropdownMenu
          caption={
            <div className={styles.menuSelect}>
              <WeatherSunMoonIcon16Light /> {currentTheme ? currentTheme.caption : themes[0].caption}
            </div>
          }
        >
          {themes.map(({ icon, caption, value }) => (
            <MenuItem
              className={styles.menuItem}
              comment={<div className={styles.menuComment}>{value}</div>}
              onClick={() => context.channel.emit('updateGlobals', { globals: { theme: value } })}
            >
              {caption}
              <div className={styles.menuIcon}>{icon}</div>
            </MenuItem>
          ))}

          <MenuSeparator />
          <MenuItem href={`${urlPath}/?path=/docs/react_ui_information-theme--docs`} style={{ cursor: 'pointer' }}>
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
          {languages.map(({ icon, caption, value }) => (
            <MenuItem
              className={styles.menuItem}
              comment={<div className={styles.menuComment}>{value}</div>}
              onClick={() => context.channel.emit('updateGlobals', { globals: { locale: value } })}
            >
              {caption}
              <div className={styles.menuIcon}>{icon}</div>
            </MenuItem>
          ))}
          <MenuSeparator />
          <MenuItem href={`${urlPath}/?path=/docs/react_ui_information-locale--docs`} style={{ cursor: 'pointer' }}>
            <ArrowUiCornerOutUpRightIcon16Light /> Подробнее о локализации
          </MenuItem>
        </DropdownMenu>
        <DropdownMenu
          caption={
            <div className={styles.menuSelect}>
              <FlagAIcon16Light /> Feature flags{' '}
              {currentFeatureFlags.length !== 0 && (
                <span className={styles.menuContuer}>{currentFeatureFlags.length}</span>
              )}
            </div>
          }
        >
          {allFeatureFlags.map((flag) => (
            <MenuItem className={styles.menuItem}>
              <Toggle
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
              >
                {flag}
              </Toggle>
            </MenuItem>
          ))}
          {allFeatureFlags.length !== 0 && <MenuSeparator />}
          <MenuItem
            href={`${urlPath}/?path=/docs/react_ui_information-feature-flags--docs`}
            style={{ cursor: 'pointer' }}
          >
            <ArrowUiCornerOutUpRightIcon16Light /> Подробнее о фича-флагах
          </MenuItem>
        </DropdownMenu>

        <DropdownMenu
          style={{ marginLeft: 'auto', marginRight: '16px' }}
          caption={<div className={styles.menuSelect}>v {getCurrentVersion()}</div>}
          menuMaxHeight="315px"
          menuWidth="150px"
          positions={['bottom right']}
        >
          <VersionsLibrary />
        </DropdownMenu>
      </div>
    </div>
  );
};
