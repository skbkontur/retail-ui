import { Theme } from '../../lib/theming/Theme';

export function getTextAreaHeight(node: HTMLTextAreaElement, minRows: number, maxRows: number) {
  const style: CSSStyleDeclaration = getComputedStyle(node);
  const borderTop = style.borderTopWidth ? parseInt(style.borderTopWidth, 10) : 0;
  const borderBottom = style.borderBottomWidth ? parseInt(style.borderBottomWidth, 10) : 0;
  const lineHeight = style.lineHeight ? parseInt(style.lineHeight, 10) : 0;
  const paddingTop = style.paddingTop ? parseInt(style.paddingTop, 10) : 0;
  const paddingBottom = style.paddingBottom ? parseInt(style.paddingBottom, 10) : 0;
  const minHeight = borderTop + borderBottom + paddingTop + paddingBottom + lineHeight * minRows;
  const maxHeight = borderTop + borderBottom + paddingTop + paddingBottom + lineHeight * maxRows;
  const expectedHeight = node.scrollHeight + borderTop + borderBottom + lineHeight;
  return {
    height: Math.min(Math.max(expectedHeight, minHeight), maxHeight),
    exceededMaxHeight: expectedHeight > maxHeight + lineHeight,
  };
}

export const getTextareaPaddingBottom = (theme: Theme): number => {
  const { textareaPaddingY } = theme;

  return parseInt(textareaPaddingY, 10);
};

export const getTextareaCounterBottom = (node: HTMLTextAreaElement): number => {
  const style: CSSStyleDeclaration = getComputedStyle(node);

  return parseInt(style.borderBottomWidth, 10) + parseInt(style.marginBottom, 10);
};
