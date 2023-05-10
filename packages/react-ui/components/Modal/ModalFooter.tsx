import React, { ReactNode, useContext, useLayoutEffect } from 'react';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { useResponsiveLayout } from '../ResponsiveLayout';
import { Gapped, GappedProps } from '../Gapped';
import { isNonNullable } from '../../lib/utils';

import { styles } from './Modal.styles';
import { ModalContext } from './ModalContext';

export interface ModalFooterProps extends CommonProps {
  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
  /**
   * Закрепляет футер снизу модального окна
   *
   * На десктопе по умолчанию равен `true`
   * На мобильных по умолчанию равен `false`
   */
  sticky?: boolean;
  /**
   * Контент футера
   */
  children?: ReactNode;
  /**
   * Задаёт отступ между элементами футера
   */
  gap?: GappedProps['gap'];
}

export const ModalFooterDataTids = {
  root: 'ModalFooter__root',
} as const;

/**
 * Футер модального окна.
 *
 * @visibleName Modal.Footer
 */
function ModalFooter(props: ModalFooterProps) {
  const theme = useContext(ThemeContext);
  const modal = useContext(ModalContext);
  const layout = useResponsiveLayout();

  const { sticky = !layout.isMobile, gap, panel, children } = props;

  useLayoutEffect(() => {
    modal.setHasFooter?.();
    modal.setHasPanel?.(panel);

    return () => {
      modal.setHasFooter?.(false);
      modal.setHasPanel?.(false);
    };
  }, [panel]);

  const renderContent = (fixed = false) => {
    return (
      <div
        data-tid={ModalFooterDataTids.root}
        className={cx({
          [styles.footer(theme)]: true,
          [styles.fixedFooter(theme)]: fixed,
          [styles.panel(theme)]: Boolean(panel),
          [styles.fixedPanel(theme)]: fixed && Boolean(panel),
          [styles.mobileFooter(theme)]: layout.isMobile,
        })}
      >
        {isNonNullable(gap) ? (
          <Gapped vertical={layout.isMobile} gap={gap}>
            {children}
          </Gapped>
        ) : (
          children
        )}
      </div>
    );
  };

  return (
    <CommonWrapper {...props}>
      {sticky ? (
        <Sticky side="bottom" offset={modal.horizontalScroll ? getScrollWidth() : 0}>
          {renderContent}
        </Sticky>
      ) : (
        renderContent()
      )}
    </CommonWrapper>
  );
}

ModalFooter.__KONTUR_REACT_UI__ = 'ModalFooter';
ModalFooter.__MODAL_FOOTER__ = true;

export { ModalFooter };
