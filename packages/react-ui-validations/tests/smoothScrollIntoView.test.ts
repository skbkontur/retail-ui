import { vi } from 'vitest';

import { smoothScrollIntoView } from '../src/smoothScrollIntoView.js';

const createRect = (top: number, bottom: number): DOMRect => ({
  width: 100,
  height: bottom - top,
  x: 0,
  y: top,
  top,
  right: 100,
  bottom,
  left: 0,
  toJSON: () => ({}),
});

const renderScrollContainer = ({
  insetTop,
  insetBottom,
  elementTop = 450,
  scrollTop = 0,
}: { insetTop?: number; insetBottom?: number; elementTop?: number; scrollTop?: number } = {}) => {
  const scrollableParent = document.createElement('div');
  const element = document.createElement('div');

  scrollableParent.style.overflow = 'auto';
  if (insetTop !== undefined) {
    scrollableParent.setAttribute('data-scroll-inset-top', String(insetTop));
  }
  if (insetBottom !== undefined) {
    scrollableParent.setAttribute('data-scroll-inset-bottom', String(insetBottom));
  }
  Object.defineProperties(scrollableParent, {
    clientHeight: { value: 500 },
    scrollHeight: { value: 1000 },
  });
  scrollableParent.getBoundingClientRect = () => createRect(0, 500);
  element.getBoundingClientRect = () => createRect(elementTop, elementTop + 30);
  scrollableParent.append(element);
  document.body.append(scrollableParent);
  scrollableParent.scrollTop = scrollTop;

  return { scrollableParent, element };
};

describe('smoothScrollIntoView', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scroll').mockImplementation(() => undefined);
    vi.spyOn(window.performance, 'now').mockReturnValueOnce(0).mockReturnValue(468);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('scrolls an element hidden by the container inset', async () => {
    const { scrollableParent, element } = renderScrollContainer({ insetBottom: 100 });

    await smoothScrollIntoView(element, { top: 50 });

    expect(scrollableParent.scrollTop).toBe(400);
  });

  it('scrolls an element hidden by the bottom scroll offset', async () => {
    const { scrollableParent, element } = renderScrollContainer();

    await smoothScrollIntoView(element, { top: 50, bottom: 100 });

    expect(scrollableParent.scrollTop).toBe(400);
  });

  it('leaves room for the top inset when scrolling', async () => {
    const { scrollableParent, element } = renderScrollContainer({ insetTop: 80, insetBottom: 100 });

    await smoothScrollIntoView(element, {});

    expect(scrollableParent.scrollTop).toBe(370);
  });

  it('adds the top scroll offset on top of the inset', async () => {
    const { scrollableParent, element } = renderScrollContainer({ insetTop: 80, insetBottom: 100 });

    await smoothScrollIntoView(element, { top: 50 });

    expect(scrollableParent.scrollTop).toBe(320);
  });

  it('scrolls an element hidden by the top inset', async () => {
    const { scrollableParent, element } = renderScrollContainer({ insetTop: 72, elementTop: 20, scrollTop: 300 });

    await smoothScrollIntoView(element, { top: 50 });

    expect(scrollableParent.scrollTop).toBe(198);
  });

  it('does not scroll an element that nothing overlaps', async () => {
    const { scrollableParent, element } = renderScrollContainer();

    await smoothScrollIntoView(element, { top: 50 });

    expect(scrollableParent.scrollTop).toBe(0);
  });
});
