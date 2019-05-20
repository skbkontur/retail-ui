export default {
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