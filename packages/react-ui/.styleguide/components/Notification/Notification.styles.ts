import { css, memoizeStyle } from '../../../lib/theming/Emotion';

export const styles = memoizeStyle({
  notification() {
    return css`
      position: sticky;
      z-index: 2;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
      box-sizing: border-box;
      width: 100%;
      margin: 0 auto;
      padding: 16px 24px;
      background: #ff4785;
      color: white;
      font-size: 16px;
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

      a {
        color: white;
      }
    `;
  },
  notificationButton() {
    return css`
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 8px 16px;
      border-radius: 6px;
      background: #fff;
      opacity: .955;
      color: #222222;
      font-size: 16px;
      font-family: inherit;
      text-decoration: none;
      transition: .15s ease;

      @media (hover) {
        &:hover {
          opacity: 1;
        }
      }

      &:active {
        opacity: .92;
      }
    `;
  }
});
