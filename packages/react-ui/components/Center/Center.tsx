import React from 'react';

import { Override } from '../../typings/utility-types';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './Center.styles';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { oneOf } from 'prop-types';

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
export class Center extends React.Component<React.PropsWithChildren<CenterProps>> {
  constructor(props: React.PropsWithChildren<CenterProps>) {
    super(props);
  }

  render() {
    return <CenterFuture {...this.props} />;
  }
}

export const CenterFuture = forwardRefAndName<HTMLDivElement, React.PropsWithChildren<CenterProps>>(
  'CenterFuture',
  (props, ref) => {
    return (
      <CommonWrapper {...props}>
        <div
          {...props}
          ref={ref}
          className={cx({
            [styles.root()]: true,
            [styles.rootAlignLeft()]: props.align === 'left',
            [styles.rootAlignRight()]: props.align === 'right',
          })}
        >
          <span className={styles.spring()} />
          <span className={styles.container()}>{props.children}</span>
        </div>
      </CommonWrapper>
    );
  },
);

CenterFuture.propTypes = {
  align: oneOf(['left', 'center', 'right']),
};
