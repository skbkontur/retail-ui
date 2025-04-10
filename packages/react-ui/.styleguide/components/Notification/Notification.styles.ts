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
      gap: 16px;
      align-items: flex-start;
      box-sizing: border-box;
      width: 100%;
      margin: 0 auto;
      padding: 12px 24px;
      background: #3d3d3d;
      color: white;
      font-size: 16px;
      line-height: 1.375;
      text-decoration: none;
      transition: 0.15s ease;

      &:hover {
        background: #292929;
      }

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
        font-weight: 400;
        white-space: nowrap;
      }
    `;
  },
  notificationLink() {
    return css`
      color: white;
      text-decoration: underline;
      text-underline-offset: 1.5px;
      white-space: nowrap;
      text-decoration-color: #e6e6e6;
      transition: 0.15s ease;
      cursor: pointer;

      &:hover {
        text-decoration-color: white;
      }
    `;
  },
});
