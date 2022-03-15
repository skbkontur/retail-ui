import { isFunction } from './utils';

type ArgsBaseType = any[];
type Handler<K extends ArgsBaseType> = (...args: K) => void;
type Condition<T> = T | ((reference: T) => boolean);
type ActionFunc<T, K extends ArgsBaseType> = {
  condition: Condition<T>;
  handler: Handler<K>;
};

export class ConditionalHandler<T, K extends ArgsBaseType = any[]> {
  private readonly actions: ActionFunc<T, K>[] = [];

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
