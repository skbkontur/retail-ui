import { TableDataTids } from './TableDataTids.js';

export const forceFocusVisibleAttribute = 'data-table-force-focus-visible';

const dataTidSelector = (dataTid: string) => `[data-tid~="${dataTid}"]`;

const getButtonFromElement = (element: HTMLElement | null): HTMLElement | null => {
  if (!element) {
    return null;
  }

  return element.tagName === 'BUTTON' ? element : element.querySelector<HTMLElement>('button');
};

// Возвращает таблицы-кандидаты в порядке приоритета: сначала ближайшая (где
// якорь лежит физически), затем — ближайшие по документу. Это нужно, когда
// строку фильтров рендерят в отдельной от данных таблице: в её собственной
// таблице кнопки фильтра нет, поэтому продолжаем искать в соседних.
const getCandidateTableRoots = (anchor: HTMLElement): ParentNode[] => {
  const roots: ParentNode[] = [];

  const directTableRoot = anchor.closest(dataTidSelector(TableDataTids.root)) ?? anchor.closest('table');
  if (directTableRoot) {
    roots.push(directTableRoot);
  }

  const searchRoot = anchor.closest('[data-role="preview"]') ?? document;
  const tableRoots = Array.from(searchRoot.querySelectorAll<HTMLElement>(dataTidSelector(TableDataTids.root)));

  const following = tableRoots.find(
    // eslint-disable-next-line no-bitwise
    (tableRoot) => anchor.compareDocumentPosition(tableRoot) & Node.DOCUMENT_POSITION_FOLLOWING,
  );
  const preceding = tableRoots.find(
    // eslint-disable-next-line no-bitwise
    (tableRoot) => anchor.compareDocumentPosition(tableRoot) & Node.DOCUMENT_POSITION_PRECEDING,
  );

  for (const candidate of [following, preceding]) {
    if (candidate && !roots.includes(candidate)) {
      roots.push(candidate);
    }
  }

  return roots;
};

const getFocusableFilterButton = (root: ParentNode): HTMLElement | null => {
  const filterSelectors = [
    dataTidSelector(TableDataTids.dropdownFilter),
    dataTidSelector(TableDataTids.dropdownSortableFilter),
    dataTidSelector(TableDataTids.filter),
  ].join(',');

  for (const filter of Array.from(root.querySelectorAll<HTMLElement>(filterSelectors))) {
    const button = getButtonFromElement(filter);
    if (button) {
      return button;
    }
  }

  const clickableHeader = root.querySelector<HTMLElement>(dataTidSelector(TableDataTids.clickableHeader));
  return (
    getButtonFromElement(clickableHeader) ??
    root.querySelector<HTMLElement>(`button${dataTidSelector(TableDataTids.clickableHeader)}`)
  );
};

export const getNearestFilterButton = (anchor: HTMLElement | null) => {
  if (!anchor) {
    return null;
  }

  for (const root of getCandidateTableRoots(anchor)) {
    const button = getFocusableFilterButton(root);
    if (button) {
      return button;
    }
  }

  return null;
};

export const focusFilterButton = (button: HTMLElement | null) => {
  if (!button) {
    return false;
  }

  button.setAttribute(forceFocusVisibleAttribute, 'true');
  if (button.ownerDocument.activeElement === button) {
    button.blur();
  }
  button.focus();
  return true;
};
