import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { MenuItem } from '../../components/MenuItem';

export class MenuNavigation {
  private readonly root: Nullable<Element>;
  private tagsAndItems: WeakMap<Element, MenuItem> = new WeakMap();

  public highlightedItem: MenuItem | null = null;
  private items: MenuItem[] = [];

  constructor(root: Nullable<Element>) {
    this.root = root;
  }

  private update() {
    if (this.root) {
      const menuItems = Array.from(this.root.querySelectorAll('span[data-tid="MenuItem__content"]'));
      this.items = menuItems
        .map((item) => this.tagsAndItems.get(item))
        .filter((item): item is MenuItem => item !== undefined);
    }
  }

  public add(tag: Element, item: MenuItem) {
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

  public highlight(item: MenuItem | null) {
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
