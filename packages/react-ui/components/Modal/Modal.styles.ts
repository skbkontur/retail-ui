import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const modalGlobalClasses = prefix('modal')({
  root: 'root',
  container: 'container',
});

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
    `;
    },

    bg(t: Theme) {
      return emotion.css`
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      background: ${t.modalBackBg};
      opacity: ${t.modalBackOpacity};
    `;
    },

    container() {
      return emotion.css`
      position: relative;
      white-space: nowrap;
      text-align: center;
      height: 100%;
      overflow-y: auto;
      outline: none;

      &::before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        height: 80%; /* to vertical align modal 40%/60% of screen height */
      }
    `;
    },

    containerMobile(t: Theme) {
      return emotion.css`
      height: ${t.mobileModalContainerHeight};
      margin-top: ${t.mobileModalContainerMarginTop};
      margin-right: ${t.mobileModalContainerMarginRight};
      margin-bottom: ${t.mobileModalContainerMarginBottom};
      margin-left: ${t.mobileModalContainerMarginLeft};
    `;
    },

    window(t: Theme) {
      return emotion.css`
      position: relative;
      white-space: normal;
      margin: auto;
      box-shadow: ${t.modalWindowShadow};
      background: ${t.modalBg};
      border-radius: ${t.modalBorderRadius};
    `;
    },

    mobileWindow() {
      return emotion.css`
      width: 100%;
      height: 100%;
      overflow: auto;
    `;
    },

    centerContainer() {
      return emotion.css`
      position: relative;
      display: inline-block;
      text-align: left;
      vertical-align: middle;
      box-sizing: border-box;
      z-index: 10;
      margin: 40px 20px;
    `;
    },

    mobileCenterContainer() {
      return emotion.css`
      margin: 0;
      width: 100%;
      height: 100%;
    `;
    },

    alignTop() {
      return emotion.css`
      vertical-align: top;
    `;
    },

    close(t: Theme) {
      const padding = parseInt(t.modalCloseButtonPadding);
      return emotion.css`
      ${resetButton(emotion)};
      position: absolute;
      display: flex;
      right: ${padding}px;
      top: ${padding}px;
      background: none;
      background: transparent;
      cursor: pointer;
      color: ${t.modalCloseButtonColor};
      text-align: center;
      vertical-align: middle;
      padding: ${t.modalCloseButtonClickArea};
      margin: -${t.modalCloseButtonClickArea};

      &:hover {
        color: ${t.modalCloseButtonHoverColor};
      }

      & > svg {
        width: ${t.modalCloseIconSize};
        height: ${t.modalCloseIconSize};
        box-sizing: content-box;
      }
    `;
    },

    close5_1(t: Theme) {
      return emotion.css`
        justify-content: center;
        align-items: center;
        right: ${t.modalCloseButtonClickAreaRight};
        top: ${t.modalCloseButtonClickAreaTop};

        padding-top: ${t.modalCloseButtonClickAreaTop};
        margin-top: -${t.modalCloseButtonClickAreaTop};
        padding-right: ${t.modalCloseButtonClickAreaRight};
        margin-right: -${t.modalCloseButtonClickAreaRight};
        padding-bottom: ${t.modalCloseButtonClickAreaBottom};
        margin-bottom: -${t.modalCloseButtonClickAreaBottom};
        padding-left: ${t.modalCloseButtonClickAreaLeft};
        margin-left: -${t.modalCloseButtonClickAreaLeft};
    `;
    },

    closeMobile(t: Theme) {
      return emotion.css`
        right: ${t.mobileModalCloseButtonRightPadding};
        top: ${parseInt(t.mobileModalCloseButtonTopPadding) + parseInt(t.mobileModalHeaderPadding)}px;
        padding: ${t.mobileModalCloseButtonClickArea};
        margin: -${t.mobileModalCloseButtonClickArea};

        & > svg {
          width: ${t.mobileModalCloseIconSize};
          height: ${t.mobileModalCloseIconSize};
        }
      `;
    },

    closeMobile5_1(t: Theme) {
      return emotion.css`
        top: ${t.mobileModalCloseButtonTopPadding};
      `;
    },

    mobileCloseWithoutHeader() {
      return emotion.css`
      position: static;
    `;
    },

    closeWrapper(t: Theme) {
      const padding = parseInt(t.modalCloseButtonPadding);
      const paddingBottom = parseInt(t.modalCloseButtonBottomPadding);

      const blockSizeX = parseInt(t.modalCloseIconSize) + 2 * padding;
      const blockSizeY = parseInt(t.modalCloseIconSize) + padding + paddingBottom;
      return emotion.css`
      position: relative;
      float: right;
      width: ${blockSizeX}px;
      height: ${blockSizeY}px;
    `;
    },

    mobileCloseWrapper(t: Theme) {
      const size = parseInt(t.mobileModalCloseIconSize) + parseInt(t.mobileModalCloseButtonClickArea) * 2;

      return emotion.css`
      position: absolute;
      right: ${t.mobileModalCloseButtonRightPadding};
      top: ${t.mobileModalCloseButtonTopPadding};
      padding: 0px;
      margin: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(50% 50% at 50% 50%, ${t.bgDefault} 60%, rgba(255, 255, 255, 0) 100%);
      border-radius: ${size}px;
    `;
    },

    disabled(t: Theme) {
      return emotion.css`
      pointer-events: none;
      cursor: default;
      color: ${t.modalCloseButtonDisabledColor};
    `;
    },

    focus(t: Theme) {
      return emotion.css`
      color: ${t.modalCloseButtonHoverColor};
      outline: 2px solid ${t.borderColorFocus};
    `;
    },

    focus5_1(t: Theme) {
      return emotion.css`
      &:before {
        content: '';
        position: absolute;
        width: calc(${t.modalCloseIconSize} * 2);
        height: calc(${t.modalCloseIconSize} * 2);
        box-shadow: inset 0 0 0 2px ${t.borderColorFocus};
        border-radius: 4px;
      }
    `;
    },

    header(t: Theme) {
      return emotion.css`
      font-size: ${t.modalHeaderFontSize};
      line-height: ${t.modalHeaderLineHeight};
      padding: ${t.modalHeaderPaddingTop} ${t.modalPaddingRight} ${t.modalHeaderPaddingBottom} ${t.modalPaddingLeft};
      overflow-wrap: break-word;
      word-wrap: break-word;
      color: ${t.modalHeaderTextColor};
      font-weight: ${t.modalHeaderFontWeight};
    `;
    },

    mobileHeader(t: Theme) {
      return emotion.css`
      position: relative;
      font-size: ${t.mobileModalHeaderFontSize};
      line-height: ${t.mobileModalHeaderLineHeight};
      padding: ${t.mobileModalHeaderPadding};
    `;
    },

    body(t: Theme) {
      return emotion.css`
      border-radius: ${t.modalBodyBorderRadius};
      padding-top: ${t.modalBodyPaddingTop};
      padding-right: ${t.modalPaddingRight};
      padding-bottom: ${t.modalBodyPaddingBottom};
      padding-left: ${t.modalPaddingLeft};
      color: ${t.modalBodyTextColor};
    `;
    },

    mobileBody(t: Theme) {
      return emotion.css`
      padding: ${t.mobileModalBodyPadding};
      display: flex;
      flex-flow: column;
      flex: 1;
      font-size: ${t.mobileModalBodyFontSize};
    `;
    },

    headerWithClose(t: Theme) {
      const rightPadding = 2 * parseInt(t.modalCloseButtonPadding) + parseInt(t.modalCloseIconSize);

      return emotion.css`
      padding-right: ${rightPadding}px;
    `;
    },

    mobileHeaderWithClose(t: Theme) {
      return emotion.css`
      padding-right: ${2 * parseInt(t.mobileModalCloseButtonRightPadding) + parseInt(t.mobileModalCloseIconSize)}px;
    `;
    },

    footer(t: Theme) {
      return emotion.css`
      padding: ${t.modalFooterPaddingTop} ${t.modalPaddingRight} ${t.modalFooterPaddingBottom} ${t.modalPaddingLeft};
      color: ${t.modalFooterTextColor};
      border-radius: 0 0 ${t.modalBorderRadius} ${t.modalBorderRadius};
    `;
    },

    mobileFooter(t: Theme) {
      return emotion.css`
      padding: ${t.mobileModalFooterPadding};
    `;
    },

    panel(t: Theme) {
      return emotion.css`
      padding-top: ${t.modalFooterPanelPaddingTop};
      padding-bottom: ${t.modalFooterPanelPaddingBottom};
      background: ${t.modalFooterBg};
    `;
    },

    fixedHeader(t: Theme) {
      return emotion.css`
      margin-bottom: ${t.modalFixedHeaderMarginBottom};
      padding-bottom: ${t.modalFixedHeaderPaddingBottom};
      background: ${t.modalFixedHeaderBg};
      border-bottom: ${t.modalFixedHeaderBorder};

      &:after {
        bottom: 11px;
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        left: 0;
        z-index: -1;
        box-shadow: ${t.modalFixedHeaderShadow};
      }
    `;
    },

    mobileFixedHeader(t: Theme) {
      return emotion.css`
      padding-bottom: ${t.mobileModalHeaderPadding};
    `;
    },

    fixedFooter(t: Theme) {
      return emotion.css`
      padding-top: ${t.modalFixedFooterPaddingTop};
      margin-top: ${t.modalFixedFooterMarginTop};
      background: ${t.modalFixedHeaderBg};
      border-top: ${t.modalFixedFooterBorder};

      &:before {
        top: 11px;
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        left: 0;
        z-index: -1;
        box-shadow: ${t.modalFixedFooterShadow};
      }
    `;
    },

    fixedPanel(t: Theme) {
      return emotion.css`
      &:before {
        box-shadow: ${t.modalFixedPanelShadow};
      }
    `;
    },

    headerAddPadding(t: Theme) {
      return emotion.css`
      padding-bottom: ${t.modalHeaderAdditionalPaddingBottom};
    `;
    },

    bodyWithoutHeader(t: Theme) {
      return emotion.css`
      padding-top: ${t.modalPaddingTop};
    `;
    },

    mobileBodyWithoutHeader() {
      return emotion.css`
      padding-top: 0px;
    `;
    },

    bodyWithoutPadding() {
      return emotion.css`
      padding: 0;
    `;
    },

    bodyAddPaddingForPanel(t: Theme) {
      return emotion.css`
      padding-bottom: ${t.modalPaddingBottom};
    `;
    },

    mobileBodyAddPaddingForPanel(t: Theme) {
      return emotion.css`
      padding: ${t.mobileModalBodyPadding};
    `;
    },

    columnFlexContainer() {
      return emotion.css`
      height: 100%;
      display: flex;
      flex-flow: column;
      overflow-y: auto;
    `;
    },

    modalSeparatorWrapper() {
      return emotion.css`
      position: absolute;
      width: 100%;
    `;
    },

    modalSeparator(t: Theme) {
      return emotion.css`
      border-bottom: ${t.modalSeparatorBorderBottom};
      margin: 0 32px;
      transition: margin 0.3s;
    `;
    },

    modalSeparatorFixed() {
      return emotion.css`
      margin: 0 16px;
    `;
    },
  });
