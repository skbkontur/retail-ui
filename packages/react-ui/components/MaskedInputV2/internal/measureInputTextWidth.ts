import { getOwnerGlobalObject, isBrowser } from '../../../lib/globalObject.js';

/** Ширина текста в стиле input (для overflow и center/right align). */
export function measureInputTextWidth(input: HTMLInputElement, text: string): number {
  if (!text) {
    return 0;
  }

  const globalObject = getOwnerGlobalObject(input);
  if (!isBrowser(globalObject)) {
    return 0;
  }

  const style = globalObject.getComputedStyle(input);
  const probe = globalObject.document.createElement('span');
  probe.textContent = text;
  probe.style.cssText = [
    'position:absolute',
    'visibility:hidden',
    'white-space:pre',
    'pointer-events:none',
    `font:${style.font}`,
    `letter-spacing:${style.letterSpacing}`,
    `text-transform:${style.textTransform}`,
    `font-variant-numeric:${style.fontVariantNumeric}`,
    `font-feature-settings:${style.fontFeatureSettings}`,
  ].join(';');
  globalObject.document.body.appendChild(probe);

  const width = probe.getBoundingClientRect().width;
  probe.remove();

  return width;
}
