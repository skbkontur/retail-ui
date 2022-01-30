import React, { useContext } from 'react';
import invariant from 'invariant';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Radio } from '../Radio';

import { RadioGroupProps } from './RadioGroup';
import { styles } from './RadioGroup.styles';
import { renderItem } from './utils';

export type RadioGroupChildrenProps<T> = Pick<RadioGroupProps<T>, 'items' | 'children' | 'inline'>;

function normalizeEntry<T>(entry: T | [T, React.ReactNode]): [T, React.ReactNode] {
  if (!Array.isArray(entry)) {
    return [entry, entry];
  }

  return entry;
}

function mapItems<T>(
  fn: (value: T, data: React.ReactNode, index: number) => React.ReactNode,
  items: NonNullable<RadioGroupProps<T>['items']>,
) {
  // This part is hard/impossible to type.
  // @ts-expect-error
  const result = items.reduce((accum, entry, index) => {
    const [value, data] = normalizeEntry<T>(entry);

    return [...accum, fn(value, data, index)];
  }, []);

  return result;
}

export function RadioGroupChildren<T>({ items, children, inline }: RadioGroupChildrenProps<T>) {
  const noItemsButChildren = !items && children;
  const noChildrenButItems = items && !children;
  invariant(noItemsButChildren || noChildrenButItems, 'Either `items` or `children` can be passed, not both');

  const theme = useContext(ThemeContext);

  const renderRadio = (value: T, data: React.ReactNode, index: number) => {
    const isValuePrimitive = typeof value === 'string' || typeof value === 'number';

    return (
      <span
        key={isValuePrimitive ? value : index}
        className={cx({
          [styles.item(theme)]: true,
          [styles.itemFirst()]: index === 0,
          [styles.itemInline()]: inline,
        })}
      >
        <Radio value={value}>{renderItem(value, data)}</Radio>
      </span>
    );
  };

  if (items) {
    return mapItems<T>(renderRadio, items);
  }

  return children;
}
