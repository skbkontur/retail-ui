import { afterEach, describe, it, expect } from 'vitest';

import { adoptTableStyles } from '../src/styleInjection/deliverStyles';

// jsdom 15 не поддерживает adoptedStyleSheets/replaceSync, поэтому реальную
// доставку через настоящий DOM здесь не протестировать (она покрыта creevey-стори
// Renderers). Проверяем: (1) вне baseline это безопасный no-op без падений;
// (2) refcount — на синтетическом root c рабочим CSSStyleSheet.

const cssGlobal = globalThis as { __skbkonturTableCss?: string };

afterEach(() => {
  delete cssGlobal.__skbkonturTableCss;
});

describe('adoptTableStyles (no-op вне baseline)', () => {
  it('не бросает на document (jsdom без baseline) и возвращает функцию-отписку', () => {
    expect(() => adoptTableStyles(document)()).not.toThrow();
  });

  it('не бросает на отсоединённом узле', () => {
    const detached = document.createElement('div');

    expect(() => adoptTableStyles(detached.ownerDocument)()).not.toThrow();
  });
});

// Синтетический root с поддержкой adoptedStyleSheets и рабочим CSSStyleSheet,
// чтобы протестировать refcount без реального baseline-DOM jsdom.
class FakeSheet {
  public replaceSync(): void {}
}

function createFakeRoot(): Document | ShadowRoot {
  const view = { CSSStyleSheet: FakeSheet as unknown as typeof CSSStyleSheet };
  const doc = { nodeType: Node.DOCUMENT_NODE, defaultView: view, ownerDocument: null };
  const root = {
    nodeType: Node.DOCUMENT_FRAGMENT_NODE,
    ownerDocument: doc,
    adoptedStyleSheets: [] as CSSStyleSheet[],
  };
  return root as unknown as Document | ShadowRoot;
}

describe('refcount по root', () => {
  it('две таблицы в одном root: отписка одной не снимает лист, отписка второй снимает', () => {
    cssGlobal.__skbkonturTableCss = '._Table_ { table-layout: fixed; }';
    const root = createFakeRoot();

    const releaseA = adoptTableStyles(root);
    const releaseB = adoptTableStyles(root);
    expect(root.adoptedStyleSheets).toHaveLength(1);

    releaseA();
    expect(root.adoptedStyleSheets).toHaveLength(1);

    releaseB();
    expect(root.adoptedStyleSheets).toHaveLength(0);
  });

  it('повторный вызов одной отписки идемпотентен и не снимает чужой лист', () => {
    cssGlobal.__skbkonturTableCss = '._Table_ { table-layout: fixed; }';
    const root = createFakeRoot();

    const releaseA = adoptTableStyles(root);
    adoptTableStyles(root);

    releaseA();
    releaseA();
    expect(root.adoptedStyleSheets).toHaveLength(1);
  });

  it('повторный adopt после отписки переиспользует лист из кэша', () => {
    cssGlobal.__skbkonturTableCss = '._Table_ { table-layout: fixed; }';
    const root = createFakeRoot();

    const release = adoptTableStyles(root);
    const firstSheet = root.adoptedStyleSheets[0];
    release();
    expect(root.adoptedStyleSheets).toHaveLength(0);

    adoptTableStyles(root);
    expect(root.adoptedStyleSheets).toHaveLength(1);
    expect(root.adoptedStyleSheets[0]).toBe(firstSheet);
  });
});
