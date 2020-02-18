import { css, cssName } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: Theme) {
    return css`
      height: 100%;
      position: fixed;
      right: 0;
      top: 0;
    `;
  },

  body() {
    return css`
      height: 100%;
      z-index: 0;
    `;
  },

  bodyContainer() {
    return css`
      padding-left: 30px;
      padding-right: 35px;
    `;
  },

  container(t: Theme) {
    return css`
      background: ${t.bgDefault};
      float: right;
      height: 100%;
      overflow-y: auto;
      position: relative;
      white-space: normal;
    `;
  },

  layout(t: Theme) {
    return css`
      align-items: stretch;
      display: flex;
      flex-direction: column;
    `;
  },

  header(t: Theme) {
    return css`
      font-size: 22px;
      line-height: 30px;
      padding: 25px 0;
      position: relative;
      width: 100%;
    `;
  },

  headerFixed(t: Theme) {
    return css`
      background: ${t.bgDefault};
      box-shadow: 0 1px ${t.borderColorGrayLight};
      font-size: 18px;
      line-height: 24px;
      padding: 13px 0;
    `;
  },

  title(t: Theme) {
    return css`
      padding-right: 85px;
      padding-left: 30px;
    `;
  },

  titleFixed(t: Theme) {
    return css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
  },

  background(t: Theme) {
    return css`
      height: 100%;
      position: absolute;
      width: 100%;
    `;
  },

  backgroundGray(t: Theme) {
    return css`
      background: #333;
      opacity: 0.6;
    `;
  },

  shadow(t: Theme) {
    return css`
      ${cssName(jsStyles.container(t))}& {
        box-shadow: ${t.sidePageContainerShadow};
      }
    `;
  },

  leftSide(t: Theme) {
    return css`
      left: 0;
      right: auto;

      & ${cssName(jsStyles.container(t))} {
        float: left;
      }
    `;
  },

  close(t: Theme) {
    return css`
      color: ${t.sidePageCloseButtonColor};
      cursor: pointer;
      position: absolute;
      right: 30px;
      text-align: center;
      text-decoration: none;
      width: 24px;

      ${cssName(jsStyles.fixed(t))}& {
        line-height: 24px;
      }

      &:hover {
        color: ${t.sidePageCloseButtonHoverColor};
      }
    `;
  },

  panel(t: Theme) {
    return css`
      background: ${t.sidePageFooterPanelBg} !important;
      border-top: 0 !important;
    `;
  },

  closeIcon(t: Theme) {
    return css`
      display: inline-block;
      height: 12px;
      line-height: 0;
      width: 12px;
    `;
  },

  fixed(t: Theme) {
    return css`
      line-height: 24px;
    `;
  },

  footer(t: Theme) {
    return css`
      bottom: 0;
      position: fixed;
      z-index: 10;
    `;
  },

  footerContent(t: Theme) {
    return css`
      padding: 20px 35px 20px 30px;
    `;
  },

  footerFixed(t: Theme) {
    return css`
      background: ${t.bgDefault};
      border-top: 1px solid ${t.borderColorGrayLight};
    `;
  },

  transition(t: Theme) {
    return css`
      opacity: 0.01;
    `;
  },

  transitionEnter(t: Theme) {
    return css`
      ${jsStyles.transition(t)}
    `;
  },

  transitionEnterLeft(t: Theme) {
    return css`
      transform: translateX(100px);
    `;
  },

  transitionEnterRight(t: Theme) {
    return css`
      transform: translateX(-100px);
    `;
  },

  transitionEnterActive(t: Theme) {
    return css`
      ${jsStyles.transitionActive(t)}
    `;
  },

  transitionAppear(t: Theme) {
    return css`
      ${jsStyles.transition(t)}
    `;
  },

  transitionAppearLeft(t: Theme) {
    return css`
      transform: translateX(100px);
    `;
  },

  transitionAppearRight(t: Theme) {
    return css`
      transform: translateX(100px);
    `;
  },

  transitionActive(t: Theme) {
    return css`
      transition: transform 0.18s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.18s cubic-bezier(0.22, 0.61, 0.36, 1);
      opacity: 1;
      transform: translate(0, 0);
    `;
  },

  transitionAppearActive(t: Theme) {
    return css`
      ${jsStyles.transitionActive(t)}
    `;
  },

  transitionLeave(t: Theme) {
    return css`
      opacity: 1;
    `;
  },

  transitionLeaveActive(t: Theme) {
    return css`
      opacity: 0.01;
      transition: opacity 0.15s ease-out;
    `;
  },
};
