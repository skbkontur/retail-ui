import { globalObject, isBrowser } from '@skbkontur/global-object';
import { isSafari } from '../../lib/client';
import { injectGlobal } from '../../lib/theming/Emotion';

if (isSafari) {
  injectGlobal`
    .exposed-input input::selection {
    -webkit-text-fill-color: HighlightText;
    background: Highlight;
  }
`;
}

export class ExposedInput extends HTMLElement {
  public input: HTMLInputElement | null = null;
  public value: HTMLSpanElement | null = null;
  public cover: HTMLSpanElement | null = null;
  private css: HTMLStyleElement | null = null;

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();

    const shadow = this.shadowRoot || this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
    <style>
    #cover {
      /*display: inline-flex;*/
      /*position: absolute;*/
      font-size: inherit;
      width: 100%;
    }
    #value {
      position: absolute;
      left: 0;
      user-select: none;
      pointer-events: none;
      flex-wrap: nowrap;
      flex-direction: row;
      right: 0;
      white-space: pre;
      overflow: hidden;
      width: 100%;
      display:inline-block;

      z-index: -1;
    }

    .input {
      -webkit-text-fill-color: transparent;
    }

    </style>
    <style id="style"></style>
    <span id="cover">
      <ui-font-spy>
        <span slot='apply' id="value"></span>
      </ui-font-spy>
      <ui-font-spy>
        <slot name="input" slot="apply" class="input"></slot>
      </ui-font-spy>
<!--      <span slot='apply' id="value"></span>-->
<!--      <slot name="input" slot="apply" class="input"></slot>-->
    </span>
    `;
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      return;
    }

    // this.detectTest();

    this.input = this.querySelector('input');
    this.value = this.shadowRoot.querySelector('span#value');
    this.css = this.shadowRoot.querySelector('style#style');
    this.cover = this.shadowRoot.querySelector('span#cover');

    this.shadowRoot.querySelectorAll<HTMLSpanElement>('ui-font-spy').forEach((elem) => {
      Object.defineProperty(elem, 'portal', {
        value: this,
        writable: false,
      });
    });

    // Object.defineProperty(this.shadowRoot, 'parentElement', {
    //   value: this.parentElement,
    //   writable: false,
    // });

    // console.log('>>>', !!this.value, !!this.input, !!this.css);

    if (!this.input || !this.value || !this.css) {
      return;
    }

    this.css.innerHTML = this.getAttribute('css') || '';

    this.style.width = '100%';
    this.style.isolation = 'isolate';
    this.classList.add('exposed-input');

    this.value.style.cssText = this.input.style.cssText;
    this.value.style.padding = window.getComputedStyle(this.input).padding;
    this.value.style.border = window.getComputedStyle(this.input).border;
    this.value.style.borderColor = 'transparent';
    this.value.style.height = window.getComputedStyle(this.input).height;

    setTimeout(this.paint);

    this.input.addEventListener('scroll', this.handleScroll);
    this.input.addEventListener('input', this.handleInput);

    if (isSafari) {
      this.input.addEventListener('keydown', this.handleScroll);
      this.input.addEventListener('focus', this.handleScroll);
      this.input.addEventListener('blur', this.handleScroll);
      this.input.addEventListener('select', this.handleScroll);
      this.input.addEventListener('input', this.handleScroll);
    }
  }

  handleScroll = () => {
    setTimeout(() => {
      if (this.value && this.input) {
        this.value.scrollLeft = this.input.scrollLeft;
      }
    });
  };

  handleInput = () => {
    setTimeout(this.paint);
    this.handleScroll();
  };

  paint = () => {
    if (!this.value || !this.input) {
      return;
    }

    this.building();

    this.input.value.split('').forEach((v, i) => {
      const item = this.value?.children.item(i) as HTMLSpanElement;
      if (!item) {
        return;
      }
      item.innerHTML = v;

      if (getComputedStyle(this).fontFamily.includes('Lab Grotesque')) {
        // компенсации для "Lab Grotesque"
        if (v === '+' && i === 0) {
          item.style.letterSpacing = isSafari ? '-1.1px' : '-1px';
        }
        // if (v === '+' && i !== 0) {
        //   item.style.letterSpacing = isSafari ? '-0.1px' : '0';
        // }
        // if (v === '7') {
        //   item.style.letterSpacing = isSafari ? '0.3px' : '0';
        // }
        // if (v === '0') {
        //   item.style.letterSpacing = isSafari ? '0.1px' : '0';
        // }
        // if (v === '1') {
        //   item.style.letterSpacing = isSafari ? '-0.5px' : '0';
        // }
      }
    });
    this.dispatchEvent(
      new CustomEvent('test', {
        bubbles: true,
        cancelable: true,
        detail: { chars: this.value?.querySelectorAll('span'), value: this.input.value },
      }),
    );
  };

  building = () => {
    if (!this.value || !this.input) {
      return;
    }
    if (this.input.value.length > this.value.childElementCount) {
      const count = this.input.value.length - this.value.childElementCount;
      for (let i = 0; i < count; i++) {
        const node = document.createElement('span');
        this.value.appendChild(node);
      }
    } else if (this.input.value.length < this.value.childElementCount) {
      const count = this.value.childElementCount - this.input.value.length;
      for (let i = count; i >= 0; i--) {
        this.value.childNodes.item(i).remove();
      }
    }
  };

  disconnectedCallback() {
    console.log('Custom element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom element moved to new page.');
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'css') {
      this.css && (this.css.innerHTML = newValue || '');
    }
  }
}

// window.ExposedInput = ExposedInput;

isBrowser(globalObject) && globalObject.customElements.define('exposed-input', ExposedInput);
