// @flow
import getComputedStyle from '../../lib/dom/getComputedStyle';

export function getContentRows(content: string, node: HTMLElement): number {
  const { body } = document;
  if (!body) {
    throw new Error('Body not found');
  }

  const rect = node.getBoundingClientRect();
  const style = getComputedStyle(node);

  const div = document.createElement('div');
  div.innerText = content;

  Object.assign(div.style, {
    lineHeight: style.lineHeight,
    paddingLeft: style.paddingLeft,
    paddingRight: style.paddingRight,
    fontStyle: style.fontStyle,
    fontVariant: style.fontVariant,
    fontWeight: style.fontWeight,
    fontStretch: style.fontStretch,
    fontSize: style.fontSize,
    fontFamily: style.fontFamily,
    fontFeatureSettings: style.fontFeatureSettings,
    fontKerning: style.fontKerning,
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    borderLeftWidth: style.borderLeftWidth,
    borderRightWidth: style.borderRightWidth,
    borderRightStyle: style.borderRightStyle,
    borderLeftStyle: style.borderLeftStyle,
    boxSizing: style.boxSizing,
    width: `${rect.right - rect.left}px`
  });

  body.appendChild(div);
  const divRect = div.getBoundingClientRect();
  body.removeChild(div);

  const height = divRect.bottom - divRect.top;
  const lineHeight = parseInt(style.lineHeight, 10);

  return Math.floor(height / lineHeight);
}
