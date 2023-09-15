import { Event } from '@skbkontur/global-object/lib';

export const stopPropagation = (nativeEvent: Event) => {
  if (nativeEvent.stopPropagation) {
    nativeEvent.stopPropagation();
  } else {
    nativeEvent.cancelBubble = false;
  }
};
