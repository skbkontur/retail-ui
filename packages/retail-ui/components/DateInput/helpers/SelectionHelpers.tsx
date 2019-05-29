export const selectNodeContents = (node: HTMLElement | null, start?: number, end?: number) => {
  if (!node) {
    return;
  }
  if (document.createRange) {
    const selection = window.getSelection();
    const range = window.document.createRange();
    if (start !== undefined && end !== undefined) {
      range.setStart(node, start);
      range.setEnd(node, end);
    } else {
      range.selectNodeContents(node);
    }
    try {
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    } catch (e) {
      // empty block
    }
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
  try {
    window.getSelection().removeAllRanges();
  } catch (e) {
    // empty block
    // Fix IE from issue not working (https://github.com/skbkontur/retail-ui/issues/1205)
  }
};
