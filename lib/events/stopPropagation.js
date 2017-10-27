// @flow

export default function stopPropagation(nativeEvent: Event) {
  if (nativeEvent.stopPropagation) {
    nativeEvent.stopPropagation();
  } else {
    // eslint-disable-next-line flowtype/no-weak-types
    (nativeEvent: Object).cancelBubble = false;
  }
}
