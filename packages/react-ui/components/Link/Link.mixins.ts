import { active, hover, focus } from '../../internal/FakeUserActions/Selectors';

export const linkMixin = (hoverTextDecoration: string) => {
  return `
    border-radius: 1px;
    outline: none;
    text-decoration: none;

    &:hover,
    ${hover`&`},
    ${focus`&`},
    ${active`&`} {
      text-decoration: ${hoverTextDecoration};
    }
  `;
};

export const linkDisabledMixin = () => {
  return `
    box-shadow: none;
    cursor: default;
    pointer-events: none;
    text-decoration: none;

      &:hover,
      ${hover`&`} {
        text-decoration: none;
      }
  `;
};

export const linkUseColorsMixin = (mainColor: string, hoverColor: string, activeColor: string) => {
  return `
    color: ${mainColor};

    &:hover,
    ${hover`&`},
    ${focus`&`} {
      color: ${hoverColor};
    }

    &:active,
    ${active`&`} {
      color: ${activeColor};
    }
  `;
};

export const linkUseLineColorsMixin = (
  mainColor: string,
  hoverColor: string,
  activeColor: string,
  textClassName: string,
) => {
  return `

    & .${textClassName}:before {
      border-bottom-color: ${mainColor};
    }

    &:hover,
    &:focus,
    ${hover`&`}, ${focus`&`} {
      .${textClassName}:before {
        border-bottom-color: ${hoverColor};
      }
    }

    &:active,
    ${active`&`} {
      .${textClassName}:before {
        border-bottom-color: ${activeColor};
      }
    }
  `;
};
