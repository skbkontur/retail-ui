import React from 'react';
import { oneOf } from 'prop-types';

import { Override } from '../../typings/utility-types';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { withClassWrapper } from '../../lib/withClassWrapper';

import { styles } from './Center.styles';

export type CenterProps = CommonProps &
  Override<
    React.HTMLAttributes<HTMLDivElement>,
    {
      /**
       * Определяет, как контент будет выровнен по горизонтали.
       *
       * **Допустимые значения**: `"left"`, `"center"`, `"right"`.
       */
      align?: 'left' | 'center' | 'right';
    }
  >;

const CenterFC = forwardRefAndName<HTMLDivElement, React.PropsWithChildren<CenterProps>>(
  'CenterFC',
  ({ instanceRef, align, ...rest }, ref) => {
    return (
      <CommonWrapper {...rest}>
        <div
          ref={ref}
          className={cx({
            [styles.root()]: true,
            [styles.rootAlignLeft()]: align === 'left',
            [styles.rootAlignRight()]: align === 'right',
          })}
          {...rest}
        >
          <span className={styles.spring()} />
          <span className={styles.container()}>{rest.children}</span>
        </div>
      </CommonWrapper>
    );
  },
);

CenterFC.propTypes = {
  align: oneOf(['left', 'center', 'right']),
};

/**
 * Контейнер, который центрирует элементы внутри себя.
 */
export const Center = withClassWrapper(CenterFC);
export type Center = InstanceType<typeof Center>;
