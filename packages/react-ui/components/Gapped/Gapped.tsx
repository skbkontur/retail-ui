import React from 'react';

import { withClassWrapper } from '../../lib/withClassWrapper';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

import { VerticalGapped } from './VerticalGapped';
import { HorizontalGapped } from './HorizontalGapped';

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

export type GappedProps = GappedInterface & CommonProps;

const GappedFC = forwardRefAndName<HTMLDivElement, GappedProps>(
  'GappedFC',
  ({ instanceRef, verticalAlign = 'baseline', vertical, gap, children, wrap, ...rest }, ref) => {
    if (vertical) {
      return (
        <CommonWrapper {...rest}>
          <VerticalGapped ref={ref} gap={gap}>
            {children}
          </VerticalGapped>
        </CommonWrapper>
      );
    }

    return (
      <CommonWrapper {...rest}>
        <HorizontalGapped ref={ref} verticalAlign={verticalAlign} wrap={wrap} gap={gap}>
          {children}
        </HorizontalGapped>
      </CommonWrapper>
    );
  },
);

/**
 * Контейнер, расстояние между элементами в котором равно `gap`.
 */
export const Gapped = withClassWrapper(GappedFC);
export type Gapped = InstanceType<typeof Gapped>;
