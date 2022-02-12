import React from 'react';
import propTypes from 'prop-types';

import { withClassWrapper } from '../../lib/withClassWrapper';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { CommonProps } from '../../internal/CommonWrapper';

import { VerticalGapped } from './VerticalGapped';
import { HorizontalGapped } from './HorizontalGapped';
import { useGapValue } from './useGapValue';

type GappedInterface = {
  /**
   * Расстояние между элементами в пикселях
   * @default 8
   */
  gap?: number;
  /**
   * Вертикальное выравнивание
   * @default "baseline"
   */
  verticalAlign?: 'top' | 'middle' | 'baseline' | 'bottom';
  /**
   * Расположение элементов по вертикали
   * @default false
   */
  vertical?: boolean;
  /**
   * Перенос элементов на новую строку при горизонтальном расположении
   * @default false
   */
  wrap?: boolean;
  /**
   * @ignore
   */
  children: React.ReactNode;
};

export type GappedProps = GappedInterface &
  CommonProps & {
    instanceRef?: unknown;
  };

export type GappedRef = {
  element: HTMLDivElement;
};

const GappedFC = forwardRefAndName<GappedRef['element'], GappedProps>(
  'GappedFC',
  ({ instanceRef, verticalAlign = 'baseline', vertical, gap, children, wrap, ...rest }, ref) => {
    const gapValue = useGapValue(gap);

    if (vertical) {
      return (
        <VerticalGapped ref={ref} gap={gapValue} {...rest}>
          {children}
        </VerticalGapped>
      );
    }

    return (
      <HorizontalGapped ref={ref} verticalAlign={verticalAlign} wrap={wrap} gap={gapValue} {...rest}>
        {children}
      </HorizontalGapped>
    );
  },
);

GappedFC.propTypes = {
  gap: propTypes.number,
  verticalAlign: propTypes.oneOf(['top', 'middle', 'baseline', 'bottom']),
  vertical: propTypes.bool,
  wrap: propTypes.bool,
  children: propTypes.node.isRequired,
};

/**
 * Контейнер, расстояние между элементами в котором равно `gap`.
 */
export const Gapped = withClassWrapper(GappedFC);
export type Gapped = InstanceType<typeof Gapped>;
