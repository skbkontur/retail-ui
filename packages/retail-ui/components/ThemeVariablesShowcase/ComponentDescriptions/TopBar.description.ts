export default {
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