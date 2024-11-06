import { memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';
import type { Emotion } from '@emotion/css/create-instance';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
      font-weight: 400;
      font-size: 14px;
      padding-left: 300px;
      background: #fff;
      color: inherit;
      min-height: 100%;

      @media (max-width: 600px) {
        padding-left: 0;
      }
    `;
    },
    darkRoot(t: Theme) {
      return emotion.css`
      background: ${t.bgDefault};
      color: ${t.textColorDefault};
    `;
    },
    wrapper() {
      return emotion.css`
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
      return emotion.css``;
    },
    darkContent(t: Theme) {
      return emotion.css`
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
      em,
      summary {
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
      return emotion.css`
      padding: 40px 40px 0 !important;
    `;
    },
  heading() {
    return css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
  },
    sidebar() {
      return emotion.css`
      width: 300px;
      background: #41464e;
      font-size: 16px;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      overflow: auto;
      scrollbar-color: transparent transparent;
      scrollbar-width: thin;

      &:hover {
        scrollbar-color: rgba(0, 0, 0, 0.8) transparent;
      }

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
        font-size: 15px;
        font-weight: normal;
      }
    `;
    },
    sidebarNotice() {
      return emotion.css`
        padding-top: 72px;

        @media (max-width: 768px) {
          padding-top: 110px;
        }
      `;
    },
    github() {
      return emotion.css`
        display: inline-block;
      `;
    },
  });
