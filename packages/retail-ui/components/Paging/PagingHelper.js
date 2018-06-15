

function getItems(active: number, total: number): (number | '.')[] {
  let result = [];

  let left = Math.max(Math.min(active - 2, total - 4), 1);
  let right = Math.min(Math.max(5, active + 2), total);

  let hasLeftDots = left > 3;
  let from = hasLeftDots ? left : 1;

  let hasRightDots = right < total - 2;
  let to = hasRightDots ? right : total;

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

export default { getItems };
