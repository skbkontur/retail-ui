import React, { useContext } from 'react';

import { Modal, ModalFooterProps } from '../Modal';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { isIE11 } from '../../lib/client';
import { EmotionContext } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './MiniModal.styles';
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
    const emotion = useContext(EmotionContext);
    const styles = getStyles(emotion);

    const childrenCount = React.Children.count(children);
    const _direction = childrenCount > 2 || childrenCount === 1 ? 'column' : direction;

    // IE11 does not support CSS property `gap`
    const IE11FallbackClasses =
      isIE11 &&
      emotion.cx(
        _direction === 'row' && styles.actionsRowIE11Fallback(theme),
        _direction === 'column' && styles.actionsColumnIE11Fallback(theme),
      );

    return (
      <Modal.Footer {...rest}>
        <div
          ref={ref}
          data-tid={MiniModalDataTids.actions}
          className={emotion.cx(
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
