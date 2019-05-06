export const Fias = {
  warning: {
    contents: "css`\n  color: ${t.warningText};\n`",
    variables: [
      "warningText"
    ]
  },
  error: {
    contents: "css`\n  color: ${t.errorText};\n`",
    variables: [
      "errorText"
    ]
  }
};
export const Checkbox = {
  root: {
    contents: "css`\n  &:hover .${styles.box} {\n    background: ${t.chbHoverBg};\n  }\n\n  &:active .${styles.box} {\n    box-shadow: ${t.chbShadowActive};\n    background: ${t.chbActiveBg};\n  }\n\n  &.${styles.disabled} {\n    color: ${t.textColorDisabled};\n  }\n`",
    variables: [
      "chbHoverBg",
      "chbShadowActive",
      "chbActiveBg",
      "textColorDisabled"
    ]
  },
  box: {
    contents: "css`\n  color: ${t.textColorDefault};\n  border: ${t.chbBorder};\n  box-shadow: ${t.chbShadow};\n  background: ${t.chbBg};\n\n  .${styles.disabled} & {\n    box-shadow: ${t.chbShadowDisabled} !important; //to overide hover and active\n    background: ${t.bgDisabled} !important;\n    color: ${t.textColorDisabled} !important;\n    border-color: transparent;\n  }\n`",
    variables: [
      "textColorDefault",
      "chbBorder",
      "chbShadow",
      "chbBg",
      "chbShadowDisabled",
      "bgDisabled",
      "textColorDisabled"
    ]
  },
  indeterminate: {
    contents: "css`\n  background: ${t.chbIndeterminateBg};\n\n  .${styles.disabled} & {\n    background: ${t.textColorDisabled};\n  }\n`",
    variables: [
      "chbIndeterminateBg",
      "textColorDisabled"
    ]
  },
  warning: {
    contents: "css`\n  & .${styles.box} {\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.warningMain};\n    border-color: ${t.borderColorWarning};\n  }\n\n  .rt-ie8 & .${styles.box} {\n    outline: 1px solid ${t.warningMain};\n  }\n`",
    variables: [
      "outlineColorFocus",
      "chbShadowWidth",
      "warningMain",
      "borderColorWarning"
    ]
  },
  error: {
    contents: "css`\n  & .${styles.box} {\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.errorMain};\n    border-color: ${t.borderColorError};\n  }\n\n  .rt-ie8 & .${styles.box} {\n    outline: 1px solid ${t.errorMain};\n  }\n`",
    variables: [
      "outlineColorFocus",
      "chbShadowWidth",
      "errorMain",
      "borderColorError"
    ]
  },
  checked: {
    contents: "css`\n  & .${styles.box} {\n    background: ${t.chbCheckedBg};\n    color: ${t.chbCheckedColor};\n  }\n        \n  &:hover .${styles.box} {\n      background: ${ColorFunctions.darken(t.chbCheckedBg, '5%')};\n  }\n  \n  &:active .${styles.box} {\n      background: ${ColorFunctions.darken(t.chbCheckedBg, '15%')};\n    }\n  }\n`",
    variables: [
      "chbCheckedBg",
      "chbCheckedColor"
    ]
  },
  focus: {
    contents: "css`\n  & .${styles.box} {\n    border-color: ${t.chbBorderColorFocus};\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.chbBorderColorFocus};\n  }\n\n  .rt-ie8 & .${styles.box} {\n    outline: 1px solid ${t.chbBorderColorFocus};\n  }\n`",
    variables: [
      "chbBorderColorFocus",
      "outlineColorFocus",
      "chbShadowWidth"
    ]
  },
  boxIndeterminate: {
    contents: "css`\n  background: ${t.chbBoxIndeterminateBg};\n\n  .${styles.root}:hover & {\n    background: ${ColorFunctions.darken(t.chbBoxIndeterminateBgHover, '5%')};\n  }\n  .${styles.root}:active & {\n    background: ${ColorFunctions.darken(t.chbBoxIndeterminateBgActive, '15%')};\n  }\n`",
    variables: [
      "chbBoxIndeterminateBg",
      "chbBoxIndeterminateBgHover",
      "chbBoxIndeterminateBgActive"
    ]
  }
};
export const Radio = {
  radio: {
    contents: "css`\n  width: ${t.radioSize};\n  height: ${t.radioSize};\n  vertical-align: ${t.radioVerticalAlign};\n  background-image: ${t.radioBgImage};\n  box-shadow: ${t.radioBoxShadow};\n  border: ${t.radioBorder};\n\n  .${styles.root}:hover & {\n    background: ${t.radioHoverBg};\n    box-shadow: ${t.radioHoverShadow};\n  }\n  .${styles.root}:active & {\n    background: ${t.radioActiveBg};\n    box-shadow: ${t.radioActiveShadow};\n  }\n  .${styles.input}:focus + &::after {\n    box-shadow: ${t.radioFocusShadow};\n    border-color: ${t.borderColorFocus};\n  }\n`",
    variables: [
      "radioSize",
      "radioVerticalAlign",
      "radioBgImage",
      "radioBoxShadow",
      "radioBorder",
      "radioHoverBg",
      "radioHoverShadow",
      "radioActiveBg",
      "radioActiveShadow",
      "radioFocusShadow",
      "borderColorFocus"
    ]
  },
  focus: {
    contents: "css`\n  &::after {\n    box-shadow: ${t.radioFocusShadow};\n    border-color: ${t.borderColorFocus};\n  }\n`",
    variables: [
      "radioFocusShadow",
      "borderColorFocus"
    ]
  },
  warning: {
    contents: "css`\n  &::after {\n    box-shadow: ${t.radioFocusShadow};\n    border-color: ${t.warningMain};\n  }\n`",
    variables: [
      "radioFocusShadow",
      "warningMain"
    ]
  },
  error: {
    contents: "css`\n  &::after {\n    box-shadow: ${t.radioFocusShadow};\n    border-color: ${t.errorMain};\n  }\n`",
    variables: [
      "radioFocusShadow",
      "errorMain"
    ]
  },
  checked: {
    contents: "css`\n  .${styles.root} .${styles.radio}& {\n    background-color: ${t.radioCheckedBgColor};\n  }\n  .${styles.root} .${styles.radio}&::before {\n    background: ${t.radioCheckedBulletColor};\n  }\n`",
    variables: [
      "radioCheckedBgColor",
      "radioCheckedBulletColor"
    ]
  },
  disabled: {
    contents: "css`\n  box-shadow: ${t.radioDisabledShadow} !important;\n`",
    variables: [
      "radioDisabledShadow"
    ]
  },
  label: {
    contents: "css`\n  display: ${t.radioLabelDisplay};\n`",
    variables: [
      "radioLabelDisplay"
    ]
  }
};
export const Kebab = {
  focused: {
    contents: "css`\n  .${styles.kebab}& {\n    border-color: ${t.borderColorFocus};\n  }\n`",
    variables: [
      "borderColorFocus"
    ]
  },
  menu: {
    contents: "css`\n  border-radius: ${t.popupBorderRadius};\n`",
    variables: [
      "popupBorderRadius"
    ]
  }
};
export const Tab = {
  root: {
    contents: "css`\n  &:hover {\n    border-bottom: 3px solid ${t.borderColorFocusLight};\n  }\n`",
    variables: [
      "borderColorFocusLight"
    ]
  },
  vertical: {
    contents: "css`\n  .${styles.root}&:hover {\n    border-left: 3px solid ${t.borderColorFocusLight};\n  }\n`",
    variables: [
      "borderColorFocusLight"
    ]
  },
  focus: {
    contents: "css`\n  border: 2px solid ${t.borderColorFocus};\n`",
    variables: [
      "borderColorFocus"
    ]
  },
  disabled: {
    contents: "css`\n  color: rgba(\n    ${ColorFunctions.red(t.textColorDefault)},\n    ${ColorFunctions.green(t.textColorDefault)},\n    ${ColorFunctions.blue(t.textColorDefault)},\n    0.5\n  );\n`",
    variables: [
      "textColorDefault"
    ]
  },
  primary: {
    contents: "css`\n  &:hover {\n    border-bottom: 3px solid ${ColorFunctions.lighten(t.btnPrimaryBg, '25%')};\n  }\n`",
    variables: [
      "btnPrimaryBg"
    ]
  },
  success: {
    contents: "css`\n  &:hover {\n    border-bottom: 3px solid ${ColorFunctions.lighten(t.btnSuccessBg, '25%')};\n  }\n`",
    variables: [
      "btnSuccessBg"
    ]
  },
  warning: {
    contents: "css`\n  &:hover {\n    border-bottom: 3px solid ${ColorFunctions.lighten(t.btnPayBg, '25%')};\n  }\n`",
    variables: [
      "btnPayBg"
    ]
  },
  error: {
    contents: "css`\n  &:hover {\n    border-bottom: 3px solid ${ColorFunctions.lighten(t.btnDangerBg, '25%')};\n  }\n`",
    variables: [
      "btnDangerBg"
    ]
  }
};
export const InternalMenu = {
  root: {
    contents: "css`\n  background: ${t.bgDefault};\n`",
    variables: [
      "bgDefault"
    ]
  }
};
export const ToastView = {
  root: {
    contents: "css`\n  background: ${t.toastBg};\n  color: ${t.toastColor};\n`",
    variables: [
      "toastBg",
      "toastColor"
    ]
  },
  link: {
    contents: "css`\n  color: ${t.toastLinkColor};\n`",
    variables: [
      "toastLinkColor"
    ]
  },
  close: {
    contents: "css`\n  color: ${t.toastCloseColor};\n\n  &:hover {\n    color: ${t.toastCloseHoverColor};\n  }\n`",
    variables: [
      "toastCloseColor",
      "toastCloseHoverColor"
    ]
  }
};
export const SidePage = {
  container: {
    contents: "css`\n  background: ${t.bgDefault};\n`",
    variables: [
      "bgDefault"
    ]
  },
  shadow: {
    contents: "css`\n  .${styles.container}& {\n    box-shadow: ${t.sidePageContainerShadow};\n  }\n`",
    variables: [
      "sidePageContainerShadow"
    ]
  },
  close: {
    contents: "css`\n  color: ${t.sidePageCloseButtonColor};\n\n  &:hover {\n    color: ${t.sidePageCloseButtonHoverColor};\n  }\n`",
    variables: [
      "sidePageCloseButtonColor",
      "sidePageCloseButtonHoverColor"
    ]
  },
  panel: {
    contents: "css`\n  .${styles.footerContent}& {\n    background: ${t.sidePageFooterPanelBg};\n  }\n  .${styles.footerContent}.${styles.fixed}& {\n    background: ${t.sidePageFooterPanelBg};\n  }\n`",
    variables: [
      "sidePageFooterPanelBg"
    ]
  },
  fixed: {
    contents: "css`\n  .${styles.header}& {\n    background: ${t.bgDefault};\n    box-shadow: 0 1px ${t.borderColorGrayLight};\n  }\n  .${styles.footerContent}& {\n    background: ${t.bgDefault};\n    border-top: 1px solid ${t.borderColorGrayLight};\n  }\n`",
    variables: [
      "bgDefault",
      "borderColorGrayLight"
    ]
  }
};
export const MaskedInput = {
  inputMask: {
    contents: "css`\n  color: ${t.placeholderColor};\n`",
    variables: [
      "placeholderColor"
    ]
  }
};
export const Link = {
  useDefault: {
    contents: "css`\n  color: ${t.linkColor};\n\n  &:hover {\n    color: ${t.linkColor};\n    text-decoration: ${t.linkHoverTextDecoration};\n  }\n  &:active {\n    color: ${t.linkActiveColor};\n  }\n`",
    variables: [
      "linkColor",
      "linkHoverTextDecoration",
      "linkActiveColor"
    ]
  },
  focus: {
    contents: "css`\n  .${styles.useDefault}& {\n    color: ${t.linkColor};\n    text-decoration: ${t.linkHoverTextDecoration};\n  }\n  .${jsStyles.useSuccess(t)}& {\n    text-decoration: ${t.linkHoverTextDecoration};\n  }\n  .${jsStyles.useDanger(t)}& {\n    text-decoration: ${t.linkHoverTextDecoration};\n  }\n  .${styles.useGrayed}& {\n    color: ${t.textColorDisabled};\n    text-decoration: ${t.linkHoverTextDecoration};\n  }\n`",
    variables: [
      "linkColor",
      "linkHoverTextDecoration",
      "textColorDisabled"
    ]
  },
  useSuccess: {
    contents: "css`\n  &:hover {\n    text-decoration: ${t.linkHoverTextDecoration};\n  }\n`",
    variables: [
      "linkHoverTextDecoration"
    ]
  },
  useDanger: {
    contents: "css`\n  &:hover {\n    text-decoration: ${t.linkHoverTextDecoration};\n  }\n`",
    variables: [
      "linkHoverTextDecoration"
    ]
  },
  useGrayed: {
    contents: "css`\n  color: ${t.textColorDisabled};\n\n  &:hover {\n    color: ${t.textColorDisabled};\n    text-decoration: ${t.linkHoverTextDecoration};\n  }\n  &:active {\n    color: ${t.textColorDisabled};\n  }\n`",
    variables: [
      "textColorDisabled",
      "linkHoverTextDecoration"
    ]
  },
  disabled: {
    contents: "css`\n  .${styles.useDefault}& {\n    color: ${t.textColorDisabled};\n\n    &:hover {\n      text-decoration: none;\n      color: ${t.textColorDisabled};\n    }\n  }\n  .${jsStyles.useSuccess(t)}& {\n    color: ${t.textColorDisabled};\n\n    &:hover {\n      text-decoration: none;\n      color: ${t.textColorDisabled};\n    }\n  }\n  .${jsStyles.useDanger(t)}& {\n    color: ${t.textColorDisabled};\n\n    &:hover {\n      text-decoration: none;\n      color: ${t.textColorDisabled};\n    }\n  }\n  .${styles.useGrayed}& {\n    color: ${t.textColorDisabled};\n\n    &:hover {\n      text-decoration: none;\n      color: ${t.textColorDisabled};\n    }\n  }\n`",
    variables: [
      "textColorDisabled"
    ]
  }
};
export const Select = {
  placeholder: {
    contents: "css`\n  color: ${t.sltPlaceholderColor};\n`",
    variables: [
      "sltPlaceholderColor"
    ]
  },
  arrow: {
    contents: "css`\n  .${styles.arrowWrap} & {\n    border-top-color: ${t.btnMenuArrowColor};\n  }\n`",
    variables: [
      "btnMenuArrowColor"
    ]
  }
};
export const Input = {
  root: {
    contents: "css`\n  color: ${t.inputColor};\n  background-color: ${t.inputBg};\n  box-shadow: ${t.inputShadow};\n  border: ${t.inputBorderWidth} solid ${t.borderColorGrayLight};\n  border-top-color: ${t.inputBorderTopColor};\n  }\n`",
    variables: [
      "inputColor",
      "inputBg",
      "inputShadow",
      "inputBorderWidth",
      "borderColorGrayLight",
      "inputBorderTopColor"
    ]
  },
  useDefaultColor: {
    contents: "css`\n  .${classes.leftIcon}&, .${classes.rightIcon}& {\n    color: ${t.inputIconColor};\n  }\n`",
    variables: [
      "inputIconColor"
    ]
  },
  focus: {
    contents: "css`\n  .${classes.root}& {\n    border-color: ${t.borderColorFocus};\n    box-shadow: ${t.inputFocusShadow};\n  }\n  .rt-ie-any .${classes.root}& {\n    outline: 1px solid ${t.inputFocusOutline};\n  }\n`",
    variables: [
      "borderColorFocus",
      "inputFocusShadow",
      "inputFocusOutline"
    ]
  },
  placeholder: {
    contents: "css`\n  color: ${t.placeholderColor};\n\n  .${classes.root}.${classes.focus} & {\n    color: ${t.placeholderColorLight};\n  }\n`",
    variables: [
      "placeholderColor",
      "placeholderColorLight"
    ]
  },
  input: {
    contents: "css`\n  .${classes.root}.${classes.focus} &:-moz-placeholder {\n    color: ${t.placeholderColorLight};\n  }\n  .${classes.root}.${classes.focus} &::-moz-placeholder {\n    color: ${t.placeholderColorLight};\n  }\n  .${classes.root}.${classes.focus} &::placeholder {\n    color: ${t.placeholderColorLight};\n  }\n  .${classes.root}.${classes.disabled} & {\n    color: ${t.textColorDisabled};\n  }\n  .${classes.root}.${classes.disabled} &:-moz-placeholder {\n    -webkit-text-fill-color: ${t.placeholderColor};\n  }\n  .${classes.root}.${classes.disabled} &::-moz-placeholder {\n    -webkit-text-fill-color: ${t.placeholderColor};\n  }\n  .${classes.root}.${classes.disabled} &::placeholder {\n    -webkit-text-fill-color: ${t.placeholderColor};\n  }\n  &:-moz-placeholder {\n    color: ${t.placeholderColor};\n  }\n  &::-moz-placeholder {\n    color: ${t.placeholderColor};\n  }\n  &::placeholder {\n    color: ${t.placeholderColor};\n  }\n`",
    variables: [
      "placeholderColorLight",
      "textColorDisabled",
      "placeholderColor"
    ]
  },
  warning: {
    contents: "css`\n  .${classes.root}& {\n    border-color: ${t.warningMain};\n    box-shadow: 0 0 0 1px ${t.warningMain};\n  }\n  .rt-ie-any .${classes.root}& {\n    outline: 1px solid ${t.warningMain};\n  }\n`",
    variables: [
      "warningMain"
    ]
  },
  error: {
    contents: "css`\n  .${classes.root}& {\n    border-color: ${t.errorMain};\n    box-shadow: 0 0 0 1px ${t.errorMain};\n  }\n  .rt-ie-any .${classes.root}& {\n    outline: 1px solid ${t.errorMain};\n  }\n`",
    variables: [
      "errorMain"
    ]
  },
  disabled: {
    contents: "css`\n  .${classes.root}& {\n    border-color: ${t.inputDisabledBorderColor};\n    background: ${t.inputDisabledBg};\n  }\n`",
    variables: [
      "inputDisabledBorderColor",
      "inputDisabledBg"
    ]
  },
  blink: {
    contents: "css`\n  .${classes.root}& {\n    background-color: ${t.blinkColor};\n  }\n`",
    variables: [
      "blinkColor"
    ]
  },
  sizeSmall: {
    contents: "css`\n  line-height: ${t.controlLineHeightSmall};\n  padding-top: ${t.controlPaddingYSmall};\n  padding-bottom: ${t.controlPaddingYSmall};\n  height: ${t.controlHeightSmall};\n\n  .rt-ie-any & {\n    padding-top: ${addOffset(t.controlPaddingYSmall, -1)};\n    padding-bottom: ${addOffset(t.controlPaddingYSmall, 1)};\n  }\n`",
    variables: [
      "controlLineHeightSmall",
      "controlPaddingYSmall",
      "controlHeightSmall"
    ]
  },
  sizeMedium: {
    contents: "css`\n  line-height: ${t.controlLineHeightMedium};\n  padding-top: ${t.controlPaddingYMedium};\n  padding-bottom: ${t.controlPaddingYMedium};\n  height: ${t.controlHeightMedium};\n\n  .rt-ie-any & {\n    padding-top: ${addOffset(t.controlPaddingYMedium, -1)};\n    padding-bottom: ${addOffset(t.controlPaddingYMedium, 1)};\n  }\n`",
    variables: [
      "controlLineHeightMedium",
      "controlPaddingYMedium",
      "controlHeightMedium"
    ]
  },
  DEPRECATED_sizeMedium: {
    contents: "css`\n  line-height: ${t.controlLineHeightMedium};\n  padding-top: ${t.controlPaddingYMedium};\n  padding-bottom: ${t.controlPaddingYMedium};\n  height: ${t.controlHeightMedium};\n\n  .rt-ie-any & {\n    padding-top: ${addOffset(t.controlPaddingYMedium, -1)};\n    padding-bottom: ${addOffset(t.controlPaddingYMedium, 1)};\n  }\n`",
    variables: [
      "controlLineHeightMedium",
      "controlPaddingYMedium",
      "controlHeightMedium"
    ]
  },
  sizeLarge: {
    contents: "css`\n  line-height: ${t.controlLineHeightLarge};\n  height: ${t.controlHeightLarge};\n  padding-top: ${addOffset(t.controlPaddingYLarge, -1)};\n  padding-bottom: ${addOffset(t.controlPaddingYLarge, 1)};\n\n  .rt-ie-any & {\n    padding-top: ${addOffset(t.controlPaddingYLarge, -2)};\n    padding-bottom: ${addOffset(t.controlPaddingYLarge, 2)};\n  }\n`",
    variables: [
      "controlLineHeightLarge",
      "controlHeightLarge",
      "controlPaddingYLarge"
    ]
  },
  prefix: {
    contents: "css`\n  color: ${t.placeholderColor};\n`",
    variables: [
      "placeholderColor"
    ]
  },
  suffix: {
    contents: "css`\n  color: ${t.placeholderColor};\n`",
    variables: [
      "placeholderColor"
    ]
  }
};
export const Loader = {
  active: {
    contents: "css`\n  .${styles.loader}&::after {\n    background: ${t.loaderBg};\n    opacity: ${t.loaderOpacity};\n  }\n`",
    variables: [
      "loaderBg",
      "loaderOpacity"
    ]
  }
};
export const Toggle = {
  handle: {
    contents: "css`\n  background: ${t.toggleBg};\n`",
    variables: [
      "toggleBg"
    ]
  },
  container: {
    contents: "css`\n  border: 1px solid ${t.toggleBorderColor};\n\n  .${styles.isDisabled} & {\n    background: ${t.toggleBgDisabled};\n  }\n  .${styles.input}:checked ~ & {\n    border-color: ${t.toggleBgChecked};\n    background: ${t.toggleBgChecked};\n  }\n`",
    variables: [
      "toggleBorderColor",
      "toggleBgDisabled",
      "toggleBgChecked"
    ]
  },
  focused: {
    contents: "css`\n  .${styles.container}& {\n    box-shadow: 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 3px ${t.toggleFocusShadowColor};\n  }\n`",
    variables: [
      "outlineColorFocus",
      "toggleFocusShadowColor"
    ]
  },
  activeBackground: {
    contents: "css`\n  .${jsStyles.isLoading(t)} & {\n    background: ${t.toggleBgChecked};\n  }\n\n  .${styles.input}:checked ~ .${styles.container} & {\n    background: ${t.toggleBgChecked};\n  }\n`",
    variables: [
      "toggleBgChecked"
    ]
  },
  isLoading: {
    contents: "css`\n  .${styles.input}:checked ~ .${styles.container}& {\n    background: ${t.toggleBorderColor};\n    border-color: ${t.toggleBorderColor};\n  }\n`",
    variables: [
      "toggleBorderColor"
    ]
  },
  isWarning: {
    contents: "css`\n  .${styles.input}:checked ~ .${styles.container}& {\n    background: ${t.warningMain};\n    border-color: ${t.warningMain};\n\n    .${jsStyles.activeBackground(t)} {\n      background: ${t.warningMain};\n    }\n  }\n`",
    variables: [
      "warningMain"
    ]
  },
  isError: {
    contents: "css`\n  .${styles.input}:checked ~ .${styles.container}& {\n    background: ${t.errorMain};\n    border-color: ${t.errorMain};\n\n    .${jsStyles.activeBackground(t)} {\n      background: ${t.errorMain};\n    }\n  }\n`",
    variables: [
      "errorMain"
    ]
  },
  wrapper: {
    contents: "css`\n  &:hover {\n    .${styles.handle} {\n      background: ${t.toggleBgHover};\n    }\n  }\n`",
    variables: [
      "toggleBgHover"
    ]
  }
};
export const Popup = {
  popup: {
    contents: "css`\n  border-radius: ${t.popupBorderRadius};\n  border: ${t.popupBorder} ${t.popupBorderColor};\n\n  .rt-ie8 & {\n    border: 1px solid ${t.dropdownMenuBorder};\n  }\n`",
    variables: [
      "popupBorderRadius",
      "popupBorder",
      "popupBorderColor",
      "dropdownMenuBorder"
    ]
  },
  content: {
    contents: "css`\n  border-radius: ${t.popupBorderRadius};\n`",
    variables: [
      "popupBorderRadius"
    ]
  },
  contentInner: {
    contents: "css`\n  background: ${t.bgDefault};\n`",
    variables: [
      "bgDefault"
    ]
  },
  shadow: {
    contents: "css`\n  filter: ${t.popupDropShadow};\n  -webkit-filter: ${t.popupDropShadow};\n\n  .rt-ie-any & {\n    box-shadow: ${t.popupBoxShadow};\n  }\n`",
    variables: [
      "popupDropShadow",
      "popupBoxShadow"
    ]
  }
};
export const Tooltip = {
  cross: {
    contents: "css`\n  color: ${t.tooltipCloseBtnColor};\n\n  &:hover {\n    color: ${t.tooltipCloseBtnHoverColor};\n  }\n`",
    variables: [
      "tooltipCloseBtnColor",
      "tooltipCloseBtnHoverColor"
    ]
  }
};
export const Menu = {
  root: {
    contents: "css`\n  background: ${t.bgDefault};\n`",
    variables: [
      "bgDefault"
    ]
  },
  shadow: {
    contents: "css`\n  border: ${t.menuBorder};\n  box-shadow: ${t.menuShadow};\n`",
    variables: [
      "menuBorder",
      "menuShadow"
    ]
  }
};
export const Textarea = {
  textarea: {
    contents: "css`\n  background: ${t.textareaBg};\n  border: 1px solid ${t.borderColorGrayLight};\n  border-top-color: ${t.textareaBorderTopColor};\n  color: ${t.textareaColor};\n  min-height: ${t.controlHeightSmall};\n  box-shadow: ${t.textareaShadow};\n\n  &:focus {\n    border-color: ${t.borderColorFocus};\n    box-shadow: 0 0 0 1px ${t.borderColorFocus};\n\n    &::placeholder {\n      color: ${t.placeholderColorLight};\n    }\n  }\n  &:disabled {\n    color: ${t.textColorDisabled};\n    background: ${t.textareaDisabledBg};\n    border-color: ${t.textareaDisabledBorderColor};\n  }\n\n  &::placeholder {\n    color: ${t.placeholderColor};\n  }\n\n  &:-moz-placeholder {\n    color: inherit; // Need to be discussed\n  }\n\n  &::-moz-placeholder {\n    color: inherit;\n  }\n`",
    variables: [
      "textareaBg",
      "borderColorGrayLight",
      "textareaBorderTopColor",
      "textareaColor",
      "controlHeightSmall",
      "textareaShadow",
      "borderColorFocus",
      "placeholderColorLight",
      "textColorDisabled",
      "textareaDisabledBg",
      "textareaDisabledBorderColor",
      "placeholderColor"
    ]
  },
  error: {
    contents: "css`\n  .${styles.textarea}& {\n    border-color: ${t.errorMain};\n    box-shadow: 0 0 0 1px ${t.errorMain};\n  }\n  .${styles.textarea}&:focus {\n    border-color: ${t.errorMain};\n    box-shadow: 0 0 0 1px ${t.errorMain};\n  }\n`",
    variables: [
      "errorMain"
    ]
  },
  warning: {
    contents: "css`\n  .${styles.textarea}& {\n    border-color: ${t.warningMain};\n    box-shadow: 0 0 0 1px ${t.warningMain};\n  }\n  .${styles.textarea}&:focus {\n    border-color: ${t.warningMain};\n    box-shadow: 0 0 0 1px ${t.warningMain};\n  }\n`",
    variables: [
      "warningMain"
    ]
  }
};
export const Logotype = {
  root: {
    contents: "css`\n  color: ${t.logoColor};\n\n  &:hover {\n    color: ${t.logoHoverColor};\n  }\n`",
    variables: [
      "logoColor",
      "logoHoverColor"
    ]
  },
  divider: {
    contents: "css`\n  background-color: ${t.tdDividerBg};\n`",
    variables: [
      "tdDividerBg"
    ]
  }
};
export const Indicator = {
  root: {
    contents: "css`\n  background: ${t.borderColorFocus};\n`",
    variables: [
      "borderColorFocus"
    ]
  },
  primary: {
    contents: "css`\n  background: ${t.btnPrimaryBg};\n`",
    variables: [
      "btnPrimaryBg"
    ]
  },
  success: {
    contents: "css`\n  background: ${t.btnSuccessBg};\n`",
    variables: [
      "btnSuccessBg"
    ]
  },
  warning: {
    contents: "css`\n  background: ${t.btnPayBg};\n`",
    variables: [
      "btnPayBg"
    ]
  },
  error: {
    contents: "css`\n  background: ${t.btnDangerBg};\n`",
    variables: [
      "btnDangerBg"
    ]
  }
};
export const MenuHeader = {
  withLeftPadding: {
    contents: "css`\n  .${styles.root}& {\n    padding-left: ${t.menuItemPaddingForIcon};\n  }\n`",
    variables: [
      "menuItemPaddingForIcon"
    ]
  }
};
export const Switcher = {
  error: {
    contents: "css`\n  box-shadow: 0 0 0 2px ${t.errorMain};\n`",
    variables: [
      "errorMain"
    ]
  }
};
export const MenuSeparator = {
  root: {
    contents: "css`\n  border-top: 1px solid ${t.menuSeparatorBorderColor};\n`",
    variables: [
      "menuSeparatorBorderColor"
    ]
  }
};
export const MenuItem = {
  hover: {
    contents: "css`\n  background: ${t.dropdownMenuHoverBg};\n  color: ${t.textColorInvert} !important;\n`",
    variables: [
      "dropdownMenuHoverBg",
      "textColorInvert"
    ]
  },
  selected: {
    contents: "css`\n  background: ${t.dropdownMenuSelectedBg};\n`",
    variables: [
      "dropdownMenuSelectedBg"
    ]
  },
  disabled: {
    contents: "css`\n  color: ${t.textColorDisabled};\n`",
    variables: [
      "textColorDisabled"
    ]
  },
  link: {
    contents: "css`\n  color: ${t.linkColor};\n`",
    variables: [
      "linkColor"
    ]
  },
  withIcon: {
    contents: "css`\n  padding-left: ${t.menuItemPaddingForIcon};\n`",
    variables: [
      "menuItemPaddingForIcon"
    ]
  }
};
export const Colors = {
  defaultIdle: {
    contents: "css`\n  background-color: ${t.grayXLight};\n  color: ${ColorFunctions.contrast(t.grayXLight)};\n  border: 1px solid ${ColorFunctions.darken(t.grayXLight, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.grayXLight)};\n  }\n`",
    variables: [
      "grayXLight"
    ]
  },
  defaultActive: {
    contents: "css`\n  background-color: ${t.brand};\n  color: ${ColorFunctions.contrast(t.brand)};\n  border: 1px solid ${ColorFunctions.darken(t.brand, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.brand)};\n  }\n`",
    variables: [
      "brand"
    ]
  },
  grayIdle: {
    contents: "css`\n  background-color: ${t.grayXLight};\n  color: ${ColorFunctions.contrast(t.grayXLight)};\n  border: 1px solid ${ColorFunctions.darken(t.grayXLight, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.grayXLight)};\n  }\n`",
    variables: [
      "grayXLight"
    ]
  },
  grayActive: {
    contents: "css`\n  background-color: ${t.grayDark};\n  color: ${ColorFunctions.contrast(t.grayDark)};\n  border: 1px solid ${ColorFunctions.darken(t.grayDark, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.grayDark)};\n  }\n`",
    variables: [
      "grayDark"
    ]
  },
  blueIdle: {
    contents: "css`\n  background-color: ${t.blueLight};\n  color: ${ColorFunctions.contrast(t.blueLight)};\n  border: 1px solid ${ColorFunctions.darken(t.blueLight, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.blueLight)};\n  }\n`",
    variables: [
      "blueLight"
    ]
  },
  blueActive: {
    contents: "css`\n  background-color: ${t.blueDark};\n  color: ${ColorFunctions.contrast(t.blueDark)};\n  border: 1px solid ${ColorFunctions.darken(t.blueDark, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.blueDark)};\n  }\n`",
    variables: [
      "blueDark"
    ]
  },
  greenIdle: {
    contents: "css`\n  background-color: ${t.greenXxLight};\n  color: ${ColorFunctions.contrast(t.greenXxLight)};\n  border: 1px solid ${ColorFunctions.darken(t.greenXxLight, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.greenXxLight)};\n  }\n`",
    variables: [
      "greenXxLight"
    ]
  },
  greenActive: {
    contents: "css`\n  background-color: ${t.greenDark};\n  color: ${ColorFunctions.contrast(t.greenDark)};\n  border: 1px solid ${ColorFunctions.darken(t.greenDark, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.greenDark)};\n  }\n`",
    variables: [
      "greenDark"
    ]
  },
  yellowIdle: {
    contents: "css`\n  background-color: ${t.yellowXxLight};\n  color: ${ColorFunctions.contrast(t.yellowXxLight)};\n  border: 1px solid ${ColorFunctions.darken(t.yellowXxLight, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.yellowXxLight)};\n  }\n`",
    variables: [
      "yellowXxLight"
    ]
  },
  yellowActive: {
    contents: "css`\n  background-color: ${t.yellowDark};\n  color: ${ColorFunctions.contrast(t.yellowDark)};\n  border: 1px solid ${ColorFunctions.darken(t.yellowDark, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.yellowDark)};\n  }\n`",
    variables: [
      "yellowDark"
    ]
  },
  redIdle: {
    contents: "css`\n  background-color: ${t.redXxLight};\n  color: ${ColorFunctions.contrast(t.redXxLight)};\n  border: 1px solid ${ColorFunctions.darken(t.redXxLight, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.redXxLight)};\n  }\n`",
    variables: [
      "redXxLight"
    ]
  },
  redActive: {
    contents: "css`\n  background-color: ${t.redDark};\n  color: ${ColorFunctions.contrast(t.redDark)};\n  border: 1px solid ${ColorFunctions.darken(t.redDark, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.redDark)};\n  }\n`",
    variables: [
      "redDark"
    ]
  },
  white: {
    contents: "css`\n  background-color: ${t.white};\n  color: ${ColorFunctions.contrast(t.white)};\n  border: 1px solid ${ColorFunctions.darken(t.white, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.white)};\n  }\n`",
    variables: [
      "white"
    ]
  },
  black: {
    contents: "css`\n  background-color: ${t.black};\n  color: ${ColorFunctions.contrast(t.black)};\n  border: 1px solid ${ColorFunctions.darken(t.black, '5%')};\n\n  & [data-name='RemoveIcon']:hover {\n    color: ${ColorFunctions.contrast(t.black)};\n  }\n`",
    variables: [
      "black"
    ]
  }
};
export const Modal = {
  bg: {
    contents: "css`\n  background: ${t.modalBackBg};\n  opacity: ${t.modalBackOpacity};\n`",
    variables: [
      "modalBackBg",
      "modalBackOpacity"
    ]
  },
  window: {
    contents: "css`\n  background: ${t.bgDefault};\n`",
    variables: [
      "bgDefault"
    ]
  },
  close: {
    contents: "css`\n  &.${styles.disabled} {\n    color: ${t.modalCloseButtonDisabledColor};\n  }\n\n  &:after,\n  &:before {\n    background: ${t.modalCloseButtonColor};\n  }\n\n  &:focus::before,\n  &:focus::after,\n  &:hover::before,\n  &:hover::after {\n    background: ${t.modalCloseButtonHoverColor};\n  }\n\n  &:focus {\n    &.${styles.closeOutline} {\n      border: 2px solid ${t.borderColorFocus};\n    }\n  }\n`",
    variables: [
      "modalCloseButtonDisabledColor",
      "modalCloseButtonColor",
      "modalCloseButtonHoverColor",
      "borderColorFocus"
    ]
  },
  footer: {
    contents: "css`\n  &.${styles.panel} {\n    background: ${t.modalFooterBg};\n  }\n`",
    variables: [
      "modalFooterBg"
    ]
  },
  fixedHeader: {
    contents: "css`\n  background: ${t.modalFixedHeaderBg};\n\n  &:after {\n    box-shadow: ${t.modalFixedHeaderShadow};\n  }\n`",
    variables: [
      "modalFixedHeaderBg",
      "modalFixedHeaderShadow"
    ]
  },
  fixedFooter: {
    contents: "css`\n  background: ${t.modalFixedHeaderBg};\n\n  &:before {\n    box-shadow: ${t.modalFixedFooterShadow};\n  }\n`",
    variables: [
      "modalFixedHeaderBg",
      "modalFixedFooterShadow"
    ]
  }
};
export const Token = {
  warning: {
    contents: "css`\n  .${styles.token}& {\n    border: 1px solid ${t.warningMain};\n    box-shadow: 0 0 0 1px ${t.warningMain};\n  }\n`",
    variables: [
      "warningMain"
    ]
  },
  error: {
    contents: "css`\n  .${styles.token}& {\n    border: 1px solid ${t.errorMain};\n    box-shadow: 0 0 0 1px ${t.errorMain};\n  }\n`",
    variables: [
      "errorMain"
    ]
  }
};
export const TokenInput = {
  warning: {
    contents: "css`\n  .${styles.root} .${styles.label}& {\n    border: 1px solid ${t.warningMain};\n    box-shadow: 0 0 0 1px ${t.warningMain};\n  }\n`",
    variables: [
      "warningMain"
    ]
  },
  error: {
    contents: "css`\n  .${styles.root} .${styles.label}& {\n    border: 1px solid ${t.errorMain};\n    box-shadow: 0 0 0 1px ${t.errorMain};\n  }\n`",
    variables: [
      "errorMain"
    ]
  },
  label: {
    contents: "css`\n  .${styles.root} & {\n    background: ${t.bgDefault};\n    border: 1px solid ${t.borderColorGrayLight};\n    border-top-color: ${t.borderColorGrayDark};\n  }\n`",
    variables: [
      "bgDefault",
      "borderColorGrayLight",
      "borderColorGrayDark"
    ]
  },
  labelFocused: {
    contents: "css`\n  .${styles.root} & {\n    border: 1px solid ${t.borderColorFocus};\n    box-shadow: 0 0 0 1px ${t.borderColorFocus};\n  }\n`",
    variables: [
      "borderColorFocus"
    ]
  },
  input: {
    contents: "css`\n  .${styles.root} &::placeholder {\n    color: ${t.placeholderColor};\n  }\n  .${styles.root} &:focus::placeholder {\n    color: ${t.placeholderColorLight};\n  }\n`",
    variables: [
      "placeholderColor",
      "placeholderColorLight"
    ]
  }
};
export const Paging = {
  dots: {
    contents: "css`\n  color: ${t.pagingDotsColor};\n`",
    variables: [
      "pagingDotsColor"
    ]
  },
  forwardLink: {
    contents: "css`\n  color: ${t.linkColor};\n`",
    variables: [
      "linkColor"
    ]
  },
  disabled: {
    contents: "css`\n  .${styles.forwardLink}& {\n    color: ${t.textColorDisabled};\n  }\n`",
    variables: [
      "textColorDisabled"
    ]
  },
  pageLink: {
    contents: "css`\n  .${styles.pageLinkWrapper} & {\n    color: ${t.linkColor};\n  }\n  .${styles.pageLinkWrapper} &:not(.${styles.active}):hover {\n    background: ${t.pagingPageLinkHoverBg};\n  }\n`",
    variables: [
      "linkColor",
      "pagingPageLinkHoverBg"
    ]
  },
  active: {
    contents: "css`\n  .${styles.pageLinkWrapper} .${styles.pageLink}& {\n    background: ${t.pagingPageLinkActiveBg};\n    color: ${t.pagingPageLinkActiveColor};\n  }\n`",
    variables: [
      "pagingPageLinkActiveBg",
      "pagingPageLinkActiveColor"
    ]
  },
  focused: {
    contents: "css`\n  .${styles.pageLinkWrapper} .${styles.pageLink}& {\n    border: solid 2px ${t.borderColorFocus};\n  }\n`",
    variables: [
      "borderColorFocus"
    ]
  },
  pageLinkHint: {
    contents: "css`\n  .${styles.pageLinkWrapper} & {\n    color: ${t.pagingPageLinkHintColor};\n  }\n`",
    variables: [
      "pagingPageLinkHintColor"
    ]
  }
};
export const TopBar = {
  root: {
    contents: "css`\n  background: ${t.tbBg};\n  box-shadow: ${t.tbShadow};\n`",
    variables: [
      "tbBg",
      "tbShadow"
    ]
  },
  divider: {
    contents: "css`\n  background-color: ${t.tdDividerBg};\n`",
    variables: [
      "tdDividerBg"
    ]
  }
};