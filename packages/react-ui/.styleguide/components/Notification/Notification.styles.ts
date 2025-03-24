import { css, memoizeStyle } from '../../../lib/theming/Emotion';

export const styles = memoizeStyle({
  notification() {
    return css`
      position: sticky;
      z-index: 10;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
      box-sizing: border-box;
      width: 100%;
      margin: 0 auto;
      padding: 12px 24px;
      background: #fe4c4c;
      color: white;
      font-size: 16px;
      font-weight: 300;
      line-height: 1.375;

      @media screen and (min-width: 768px) {
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
    `;
  },
  notificationContent() {
    return css`
      max-width: 1080px;

      b {
        font-weight: 500;
      }

      a {
        color: white;
        text-underline-offset: 1.5px;
      }
    `;
  },
  notificationButton() {
    return css`
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 6px 12px;
      border-radius: 6px;
      background: #fff;
      opacity: 0.955;
      color: #222222;
      font-size: 14px;
      font-family: inherit;
      text-decoration: none;
      transition: 0.15s ease;

      @media (hover) {
        &:hover {
          opacity: 1;
        }
      }

      &:active {
        opacity: 0.92;
      }
    `;
  },
});
