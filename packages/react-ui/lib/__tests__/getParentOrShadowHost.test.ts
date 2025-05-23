import { getParentOrShadowHost } from '../dom/getParentOrShadowHost';

const parent = document.createElement('div');
const child = document.createElement('div');
parent.append(child);

describe('getParentOrShadowHost', () => {
  it('should return parent element', () => {
    expect(getParentOrShadowHost(child)).toEqual(parent);
  });

  it("should return shadow host if parent element doesn't exist", () => {
    const shadowRoot = parent.attachShadow({ mode: 'open' });
    expect(getParentOrShadowHost(child)).toEqual(shadowRoot.host);
  });
});
