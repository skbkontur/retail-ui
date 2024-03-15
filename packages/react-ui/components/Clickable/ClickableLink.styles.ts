import { Theme } from '../../lib/theming/Theme';
import { css, cx, memoizeStyle } from '../../lib/theming/Emotion';
import { isDarkTheme } from '../../lib/theming/ThemeHelpers';
import { linkDisabledMixin, linkUseColorsMixin, linkUseLineHovered } from '../Link/Link.mixins';

import { GetStylesBase, clickableGlobalClasses } from './Clickable.styles';

export const linkStyles = memoizeStyle({
  linkRoot() {
    return css`
      border-radius: 1px;
      outline: none;
      text-decoration: none;
      &:hover .${clickableGlobalClasses.text} {
        border-bottom-color: currentColor !important;
      }
      border-bottom-color: currentColor;
    `;
  },

  linkDefault(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkColor, t.linkHoverColor, t.linkActiveColor)};
      .${clickableGlobalClasses.text} {
        :hover {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      }
    `;
  },
  linkSuccess(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkSuccessColor, t.linkSuccessHoverColor, t.linkSuccessActiveColor)};
      .${clickableGlobalClasses.text} {
        :hover {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      }
    `;
  },
  linkDanger(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkDangerColor, t.linkDangerHoverColor, t.linkDangerActiveColor)};
      .${clickableGlobalClasses.text} {
        :hover {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      }
    `;
  },
  linkGrayed(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkGrayedColor, t.linkGrayedHoverColor, t.linkGrayedActiveColor)};
      .${clickableGlobalClasses.text} {
        :hover {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      }
    `;
  },

  linkDisabled(t: Theme) {
    return css`
      ${linkDisabledMixin()};

      color: ${t.linkDisabledColor} !important; // override root color

      &:hover {
        color: ${t.linkDisabledColor};
      }
    `;
  },
  linkDisabledDark(t: Theme) {
    return css`
      .${clickableGlobalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },

  linkLineFocus(t: Theme) {
    return css`
      color: ${t.linkHoverColor};
      .${clickableGlobalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },
  linkLineFocusSuccess(t: Theme) {
    return css`
      color: ${t.linkSuccessHoverColor} !important;
      .${clickableGlobalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },
  linkLineFocusDanger(t: Theme) {
    return css`
      color: ${t.linkDangerHoverColor} !important;
      .${clickableGlobalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },
  linkLineFocusGrayed(t: Theme) {
    return css`
      color: ${t.linkGrayedHoverColor} !important;
      .${clickableGlobalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },
});

interface GetLinkStylesArgs extends GetStylesBase {
  focused: boolean;
  isNotInteractive: boolean;
}

export const getLinkStyles = ({ use, focused, isNotInteractive, theme }: GetLinkStylesArgs) => {
  return cx({
    [linkStyles.linkRoot()]: true,
    [linkStyles.linkDefault(theme)]: use === 'default' || use === undefined,
    [linkStyles.linkSuccess(theme)]: use === 'success',
    [linkStyles.linkDanger(theme)]: use === 'danger',
    [linkStyles.linkGrayed(theme)]: use === 'grayed',
    [linkStyles.linkLineFocus(theme)]: use === 'default' && focused,
    [linkStyles.linkLineFocusSuccess(theme)]: use === 'success' && focused,
    [linkStyles.linkLineFocusDanger(theme)]: use === 'danger' && focused,
    [linkStyles.linkLineFocusGrayed(theme)]: focused && use === 'grayed',
    [linkStyles.linkDisabled(theme)]: isNotInteractive,
    [linkStyles.linkDisabledDark(theme)]: isNotInteractive && isDarkTheme(theme),
  });
};
