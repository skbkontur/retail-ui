export default {
  root: {
    contents: "css`\n  color: ${t.textColorDefault};\n  border-radius: ${t.btnBorderRadius};\n`",
    variables: [
      "textColorDefault",
      "btnBorderRadius"
    ]
  },
  warning: {
    contents: "css`\n  .${classes.root}:not(.${classes.link}) & {\n    box-shadow: 0 0 0 2px ${t.borderColorWarning};\n  }\n`",
    variables: [
      "borderColorWarning"
    ]
  },
  warningRoot: {
    contents: "css`\n  .${classes.root}.${classes.focus}& {\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};\n  }\n  .${classes.root}.${classes.checked}.${classes.focus}& {\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};\n  }\n`",
    variables: [
      "outlineColorFocus"
    ]
  },
  error: {
    contents: "css`\n  .${classes.root}:not(.${classes.link}) & {\n    box-shadow: 0 0 0 2px ${t.borderColorError};\n  }\n  .${classes.wrap} .${classes.root}.${classes.link} & {\n    background: ${t.errorSecondary};\n  }\n`",
    variables: [
      "borderColorError",
      "errorSecondary"
    ]
  },
  errorRoot: {
    contents: "css`\n  .${classes.root}.${classes.focus}& {\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};\n  }\n  .${classes.root}.${classes.checked}.${classes.focus}& {\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};\n  }\n`",
    variables: [
      "outlineColorFocus"
    ]
  },
  sizeSmall: {
    contents: "css`\n  border-radius: ${t.btnSmallBorderRadius};\n\n  &:not(.${classes.link}) {\n    height: ${DimensionFunctions.shift(t.controlHeightSmall, t.btnHeightShift)};\n    padding: ${t.controlPaddingYSmall} 15px;\n    line-height: ${t.controlLineHeightSmall};\n\n    .rt-ie-any & {\n      padding-top: ${DimensionFunctions.shift(t.controlPaddingYSmall, '-1')};\n      padding-bottom: ${DimensionFunctions.shift(t.controlPaddingYSmall, '1')};\n    }\n  }\n\n  .${classes.arrow} {\n    right: ${t.btnSmallArrowRight};\n    height: ${t.btnSmallArrowLength};\n    width: ${t.btnSmallArrowLength};\n    border-radius: ${t.btnSmallArrowBorderRadius};\n  }\n\n  .${classes.arrow_left} {\n    left: ${t.btnSmallArrowLeft};\n  }\n`",
    variables: [
      "btnSmallBorderRadius",
      "controlHeightSmall",
      "btnHeightShift",
      "controlPaddingYSmall",
      "controlLineHeightSmall",
      "btnSmallArrowRight",
      "btnSmallArrowLength",
      "btnSmallArrowBorderRadius",
      "btnSmallArrowLeft"
    ]
  },
  sizeMedium: {
    contents: "css`\n  &:not(.${classes.link}) {\n    padding: ${DimensionFunctions.shift(t.controlPaddingYMedium, '-1')} 15px\n      ${DimensionFunctions.shift(t.controlPaddingYMedium, '1')};\n    height: ${DimensionFunctions.shift(t.controlHeightMedium, t.btnHeightShift)};\n    line-height: ${t.controlLineHeightMedium};\n\n    .rt-ie-any & {\n      padding-top: ${DimensionFunctions.shift(t.controlPaddingYMedium, '-2')};\n      padding-bottom: ${DimensionFunctions.shift(t.controlPaddingYMedium, ' 2')};\n    }\n\n    .${classes.arrow} {\n      transform: ${t.btnMediumArrowTransform};\n    }\n\n    .${classes.arrow_left} {\n      left: ${t.btnMediumArrowLeft};\n    }\n\n    .${classes.arrow_left}.${classes.arrow_loading}::before {\n      left: ${t.btnMediumArrowLeftLoadingLeft};\n    }\n  }\n`",
    variables: [
      "controlPaddingYMedium",
      "controlHeightMedium",
      "btnHeightShift",
      "controlLineHeightMedium",
      "btnMediumArrowTransform",
      "btnMediumArrowLeft",
      "btnMediumArrowLeftLoadingLeft"
    ]
  },
  DEPRECATED_sizeMedium: {
    contents: "css`\n  font-size: ${t.btnDeprecatedSizeMediumFontSize};\n\n  &:not(.${classes.link}) {\n    height: ${DimensionFunctions.shift(t.controlHeightMedium, t.btnHeightShift)};\n    padding: ${DimensionFunctions.shift(t.controlPaddingYMedium, `-${t.btnDeprecatedSizeMediumPaddingShift || 0}`)}\n      15px ${DimensionFunctions.shift(t.controlPaddingYMedium, t.btnDeprecatedSizeMediumPaddingShift)};\n    line-height: ${t.controlLineHeightSmall};\n\n    .rt-ie-any & {\n      padding-top: ${DimensionFunctions.shift(\n        t.controlPaddingYMedium,\n        `-${t.btnDeprecatedSizeMediumPaddingShiftIe}`,\n      )};\n      padding-bottom: ${DimensionFunctions.shift(t.controlPaddingYMedium, t.btnDeprecatedSizeMediumPaddingShiftIe)};\n    }\n\n    .${classes.arrow} {\n      transform: ${t.btnMediumArrowTransform};\n    }\n\n    .${classes.arrow_left} {\n      left: ${t.btnMediumArrowLeft};\n    }\n\n    .${classes.arrow_left}.${classes.arrow_loading}::before {\n      left: ${t.btnMediumArrowLeftLoadingLeft};\n    }\n  }\n`",
    variables: [
      "btnDeprecatedSizeMediumFontSize",
      "controlHeightMedium",
      "btnHeightShift",
      "controlPaddingYMedium",
      "btnDeprecatedSizeMediumPaddingShift",
      "controlLineHeightSmall",
      "btnDeprecatedSizeMediumPaddingShiftIe",
      "btnMediumArrowTransform",
      "btnMediumArrowLeft",
      "btnMediumArrowLeftLoadingLeft"
    ]
  },
  sizeLarge: {
    contents: "css`\n  &:not(.${classes.link}) {\n    padding: ${DimensionFunctions.shift(t.controlPaddingYLarge, '-1')} 20px\n      ${DimensionFunctions.shift(t.controlPaddingYLarge, '1')};\n    height: ${DimensionFunctions.shift(t.controlHeightLarge, t.btnHeightShift)};\n    line-height: ${t.controlLineHeightLarge};\n\n    .rt-ie-any & {\n      padding-top: ${DimensionFunctions.shift(t.controlPaddingYLarge, '-2')};\n      padding-bottom: ${DimensionFunctions.shift(t.controlPaddingYLarge, '2')};\n    }\n\n    .${classes.arrow} {\n      transform: ${t.btnLargeArrowTransform};\n    }\n\n    .${classes.arrow_left} {\n      left: ${t.btnLargeArrowLeft};\n    }\n\n    .${classes.arrow}.${classes.arrow_loading}::before {\n      background: ${t.btnLargeArrowBg};\n    }\n  }\n`",
    variables: [
      "controlPaddingYLarge",
      "controlHeightLarge",
      "btnHeightShift",
      "controlLineHeightLarge",
      "btnLargeArrowTransform",
      "btnLargeArrowLeft",
      "btnLargeArrowBg"
    ]
  },
  link: {
    contents: "css`\n  color: ${t.linkColor};\n\n  &:hover {\n    color: ${t.linkHoverColor};\n    text-decoration: ${t.linkHoverTextDecoration};\n  }\n  &:active {\n    color: ${t.linkActiveColor};\n  }\n`",
    variables: [
      "linkColor",
      "linkHoverColor",
      "linkHoverTextDecoration",
      "linkActiveColor"
    ]
  },
  focus: {
    contents: "css`\n  .${classes.link}& {\n    color: ${t.linkColor};\n    text-decoration: ${t.linkHoverTextDecoration};\n  }\n  .${classes.root}&:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}) {\n    border: ${t.btnFocusBorder};\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} ${t.borderColorFocus};\n  }\n  .${classes.root}.${classes.checked}&:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}) {\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} #5199db;\n  }\n  .${classes.root}&:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}).${classes.errorRoot} {\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};\n  }\n  .${classes.root}&:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}).${classes.active} {\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} ${t.borderColorFocus};\n  }\n  .${classes.root}&:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}).${\n  classes.warningRoot\n} {\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};\n  }\n`",
    variables: [
      "linkColor",
      "linkHoverTextDecoration",
      "btnFocusBorder",
      "outlineColorFocus",
      "btnFocusShadowWidth",
      "borderColorFocus"
    ]
  },
  disabled: {
    contents: "css`\n  .${classes.wrap} .${classes.root}&:not(.${classes.link}) {\n    background: ${t.bgDisabled};\n  }\n  .${classes.root}& {\n    box-shadow: ${t.btnDisabledShadow};\n  }\n`",
    variables: [
      "bgDisabled",
      "btnDisabledShadow"
    ]
  },
  arrow: {
    contents: "css`\n  .${classes.root}.${classes.focus} & {\n    box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};\n  }\n  .${classes.root}.${classes.focus}:hover & {\n    box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};\n  }\n  .${classes.root}.${classes.focus}:active & {\n    box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};\n  }\n  .${classes.root}.${classes.focus}.${classes.active} & {\n    box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};\n  }\n  .${classes.root}.${classes.checked} & {\n    background: ${t.btnCheckedBg};\n    box-shadow: ${t.btnCheckedShadowArrow};\n  }\n  .${classes.root}.${classes.checked}:hover & {\n    background: ${t.btnCheckedBg};\n    box-shadow: ${t.btnCheckedShadowArrowLeft};\n  }\n\n  .${classes.root}.${classes.checked}.${classes.focus} & {\n    box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};\n  }\n  .${classes.root}.${classes.disabled} & {\n    background: ${t.btnDisabledBg};\n    box-shadow: 1px -1px 0 0 ${t.btnDisabledShadowColor};\n  }\n`",
    variables: [
      "outlineColorFocus",
      "borderColorFocus",
      "btnCheckedBg",
      "btnCheckedShadowArrow",
      "btnCheckedShadowArrowLeft",
      "btnDisabledBg",
      "btnDisabledShadowColor"
    ]
  },
  arrow_left: {
    contents: "css`\n  .${classes.root}.${classes.default}.${classes.checked} & {\n    box-shadow: ${t.btnDefaultCheckedShadowArrow};\n  }\n  .${classes.root}.${classes.checked} & {\n    background: ${t.btnCheckedBg};\n    box-shadow: ${t.btnCheckedShadowArrowLeft};\n  }\n  .${classes.root}.${classes.checked}:hover & {\n    background: ${t.btnCheckedBg};\n    box-shadow: ${t.btnCheckedShadowArrowLeft};\n  }\n`",
    variables: [
      "btnDefaultCheckedShadowArrow",
      "btnCheckedBg",
      "btnCheckedShadowArrowLeft"
    ]
  },
  arrow_warning: {
    contents: "css`\n  .${classes.root} .${classes.arrow}& {\n    box-shadow: 2px -2px 0 0 ${t.borderColorWarning};\n  }\n  .${classes.root}.${classes.focus} .${classes.arrow}& {\n    box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorWarning};\n  }\n  .${classes.root}.${classes.checked} .${classes.arrow}& {\n    box-shadow: inset 0 4px 2px -3px ${t.btnCheckedShadowColorArrow}, 2px -2px 0 0 ${t.borderColorWarning};\n  }\n  .${classes.root}.${classes.checked}.${classes.focus} .${classes.arrow}& {\n    box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorWarning};\n  }\n  .${classes.root}.${classes.disabled} .${classes.arrow}& {\n    box-shadow: 2px -2px 0 0 ${t.borderColorWarning};\n  }\n`",
    variables: [
      "borderColorWarning",
      "outlineColorFocus",
      "btnCheckedShadowColorArrow"
    ]
  },
  arrow_error: {
    contents: "css`\n  .${classes.root} .${classes.arrow}& {\n    box-shadow: 2px -2px 0 0 ${t.borderColorError};\n  }\n  .${classes.root}.${classes.focus} .${classes.arrow}& {\n    box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorError};\n  }\n  .${classes.root}.${classes.checked} .${classes.arrow}& {\n    box-shadow: inset 0 4px 2px -3px ${t.btnCheckedShadowColorArrow}, 2px -2px 0 0 ${t.borderColorError};\n  }\n  .${classes.root}.${classes.checked}.${classes.focus} .${classes.arrow}& {\n    box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorError};\n  }\n  .${classes.root}.${classes.disabled} .${classes.arrow}& {\n    box-shadow: 2px -2px 0 0 ${t.borderColorError};\n  }\n`",
    variables: [
      "borderColorError",
      "outlineColorFocus",
      "btnCheckedShadowColorArrow"
    ]
  },
  default: {
    contents: "css`\n  background: ${\n    t.btnDefaultBgStart === t.btnDefaultBgEnd\n      ? t.btnDefaultBgStart\n      : `linear-gradient(${t.btnDefaultBgStart}, ${t.btnDefaultBgEnd})`\n  };\n  color: ${t.btnDefaultTextColor};\n  border: ${t.btnDefaultBorder};\n  box-shadow: ${t.btnDefaultShadow};\n\n  .${classes.arrow} {\n    background: ${\n      t.btnDefaultBgArrowStart === t.btnDefaultBgArrowEnd\n        ? t.btnDefaultBgArrowStart\n        : `linear-gradient(to bottom right, ${t.btnDefaultBgArrowStart}, ${t.btnDefaultBgArrowEnd})`\n    };\n    box-shadow: ${t.btnDefaultShadowArrow};\n  }\n  .${classes.root}.${classes.checked}& .${classes.arrow} {\n    box-shadow: ${t.btnDefaultCheckedShadowArrow};\n  }\n  .${classes.root}.${classes.checked}& .${classes.arrow_left} {\n    box-shadow: ${t.btnDefaultCheckedShadowArrow};\n  }\n  .${classes.arrow_left} {\n    background: ${\n      t.btnDefaultBgArrowStart === t.btnDefaultBgArrowEnd\n        ? t.btnDefaultBgArrowStart\n        : `linear-gradient(to top left, ${t.btnDefaultBgArrowStart}, ${t.btnDefaultBgArrowEnd})`\n    };\n    box-shadow: ${t.btnDefaultShadowArrowLeft};\n  }\n\n  &:hover {\n    background: ${\n      t.btnDefaultHoverBgStart === t.btnDefaultHoverBgEnd\n        ? t.btnDefaultHoverBgStart\n        : `linear-gradient(${t.btnDefaultHoverBgStart}, ${t.btnDefaultHoverBgEnd})`\n    };\n    box-shadow: ${t.btnDefaultHoverShadow};\n    border-color: ${t.btnDefaultHoverBorderColor};\n\n    .${classes.arrow} {\n      background: ${\n        t.btnDefaultHoverBgStart === t.btnDefaultHoverBgEnd\n          ? t.btnDefaultHoverBgStart\n          : `linear-gradient(to bottom right, ${t.btnDefaultHoverBgStart}, ${t.btnDefaultHoverBgEnd})`\n      };\n      box-shadow: ${t.btnDefaultHoverShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      background: ${\n        t.btnDefaultHoverBgStart === t.btnDefaultHoverBgEnd\n          ? t.btnDefaultHoverBgStart\n          : `linear-gradient(to top left, ${t.btnDefaultHoverBgStart}, ${t.btnDefaultHoverBgEnd})`\n      };\n      box-shadow: ${t.btnDefaultHoverShadowArrowLeft};\n    }\n  }\n\n  &:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading}):active {\n    background: ${t.btnDefaultActiveBg};\n    box-shadow: ${t.btnDefaultActiveShadow};\n\n    .${classes.arrow} {\n      background: ${t.btnDefaultActiveBg};\n      box-shadow: ${t.btnDefaultActiveShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      box-shadow: ${t.btnDefaultActiveShadowArrowLeft};\n    }\n  }\n\n  .${classes.active}&:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading})& {\n    background: ${t.btnDefaultActiveBg};\n    box-shadow: ${t.btnDefaultActiveShadow};\n\n    .${classes.arrow} {\n      background: ${t.btnDefaultActiveBg};\n      box-shadow: ${t.btnDefaultActiveShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      box-shadow: ${t.btnDefaultActiveShadowArrowLeft};\n    }\n  }\n`",
    variables: [
      "btnDefaultBgStart",
      "btnDefaultBgEnd",
      "btnDefaultTextColor",
      "btnDefaultBorder",
      "btnDefaultShadow",
      "btnDefaultBgArrowStart",
      "btnDefaultBgArrowEnd",
      "btnDefaultShadowArrow",
      "btnDefaultCheckedShadowArrow",
      "btnDefaultShadowArrowLeft",
      "btnDefaultHoverBgStart",
      "btnDefaultHoverBgEnd",
      "btnDefaultHoverShadow",
      "btnDefaultHoverBorderColor",
      "btnDefaultHoverShadowArrow",
      "btnDefaultHoverShadowArrowLeft",
      "btnDefaultActiveBg",
      "btnDefaultActiveShadow",
      "btnDefaultActiveShadowArrow",
      "btnDefaultActiveShadowArrowLeft"
    ]
  },
  primary: {
    contents: "css`\n  background: ${\n    t.btnPrimaryBgStart === t.btnPrimaryBgEnd\n      ? t.btnPrimaryBgStart\n      : `linear-gradient(${t.btnPrimaryBgStart}, ${t.btnPrimaryBgEnd})`\n  };\n  color: ${t.btnPrimaryTextColor};\n  border: ${t.btnPrimaryBorder};\n  box-shadow: ${t.btnPrimaryShadow};\n\n  .${classes.arrow} {\n    background: ${\n      t.btnPrimaryBgArrowStart === t.btnPrimaryBgArrowEnd\n        ? t.btnPrimaryBgArrowStart\n        : `linear-gradient(to bottom right, ${t.btnPrimaryBgArrowStart}, ${t.btnPrimaryBgArrowEnd})`\n    };\n    box-shadow: ${t.btnPrimaryShadowArrow};\n  }\n\n  .${classes.arrow_left} {\n    background: ${\n      t.btnPrimaryBgArrowStart === t.btnPrimaryBgArrowEnd\n        ? t.btnPrimaryBgArrowStart\n        : `linear-gradient(to top left, ${t.btnPrimaryBgArrowStart}, ${t.btnPrimaryBgArrowEnd})`\n    };\n    box-shadow: ${t.btnPrimaryShadowArrowLeft};\n  }\n\n  &:hover {\n    background: ${\n      t.btnPrimaryHoverBgStart === t.btnPrimaryHoverBgEnd\n        ? t.btnPrimaryHoverBgStart\n        : `linear-gradient(${t.btnPrimaryHoverBgStart}, ${t.btnPrimaryHoverBgEnd})`\n    };\n    box-shadow: ${t.btnPrimaryHoverShadow};\n    border-color: ${t.btnPrimaryHoverBg};\n\n    .${classes.arrow} {\n      background: ${\n        t.btnPrimaryHoverBgStart === t.btnPrimaryHoverBgEnd\n          ? t.btnPrimaryHoverBgStart\n          : `linear-gradient(to bottom right, ${t.btnPrimaryHoverBgStart}, ${t.btnPrimaryHoverBgEnd})`\n      };\n      box-shadow: ${t.btnPrimaryHoverShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      background: ${\n        t.btnPrimaryHoverBgStart === t.btnPrimaryHoverBgEnd\n          ? t.btnPrimaryHoverBgStart\n          : `linear-gradient(to top left, ${t.btnPrimaryHoverBgStart}, ${t.btnPrimaryHoverBgEnd}`\n      };\n      box-shadow: ${t.btnPrimaryHoverShadowArrowLeft};\n    }\n  }\n\n  &:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading}):active {\n    background: ${t.btnPrimaryActiveBg};\n    box-shadow: ${t.btnPrimaryActiveShadow};\n\n    .${classes.arrow} {\n      background: ${t.btnPrimaryActiveBg};\n      box-shadow: ${t.btnPrimaryActiveShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      box-shadow: ${t.btnPrimaryActiveShadowArrowLeft};\n    }\n  }\n  .${classes.active}:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading})& {\n    background: ${t.btnPrimaryActiveBg};\n    box-shadow: ${t.btnPrimaryActiveShadow};\n\n    .${classes.arrow} {\n      background: ${t.btnPrimaryActiveBg};\n      box-shadow: ${t.btnPrimaryActiveShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      box-shadow: ${t.btnPrimaryActiveShadowArrowLeft};\n    }\n  }\n`",
    variables: [
      "btnPrimaryBgStart",
      "btnPrimaryBgEnd",
      "btnPrimaryTextColor",
      "btnPrimaryBorder",
      "btnPrimaryShadow",
      "btnPrimaryBgArrowStart",
      "btnPrimaryBgArrowEnd",
      "btnPrimaryShadowArrow",
      "btnPrimaryShadowArrowLeft",
      "btnPrimaryHoverBgStart",
      "btnPrimaryHoverBgEnd",
      "btnPrimaryHoverShadow",
      "btnPrimaryHoverBg",
      "btnPrimaryHoverShadowArrow",
      "btnPrimaryHoverShadowArrowLeft",
      "btnPrimaryActiveBg",
      "btnPrimaryActiveShadow",
      "btnPrimaryActiveShadowArrow",
      "btnPrimaryActiveShadowArrowLeft"
    ]
  },
  success: {
    contents: "css`\n  background: ${\n    t.btnSuccessBgStart === t.btnSuccessBgEnd\n      ? t.btnSuccessBgStart\n      : `linear-gradient(${t.btnSuccessBgStart}, ${t.btnSuccessBgEnd})`\n  };\n  color: ${t.btnSuccessTextColor};\n  border: ${t.btnSuccessBorder};\n  box-shadow: ${t.btnSuccessShadow};\n\n  .${classes.arrow} {\n    background: ${\n      t.btnSuccessBgArrowStart === t.btnSuccessBgArrowEnd\n        ? t.btnSuccessBgArrowStart\n        : `linear-gradient(to bottom right, ${t.btnSuccessBgArrowStart}, ${t.btnSuccessBgArrowEnd})`\n    };\n    box-shadow: ${t.btnSuccessShadowArrow};\n  }\n\n  .${classes.arrow_left} {\n    background: ${\n      t.btnSuccessBgArrowStart === t.btnSuccessBgArrowEnd\n        ? t.btnSuccessBgArrowStart\n        : `linear-gradient(to top left, ${t.btnSuccessBgArrowStart}, ${t.btnSuccessBgArrowEnd})`\n    };\n    box-shadow: ${t.btnSuccessShadowArrowLeft};\n  }\n\n  &:hover {\n    background: ${\n      t.btnSuccessHoverBgStart === t.btnSuccessHoverBgEnd\n        ? t.btnSuccessHoverBgStart\n        : `linear-gradient(${t.btnSuccessHoverBgStart}, ${t.btnSuccessHoverBgEnd})`\n    };\n    box-shadow: ${t.btnSuccessHoverShadow};\n    border-color: ${t.btnSuccessHoverBg};\n\n    .${classes.arrow} {\n      background: ${\n        t.btnSuccessHoverBgStart === t.btnSuccessHoverBgEnd\n          ? t.btnSuccessHoverBgStart\n          : `linear-gradient(to bottom right, ${t.btnSuccessHoverBgStart}, ${t.btnSuccessHoverBgEnd})`\n      };\n      box-shadow: ${t.btnSuccessHoverShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      background: ${\n        t.btnSuccessHoverBgStart === t.btnSuccessHoverBgEnd\n          ? t.btnSuccessHoverBgStart\n          : `linear-gradient(to top left, ${t.btnSuccessHoverBgStart}, ${t.btnSuccessHoverBgEnd})`\n      };\n      box-shadow: ${t.btnSuccessHoverShadowArrowLeft};\n    }\n  }\n\n  &:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading}):active {\n    background: ${t.btnSuccessActiveBg};\n    box-shadow: ${t.btnSuccessActiveShadow};\n\n    .${classes.arrow} {\n      background: ${t.btnSuccessActiveBg};\n      box-shadow: ${t.btnSuccessActiveShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      box-shadow: ${t.btnSuccessActiveShadowArrowLeft};\n    }\n  }\n  .${classes.active}:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading})& {\n    background: ${t.btnSuccessActiveBg};\n    box-shadow: ${t.btnSuccessActiveShadow};\n\n    .${classes.arrow} {\n      background: ${t.btnSuccessActiveBg};\n      box-shadow: ${t.btnSuccessActiveShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      box-shadow: ${t.btnSuccessActiveShadowArrowLeft};\n    }\n  }\n`",
    variables: [
      "btnSuccessBgStart",
      "btnSuccessBgEnd",
      "btnSuccessTextColor",
      "btnSuccessBorder",
      "btnSuccessShadow",
      "btnSuccessBgArrowStart",
      "btnSuccessBgArrowEnd",
      "btnSuccessShadowArrow",
      "btnSuccessShadowArrowLeft",
      "btnSuccessHoverBgStart",
      "btnSuccessHoverBgEnd",
      "btnSuccessHoverShadow",
      "btnSuccessHoverBg",
      "btnSuccessHoverShadowArrow",
      "btnSuccessHoverShadowArrowLeft",
      "btnSuccessActiveBg",
      "btnSuccessActiveShadow",
      "btnSuccessActiveShadowArrow",
      "btnSuccessActiveShadowArrowLeft"
    ]
  },
  danger: {
    contents: "css`\n  background: ${\n    t.btnDangerBgStart === t.btnDangerBgEnd\n      ? t.btnDangerBgStart\n      : `linear-gradient(${t.btnDangerBgStart}, ${t.btnDangerBgEnd})`\n  };\n  color: ${t.btnDangerTextColor};\n  border: ${t.btnDangerBorder};\n  box-shadow: ${t.btnDangerShadow};\n\n  .${classes.arrow} {\n    background: ${\n      t.btnDangerBgArrowStart === t.btnDangerBgArrowEnd\n        ? t.btnDangerBgArrowStart\n        : `linear-gradient(to bottom right, ${t.btnDangerBgArrowStart}, ${t.btnDangerBgArrowEnd})`\n    };\n    box-shadow: ${t.btnDangerShadowArrow};\n  }\n\n  .${classes.arrow_left} {\n    background: ${\n      t.btnDangerBgArrowStart === t.btnDangerBgArrowEnd\n        ? t.btnDangerBgArrowStart\n        : `linear-gradient(to top left, ${t.btnDangerBgArrowStart}, ${t.btnDangerBgArrowEnd})`\n    };\n    box-shadow: ${t.btnDangerShadowArrowLeft};\n  }\n\n  &:hover {\n    background: ${\n      t.btnDangerBgStart === t.btnDangerBgEnd\n        ? t.btnDangerBgStart\n        : `linear-gradient(${t.btnDangerHoverBgStart}, ${t.btnDangerHoverBgEnd})`\n    };\n    box-shadow: ${t.btnDangerHoverShadow};\n    border-color: ${t.btnDangerHoverBg};\n\n    .${classes.arrow} {\n      background: ${\n        t.btnDangerBgStart === t.btnDangerBgEnd\n          ? t.btnDangerBgStart\n          : `linear-gradient(to bottom right, ${t.btnDangerHoverBgStart}, ${t.btnDangerHoverBgEnd})`\n      };\n      box-shadow: ${t.btnDangerHoverShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      background: ${\n        t.btnDangerBgStart === t.btnDangerBgEnd\n          ? t.btnDangerBgStart\n          : `linear-gradient(to top left, ${t.btnDangerHoverBgStart}, ${t.btnDangerHoverBgEnd})`\n      };\n      box-shadow: ${t.btnDangerHoverShadowArrowLeft};\n    }\n  }\n\n  &:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading}):active {\n    background: ${t.btnDangerActiveBg};\n    box-shadow: ${t.btnDangerActiveShadow};\n\n    .${classes.arrow} {\n      background: ${t.btnDangerActiveBg};\n      box-shadow: ${t.btnDangerActiveShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      box-shadow: ${t.btnDangerActiveShadowArrowLeft};\n    }\n  }\n  .${classes.active}:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading})& {\n    background: ${t.btnDangerActiveBg};\n    box-shadow: ${t.btnDangerActiveShadow};\n\n    .${classes.arrow} {\n      background: ${t.btnDangerActiveBg};\n      box-shadow: ${t.btnDangerActiveShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      box-shadow: ${t.btnDangerActiveShadowArrowLeft};\n    }\n  }\n`",
    variables: [
      "btnDangerBgStart",
      "btnDangerBgEnd",
      "btnDangerTextColor",
      "btnDangerBorder",
      "btnDangerShadow",
      "btnDangerBgArrowStart",
      "btnDangerBgArrowEnd",
      "btnDangerShadowArrow",
      "btnDangerShadowArrowLeft",
      "btnDangerHoverBgStart",
      "btnDangerHoverBgEnd",
      "btnDangerHoverShadow",
      "btnDangerHoverBg",
      "btnDangerHoverShadowArrow",
      "btnDangerHoverShadowArrowLeft",
      "btnDangerActiveBg",
      "btnDangerActiveShadow",
      "btnDangerActiveShadowArrow",
      "btnDangerActiveShadowArrowLeft"
    ]
  },
  pay: {
    contents: "css`\n  background: ${\n    t.btnPayBgStart === t.btnPayBgEnd ? t.btnPayBgStart : `linear-gradient(${t.btnPayBgStart}, ${t.btnPayBgEnd})`\n  };\n  color: ${t.btnPayTextColor};\n  border: ${t.btnPayBorder};\n  box-shadow: ${t.btnPayShadow};\n\n  .${classes.arrow} {\n    background: ${\n      t.btnPayBgArrowStart === t.btnPayBgArrowEnd\n        ? t.btnPayBgArrowStart\n        : `linear-gradient(to bottom right, ${t.btnPayBgArrowStart}, ${t.btnPayBgArrowEnd})`\n    };\n    box-shadow: ${t.btnPayShadowArrow};\n  }\n\n  .${classes.arrow_left} {\n    background: ${\n      t.btnPayBgArrowStart === t.btnPayBgArrowEnd\n        ? t.btnPayBgArrowStart\n        : `linear-gradient(to top left, ${t.btnPayBgArrowStart}, ${t.btnPayBgArrowEnd})`\n    };\n    box-shadow: ${t.btnPayShadowArrowLeft};\n  }\n\n  .${classes.arrow}.${classes.arrow_warning} {\n    box-shadow: 2px -2px 0 0 ${t.borderColorWarning};\n  }\n\n  .${classes.arrow}.${classes.arrow_error} {\n    box-shadow: 2px -2px 0 0 ${t.borderColorError};\n  }\n\n  &:hover {\n    background: ${\n      t.btnPayHoverBgStart === t.btnPayHoverBgEnd\n        ? t.btnPayHoverBgStart\n        : `linear-gradient(${t.btnPayHoverBgStart}, ${t.btnPayHoverBgEnd})`\n    };\n    box-shadow: ${t.btnPayHoverShadow};\n    border-color: ${t.btnPayHoverBg};\n\n    .${classes.arrow} {\n      background: ${\n        t.btnPayHoverBgStart === t.btnPayHoverBgEnd\n          ? t.btnPayHoverBgStart\n          : `linear-gradient(to bottom right, ${t.btnPayHoverBgStart}, ${t.btnPayHoverBgEnd})`\n      };\n      box-shadow: ${t.btnPayHoverShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      background: ${\n        t.btnPayHoverBgStart === t.btnPayHoverBgEnd\n          ? t.btnPayHoverBgStart\n          : `linear-gradient(to top left, ${t.btnPayHoverBgStart}, ${t.btnPayHoverBgEnd})`\n      };\n      box-shadow: ${t.btnPayHoverShadowArrowLeft};\n    }\n  }\n\n  &:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading}):active {\n    background: ${t.btnPayActiveBg};\n    box-shadow: ${t.btnPayActiveShadow};\n\n    .${classes.arrow} {\n      background: ${t.btnPayActiveBg};\n      box-shadow: ${t.btnPayActiveShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      box-shadow: ${t.btnPayActiveShadowArrowLeft};\n    }\n  }\n  .${classes.active}:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading})& {\n    background: ${t.btnPayActiveBg};\n    box-shadow: ${t.btnPayActiveShadow};\n\n    .${classes.arrow} {\n      background: ${t.btnPayActiveBg};\n      box-shadow: ${t.btnPayActiveShadowArrow};\n    }\n\n    .${classes.arrow_left} {\n      box-shadow: ${t.btnPayActiveShadowArrowLeft};\n    }\n  }\n`",
    variables: [
      "btnPayBgStart",
      "btnPayBgEnd",
      "btnPayTextColor",
      "btnPayBorder",
      "btnPayShadow",
      "btnPayBgArrowStart",
      "btnPayBgArrowEnd",
      "btnPayShadowArrow",
      "btnPayShadowArrowLeft",
      "borderColorWarning",
      "borderColorError",
      "btnPayHoverBgStart",
      "btnPayHoverBgEnd",
      "btnPayHoverShadow",
      "btnPayHoverBg",
      "btnPayHoverShadowArrow",
      "btnPayHoverShadowArrowLeft",
      "btnPayActiveBg",
      "btnPayActiveShadow",
      "btnPayActiveShadowArrow",
      "btnPayActiveShadowArrowLeft"
    ]
  },
  checked: {
    contents: "css`\n  .${classes.root}& {\n    background: ${t.btnCheckedBg};\n    color: ${t.btnCheckedTextColor};\n    box-shadow: ${t.btnCheckedShadow};\n  }\n  .${classes.root}&:not(.${classes.focus}):hover {\n    background: ${t.btnCheckedBg};\n    border-color: ${t.btnCheckedHoverBorderColor};\n    box-shadow: ${t.btnCheckedShadow};\n  }\n`",
    variables: [
      "btnCheckedBg",
      "btnCheckedTextColor",
      "btnCheckedShadow",
      "btnCheckedHoverBorderColor"
    ]
  },
  wrap: {
    contents: "css`\n  padding: ${t.btnWrapPadding};\n`",
    variables: [
      "btnWrapPadding"
    ]
  }
};