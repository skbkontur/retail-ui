import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';

export const globalClasses = prefix('clickable')({
  root: 'root',
  arrowHelper: 'arrow-helper',
  arrowHelperTop: 'arrow-helper-top',
  arrowHelperBottom: 'arrow-helper-bottom',
  arrow: 'arrow',
  caption: 'caption',
  innerShadow: 'inner-shadow',
  icon: 'icon',
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
