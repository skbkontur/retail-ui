import { css } from '../../lib/theming/Emotion';
import ColorFunctions from '../../lib/styles/ColorFunctions';
import { ITheme } from '../../lib/theming/Theme';

const jsTokenColors = {
  defaultIdle(t: ITheme) {
    return css`
      background-color: ${t.grayXLight};
      color: ${ColorFunctions.contrast(t.grayXLight)};
      border: 1px solid ${ColorFunctions.darken(t.grayXLight, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.grayXLight)};
      }
    `;
  },

  defaultActive(t: ITheme) {
    return css`
      background-color: ${t.brand};
      color: ${ColorFunctions.contrast(t.brand)};
      border: 1px solid ${ColorFunctions.darken(t.brand, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.brand)};
      }
    `;
  },

  grayIdle(t: ITheme) {
    return css`
      background-color: ${t.grayXLight};
      color: ${ColorFunctions.contrast(t.grayXLight)};
      border: 1px solid ${ColorFunctions.darken(t.grayXLight, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.grayXLight)};
      }
    `;
  },

  grayActive(t: ITheme) {
    return css`
      background-color: ${t.grayDark};
      color: ${ColorFunctions.contrast(t.grayDark)};
      border: 1px solid ${ColorFunctions.darken(t.grayDark, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.grayDark)};
      }
    `;
  },

  blueIdle(t: ITheme) {
    return css`
      background-color: ${t.blueLight};
      color: ${ColorFunctions.contrast(t.blueLight)};
      border: 1px solid ${ColorFunctions.darken(t.blueLight, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.blueLight)};
      }
    `;
  },

  blueActive(t: ITheme) {
    return css`
      background-color: ${t.blueDark};
      color: ${ColorFunctions.contrast(t.blueDark)};
      border: 1px solid ${ColorFunctions.darken(t.blueDark, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.blueDark)};
      }
    `;
  },

  greenIdle(t: ITheme) {
    return css`
      background-color: ${t.greenXxLight};
      color: ${ColorFunctions.contrast(t.greenXxLight)};
      border: 1px solid ${ColorFunctions.darken(t.greenXxLight, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.greenXxLight)};
      }
    `;
  },

  greenActive(t: ITheme) {
    return css`
      background-color: ${t.greenDark};
      color: ${ColorFunctions.contrast(t.greenDark)};
      border: 1px solid ${ColorFunctions.darken(t.greenDark, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.greenDark)};
      }
    `;
  },

  yellowIdle(t: ITheme) {
    return css`
      background-color: ${t.yellowXxLight};
      color: ${ColorFunctions.contrast(t.yellowXxLight)};
      border: 1px solid ${ColorFunctions.darken(t.yellowXxLight, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.yellowXxLight)};
      }
    `;
  },

  yellowActive(t: ITheme) {
    return css`
      background-color: ${t.yellowDark};
      color: ${ColorFunctions.contrast(t.yellowDark)};
      border: 1px solid ${ColorFunctions.darken(t.yellowDark, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.yellowDark)};
      }
    `;
  },

  redIdle(t: ITheme) {
    return css`
      background-color: ${t.redXxLight};
      color: ${ColorFunctions.contrast(t.redXxLight)};
      border: 1px solid ${ColorFunctions.darken(t.redXxLight, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.redXxLight)};
      }
    `;
  },

  redActive(t: ITheme) {
    return css`
      background-color: ${t.redDark};
      color: ${ColorFunctions.contrast(t.redDark)};
      border: 1px solid ${ColorFunctions.darken(t.redDark, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.redDark)};
      }
    `;
  },

  white(t: ITheme) {
    return css`
      background-color: ${t.white};
      color: ${ColorFunctions.contrast(t.white)};
      border: 1px solid ${ColorFunctions.darken(t.white, '5%')};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.white)};
      }
    `;
  },

  black(t: ITheme) {
    return css`
      background-color: ${t.black};
      color: ${ColorFunctions.contrast(t.black)};
      border: 1px solid ${t.black};

      & [data-name='RemoveIcon']:hover {
        color: ${ColorFunctions.contrast(t.black)};
      }
    `;
  },
};

export default jsTokenColors;
