import getComputedStyle from '../../lib/dom/getComputedStyle';

export function getTextAreaHeight(
  node: HTMLTextAreaElement,
  minRows: number,
  maxRows: number
) {
  const style: CSSStyleDeclaration = getComputedStyle(node);
  const lineHeight = style.lineHeight ? parseInt(style.lineHeight, 10) : 0;
  const paddingTop = style.paddingTop ? parseInt(style.paddingTop, 10) : 0;
  const paddingBottom = style.paddingBottom ? parseInt(style.paddingBottom, 10) : 0;
  const minHeight = paddingTop + paddingBottom + lineHeight * minRows;
  const maxHeight = paddingTop + paddingBottom + lineHeight * maxRows;
  const expectedHeight = node.scrollHeight + lineHeight;
  return {
    height: Math.min(Math.max(expectedHeight, minHeight), maxHeight),
    exceededMaxHeight: expectedHeight > maxHeight + lineHeight
  };
}
