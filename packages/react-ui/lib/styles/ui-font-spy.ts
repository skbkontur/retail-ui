import { globalObject, isBrowser } from '@skbkontur/global-object';

import { injectGlobal, prefix } from '../theming/Emotion';

export const uiFontGlobalClasses = prefix('ui-font')({
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

const dictionary = new WeakMap<Element, () => void>();
const listeners: ResizeObserverCallback = (entries) => {
  entries.forEach((entry) => dictionary.get(entry.target)?.());
};
const resizeObserver = globalObject.ResizeObserver ? new globalObject.ResizeObserver(listeners) : null;

class UiFontSpy extends HTMLElement {
  private readonly portal?: HTMLElement;
  private fontChangeDetector?: HTMLSpanElement | null = null;
  private apply?: HTMLSlotElement | null = null;

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();

    const shadow = this.shadowRoot || this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
<span id='font-change-detector' style="visibility: hidden; position: absolute; font: inherit;">
1234567890-=zxcvbnm,./asdfghjkl;'"+*qwertyuiop[]
</span>
<slot name="apply" id="apply"></slot>
    `;
  }

  updateFont = () => {
    if (this.apply && isBrowser(globalObject)) {
      const detect = this.portal || this;
      // const detect = (this.portal || this)?.closest(`.${uiFontGlobalClasses.element}`);
      if (detect) {
        const baseFontFamily = globalObject.getComputedStyle(detect).fontFamily;
        this.apply.style.fontFamily = `${uiFontName}, ${baseFontFamily}`;
      }
    }
  };

  connectedCallback() {
    if (!this.shadowRoot) {
      return;
    }

    // Object.defineProperty(this.shadowRoot, 'parentElement', {
    //   value: this.parentElement,
    //   writable: false,
    // });

    // this.style.position = 'absolute';
    // this.style.visibility = 'hidden';
    // this.style.height = '0';
    // this.style.width = '0';
    // this.style.display = 'inline-block';
    // this.style.pointerEvents = 'none';

    this.fontChangeDetector = this.shadowRoot.querySelector('#font-change-detector');
    this.apply = this.shadowRoot.querySelector('#apply');

    this.fontChangeDetector && dictionary.set(this.fontChangeDetector, this.updateFont);
    resizeObserver && this.fontChangeDetector && resizeObserver.observe(this.fontChangeDetector);
  }

  disconnectedCallback() {
    resizeObserver && this.fontChangeDetector && resizeObserver.unobserve(this.fontChangeDetector);
  }
}

isBrowser(globalObject) && globalObject.customElements.define('ui-font-spy', UiFontSpy);
