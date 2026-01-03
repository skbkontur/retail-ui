export const linkDisabledMixin = (): string => {
  return `
    box-shadow: none;
    cursor: default;
  `;
};

export const linkUseColorsMixin = (mainColor: string, hoverColor: string, activeColor: string): string => {
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
