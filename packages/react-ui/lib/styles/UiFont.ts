import { globalObject, isBrowser } from '@skbkontur/global-object';

import { injectGlobal, prefix } from '../theming/Emotion';

export const uiFontGlobalClasses = prefix('ui-font')({
  root: 'root',
  element: 'element',
});

const uiFontName = 'ui';

injectGlobal`
  @font-face {
    font-family: ${uiFontName};
    src: url('https://s.kontur.ru/common-v2/fonts/ui/ui.woff2') format('woff2'),
      url('https://s.kontur.ru/common-v2/fonts/ui/ui.woff') format('woff');
  }
`;

const $this = globalObject;

if (isBrowser($this)) {
  const baseFont = () => $this.getComputedStyle($this.document.body).fontFamily;

  const injectFont = () => injectGlobal`
    .${uiFontGlobalClasses.root},
    .${uiFontGlobalClasses.root} > *,
    .${uiFontGlobalClasses.element} {
        font-family: ${uiFontName}, ${baseFont()};
      }
    `;

  if ($this.document.fonts) {
    $this.document.fonts.addEventListener('loading', injectFont);
  } else {
    // ie11
    setTimeout(injectFont);
  }
}
