export const linkMixin = () => {
  return `
    border-radius: 1px;
    outline: none;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `;
};

export const linkDisabledMixin = () => {
  return `
    box-shadow: none;
    cursor: default;
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
