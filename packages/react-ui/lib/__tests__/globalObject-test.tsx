import { isBrowser, getSafeWindow, getOwnerGlobalObject, type GlobalObject } from '../globalObject';

describe('globalObject', () => {
  describe('isBrowser', () => {
    it('returns true for window', () => {
      expect(isBrowser(window)).toBe(true);
    });

    it('returns false for plain object', () => {
      expect(isBrowser({})).toBe(false);
    });

    it('returns false for null', () => {
      expect(isBrowser(null as unknown as GlobalObject)).toBe(false);
    });
  });

  describe('getSafeWindow', () => {
    it('returns window object', () => {
      expect(getSafeWindow()).toBe(window);
    });
  });

  describe('getOwnerGlobalObject', () => {
    it('returns window for null', () => {
      expect(getOwnerGlobalObject(null as unknown as HTMLElement)).toBe(window);
    });

    it('returns window for window', () => {
      expect(getOwnerGlobalObject(window as unknown as HTMLElement)).toBe(window);
    });

    it('returns window for document', () => {
      expect(getOwnerGlobalObject(document as unknown as HTMLElement)).toBe(window);
    });

    it('returns window for Element without defaultView', () => {
      const element = document.createElement('div');
      Object.defineProperty(element.ownerDocument, 'defaultView', {
        value: null,
      });
      expect(getOwnerGlobalObject(element)).toBe(window);
    });

    it('returns window for HTMLElement', () => {
      const element = document.createElement('div');
      expect(getOwnerGlobalObject(element)).toBe(window);
    });

    it('returns iframe window for node from iframe', () => {
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);

      const iframeWindow = iframe.contentWindow;
      const iframeDocument = iframe.contentDocument;
      const iframeElement = iframeDocument?.createElement('div');

      expect(iframeWindow).not.toBe(window);
      expect(getOwnerGlobalObject(iframeElement as HTMLElement)).toBe(iframeWindow);

      document.body.removeChild(iframe);
    });
  });
});
