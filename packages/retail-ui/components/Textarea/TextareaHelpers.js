
import getComputedStyle from '../../lib/dom/getComputedStyle';

export function getTextAreaHeight(
  node: HTMLTextAreaElement,
  minRows: number,
  maxRows: number
) {
  const style = getComputedStyle(node);
  const lineHeight = parseInt(style.lineHeight, 10);
  const paddingTop = parseInt(style.paddingTop, 10);
  const paddingBottom = parseInt(style.paddingBottom, 10);
  const minHeight = paddingTop + paddingBottom + lineHeight * minRows;
  const maxHeight = paddingTop + paddingBottom + lineHeight * maxRows;
  const expectedHeight = node.scrollHeight + lineHeight;
  return {
    height: Math.min(Math.max(expectedHeight, minHeight), maxHeight),
    exceededMaxHeight: expectedHeight > maxHeight + lineHeight
  };
}
