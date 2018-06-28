export const selectNodeContents = (node: HTMLElement) => {
  if (document.createRange) {
    const selection = window.getSelection();
    const range = window.document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    return;
  }

  // @ts-ignore
  if (typeof document.body.createTextRange === 'function') {
    // @ts-ignore
    const range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
    return;
  }
};

export const removeAllSelections = () => {
  window.getSelection().removeAllRanges();
};
