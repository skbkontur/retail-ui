

export const selectNodeContents = (node: HTMLElement) => {
  if (document.createRange) {
    const selection = window.getSelection();
    const range = window.document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    return;
  }

  const { body } = document;
  if (body && typeof body.createTextRange === 'function') {
    const range = body.createTextRange();
    range.moveToElementText(node);
    range.select();
    return;
  }
};

export const removeAllSelections = () => {
  window.getSelection().removeAllRanges();
};
