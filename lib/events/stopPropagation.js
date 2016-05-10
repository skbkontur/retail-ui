// @flow

export default function stopPropagation(nativeEvent: Event) {
  if (nativeEvent.stopPropagation) {
    nativeEvent.stopPropagation();
  } else {
    (nativeEvent: Object).cancelBubble = false;
  }
}
