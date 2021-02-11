import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      background: ${t.tbBg};
      box-shadow: ${t.tbShadow};
      height: 50px;
      margin-bottom: 20px;
      padding: 0 15px;
    `;
  },

  divider(t: Theme) {
    return css`
      align-self: center;
      background-color: ${t.tdDividerBg};
      height: 30px;
      width: 1px;
    `;
  },

  endItems() {
    return css`
      align-items: stretch;
      display: flex;
      flex-wrap: nowrap;
    `;
  },

  startItems() {
    return css`
      ${styles.endItems()};

      padding-right: 60px;
    `;
  },

  buttonActive() {
    return css`
      background: rgba(0, 0, 0, 0.06);
    `;
  },

  button() {
    return css`
      cursor: pointer;
      height: 50px;
      line-height: 50px;
      outline: 0;
      padding: 0 10px;
      position: relative;
      vertical-align: middle;

      &:hover,
      &:focus {
        background: rgba(0, 0, 0, 0.06);
      }

      .kontur-projects_opened & {
        background: rgba(0, 0, 0, 0.06);
      }
    `;
  },

  noShadow() {
    return css`
      box-shadow: none;
    `;
  },

  icon() {
    return css`
      color: #666;
      line-height: normal;
      margin-right: 4px;
    `;
  },

  iconOnly() {
    return css`
      margin-right: 0;
    `;
  },

  usePay() {
    return css`
      &,
      &:hover,
      ${cssName(styles.buttonActive())} {
        background: #ffeca9;
      }
    `;
  },

  useDanger() {
    return css`
      &,
      &:hover,
      ${cssName(styles.buttonActive())} {
        background: #ffe3e3;
      }
    `;
  },

  noMargin() {
    return css`
      margin-bottom: 0;
    `;
  },

  center() {
    return css`
      margin: auto;
    `;
  },

  containerWrap() {
    return css`
      margin: 0 -10px;
    `;
  },

  container() {
    return css`
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
    `;
  },

  item() {
    return css`
      display: inline-block;
      box-sizing: border-box;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      vertical-align: middle;
      white-space: nowrap;
    `;
  },

  spwDropdown() {
    return css`
      display: table-cell;
      height: 50px;
      white-space: nowrap;
    `;
  },

  organizationsTitle() {
    return css`
      box-sizing: border-box;
      left: 0;
      overflow: hidden;
      padding: 0 20px 0 10px;
      position: absolute;
      text-overflow: ellipsis;
      width: 100%;
    `;
  },

  organizationsComment() {
    return css`
      color: #aaa;
      padding-left: 10px;
      position: absolute;
      right: 20px;
    `;
  },

  organizationsArrow() {
    return css`
      position: absolute;
      right: 0;
      text-align: center;
      width: 20px;
    `;
  },

  organizationsTitleDummy() {
    return css`
      box-sizing: border-box;
      height: 0;
      overflow: hidden;
      padding-right: 10px;
      white-space: normal;
    `;
  },

  organizationsCommentDummy() {
    return css`
      padding-left: 10px;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
