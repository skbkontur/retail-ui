import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { linkDisabledMixin, linkUseColorsMixin, linkUseLineHovered } from '../Link/Link.mixins';

import { globalClasses } from './Clickable.styles';

export const linkStyles = memoizeStyle({
  linkRoot() {
    return css`
      border-radius: 1px;
      outline: none;
      text-decoration: none;
      &:hover .${globalClasses.text} {
        border-bottom-color: currentColor !important;
      }
      border-bottom-color: currentColor;
    `;
  },

  linkDefault(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkColor, t.linkHoverColor, t.linkActiveColor)};
      .${globalClasses.text} {
        :hover {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      }
    `;
  },
  linkSuccess(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkSuccessColor, t.linkSuccessHoverColor, t.linkSuccessActiveColor)};
      .${globalClasses.text} {
        :hover {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      }
    `;
  },
  linkDanger(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkDangerColor, t.linkDangerHoverColor, t.linkDangerActiveColor)};
      .${globalClasses.text} {
        :hover {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      }
    `;
  },
  linkGrayed(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkGrayedColor, t.linkGrayedHoverColor, t.linkGrayedActiveColor)};
      .${globalClasses.text} {
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
      .${globalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },

  linkLineFocus(t: Theme) {
    return css`
      color: ${t.linkHoverColor};
      .${globalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },
  linkLineFocusSuccess(t: Theme) {
    return css`
      color: ${t.linkSuccessHoverColor} !important;
      .${globalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },
  linkLineFocusDanger(t: Theme) {
    return css`
      color: ${t.linkDangerHoverColor} !important;
      .${globalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },
  linkLineFocusGrayed(t: Theme) {
    return css`
      color: ${t.linkGrayedHoverColor} !important;
      .${globalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },
  linkLineTextWrapper(t: Theme) {
    // При hover'е подчеркивание из прозрачного переходит в currentColor.
    // За счет наложения этого цвета на подчеркивание lineText (currentColor с половинной прозрачностью)
    // достигается эффект перехода currentColor с половинной прозрачностью до currentColor.

    // Планировалось добавить transition и color-mix(in srgb, currentColor 50%, transparent) в lineText.
    // Однако, в chrome и edge сочетание transition, color-mix и currentColor вызывает моргание при transition.
    return css`
      @supports (border-bottom-color: ${t.linkLineBorderBottomColor}) {
        transition: border-bottom-color ${t.transitionDuration} ${t.transitionTimingFunction};
        border-bottom-style: ${t.linkLineBorderBottomStyle};
        border-bottom-width: ${t.linkLineBorderBottomWidth};
        border-bottom-color: transparent;
      }
    `;
  },
  linkLineTextWrapperFocused(t: Theme) {
    return css`
      @supports (border-bottom-color: ${t.linkLineBorderBottomColor}) {
        border-bottom-color: currentColor;
      }
    `;
  },
  linkLineText(t: Theme) {
    return css`
      border-bottom-style: ${t.linkLineBorderBottomStyle};
      border-bottom-width: ${t.linkLineBorderBottomWidth};
      border-bottom-color: ${t.linkLineBorderBottomColor};
    `;
  },

  linkIcon(t: Theme) {
    return css`
      display: inline-block;
      margin-right: ${t.linkIconMarginRight};
    `;
  },
});
