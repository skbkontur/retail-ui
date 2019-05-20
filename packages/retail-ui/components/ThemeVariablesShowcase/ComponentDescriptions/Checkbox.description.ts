export default {
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
    contents: "css`\n  & .${styles.box} {\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.borderColorWarning};\n    border-color: ${t.borderColorWarning};\n  }\n\n  .rt-ie8 & .${styles.box} {\n    outline: 1px solid ${t.borderColorWarning};\n  }\n`",
    variables: [
      "outlineColorFocus",
      "chbShadowWidth",
      "borderColorWarning"
    ]
  },
  error: {
    contents: "css`\n  & .${styles.box} {\n    box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.borderColorError};\n    border-color: ${t.borderColorError};\n  }\n\n  .rt-ie8 & .${styles.box} {\n    outline: 1px solid ${t.borderColorError};\n  }\n`",
    variables: [
      "outlineColorFocus",
      "chbShadowWidth",
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
    contents: "css`\n  background: ${t.chbBoxIndeterminateBg};\n\n  .${styles.root}:hover & {\n    background: ${ColorFunctions.darken(t.chbBoxIndeterminateBg, '5%')};\n  }\n  .${styles.root}:active & {\n    background: ${ColorFunctions.darken(t.chbBoxIndeterminateBg, '15%')};\n  }\n`",
    variables: [
      "chbBoxIndeterminateBg"
    ]
  }
};