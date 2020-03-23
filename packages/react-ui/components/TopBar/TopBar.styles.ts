import { cssName, GrandStyles } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export class Styles extends GrandStyles {
  root(t: Theme) {
    return this.css`
      background: ${t.tbBg};
      box-shadow: ${t.tbShadow};
      height: 50px;
      margin-bottom: 20px;
      padding: 0 15px;
    `;
  }

  divider(t: Theme) {
    return this.css`
      align-self: center;
      background-color: ${t.tdDividerBg};
      height: 30px;
      width: 1px;
    `;
  }

  endItems() {
    return this.css`
      align-items: stretch;
      display: flex;
      flex-wrap: nowrap;
    `;
  }

  startItems() {
    return this.css`
      ${cssName(this.endItems())};

      padding-right: 60px;
    `;
  }

  buttonActive() {
    return this.css`
      background: rgba(0, 0, 0, 0.06);
    `;
  }

  button() {
    return this.css`
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
  }

  noShadow() {
    return this.css`
      ${cssName(this.endItems())} & {
        box-shadow: none;
      }
    `;
  }

  icon() {
    return this.css`
      margin-right: 4px;
    `;
  }

  iconOnly() {
    return this.css`
      margin-right: 0;
    `;
  }

  usePay() {
    return this.css`
      &,
      &:hover,
      ${cssName(this.buttonActive())} {
        background: #ffeca9;
      }
    `;
  }

  useDanger() {
    return this.css`
      &,
      &:hover,
      ${cssName(this.buttonActive())} {
        background: #ffe3e3;
      }
    `;
  }

  noMargin() {
    return this.css`
      margin-bottom: 0;
    `;
  }

  center() {
    return this.css`
      margin: auto;
    `;
  }

  containerWrap() {
    return this.css`
      margin: 0 -10px;
    `;
  }

  container() {
    return this.css`
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
    `;
  }

  item() {
    return this.css`
      display: inline-block;
      box-sizing: border-box;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      vertical-align: middle;
      white-space: nowrap;
    `;
  }

  spwDropdown() {
    return this.css`
      display: table-cell;
      height: 50px;
      white-space: nowrap;
    `;
  }

  organizationsTitle() {
    return this.css`
      box-sizing: border-box;
      left: 0;
      overflow: hidden;
      padding: 0 20px 0 10px;
      position: absolute;
      text-overflow: ellipsis;
      width: 100%;
    `;
  }

  organizationsComment() {
    return this.css`
      color: #aaa;
      padding-left: 10px;
      position: absolute;
      right: 20px;
    `;
  }

  organizationsArrow() {
    return this.css`
      position: absolute;
      right: 0;
      text-align: center;
      width: 20px;
    `;
  }

  organizationsTitleDummy() {
    return this.css`
      box-sizing: border-box;
      height: 0;
      overflow: hidden;
      padding-right: 10px;
      white-space: normal;
    `;
  }

  organizationsCommentDummy() {
    return this.css`
      padding-left: 10px;
    `;
  }
}
