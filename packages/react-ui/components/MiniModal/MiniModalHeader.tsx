import React, { useContext } from 'react';
import type { ReactNode } from 'react';

import { InfoCircleIcon64Regular } from '../../internal/icons2022/InfoCircleIcon/InfoCircleIcon64Regular.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { Modal } from '../Modal/index.js';
import type { ModalHeaderProps } from '../Modal/index.js';
import { MiniModalDataTids } from './MiniModal.js';
import { getStyles } from './MiniModal.styles.js';

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
    const { cx } = useEmotion();
    const styles = useStyles(getStyles);

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
