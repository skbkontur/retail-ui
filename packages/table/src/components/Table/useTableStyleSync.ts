import { globalObject } from '@skbkontur/global-object';
import { useCallback, useRef, type ForwardedRef, type MutableRefObject } from 'react';

import { adoptTableStyles } from '../../styleInjection/deliverStyles.js';

/** Сколько кадров ждём подключения отсоединённой таблицы к DOM, прежде чем сдаться */
const MAX_CONNECTION_WAIT_FRAMES = 60;

/** Кросс-realm проверка на ShadowRoot (instanceof ломается для iframe) */
function isShadowRoot(node: Node): node is ShadowRoot {
  return node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && 'adoptedStyleSheets' in node;
}

/**
 * Ref-колбэк на `<table>`: при маунте адоптит стили пакета в документ таблицы
 * (основной или iframe) и в её shadow root, при анмаунте — отписывается (стили
 * снимаются, когда уходит последняя таблица root'а).
 *
 * `ownerDocument` известен сразу, поэтому документ застиливается немедленно —
 * даже до подключения к DOM (delayed attachment). Shadow root становится известен
 * лишь после подключения, поэтому его ждём ограниченное число кадров через
 * requestAnimationFrame. Адопция выполняется до форвардинга ref, чтобы consumer
 * с callback-ref видел таблицу уже застиленной.
 */
export function useTableStyleSync(ref: ForwardedRef<HTMLTableElement>): (node: HTMLTableElement | null) => void {
  // Единственное состояние хука: откат прежней подписки (снятие стилей + отмена кадра)
  const cleanupRef = useRef<(() => void) | null>(null);

  return useCallback(
    (node: HTMLTableElement | null) => {
      // Откатываем прежний root перед сменой node (анмаунт или повторный маунт)
      cleanupRef.current?.();
      cleanupRef.current = null;

      if (node) {
        // ownerDocument известен сразу даже на отсоединённом узле — адоптим его сейчас
        const releases = [adoptTableStyles(node.ownerDocument)];
        cleanupRef.current = () => releases.forEach((release) => release());

        const adoptShadowRoot = () => {
          const root = node.getRootNode();
          if (isShadowRoot(root)) {
            releases.push(adoptTableStyles(root));
          }
        };

        const requestFrame = globalObject.requestAnimationFrame?.bind(globalObject);
        const cancelFrame = globalObject.cancelAnimationFrame?.bind(globalObject);

        if (node.isConnected) {
          adoptShadowRoot();
        } else if (requestFrame && cancelFrame) {
          // Отложенный аттач: ждём подключения, чтобы узнать финальный shadow root
          let attemptsLeft = MAX_CONNECTION_WAIT_FRAMES;
          let frameId = requestFrame(function waitForConnection() {
            if (node.isConnected) {
              adoptShadowRoot();
            } else if (--attemptsLeft > 0) {
              frameId = requestFrame(waitForConnection);
            }
          });
          // Отмена кадра — такой же откат, как и снятие стилей: кладём в общий список
          releases.push(() => cancelFrame(frameId));
        }
      }

      // Форвардим ref после адопции, чтобы consumer-ref видел застиленную таблицу
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as MutableRefObject<HTMLTableElement | null>).current = node;
      }
    },
    [ref],
  );
}
