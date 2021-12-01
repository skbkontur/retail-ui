import React from 'react';
import { oneOf } from 'prop-types';

import { Override } from '../../typings/utility-types';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { withClassWrapper } from '../../lib/withClassWrapper';

import { styles } from './Center.styles';

export type HorizontalAlign = 'left' | 'center' | 'right';

export interface CenterProps
  extends CommonProps,
    Override<
      React.HTMLAttributes<HTMLDivElement>,
      {
        /**
         * Определяет, как контент будет выровнен по горизонтали.
         *
         * **Допустимые значения**: `"left"`, `"center"`, `"right"`.
         */
        align?: HorizontalAlign;
      }
    > {}

const CenterFC = forwardRefAndName<HTMLDivElement, React.PropsWithChildren<CenterProps>>('CenterFC', (props, ref) => {
  const { instanceRef, ...rest } = props;

  return (
    <CommonWrapper {...props}>
      <div
        ref={ref}
        className={cx({
          [styles.root()]: true,
          [styles.rootAlignLeft()]: props.align === 'left',
          [styles.rootAlignRight()]: props.align === 'right',
        })}
        {...rest}
      >
        <span className={styles.spring()} />
        <span className={styles.container()}>{props.children}</span>
      </div>
    </CommonWrapper>
  );
});

CenterFC.propTypes = {
  align: oneOf(['left', 'center', 'right']),
};

/**
 * Контейнер, который центрирует элементы внутри себя.
 */
export const Center = withClassWrapper(CenterFC);
export type Center = InstanceType<typeof Center>;
