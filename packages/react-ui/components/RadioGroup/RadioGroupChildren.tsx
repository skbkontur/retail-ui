import React from 'react';
import invariant from 'invariant';

import { RadioGroupProps } from './RadioGroup';
import { RadioRenderer } from './RadioRenderer';
import { normalizeEntry } from './utils';

export type RadioGroupChildrenProps = Pick<RadioGroupProps, 'items' | 'children' | 'inline' | 'renderItem'>;

export function RadioGroupChildren({ items, children, inline, renderItem }: RadioGroupChildrenProps) {
  invariant((!items && children) || (items && !children), 'Either `items` or `children` can be passed, not both');

  if (items) {
    // TypeScript does not infer types for this .map call at build stage.
    // @ts-ignore
    return items.map((item, index) => {
      const [value, data] = normalizeEntry(item);

      return (
        <RadioRenderer renderItem={renderItem} key={value} value={value} data={data} index={index} inline={inline} />
      );
    }) as unknown as JSX.Element;
  }

  return children as JSX.Element;
}
