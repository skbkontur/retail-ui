import type { ReactNode } from 'react';
import React, { useContext } from 'react';

import type { ModalHeaderProps } from '../Modal';
import { Modal } from '../Modal';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { InfoCircleIcon64Regular } from '../../internal/icons2022/InfoCircleIcon/InfoCircleIcon64Regular';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './MiniModal.styles';
import { MiniModalDataTids } from './MiniModal';

interface MiniModalHeaderProps extends ModalHeaderProps {
  /** Задает иконку в шапку компонента.
   * @default InfoCircleIcon64Regular */
  icon?: ReactNode;
}

/**
 * Обёртка над Modal.Header
 *
 * @visibleName MiniModal.Header
 */
export const MiniModalHeader = forwardRefAndName<HTMLDivElement, MiniModalHeaderProps>(
  'MiniModalHeader',
  ({ icon = <InfoCircleIcon64Regular />, children, ...rest }, ref) => {
    const theme = useContext(ThemeContext);

    return (
      <Modal.Header {...rest}>
        <div ref={ref}>
          {icon && (
            <div data-tid={MiniModalDataTids.icon} className={styles.icon()}>
              {icon}
            </div>
          )}
          {children && (
            <div
              data-tid={MiniModalDataTids.title}
              className={cx(styles.title(), {
                [styles.titleWithIcon(theme)]: !!icon,
              })}
            >
              {children}
            </div>
          )}
        </div>
      </Modal.Header>
    );
  },
);
