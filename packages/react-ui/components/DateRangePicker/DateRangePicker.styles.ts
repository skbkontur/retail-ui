import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
    `;
  },

  rootMobile(t: Theme) {
    return css`
    `;
  },
  
  calendarWrapper(t: Theme) {
    return css`
      background: ${t.pickerBg};
      box-shadow: ${t.pickerShadow};
      display: inline-block;
      font-size: 0;
      z-index: 1000;
      touch-action: none;
      border-radius: ${t.pickerBorderRadius};
    `;
  },
  period() {
    return css`
    background: rgb(230,230,230);

    &:hover:before {
      content: '';
      opacity: 1;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      z-index: -1;
    }

    /* TODO new selector */
    &:hover {
      background: rgb(230,230,230);
    }
    
    &:before {
      background: rgb(240,240,240);
    }
    `
  },

  periodHover() {
    return css`&, &:hover, { background: rgb(240,240,240); }`
  },


  sideDay() {
    return css`
      position:relative;
      z-index: 1;
      color: white;
      border: 0;

      &:before {
        content: '';
        opacity: 1;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #3d3d3d;
        z-index: -1;
      }`
  },

  


});
