const defaultOptions = {
  duration: 150,
  delay: 0,
  iterations: 1,
  easing: 'ease-in',
} satisfies KeyframeAnimationOptions;

const animations = new WeakMap<HTMLElement, Animation>();

/**
 * Мерцание при вводе недоступных символов
 *
 * @param {Object} args
 * @param {HTMLElement|null} args.el Элемент, к которому применяется эффект.
 * @param {string} args.blinkColor Цвет мерцания в любом допустимом CSS-формате.
 * @param {KeyframeAnimationOptions} args.options Опции анимации (timing, duration и т.д.).
 *
 * @return {void}
 */
export function blink({
  el,
  blinkColor,
  options = {},
}: {
  el?: HTMLElement | null;
  blinkColor: string;
  options?: KeyframeAnimationOptions;
}): void {
  if (!el) {
    return;
  }
  const config = { ...defaultOptions, ...options };
  if ('animate' in el && typeof el.animate === 'function') {
    animations.get(el)?.cancel();
    animations.set(el, el.animate([{ backgroundColor: blinkColor }, { backgroundColor: 'inherit' }], config));
    return;
  }

  // Fallback Safari <13.1
  el.dataset.originalTransition = el.dataset.originalTransition ?? el.style.transition;
  el.dataset.originalBackgroundColor = el.dataset.originalBackgroundColor ?? el.style.backgroundColor;

  clearTimeout(el.dataset.timeoutId);
  el.style.transition = el.dataset.originalTransition;
  el.style.backgroundColor = blinkColor;

  setTimeout(() => {
    if (!el) {
      return;
    }
    el.style.transition = `background-color ${config.duration}ms ${config.delay}ms ${config.easing}`;
    el.style.backgroundColor = 'inherit';

    el.dataset.timeoutId = setTimeout(
      () => {
        if (!el) {
          return;
        }
        el.style.transition = el.dataset.originalTransition ?? '';
        el.style.backgroundColor = el.dataset.originalBackgroundColor ?? '';
      },
      parseInt(config.duration?.toString() || '0'),
    ).toString();
  }, 1);
}
