export default function stopPropagation(nativeEvent) {
  if (nativeEvent.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = false;
  }
}
