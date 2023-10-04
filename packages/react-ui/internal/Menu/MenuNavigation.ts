import React, { RefObject } from 'react';

interface Highlightable {
  highlight(): void;
  unhighlight(): void;
  props: {
    disabled?: boolean;
    onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
  };
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
      const menuItems = Array.from(this.root.current.querySelectorAll('span[data-tid="MenuItem__content"]'));
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
    cyclicSelection: boolean,
    scrollToTop?: () => void,
    scrollToBottom?: () => void,
    scrollToSelected?: () => void,
  ) {
    const currentIndex = this.highlightedItem ? this.items.indexOf(this.highlightedItem) : -1;

    let nextIndex = currentIndex + step;
    if (nextIndex < 0) {
      if (cyclicSelection) {
        nextIndex = this.items.length - 1;
      } else {
        nextIndex = 0;
      }
    }
    if (nextIndex > this.items.length - 1) {
      if (cyclicSelection) {
        nextIndex = 0;
      } else {
        nextIndex = this.items.length - 1;
      }
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
    this.highlightedItem = null;
  }

  public select(
    event: React.SyntheticEvent<HTMLElement>,
    onItemClick?: (event: React.SyntheticEvent<HTMLElement>) => void,
  ) {
    if (this.highlightedItem && !this.highlightedItem.props.disabled) {
      this.highlightedItem.props.onClick?.(event);
      onItemClick?.(event);
      return true;
    }
    return false;
  }

  public reset() {
    this.highlight(null);
    this.highlightedItem = null;
  }
}
