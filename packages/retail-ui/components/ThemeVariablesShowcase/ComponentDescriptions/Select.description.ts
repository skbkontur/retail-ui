export default {
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