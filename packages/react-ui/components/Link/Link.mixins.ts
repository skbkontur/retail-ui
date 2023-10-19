export const linkMixin = (hoverTextDecoration: string) => {
  return `
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

export const linkUseLineHovered = (linkLineHoverBorderBottomStyle: string) => {
  return `
    animation: none !important;
    border-bottom-style: ${linkLineHoverBorderBottomStyle};
  `;
};
