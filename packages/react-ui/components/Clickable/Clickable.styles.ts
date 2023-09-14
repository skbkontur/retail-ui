import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const clickableStyles = memoizeStyle({
  root() {
    return css`
      all: unset;
      cursor: pointer;

      &:focus-visible {
        /*
          The box-shadow property is not visible in Windows high-contrast themes
          So we need to define transparent outline which will be visible in those themes

          Source: https://stackoverflow.com/a/52616313
        */
        outline: 2px solid transparent;
        box-shadow: 0px 0px 0px 2px #ebebeb;
      }
    `;
  },
  baseButton() {
    return css`
      transition: background-color 100ms cubic-bezier(0.5, 1, 0.89, 1);
      background-clip: padding-box;
    `;
  },
  buttonDefault() {
    return css`
      .defaultDarkTheme & {
        background-color: green;
      }
    `;
  },
  buttonPrimary() {
    return css``;
  },
  buttonSuccess() {
    return css``;
  },
  buttonDanger() {
    return css``;
  },
  buttonPay() {
    return css``;
  },
  buttonText() {
    return css``;
  },
  buttonBackless() {
    return css``;
  },
  baseLink() {
    return css``;
  },
  linkDefault() {
    return css``;
  },
  linkSuccess() {
    return css``;
  },
  linkDanger() {
    return css``;
  },
  linkGrayed() {
    return css``;
  },
});
