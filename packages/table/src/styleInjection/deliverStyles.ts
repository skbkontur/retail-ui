import { TABLE_STYLE_LAYER } from './constants.js';

// Ключ глобала с CSS пакета. На сборке vite заменяет __SKBKONTUR_TABLE_CSS_GLOBAL_KEY__
// на версионированный ключ (см. vite.config define) — чтобы несколько версий пакета
// на странице не перетирали CSS друг друга. Вне сборки (vitest/storybook) define не
// применяется, идентификатор не определён — берём базовый ключ.
declare const __SKBKONTUR_TABLE_CSS_GLOBAL_KEY__: string | undefined;
const cssGlobalKey =
  typeof __SKBKONTUR_TABLE_CSS_GLOBAL_KEY__ === 'string' ? __SKBKONTUR_TABLE_CSS_GLOBAL_KEY__ : '__skbkonturTableCss';

// CSS пакета кладётся в этот глобал при загрузке dist-бандла (vite.config,
// cssInjectedByJsPlugin.injectCode). SSR/baseline без бандла — глобал пуст.
function getRawCss(): string | undefined {
  return typeof globalThis !== 'undefined'
    ? (globalThis as unknown as Record<string, string | undefined>)[cssGlobalKey]
    : undefined;
}

// В browser-бандле без подстановки `process` обращение к нему бросает ReferenceError
const isDevelopment = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';

/** CSS пакета, завёрнутый в cascade layer (consumer-оверрайды выигрывают каскад) */
function layered(cssText: string): string {
  return `@layer ${TABLE_STYLE_LAYER} {\n${cssText}\n}`;
}

// Лист на документ (realm-локальная копия) и набор активных таблиц на root.
const sheetsByDocument = new WeakMap<Document, CSSStyleSheet>();
const tablesByRoot = new WeakMap<Document | ShadowRoot, Set<object>>();

function getOwnerDocument(root: Document | ShadowRoot): Document | null {
  // Document.ownerDocument === null, поэтому отличаем по nodeType
  return root.nodeType === Node.DOCUMENT_NODE ? (root as Document) : root.ownerDocument;
}

/**
 * Лист со стилями пакета для документа (конструктор из его realm), null вне baseline.
 *
 * Эффективный baseline — пересечение adoptedStyleSheets и @layer:
 * Chrome/Edge 99+, Firefox 101+, Safari 16.4+. Детект по `replaceSync` пропускает
 * Chrome 73–98 (там есть adopted sheets, но нет @layer) — на них правила внутри
 * @layer будут отброшены и таблица останется без стилей; в 2026 такие версии
 * вымерли, поэтому отдельный детект @layer не добавляем.
 */
function getSheet(doc: Document): CSSStyleSheet | null {
  const cached = sheetsByDocument.get(doc);
  if (cached) {
    return cached;
  }
  const rawCss = getRawCss();
  const SheetConstructor = doc.defaultView?.CSSStyleSheet;
  if (!rawCss || typeof SheetConstructor !== 'function' || !('replaceSync' in SheetConstructor.prototype)) {
    return null;
  }
  const sheet = new SheetConstructor();
  sheet.replaceSync(layered(rawCss));
  sheetsByDocument.set(doc, sheet);
  return sheet;
}

const noop = (): void => {};

/**
 * Адоптит CSS пакета в root (документ таблицы или её shadow root) через
 * adoptedStyleSheets и возвращает отписку. Лист снимается, когда отписалась
 * последняя таблица root'а. SSR/worker и браузеры вне baseline — no-op.
 */
export function adoptTableStyles(root: Document | ShadowRoot): () => void {
  try {
    const doc = 'adoptedStyleSheets' in root ? getOwnerDocument(root) : null;
    const sheet = doc && getSheet(doc);
    if (!sheet) {
      return noop;
    }

    if (!root.adoptedStyleSheets.includes(sheet)) {
      root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
    }

    // Каждой таблице — свой токен в наборе root'а. Лист снимаем, когда набор
    // опустел; Set.delete идемпотентен, поэтому повторная отписка безопасна.
    const tables = tablesByRoot.get(root) ?? new Set<object>();
    tablesByRoot.set(root, tables);
    const token = {};
    tables.add(token);

    return () => {
      if (!tables.delete(token) || tables.size > 0) {
        return;
      }
      tablesByRoot.delete(root);
      try {
        // root (документ iframe) мог быть уничтожен/навигирован к моменту отписки
        root.adoptedStyleSheets = root.adoptedStyleSheets.filter((adopted) => adopted !== sheet);
      } catch {
        if (isDevelopment) {
          console.warn('[adoptTableStyles] failed to release table styles');
        }
      }
    };
  } catch {
    if (isDevelopment) {
      console.warn('[adoptTableStyles] failed to adopt table styles');
    }
    return noop;
  }
}
