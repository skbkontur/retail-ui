// @flow

export const selectNodeContents = (node: HTMLElement) => {
  const selection = window.getSelection();
  const range = window.document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
};

export const removeAllSelections = () => {
  window.getSelection().removeAllRanges();
};
