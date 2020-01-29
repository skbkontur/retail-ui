import { ItemType } from './Paging';

export function getItems(active: number, total: number): ItemType[] {
  const result: ItemType[] = [];

  const left = Math.max(Math.min(active - 2, total - 4), 1);
  const right = Math.min(Math.max(5, active + 2), total);

  const hasLeftDots = left > 3;
  const from = hasLeftDots ? left : 1;

  const hasRightDots = right < total - 2;
  const to = hasRightDots ? right : total;

  if (hasLeftDots) {
    result.push(1, '.');
  }

  for (let i = from; i <= to; ++i) {
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
