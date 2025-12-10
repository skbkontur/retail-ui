import React, { useContext } from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import type { ModalFooterProps } from '../Modal/index.js';
import { Modal } from '../Modal/index.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';

import { getStyles } from './MiniModal.styles.js';
import { MiniModalDataTids } from './MiniModal.js';

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
    const { cx } = useEmotion();
    const styles = useStyles(getStyles);

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
