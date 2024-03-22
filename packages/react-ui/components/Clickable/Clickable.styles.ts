import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';

import { ClickableProps } from './Clickable';

export interface GetStylesBase extends Pick<ClickableProps, 'use'> {
  theme: Theme;
}

export const clickableGlobalClasses = prefix('clickable')({
  text: 'text',
});

export const generalStyles = memoizeStyle({
  root(t: Theme) {
    return css`
      all: unset;
      cursor: pointer;

      &:focus-visible {
        /*
          The box-shadow property is not visible in Windows high-contrast themes
          So we need to define transparent outline which will be visible in those themes

          Source: https://stackoverflow.com/a/52616313
        */
        outline: 2px solid transparent;
        box-shadow: 0px 0px 0px 2px ${t.borderColorFocus};
      }
    `;
  },
});
