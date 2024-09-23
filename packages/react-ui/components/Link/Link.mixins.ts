export const linkDisabledMixin = () => {
  return `
    box-shadow: none;
    cursor: default;
    pointer-events: none;
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
