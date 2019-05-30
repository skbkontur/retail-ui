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
    if (selection !== null) {
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    }
  }

  // @ts-ignore (IE specific api)
  if (typeof document.body.createTextRange === 'function') {
    // @ts-ignore
    const range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
    return;
  }
};

export const removeAllSelections = () => {
  const selection = window.getSelection();
  if (selection !== null) {
    selection.removeAllRanges();
    // Fix IE from issue not working (https://github.com/skbkontur/retail-ui/issues/1205)
  }
};
