import React, { useContext } from 'react';

import { Modal, ModalFooterProps } from '../Modal';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './MiniModal.styles';
import { MiniModalDataTids } from './MiniModal';

interface MiniModalFooterProps extends ModalFooterProps {
  /** Задает направление позиционирования кнопок. `row` работает только для 2 элементов, в других случаях автоматически включиться `column`.
   * @default row */
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

    return (
      <Modal.Footer {...rest}>
        <div
          ref={ref}
          data-tid={MiniModalDataTids.actions}
          className={cx(
            styles.actions(),
            _direction === 'row' && styles.actionsRow(theme),
            _direction === 'column' && styles.actionsColumn(theme),
          )}
        >
          {children}
        </div>
      </Modal.Footer>
    );
  },
);
