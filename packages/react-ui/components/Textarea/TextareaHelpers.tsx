export function getTextAreaHeight(node: HTMLTextAreaElement, minRows: number, maxRows: number) {
  const style: CSSStyleDeclaration = getComputedStyle(node);
  const borderWidth = style.borderWidth ? parseInt(style.borderWidth, 10) : 0;
  const lineHeight = style.lineHeight ? parseInt(style.lineHeight, 10) : 0;
  const paddingTop = style.paddingTop ? parseInt(style.paddingTop, 10) : 0;
  const paddingBottom = style.paddingBottom ? parseInt(style.paddingBottom, 10) : 0;
  const minHeight = borderWidth * 2 + paddingTop + paddingBottom + lineHeight * minRows;
  const maxHeight = borderWidth * 2 + paddingTop + paddingBottom + lineHeight * maxRows;
  const expectedHeight = node.scrollHeight + borderWidth * 2 + lineHeight;
  return {
    height: Math.min(Math.max(expectedHeight, minHeight), maxHeight),
    exceededMaxHeight: expectedHeight > maxHeight + lineHeight,
  };
}
