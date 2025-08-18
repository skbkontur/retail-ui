import type { ItemType } from './Paging';

const NEIGHBOR_ITEM_COUNT_DESKTOP = 2;
const NEIGHBOR_ITEM_COUNT_MOBILE = 1;

const EDGE_ITEM_COUNT_DESKTOP = 4;
const EDGE_ITEM_COUNT_MOBILE = 2;

export function getItems(active: number, total: number, isMobile: boolean): ItemType[] {
  const result: ItemType[] = [];

  const neighborItemCount = isMobile ? NEIGHBOR_ITEM_COUNT_MOBILE : NEIGHBOR_ITEM_COUNT_DESKTOP;
  const edgeItemCount = isMobile ? EDGE_ITEM_COUNT_MOBILE : EDGE_ITEM_COUNT_DESKTOP;

  // Group refers to a sequence of items in a row without dots
  const groupLeftmost = Math.max(Math.min(active - neighborItemCount, total - edgeItemCount), 1);
  const groupRightmost = Math.min(Math.max(1 + edgeItemCount, active + neighborItemCount), total);

  const hasLeftDots = groupLeftmost > 3;
  const hasRightDots = groupRightmost < total - 2;

  const groupStart = hasLeftDots ? groupLeftmost : 1;
  const groupEnd = hasRightDots ? groupRightmost : total;

  if (hasLeftDots) {
    result.push(1, '.');
  }
  for (let i = groupStart; i <= groupEnd; ++i) {
    result.push(i);
  }
  if (hasRightDots) {
    result.push('.');
  }
  if (hasRightDots && isFinite(total)) {
    result.push(total);
  }

  return result;
}
