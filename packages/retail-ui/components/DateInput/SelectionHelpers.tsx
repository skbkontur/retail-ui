export const selectNodeContents = (node: HTMLElement) => {
  if (document.createRange) {
    const selection = window.getSelection();
    const range = window.document.createRange();
    range.selectNodeContents(node);
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
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
  // @ts-ignore Fix IE error 800a025e https://github.com/skbkontur/retail-ui/issues/1205
  if (typeof document.body.createTextRange === 'function') {
    // @ts-ignore
    document.body.createTextRange().collapse();
  } else {
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  }
};
