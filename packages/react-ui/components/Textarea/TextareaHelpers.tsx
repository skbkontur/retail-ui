export function getTextAreaHeight(params: GetTextAreaHeightParams) {
  const { node, minRows, maxRows, extraRow } = params;
  const style: CSSStyleDeclaration = getComputedStyle(node);
  const borderTop = style.borderTopWidth ? parseInt(style.borderTopWidth, 10) : 0;
  const borderBottom = style.borderBottomWidth ? parseInt(style.borderBottomWidth, 10) : 0;
  const lineHeight = style.lineHeight ? parseInt(style.lineHeight, 10) : 0;
  const paddingTop = style.paddingTop ? parseInt(style.paddingTop, 10) : 0;
  const paddingBottom = style.paddingBottom ? parseInt(style.paddingBottom, 10) : 0;
  const minHeight = borderTop + borderBottom + paddingTop + paddingBottom + lineHeight * minRows;
  const maxHeight = borderTop + borderBottom + paddingTop + paddingBottom + lineHeight * maxRows;
  const extraRowHeight = extraRow ? lineHeight : 0;
  const expectedHeight = node.scrollHeight + borderTop + borderBottom + extraRowHeight;
  return {
    height: Math.min(Math.max(expectedHeight, minHeight), maxHeight),
    exceededMaxHeight: expectedHeight > maxHeight + extraRowHeight,
  };
}

interface GetTextAreaHeightParams {
  node: HTMLTextAreaElement;
  minRows: number;
  maxRows: number;
  extraRow: boolean;
}
