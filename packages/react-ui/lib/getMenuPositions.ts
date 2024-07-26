export function getMenuPositions(menuPos?: 'top' | 'middle' | 'bottom', menuAlign?: 'left' | 'right') {
  if (menuAlign === undefined) {
    return menuPos === undefined ? ['bottom left', 'top left'] : [`${menuPos} left`];
  }

  if (menuPos === undefined) {
    return [`bottom ${menuAlign}`, `top ${menuAlign}`];
  }

  return [`${menuPos} ${menuAlign}`];
}
