export default {
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