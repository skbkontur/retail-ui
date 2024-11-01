import React, { useContext } from 'react';

import type { ModalFooterProps } from '../Modal';
import { Modal } from '../Modal';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isIE11 } from '../../lib/client';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './MiniModal.styles';
import { MiniModalDataTids } from './MiniModal';

interface MiniModalFooterProps extends ModalFooterProps {
  /**
   * Направление позиционирования кнопок.
   * `row` работает только для 2 элементов,
   * в других случаях автоматически включиться `column`.
   *
   * @default row
   */
  direction?: 'row' | 'column';
}

/**
 * Обёртка над Modal.Footer
 *
 * @visibleName MiniModal.Footer
 */
export const MiniModalFooter = forwardRefAndName<HTMLDivElement, MiniModalFooterProps>(
  'MiniModalFooter',
  ({ direction = 'row', children, ...rest }, ref) => {
    const theme = useContext(ThemeContext);

    const childrenCount = React.Children.count(children);
    const _direction = childrenCount > 2 || childrenCount === 1 ? 'column' : direction;

    // IE11 does not support CSS property `gap`
    const IE11FallbackClasses =
      isIE11 &&
      cx(
        _direction === 'row' && styles.actionsRowIE11Fallback(theme),
        _direction === 'column' && styles.actionsColumnIE11Fallback(theme),
      );

    return (
      <Modal.Footer {...rest}>
        <div
          ref={ref}
          data-tid={MiniModalDataTids.actions}
          className={cx(
            styles.actions(theme),
            _direction === 'row' && styles.actionsRow(),
            _direction === 'column' && styles.actionsColumn(),
            IE11FallbackClasses,
          )}
        >
          {children}
        </div>
      </Modal.Footer>
    );
  },
);
