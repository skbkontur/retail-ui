import { getTabbableElements } from '../dom/tabbableHelpers.js';

describe('getTabbableElements', () => {
  it('returns tabbable elements when the CSS engine rejects the tabbable selector', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <a href="#">link</a>
      <button>button</button>
      <input />
      <div tabindex="0">custom</div>
      <details><summary>summary</summary></details>
      <iframe></iframe>
      <div tabindex="-1">not tabbable</div>
      <span>text</span>
    `;

    // Chrome < 88 and Firefox < 84 cannot parse `:not([inert] *)` and throw from the CSS engine,
    // so the real `tabbable` fails. jsdom parses the selector, so emulate the old engine here.
    const querySelectorAll = container.querySelectorAll.bind(container);
    vi.spyOn(container, 'querySelectorAll').mockImplementation((selectors: string) => {
      if (selectors.includes(':not([inert]')) {
        throw new DOMException(`'${selectors}' is not a valid selector`, 'SyntaxError');
      }

      return querySelectorAll(selectors);
    });

    expect(getTabbableElements(container).map((element) => element.tagName)).toEqual([
      'A',
      'BUTTON',
      'INPUT',
      'DIV',
      'SUMMARY',
    ]);
  });
});
