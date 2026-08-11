import { type Emotion } from '@emotion/css/create-instance';
import { getColors } from '@skbkontur/colors/get-colors';
import { IconArrowUiCornerOutUpRightLight16 } from '@skbkontur/icons/IconArrowUiCornerOutUpRightLight16';
import { IconWeatherMoonLight16 } from '@skbkontur/icons/IconWeatherMoonLight16';
import { IconWeatherSunLight16 } from '@skbkontur/icons/IconWeatherSunLight16';
import { IconWeatherSunMoonLight16 } from '@skbkontur/icons/IconWeatherSunMoonLight16';
import { DropdownMenu } from '@skbkontur/react-ui/components/DropdownMenu/DropdownMenu';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem/MenuItem';
import { MenuSeparator } from '@skbkontur/react-ui/components/MenuSeparator/MenuSeparator';
import { useStyles } from '@skbkontur/react-ui/lib/renderEnvironment/index';
import { DocsContext } from '@storybook/blocks';
import type { ModuleExports } from '@storybook/types';
import React, { useContext, useEffect } from 'react';

import * as DEFAULT_SWATCH from '../../colors/lib/consts/default-swatch.js';

let styles = '';
for (let brand in DEFAULT_SWATCH.brand) {
  const theme = 'all';
  const output = 'css';
  styles += getColors({ brand, accent: 'brand', theme, output });
  styles += getColors({ brand, accent: 'gray', theme, output });
}
const style = document.createElement('style');
style.innerHTML = styles;
document.head.appendChild(style);

const themes = [
  { icon: <IconWeatherSunLight16 />, caption: 'Light', value: 'LIGHT_THEME' },
  { icon: <IconWeatherMoonLight16 />, caption: 'Dark', value: 'DARK_THEME' },
];
const getStyles = ({ css }: Emotion) => ({
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
    z-index: 11;
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
  menuCountry: css`
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
});

export const Meta = ({ of }: { of?: ModuleExports }) => {
  const context = useContext(DocsContext);
  const styles = useStyles(getStyles);

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
          }, 2000);
        }
      }
    } catch {
      // pass
    }
  });

  const currentTheme = themes.find(
    //@ts-expect-error: store is not public
    (theme) => theme.value === context.store.userGlobals.globals.theme,
  );

  return (
    <div className={styles.menuWrap}>
      <div className={styles.menu}>
        <DropdownMenu
          caption={
            <div className={styles.menuSelect}>
              <IconWeatherSunMoonLight16 /> {currentTheme ? currentTheme.caption : themes[0].caption}
            </div>
          }
        >
          {themes.map(({ icon, caption, value }) => (
            <MenuItem
              key={caption}
              className={styles.menuItem}
              comment={<div className={styles.menuComment}>{value}</div>}
              onClick={() => context.channel.emit('updateGlobals', { globals: { theme: value } })}
            >
              {caption}
              <div className={styles.menuIcon}>{icon}</div>
            </MenuItem>
          ))}

          <MenuSeparator />
          <MenuItem
            href={`https://ui.gitlab-pages.kontur.host/storybook-documentation/?path=/docs/react_ui_information-theme-themecontext--themecontext`}
            style={{ cursor: 'pointer' }}
          >
            <IconArrowUiCornerOutUpRightLight16 /> Подробнее о темах
          </MenuItem>
        </DropdownMenu>
      </div>
    </div>
  );
};
