import React, { ReactNode, useContext, useLayoutEffect } from 'react';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { Sticky } from '../Sticky';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { EmotionContext } from '../../lib/theming/Emotion';
import { useResponsiveLayout } from '../ResponsiveLayout';
import { Gapped, GappedProps } from '../Gapped';
import { isNonNullable } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './Modal.styles';
import { ModalContext } from './ModalContext';
import { ModalSeparator } from './ModalSeparator';

export interface ModalFooterProps extends CommonProps {
  /** Включает серый цвет в футере. */
  panel?: boolean;

  /** Закрепляет футер снизу модального окна.
   * @default На десктопе - `true`, на мобильных - `false`. */
  sticky?: boolean;

  /** Задает контент футера. */
  children?: ReactNode;

  /** Задает расстояние между элементами футера в пикселях. */
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
  const emotion = useContext(EmotionContext);
  const theme = useContext(ThemeContext);
  const modal = useContext(ModalContext);
  const layout = useResponsiveLayout();

  const { sticky = !layout.isMobile, gap, panel, children } = props;
  const styles = getStyles(emotion);

  useLayoutEffect(() => {
    modal.setHasFooter?.(true);
    modal.setHasPanel?.(panel || false);

    return () => {
      modal.setHasFooter?.(false);
      modal.setHasPanel?.(false);
    };
  }, [panel]);

  const renderContent = (fixed = false) => {
    return (
      <div>
        {(panel || fixed) && <ModalSeparator fixed={fixed} />}
        <div
          data-tid={ModalFooterDataTids.root}
          className={emotion.cx(
            styles.footer(theme),
            fixed && styles.fixedFooter(theme),
            Boolean(panel) && styles.panel(theme),
            fixed && Boolean(panel) && styles.fixedPanel(theme),
            layout.isMobile && styles.mobileFooter(theme),
          )}
        >
          {isNonNullable(gap) ? (
            <Gapped vertical={layout.isMobile} gap={gap}>
              {children}
            </Gapped>
          ) : (
            children
          )}
        </div>
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
ModalFooter.displayName = 'ModalFooter';
ModalFooter.__MODAL_FOOTER__ = true;

export { ModalFooter };
