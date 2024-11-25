import { DocsContext } from '@storybook/blocks';
import type { ModuleExports } from '@storybook/types';
import React, { useContext } from 'react';
import { FlagAIcon16Light } from '@skbkontur/icons/icons/FlagAIcon/FlagAIcon16Light';
import { WeatherMoonIcon16Light } from '@skbkontur/icons/icons/WeatherMoonIcon/WeatherMoonIcon16Light';
import { WeatherSunIcon16Light } from '@skbkontur/icons/icons/WeatherSunIcon/WeatherSunIcon16Light';
import { WeatherSunMoonIcon16Light } from '@skbkontur/icons/icons/WeatherSunMoonIcon/WeatherSunMoonIcon16Light';
import { DropdownMenu } from '@skbkontur/react-ui/components/DropdownMenu';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';
import { css } from '@skbkontur/react-ui/lib/theming/Emotion';

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
    padding: 4px 16px;
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
  menuComment: css`
    position: relative;
    font-size: 10px;
    margin-top: -4px;
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

export const Meta = ({ of }: { of: ModuleExports }) => {
  const context = useContext(DocsContext);

  if (of) {
    context.referenceMeta(of, true);
  }

  //@ts-expect-error: store is not public
  const currentTheme = themes.find((theme) => theme.value === context.store.globals.globals.theme);
  //@ts-expect-error: store is not public
  const currentFeatureFlags: string[] = context.store.globals.globals.validationsFeatureFlags;

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
              comment={<div className={styles.menuComment}>{value}</div>}
              onClick={() => context.channel.emit('updateGlobals', { globals: { theme: value } })}
            >
              <div style={{ minWidth: 150 }}>
                {caption} <div className={styles.menuIcon}>{icon}</div>
              </div>
            </MenuItem>
          ))}
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
            <MenuItem /*onClick={(e) => e.preventDefault()}*/>
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
        </DropdownMenu>
      </div>
    </div>
  );
};
