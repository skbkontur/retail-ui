import { css } from '../../lib/theming/Emotion';

export const buttonUseMixin = (
  btnBackground: string,
  btnBackgroundStart: string,
  btnBackgroundEnd: string,
  color: string,
  borderColor: string,
  borderBottomColor: string,
  borderWidth: string,
  selectorChecked: string,
  selectorArrow: string,
) => {
  const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
  return css`
    background-color: ${hasGradient ? `initial` : btnBackground};
    background-image: ${hasGradient ? `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})` : `none`};
    color: ${color};
    border-color: ${borderColor};
    border-bottom-color: ${borderBottomColor};

    &:not(${selectorChecked}) ${selectorArrow} {
      box-shadow: ${borderWidth} 0 0 0 ${borderColor};
    }
  `;
};

export const buttonHoverMixin = (
  btnBackground: string,
  btnBackgroundStart: string,
  btnBackgroundEnd: string,
  borderColor: string,
  borderBottomColor: string,
  borderWidth: string,
  selectorArrow: string,
) => {
  const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
  return css`
    &:hover {
      background-color: ${hasGradient ? `initial` : btnBackground};
      background-image: ${hasGradient ? `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})` : `none`};
      border-color: ${borderColor};
      border-bottom-color: ${borderBottomColor};

      ${selectorArrow} {
        box-shadow: ${borderWidth} 0 0 ${borderColor};
      }
    }
  `;
};

export const buttonActiveMixin = (
  btnBackground: string,
  btnShadow: string,
  borderColor: string,
  borderTopColor: string,
  borderWidth: string,
  selectorActive: string,
  selectorArrow: string,
  selectorArrowTop: string,
  arrowBgImage: string,
) => {
  return css`
    &:active,
    &${selectorActive} {
      background-image: none;
      background-color: ${btnBackground};
      box-shadow: ${btnShadow};
      border-color: ${borderColor};
      border-top-color: ${borderTopColor};

      ${selectorArrow} {
        box-shadow: ${borderWidth} 0 0 ${borderColor};

        &${selectorArrowTop} {
          background-image: ${arrowBgImage} !important;
        }
      }
    }
  `;
};

export const buttonSizeMixin = (
  fontSize: string,
  height: string, // todo: remove, in IE broke screenshots without height
  lineHeight: string,
  paddingX: string,
  paddingY: string,
  selectorLink: string,
) => {
  return css`
    font-size: ${fontSize} !important;

    &:not(${selectorLink}) {
      box-sizing: border-box;
      height: ${height};
      padding: ${paddingY} ${paddingX};
      line-height: ${lineHeight};
    }
  `;
};

export const arrowOutlineMixin = (
  insetWidth: string,
  outlineColor: string,
  outlineWidth: string,
  insetColor: string,
  selectorArrow: string,
  selectorArrowTop: string,
  selectorArrowBottom: string,
) => {
  return css`
    ${selectorArrow} {
      &${selectorArrowTop} {
        box-shadow: inset -${insetWidth} ${insetWidth} 0 0 ${insetColor}, ${outlineWidth} 0 0 0 ${outlineColor} !important;
      }

      &${selectorArrowBottom} {
        box-shadow: inset -${insetWidth} -${insetWidth} 0 0 ${insetColor}, ${outlineWidth} 0 0 0 ${outlineColor} !important;
      }

      // don't hide inner outline
      // and keep the middle-line fix
      &:before {
        top: ${insetWidth};
        right: ${insetWidth};
        left: ${insetWidth};
      }
      &${selectorArrowBottom}:before {
        bottom: ${insetWidth};
      }
    }
  `;
};
