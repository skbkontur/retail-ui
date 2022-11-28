export const linkMixin = (hoverTextDecoration: string) => {
  return `
    border-radius: 1px;
    outline: none;
    text-decoration: none;

    &:hover {
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

    &:hover {
      text-decoration: none;
    }
  `;
};

export const linkUseColorsMixin = (mainColor: string, hoverColor: string, activeColor: string) => {
  return `
    color: ${mainColor};

    &:hover {
      color: ${hoverColor};
    }

    &:active {
      color: ${activeColor};
    }
  `;
};

export const linkUseLineColorsMixin = (mainColor: string, activeColor: string) => {
  return `
    border-bottom-color: ${mainColor};

    &:active {
      border-bottom-color: ${activeColor};
    }
  `;
};

export const linkUseLineColorsHoverMixin = (hoverColor: string, nestedSelector: string) => {
  return `
    &:hover ${nestedSelector} {
      border-bottom-color: ${hoverColor};
    }
  `;
};
