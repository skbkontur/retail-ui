import type { RefObject } from 'react';
import type React from 'react';

interface Highlightable {
  highlight(): void;
  unhighlight(): void;
  select(...args: unknown[]): void;
  isEnabled(): boolean;
}

export class MenuNavigation<T extends Highlightable> {
  private readonly root: RefObject<HTMLDivElement> | null;
  private readonly itemsContentDataTid: string;
  private tagsAndItems: WeakMap<Element, T> = new WeakMap();

  public highlightedItem: T | null = null;
  public items: T[] = [];

  constructor(root: RefObject<HTMLDivElement> | null, itemsContentDataTid: string) {
    this.root = root;
    this.itemsContentDataTid = itemsContentDataTid;
  }

  private update() {
    if (this.root?.current) {
      const menuItems = Array.from(this.root.current.querySelectorAll(`span[data-tid="${this.itemsContentDataTid}"]`));
      this.items = menuItems.map((item) => this.tagsAndItems.get(item)).filter((item): item is T => item !== undefined);
    }
  }

  public add(tag: Element, item: T) {
    this.tagsAndItems.set(tag, item);
    if (this.root?.current) {
      this.update();
    } else {
      this.items.push(item);
    }
  }

  public remove(tag: HTMLElement) {
    this.tagsAndItems.delete(tag);
    this.update();
  }

  public move(step: number, isCyclic: boolean) {
    const enabledItems = this.getEnabledItems();
    const currentIndex = this.highlightedItem ? enabledItems.indexOf(this.highlightedItem) : -1;
    const minIndex = 0;
    const maxIndex = enabledItems.length - 1;
    let nextIndex = currentIndex + step;
    if (nextIndex < minIndex) {
      nextIndex = isCyclic ? maxIndex : minIndex;
    }
    if (nextIndex > maxIndex) {
      nextIndex = isCyclic ? minIndex : maxIndex;
    }

    const nextItem = enabledItems[nextIndex];

    this.highlight(nextItem);

    return nextIndex;
  }

  public highlight(item: T | null) {
    const enabledItems = this.getEnabledItems();
    enabledItems.forEach((_item) => {
      if (item === _item) {
        _item.highlight();
        this.highlightedItem = item;
      } else {
        _item.unhighlight();
      }
    });
  }

  public highlightByIndex(index: number) {
    this.items.forEach((_item, i) => {
      if (index === i && _item.isEnabled()) {
        _item.highlight();
        this.highlightedItem = _item;
      } else {
        _item.unhighlight();
      }
    });
  }

  public unhighlight() {
    this.highlightedItem?.unhighlight();
    this.highlightedItem = null;
  }

  public select(event: React.SyntheticEvent<HTMLElement>) {
    if (this.highlightedItem) {
      this.highlightedItem.select(event);
      return true;
    }
    return false;
  }

  public reset() {
    this.highlight(null);
    this.highlightedItem = null;
  }

  private getEnabledItems = () => {
    return this.items.filter((item) => item.isEnabled());
  };
}
