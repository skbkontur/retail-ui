export default {
  dots: {
    contents: "css`\n  color: ${t.pagingDotsColor};\n`",
    variables: [
      "pagingDotsColor"
    ]
  },
  forwardLink: {
    contents: "css`\n  color: ${t.pagingForwardLinkColor};\n`",
    variables: [
      "pagingForwardLinkColor"
    ]
  },
  disabled: {
    contents: "css`\n  .${styles.forwardLink}& {\n    color: ${t.pagingForwardLinkDisabledColor};\n  }\n`",
    variables: [
      "pagingForwardLinkDisabledColor"
    ]
  },
  pageLink: {
    contents: "css`\n  .${styles.pageLinkWrapper} & {\n    color: ${t.pagingForwardLinkColor};\n  }\n  .${styles.pageLinkWrapper} &:not(.${styles.active}):hover {\n    background: ${t.pagingPageLinkHoverBg};\n  }\n`",
    variables: [
      "pagingForwardLinkColor",
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