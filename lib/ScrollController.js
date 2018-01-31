// @flow
import getComputedStyle from './dom/getComputedStyle';
import getScrollWidth from './dom/getScrollWidth';
import events from 'add-event-listener';
import LayoutEvents from './LayoutEvents';
import { EventEmitter } from 'fbemitter';

export default class ScrollController {
  static _original: ?{ marginRight: number, overflowY: string };
  static _emitter;
  static _getEmitter = () => {
    if (!ScrollController._emitter) {
      ScrollController._emitter = new EventEmitter();
    }
    return ScrollController._emitter;
  };

  static _getHideRequestCount = (): number =>
    global.__RetailUIScrollHideRequestCount ||
    (global.__RetailUIScrollHideRequestCount = 0);

  static _setHideRequestCount = (value: number): number =>
    (global.__RetailUIScrollHideRequestCount = value);

  static hideScrollIfPossible = () => {
    const count = ScrollController._getHideRequestCount();
    if (count === 0) {
      ScrollController._hideInternal();
      LayoutEvents.emit();
      events.addEventListener(window, 'resize', ScrollController._hideInternal);
    }
    ScrollController._setHideRequestCount(count + 1);
  };

  static showScrollIfPossible = () => {
    const count = ScrollController._getHideRequestCount();
    if (count === 1) {
      ScrollController._showInternal();
      events.removeEventListener(
        window,
        'resize',
        ScrollController._hideInternal
      );
      LayoutEvents.emit();
    }
    ScrollController._setHideRequestCount(count - 1);
  };

  static addEventListener = (
    eventType: 'scrollShow' | 'scrollHide',
    callback: () => void
  ) => ScrollController._getEmitter().addListener(eventType, callback);

  static _hideInternal = () => {
    const { documentElement } = document;
    if (documentElement == null) {
      return;
    }

    let original = ScrollController._original;
    const { clientHeight, scrollHeight, style } = documentElement;
    if (clientHeight < scrollHeight) {
      style.marginRight = original
        ? original.marginRight.toString()
        : style.marginRight;
      style.overflowY = original
        ? original.overflowY
        : documentElement.style.overflowY;

      const computedStyle = getComputedStyle(documentElement);

      ScrollController._original = {
        marginRight: parseFloat(computedStyle.marginRight),
        overflowY: computedStyle.overflowY
      };

      original = ScrollController._original;

      style.marginRight = `${original.marginRight + getScrollWidth()}px`;
      style.overflowY = 'hidden';
      ScrollController._getEmitter().emit('scrollHide');
    } else if (
      original != null &&
      parseFloat(style.marginRight) !== original.marginRight
    ) {
      style.marginRight = original.marginRight.toString();
      style.overflowY = original.overflowY;

      ScrollController._original = null;
      ScrollController._getEmitter().emit('scrollShow');
    }
  };

  static _showInternal = () => {
    const { documentElement } = document;
    if (documentElement == null) {
      return;
    }
    const original = ScrollController._original;
    if (
      original &&
      documentElement.style.marginRight !== original.marginRight
    ) {
      documentElement.style.marginRight = original.marginRight.toString();
      documentElement.style.overflowY = original.overflowY;
      ScrollController._original = null;
      ScrollController._getEmitter().emit('scrollShow');
    }
  };
}
