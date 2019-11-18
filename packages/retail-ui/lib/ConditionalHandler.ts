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
   * @param defaultHandler
   * @returns {Boolean} isDone - был ли вызван хоть один обработчик
   */
  public build(defaultHandler?: Handler<K>): (reference: T, ...args: K) => boolean {
    return (reference, ...args) => {
      let isFound: boolean = false;
      this.actions.forEach(({ condition, handler }) => {
        if (isFunction(condition) ? condition(reference) : condition === reference) {
          handler(...args);
          isFound = true;
        }
      });

      if (!isFound && defaultHandler) {
        defaultHandler(...args);
      }

      return isFound || !!defaultHandler;
    };
  }
}
