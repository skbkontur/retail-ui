import React, { ReactNode, useContext } from 'react';

import { Modal, ModalHeaderProps } from '../Modal';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { InfoCircleIcon64Regular } from '../../internal/icons2022/InfoCircleIcon/InfoCircleIcon64Regular';
import { EmotionContext } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './MiniModal.styles';
import { MiniModalDataTids } from './MiniModal';

interface MiniModalHeaderProps extends ModalHeaderProps {
  /**
   * Пиктограмма в шапке компонента.
   *
   * @default InfoCircleIcon64Regular
   */
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
    const emotion = useContext(EmotionContext);
    const styles = getStyles(emotion);

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
              className={emotion.cx(styles.title(), {
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
