import React, { useContext } from 'react';
import invariant from 'invariant';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Radio, RadioValue } from '../Radio';

import { RadioGroupProps } from './RadioGroup';
import { styles } from './RadioGroup.styles';
import { renderItem } from './utils';

export type RadioGroupChildrenProps = Pick<RadioGroupProps, 'items' | 'children' | 'inline'>;

function normalizeEntry(entry: RadioValue | [RadioValue, React.ReactNode]) {
  if (!Array.isArray(entry)) {
    return [entry, entry];
  }

  return entry;
}

function mapItems(
  fn: (value: RadioValue, data: React.ReactNode, index: number) => React.ReactNode,
  items: NonNullable<RadioGroupProps['items']>,
) {
  // This part is hard/impossible to type.
  // @ts-expect-error
  return items.reduce((accum, entry, index) => {
    const [value, data] = normalizeEntry(entry);

    return [...accum, fn(value, data, index)];
  }, []);
}

export function RadioGroupChildren({ items, children, inline }: RadioGroupChildrenProps) {
  const noItemsButChildren = !items && children;
  const noChildrenButItems = items && !children;
  invariant(noItemsButChildren || noChildrenButItems, 'Either `items` or `children` can be passed, not both');

  const theme = useContext(ThemeContext);

  const renderRadio = (value: RadioValue, data: React.ReactNode, index: number) => {
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
    return mapItems(renderRadio, items);
  }

  return children;
}
