import type { ReactNode } from 'react';
import React, { useContext, useLayoutEffect } from 'react';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { useResponsiveLayout } from '../ResponsiveLayout';
import type { GappedProps } from '../Gapped';
import { Gapped } from '../Gapped';
import { isNonNullable } from '../../lib/utils';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers';

import { styles } from './Modal.styles';
import { ModalContext } from './ModalContext';
import { ModalSeparator } from './ModalSeparator';

export interface ModalFooterProps extends CommonProps {
  /** Включает разделитель перед футером. */
  panel?: boolean;

  /** Закрепляет футер модального окна при скролле длинной контент-зоны.
   * @default На десктопе - `true`, на мобильных - `false`. */
  sticky?: boolean;

  /** Контент футера. */
  children?: ReactNode;

  /** Расстояние между элементами футера в пикселях. */
  gap?: GappedProps['gap'];
}

export const ModalFooterDataTids = {
  root: 'ModalFooter__root',
} as const;

/**
 * Футер модального окна, где обычно располагаются кнопки основных действий.
 *
 * @visibleName Modal.Footer
 */
function ModalFooter(props: ModalFooterProps) {
  const theme = useContext(ThemeContext);
  const modal = useContext(ModalContext);
  const layout = useResponsiveLayout();

  const { sticky = !layout.isMobile, gap, panel, children } = props;

  useLayoutEffect(() => {
    modal.setHasFooter?.(true);
    modal.setHasPanel?.(panel || false);

    return () => {
      modal.setHasFooter?.(false);
      modal.setHasPanel?.(false);
    };
  }, [panel]);

  const versionGTE5_2 = isThemeGTE(theme, '5.2');
  const renderContent = (fixed = false) => {
    return (
      <div>
        {(panel || fixed) && <ModalSeparator fixed={fixed} />}
        <div
          data-tid={ModalFooterDataTids.root}
          className={cx(
            styles.footer(theme),
            fixed && styles.fixedFooter(theme),
            versionGTE5_2 && fixed && styles.fixedFooter5_2(),
            Boolean(panel) && styles.panel(theme),
            fixed && Boolean(panel) && styles.fixedPanel(theme),
            layout.isMobile && styles.mobileFooter(theme),
            versionGTE5_2 && layout.isMobile && fixed && styles.mobileFixedFooter5_2(theme),
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
      offset += getScrollWidth();
    }
    if (versionGTE5_2 && layout.isMobile && !modal.mobileOnFullScreen) {
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
