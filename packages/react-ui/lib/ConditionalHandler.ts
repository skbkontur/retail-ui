import { isFunction } from './utils';

type Handler<K extends any[]> = (...args: K) => void;
type Condition<T> = T | ((reference: T) => boolean);

export class ConditionalHandler<T, K extends any[] = any[]> {
  private readonly actions: Array<{
    condition: Condition<T>;
    handler: Handler<K>;
  }> = [];

  public add(condition: Condition<T>, handler: Handler<K>): ConditionalHandler<T, K> {
    this.actions.push({ condition, handler });
    return this;
  }

  /**
   * @returns {Boolean} found - был ли найден и вызван хоть один обработчик
   */
  public build(): (reference: T, ...args: K) => boolean {
    return (reference, ...args) => {
      let found = false;
      this.actions.forEach(({ condition, handler }) => {
        if (isFunction(condition) ? condition(reference) : condition === reference) {
          handler(...args);
          found = true;
        }
      });

      return found;
    };
  }
}
