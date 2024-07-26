export function getMenuPositions(menuPos?: 'top' | 'middle' | 'bottom', menuAlign?: 'left' | 'right') {
  if (menuAlign === null) {
    return menuPos === null ? ['top left', 'bottom left'] : [`${menuPos} left`];
  }

  if (menuPos === null) {
    return [`top ${menuAlign}`, `bottom ${menuAlign}`];
  }

  return [`${menuPos} ${menuAlign}`];
}
