import React, { RefObject } from 'react';

import { MenuItemDataTids } from '../../components/MenuItem';

interface Highlightable {
  highlight(): void;
  unhighlight(): void;
  select(...args: unknown[]): void;
}

export class MenuNavigation<T extends Highlightable> {
  private readonly root: RefObject<HTMLDivElement> | null;
  private tagsAndItems: WeakMap<Element, T> = new WeakMap();

  public highlightedItem: T | null = null;
  private items: T[] = [];

  constructor(root: RefObject<HTMLDivElement> | null) {
    this.root = root;
  }

  private update() {
    if (this.root && this.root.current) {
      const menuItems = Array.from(this.root.current.querySelectorAll(`span[data-tid="${MenuItemDataTids.content}"]`));
      this.items = menuItems.map((item) => this.tagsAndItems.get(item)).filter((item): item is T => item !== undefined);
    }
  }

  public add(tag: Element, item: T) {
    this.tagsAndItems.set(tag, item);
    this.update();
  }

  public remove(tag: HTMLElement) {
    this.tagsAndItems.delete(tag);
    this.update();
  }

  public move(
    step: number,
    isCyclic: boolean,
    scrollToTop?: () => void,
    scrollToBottom?: () => void,
    scrollToSelected?: () => void,
  ) {
    const currentIndex = this.highlightedItem ? this.items.indexOf(this.highlightedItem) : -1;
    const minIndex = 0;
    const maxIndex = this.items.length - 1;
    let nextIndex = currentIndex + step;
    if (nextIndex < minIndex) {
      nextIndex = isCyclic ? maxIndex : minIndex;
    }
    if (nextIndex > maxIndex) {
      nextIndex = isCyclic ? minIndex : maxIndex;
    }

    const nextItem = this.items[nextIndex];

    this.highlight(nextItem);

    switch (nextIndex) {
      case 0:
        scrollToTop?.();
        break;
      case this.items.length - 1:
        scrollToBottom?.();
        break;
      default:
        scrollToSelected?.();
    }
  }

  public highlight(item: T | null) {
    this.items.forEach((_item) => {
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
      if (index === i) {
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
}
