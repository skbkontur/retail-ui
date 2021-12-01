import React from 'react';

import { withClassWrapper } from '../../lib/withClassWrapper';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

import { VerticalGapped } from './VerticalGapped';
import { HorizontalGapped } from './HorizontalGapped';

export interface GappedProps extends CommonProps {
  /**
   * Расстояние между элементами в пикселях
   * @default 8
   */
  gap?: number;
  /**
   * Вертикальное выравнивание
   * @default "baseline"
   */
  verticalAlign: 'top' | 'middle' | 'baseline' | 'bottom';
  /**
   * Расположение элементов по вертикали
   * @default false
   */
  vertical: boolean;
  /**
   * Перенос элементов на новую строку при горизонтальном расположении
   * @default false
   */
  wrap: boolean;
  /**
   * @ignore
   */
  children: React.ReactNode;
}

const GappedFC = forwardRefAndName<HTMLDivElement, GappedProps>('GappedFC', (props, ref) => {
  const { instanceRef, verticalAlign = 'baseline', ...rest } = props;

  const content = () => {
    if (props.vertical) {
      return (
        <VerticalGapped ref={ref} gap={rest.gap}>
          {rest.children}
        </VerticalGapped>
      );
    }

    return (
      <HorizontalGapped ref={ref} verticalAlign={verticalAlign} wrap={rest.wrap} gap={rest.gap}>
        {rest.children}
      </HorizontalGapped>
    );
  };

  return <CommonWrapper {...rest}>{content()}</CommonWrapper>;
});

/**
 * Контейнер, расстояние между элементами в котором равно `gap`.
 */
export const Gapped = withClassWrapper(GappedFC);
export type Gapped = InstanceType<typeof Gapped>;
