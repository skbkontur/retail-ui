import type { ReactNode } from 'react';
import React, { useContext, useLayoutEffect } from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { useGetScrollWidth } from '../../lib/dom/getScrollWidth.js';
import { Sticky } from '../Sticky/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { useResponsiveLayout } from '../ResponsiveLayout/index.js';
import type { GappedProps } from '../Gapped/index.js';
import { Gapped } from '../Gapped/index.js';
import { isNonNullable } from '../../lib/utils.js';

import { getStyles } from './Modal.styles.js';
import { ModalContext } from './ModalContext.js';
import { ModalSeparator } from './ModalSeparator.js';

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
  const theme = useContext(ThemeContext);
  const { cx } = useEmotion();
  const styles = useStyles(getStyles);
  const modal = useContext(ModalContext);
  const layout = useResponsiveLayout();
  const scrollWidth = useGetScrollWidth();

  const { sticky = !layout.isMobile, gap, panel, children } = props;

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
          className={cx(
            styles.footer(theme),
            fixed && styles.fixedFooter(theme),
            Boolean(panel) && styles.panel(theme),
            fixed && Boolean(panel) && styles.fixedPanel(theme),
            layout.isMobile && styles.mobileFooter(theme),
            layout.isMobile && fixed && styles.mobileFixedFooter(theme),
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

  const getStickyOffset = () => {
    let offset = 0;
    if (modal.horizontalScroll) {
      offset += scrollWidth;
    }
    if (layout.isMobile && !modal.mobileOnFullScreen) {
      offset += parseInt(theme.mobileModalContainerMarginBottom);
    }
    return offset;
  };

  return (
    <CommonWrapper {...props}>
      {sticky ? (
        <Sticky side="bottom" offset={getStickyOffset()}>
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
