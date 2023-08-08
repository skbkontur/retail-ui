import React, { AriaAttributes, HTMLAttributes, ReactChild, useContext } from 'react';

import { Modal } from '../Modal';
import { InfoCircleIcon64Regular } from '../../internal/icons2022/InfoCircleIcon/InfoCircleIcon64Regular';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { isIE11 } from '../../lib/client';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { CommonProps } from '../../internal/CommonWrapper';

import { styles } from './MiniModal.styles';
import { getMiniModalTheme } from './getMiniModalTheme';

export interface MiniModalProps
  extends CommonProps,
    Pick<HTMLAttributes<unknown>, 'role'>,
    Pick<AriaAttributes, 'aria-label' | 'aria-labelledby'> {
  /**
   * Заголовок компонента.
   */
  title: string;

  /**
   * Пиктограмма в шапке компонента.
   *
   * @default InfoCircleIcon64Regular
   */
  icon?: ReactChild;

  /**
   * Поясняющий текст, если заголовка недостаточно.
   */
  description?: string;

  /**
   * Основное действие.
   */
  btnMain: JSX.Element;

  /**
   * Альтернативное действие.
   */
  btnAlt?: JSX.Element | null;

  /**
   * Отменяющее действие.
   */
  btnCancel?: JSX.Element | null;

  /**
   * Направление позиционирования кнопок. Если заданы все 3 кнопки, то всегда будет `column`.
   *
   * @default row
   */
  direction?: 'row' | 'column';

  /**
   * Отступ для кнопки отмены `btnCancel`. Учитывается только если заданы все 3 кнопки.
   *
   * @default false
   */
  hasCancelIndent?: boolean;
}

export const MiniModalDataTids = {
  icon: 'MiniModal__icon',
  title: 'MiniModal__title',
  description: 'MiniModal__description',
  actions: 'MiniModal__actions',
} as const;

export const MiniModal = forwardRefAndName<Modal, MiniModalProps>(
  'MiniModal',
  (
    {
      icon = <InfoCircleIcon64Regular />,
      title,
      description = '',
      btnMain,
      btnAlt = null,
      btnCancel = null,
      direction = 'row',
      hasCancelIndent = false,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext);

    const _direction = btnAlt && btnCancel ? 'column' : direction;
    const _hasCancelIndent = hasCancelIndent && btnAlt && btnCancel;

    // IE11 does not support CSS property `gap`
    const IE11FallbackClasses =
      isIE11 &&
      cx(
        _hasCancelIndent && styles.actionsCancelIndentIE11Fallback(theme),
        _direction === 'row' && styles.actionsRowIE11Fallback(theme),
        _direction === 'column' && styles.actionsColumnIE11Fallback(theme),
      );

    return (
      <ThemeContext.Provider value={getMiniModalTheme(theme)}>
        <Modal width={400} noClose ref={ref} {...rest}>
          <Modal.Header>
            <div data-tid={MiniModalDataTids.icon} className={styles.icon()}>
              {icon}
            </div>
            <div data-tid={MiniModalDataTids.title} className={styles.title(theme)}>
              {title}
            </div>
          </Modal.Header>
          {Boolean(description) && (
            <Modal.Body data-tid={MiniModalDataTids.description} style={{ textAlign: 'center' }}>
              {description}
            </Modal.Body>
          )}
          <Modal.Footer>
            <div
              data-tid={MiniModalDataTids.actions}
              className={cx(
                styles.actions(theme),
                _hasCancelIndent && styles.actionsCancelIndent(theme),
                _direction === 'row' && styles.actionsRow(),
                _direction === 'column' && styles.actionsColumn(),
                IE11FallbackClasses,
              )}
            >
              {btnMain}
              {btnAlt}
              {btnCancel}
            </div>
          </Modal.Footer>
        </Modal>
      </ThemeContext.Provider>
    );
  },
);

MiniModal.__KONTUR_REACT_UI__ = 'MiniModal';
