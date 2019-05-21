export default {
  root: {
    contents: "css`\n  &:hover {\n    border-bottom: 3px solid ${t.tabColorHover};\n  }\n`",
    variables: [
      "tabColorHover"
    ]
  },
  vertical: {
    contents: "css`\n  .${styles.root}&:hover {\n    border-left: 3px solid ${t.tabColorHover};\n  }\n`",
    variables: [
      "tabColorHover"
    ]
  },
  focus: {
    contents: "css`\n  border: 2px solid ${t.tabColorFocus};\n`",
    variables: [
      "tabColorFocus"
    ]
  },
  disabled: {
    contents: "css`\n  color: rgba(\n    ${ColorFunctions.red(t.textColorDefault)},\n    ${ColorFunctions.green(t.textColorDefault)},\n    ${ColorFunctions.blue(t.textColorDefault)},\n    0.5\n  );\n`",
    variables: [
      "textColorDefault"
    ]
  },
  primary: {
    contents: "css`\n  &:hover {\n    border-bottom: 3px solid ${ColorFunctions.lighten(t.tabColorPrimary, '25%')};\n  }\n`",
    variables: [
      "tabColorPrimary"
    ]
  },
  success: {
    contents: "css`\n  &:hover {\n    border-bottom: 3px solid ${ColorFunctions.lighten(t.tabColorSuccess, '25%')};\n  }\n`",
    variables: [
      "tabColorSuccess"
    ]
  },
  warning: {
    contents: "css`\n  &:hover {\n    border-bottom: 3px solid ${ColorFunctions.lighten(t.tabColorWarning, '25%')};\n  }\n`",
    variables: [
      "tabColorWarning"
    ]
  },
  error: {
    contents: "css`\n  &:hover {\n    border-bottom: 3px solid ${ColorFunctions.lighten(t.tabColorError, '25%')};\n  }\n`",
    variables: [
      "tabColorError"
    ]
  }
};