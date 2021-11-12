import React, { forwardRef } from 'react';

import { Override } from '../../typings/utility-types';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

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

/**
 * Контейнер, который центрирует элементы внутри себя.
 */
const Center = forwardRef<HTMLDivElement, React.PropsWithChildren<CenterProps>>(({ align, children, ...rest }, ref) => {
  return (
    <CommonWrapper {...rest}>
      <div
        ref={ref}
        {...rest}
        className={cx({
          [styles.root()]: true,
          [styles.rootAlignLeft()]: align === 'left',
          [styles.rootAlignRight()]: align === 'right',
        })}
      >
        <span className={styles.spring()} />
        <span className={styles.container()}>{children}</span>
      </div>
    </CommonWrapper>
  );
});

const componentName = 'Center';
Center.displayName = componentName;

const CenterWithName = Object.assign(Center, { __KONTUR_REACT_UI__: 'Center' });
export { CenterWithName as Center };
