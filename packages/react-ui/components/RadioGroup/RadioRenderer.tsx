import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { Radio } from '../Radio';

import { RadioGroupProps } from './RadioGroup';
import { styles } from './RadioGroup.styles';

type RadioRendererInternface = {
  data: React.ReactNode;
  index: number;
  value: NonNullable<RadioGroupProps['value']>;
};

export type RadioRendererProps = RadioRendererInternface & Pick<RadioGroupProps, 'inline' | 'renderItem'>;

export const RadioRenderer = ({ value, data, index, inline, renderItem }: RadioRendererProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span
      className={cx({
        [styles.item(theme)]: true,
        [styles.itemFirst()]: index === 0,
        [styles.itemInline()]: inline,
      })}
    >
      <Radio value={value}>{renderItem?.(value, data) ?? data}</Radio>
    </span>
  );
};
