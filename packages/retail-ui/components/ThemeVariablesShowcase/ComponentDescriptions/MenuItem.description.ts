export default {
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