import { css, memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

export const styles = memoizeStyle({
  root() {
    return css`
      font-family: 'Lab Grotesque', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-weight: 400;
      font-size: 14px;
      padding-left: 300px;
      background: #fff;
      color: inherit;
      min-height: 100%;

      @media (max-width: 600px) {
        padding-left: 0;
      }

      footer {
        position: fixed;
        top: 0;
        right: 0;
        width: 149px;
        height: 149px;
        z-index: 999;
        a {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          position: relative;
          right: -37px;
          top: -22px;
          display: block;
          width: 190px;
          padding: 4px 0;
          text-align: center;
          color: rgb(255, 255, 255);
          font-size: 15px;
          background: rgb(238, 153, 0) none repeat scroll 0 0;
          text-decoration: none;
          text-shadow: rgba(0, 0, 0, 0.15) 0px -1px 0px;
          transform-origin: 0 0 0;
          transform: rotate(45deg);
          cursor: pointer;
        }
      }
    `;
  },
  darkRoot(t: Theme) {
    return css`
      background: ${t.bgDefault};
      color: ${t.textColorDefault};
    `;
  },
  wrapper() {
    return css`
      padding: 30px 40px;
      margin: 0 auto;
      max-width: 1000px;
      display: block;

      @media (max-width: 600px) {
        padding: 16px;
      }
    `;
  },
  content() {
    return css``;
  },
  darkContent(t: Theme) {
    return css`
      h1,
      h2,
      h3,
      h4,
      p,
      th,
      td,
      strong,
      pre,
      li,
      em {
        color: ${t.textColorDefault};
      }
      code {
        background: #333 !important;
      }
      pre {
        background: #222;
        border: none;
      }
      .npm__react-simple-code-editor__textarea {
        caret-color: ${t.textColorDefault};
        background: #222 !important;
        border-color: #444 !important;
      }
      pre,
      .npm__react-simple-code-editor__textarea {
        .keyword {
          color: #61afef !important;
        }
        .function,
        .function-variable,
        .class-name {
          color: #fb5bc5 !important;
        }
        .string,
        .attr-name,
        .builtin {
          color: #98c379 !important;
        }
        .script,
        .tag,
        .number,
        .constant,
        .boolean {
          color: #e06c75 !important;
        }
        .operator {
          color: #d19a66 !important;
        }
      }
      td {
        code {
          color: #98c379 !important;
        }
      }
      [data-testid='preview-wrapper'] {
        border: 1px solid #444;
      }
    `;
  },
  header() {
    return css`
      padding: 40px 40px 0 !important;
    `;
  },
  sidebar() {
    return css`
      width: 300px;
      background: #41464e;
      font-size: 16px;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      overflow: auto;

      @media (max-width: 600px) {
        position: static;
        width: auto;
      }

      header {
        padding: 40px;
        border-bottom: medium none;
      }
      h1 {
        font-weight: 400;
        color: white;
        font-size: 26px;
        margin: 0;
      }
      p {
        color: #767676;
        margin: 5px 0 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
          'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        font-size: 15px;
        font-weight: normal;
      }
    `;
  },
  footer() {
    return css`
      position: fixed;
      top: 0;
      right: 0;
      width: 149px;
      height: 149px;
      z-index: 999;
    `;
  },
  footerLink() {
    return css`
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
        'Droid Sans', 'Helvetica Neue', sans-serif;
      position: relative;
      right: -37px;
      top: -22px;
      display: block;
      width: 190px;
      padding: 4px 16px;
      text-align: center;
      color: rgb(255, 255, 255);
      font-size: 15px;
      background: rgb(238, 153, 0);
      text-decoration: none;
      text-shadow: rgb(0 0 0 / 15%) 0px -1px 0px;
      transform-origin: 0 0;
      transform: rotate(45deg);
      cursor: pointer;
    `;
  },
});
