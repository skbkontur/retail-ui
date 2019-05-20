export default {
  popup: {
    contents: "css`\n  border-radius: ${t.popupBorderRadius};\n  border: ${t.popupBorder} ${t.popupBorderColor};\n`",
    variables: [
      "popupBorderRadius",
      "popupBorder",
      "popupBorderColor"
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