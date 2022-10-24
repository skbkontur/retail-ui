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
    ${hover`&`}, ${focus`&`} {
      color: ${hoverColor};
    }

    &:active,
    ${active`&`} {
      color: ${activeColor};
    }
  `;
};

export const linkUseLineColorsMixin = (mainColor: string, hoverColor: string, activeColor: string) => {
  return `
    border-bottom-color: ${mainColor};

    &:hover,
    ${hover`&`}, ${focus`&`}  {
      border-bottom-color: ${hoverColor};
    }

    &:active,
    ${active`&`} {
      border-bottom-color: ${activeColor};
    }
  `;
};
