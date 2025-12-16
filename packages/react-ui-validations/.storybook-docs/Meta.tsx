import { DocsContext } from '@storybook/blocks';
import type { ModuleExports } from '@storybook/types';
import React, { useContext, useEffect } from 'react';
import { FlagAIcon16Light } from '@skbkontur/icons/icons/FlagAIcon/FlagAIcon16Light';
import { WeatherMoonIcon16Light } from '@skbkontur/icons/icons/WeatherMoonIcon/WeatherMoonIcon16Light';
import { WeatherSunIcon16Light } from '@skbkontur/icons/icons/WeatherSunIcon/WeatherSunIcon16Light';
import { WeatherSunMoonIcon16Light } from '@skbkontur/icons/icons/WeatherSunMoonIcon/WeatherSunMoonIcon16Light';
import { ArrowUiCornerOutUpRightIcon16Light } from '@skbkontur/icons/icons/ArrowUiCornerOutUpRightIcon/ArrowUiCornerOutUpRightIcon16Light';
import { DropdownMenu } from '@skbkontur/react-ui/components/DropdownMenu';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';
import { MenuSeparator } from '@skbkontur/react-ui/components/MenuSeparator';
import { MenuHeader } from '@skbkontur/react-ui/components/MenuHeader';
import { MenuFooter } from '@skbkontur/react-ui/components/MenuFooter';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';
import { css } from '@skbkontur/react-ui/lib/theming/Emotion';
import { linkTo } from '@storybook/addon-links';

import { validationsFeatureFlagsDefault } from '../src';

const themes = [
  { icon: <WeatherSunIcon16Light />, caption: 'Light', value: 'LIGHT_THEME' },
  { icon: <WeatherMoonIcon16Light />, caption: 'Dark', value: 'DARK_THEME' },
];
const allFeatureFlags = Object.keys(validationsFeatureFlagsDefault);
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

export const Meta = ({ of }: { of?: ModuleExports }) => {
  const context = useContext(DocsContext);

  if (of && !context.componentStories().some((x) => x.title === of.default.title)) {
    context.referenceMeta(of, true); // todo разобраться почему если делать несколько раз attach -- дублируются истории на странице
  }

  useEffect(() => {
    let url;
    try {
      url = new URL(window.parent.location.toString());
      if (url.hash) {
        const element = document.getElementById(decodeURIComponent(url.hash.substring(1)));
        if (element) {
          // Introducing a delay to ensure scrolling works when it's a full refresh.
          window.setTimeout(() => {
            const yOffset = -65; // custom toolbar height + padding
            const top = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top, behavior: 'smooth' });
          }, 1000);
        }
      }
    } catch (err) {
      // pass
    }
  });

  //@ts-expect-error: store is not public
  const currentTheme = themes.find((theme) => theme.value === context.store.userGlobals.globals.theme);
  //@ts-expect-error: store is not public
  const currentFeatureFlags: string[] = context.store.userGlobals.globals.validationsFeatureFlags;

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
          <MenuHeader>Темы React UI</MenuHeader>
          {themes.map(({ icon, caption, value }) => (
            <MenuItem
              key={value}
              className={styles.menuItem}
              comment={<div className={styles.menuComment}>{value}</div>}
              onClick={() => context.channel.emit('updateGlobals', { globals: { theme: value } })}
            >
              {caption}
              {icon && <div className={styles.menuIcon}>{icon}</div>}
            </MenuItem>
          ))}
          <MenuSeparator />
          <MenuFooter>Подробнее в React UI/Information/Theme</MenuFooter>
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
                      globals: { validationsFeatureFlags: [...currentFeatureFlags, flag] },
                    });
                  } else {
                    context.channel.emit('updateGlobals', {
                      globals: {
                        validationsFeatureFlags: currentFeatureFlags.filter((featureFlag) => featureFlag !== flag),
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
          <MenuItem onClick={linkTo('Displaying/Feature flags')} style={{ cursor: 'pointer' }}>
            <ArrowUiCornerOutUpRightIcon16Light /> Подробнее о фича-флагах
          </MenuItem>
        </DropdownMenu>
      </div>
    </div>
  );
};
