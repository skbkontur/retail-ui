

export default function(e: SyntheticKeyboardEvent<>) {
  if (e.which == null) {
    if (e.keyCode < 32) {
      return null;
    }

    return String.fromCharCode(e.keyCode);
  }

  if (e.which !== 0 && e.charCode !== 0) {
    if (e.which < 32) {
      return null;
    }

    return String.fromCharCode(e.which);
  }

  return null;
}
