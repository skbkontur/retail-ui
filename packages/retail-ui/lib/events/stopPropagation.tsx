export default function stopPropagation(nativeEvent: Event) {
  if (nativeEvent.stopPropagation) {
    nativeEvent.stopPropagation();
  } else {
    nativeEvent.cancelBubble = false;
  }
}
