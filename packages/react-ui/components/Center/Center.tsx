import React from 'react';
import propTypes from 'prop-types';

import { Override } from '../../typings/utility-types';
import { CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { withClassWrapper } from '../../lib/withClassWrapper';

import { styles } from './Center.styles';

type CenterInterface = {
  /**
   * Определяет, как контент будет выровнен по горизонтали.
   *
   * **Допустимые значения**: `"left"`, `"center"`, `"right"`.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * @ignore
   */
  children: React.ReactNode;
};

export type CenterProps = CommonProps &
  Override<React.HTMLAttributes<HTMLDivElement>, CenterInterface> & { instanceRef?: unknown };

const CenterFC = forwardRefAndName<HTMLDivElement, CenterProps>(
  'CenterFC',
  ({ instanceRef, align, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          {
            [styles.root()]: true,
            [styles.rootAlignLeft()]: align === 'left',
            [styles.rootAlignRight()]: align === 'right',
          },
          className,
        )}
        {...rest}
      >
        <span className={styles.spring()} />
        <span className={styles.container()}>{rest.children}</span>
      </div>
    );
  },
);

CenterFC.propTypes = {
  align: propTypes.oneOf(['left', 'center', 'right']),
};

/**
 * Контейнер, который центрирует элементы внутри себя.
 */
export const Center = withClassWrapper(CenterFC);
export type Center = InstanceType<typeof Center>;
