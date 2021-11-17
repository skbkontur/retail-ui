import React from 'react';
import { oneOf } from 'prop-types';

import { Override } from '../../typings/utility-types';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

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

const CenterFC = forwardRefAndName<HTMLDivElement, React.PropsWithChildren<CenterProps>>(
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

CenterFC.propTypes = {
  align: oneOf(['left', 'center', 'right']),
};

/**
 * Контейнер, который центрирует элементы внутри себя.
 */
export class Center extends React.Component<React.PropsWithChildren<CenterProps>> {
  public static __KONTUR_REACT_UI__ = 'Center';

  public static FC = CenterFC;

  render() {
    return <Center.FC {...this.props} />;
  }
}
