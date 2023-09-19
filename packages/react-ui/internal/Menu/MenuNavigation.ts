import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { MenuItem } from '../../components/MenuItem';
import { getRootNode } from '../../lib/rootNode';
import { ScrollContainer } from '../../components/ScrollContainer';

export class MenuNavigation {
  private readonly root: Nullable<Element>;
  private onItemClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
  private tagsAndItems: WeakMap<HTMLElement, MenuItem> = new WeakMap();

  public highlightedItem: MenuItem | null = null;
  private items: MenuItem[] = [];

  constructor(root: Nullable<Element>, onItemClick?: (event: React.SyntheticEvent<HTMLElement>) => void) {
    this.root = root;
    this.onItemClick = onItemClick;
  }

  private update() {
    if (this.root) {
      const menuItems = Array.from(this.root.querySelectorAll('noscript'));
      this.items = menuItems
        .map((item) => this.tagsAndItems.get(item))
        .filter((item): item is MenuItem => item !== undefined);
    }
  }

  public add(tag: HTMLElement, item: MenuItem) {
    this.tagsAndItems.set(tag, item);
    this.update();
  }

  public remove(tag: HTMLElement) {
    this.tagsAndItems.delete(tag);
    this.update();
  }

  public move(step: number, cyclicSelection: boolean, scrollContainer: Nullable<ScrollContainer>) {
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
        this.scrollToTop(scrollContainer);
        break;
      case this.items.length - 1:
        this.scrollToBottom(scrollContainer);
        break;
      default:
        this.scrollToSelected(scrollContainer);
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
    shouldHandleHref: boolean,
    event: React.SyntheticEvent<HTMLElement>,
    // onItemClick?: (event: React.SyntheticEvent<HTMLElement>) => void,
  ) {
    if (this.highlightedItem && !this.highlightedItem.props.disabled) {
      if (shouldHandleHref && this.highlightedItem.props.href) {
        if (this.highlightedItem.props.target) {
          window.open(this.highlightedItem.props.href, this.highlightedItem.props.target);
        } else {
          location.href = this.highlightedItem.props.href;
        }
      }
      this.highlightedItem.props.onClick?.(event);
      this.onItemClick?.(event);
      return true;
    }
    return false;
  }

  public reset() {
    this.highlight(null);
    this.highlightedItem = null;
  }

  public scrollToSelected = (scrollContainer: Nullable<ScrollContainer>) => {
    if (scrollContainer && this.highlightedItem) {
      const rootNode = getRootNode(this.highlightedItem);
      // TODO: Remove this check once IF-647 is resolved
      if (rootNode instanceof HTMLElement) {
        scrollContainer.scrollTo(rootNode);
      }
    }
  };

  private scrollToTop = (scrollContainer: Nullable<ScrollContainer>) => {
    if (scrollContainer) {
      scrollContainer.scrollToTop();
    }
  };

  private scrollToBottom = (scrollContainer: Nullable<ScrollContainer>) => {
    if (scrollContainer) {
      scrollContainer.scrollToBottom();
    }
  };
}
