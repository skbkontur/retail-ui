import React, { ReactNode, useContext, useLayoutEffect } from 'react';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { useResponsiveLayout } from '../ResponsiveLayout';
import { Gapped, GappedProps } from '../Gapped';
import { isNonNullable } from '../../lib/utils';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers';

import { styles } from './Modal.styles';
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
  const theme = useContext(ThemeContext);
  const modal = useContext(ModalContext);
  const layout = useResponsiveLayout();

  const { sticky = !layout.isMobile, gap, panel, children, style, ...rest } = props;

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
            fixed && versionGTE5_2 && styles.fixedFooter5_2(),
            Boolean(panel) && styles.panel(theme),
            fixed && Boolean(panel) && styles.fixedPanel(theme),
            layout.isMobile && styles.mobileFooter(theme),
            layout.isMobile && fixed && versionGTE5_2 && styles.mobileFixedFooter5_2(theme),
          )}
          style={versionGTE5_2 ? style : undefined}
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
    if (modal.horizontalScroll) {
      return getScrollWidth();
    } else if (layout.isMobile && versionGTE5_2 && !modal.mobileOnFullScreen) {
      console.log('');
      return parseInt(theme.mobileModalContainerMarginBottom);
    }
    return 0;
  };

  return (
    <CommonWrapper sticky gap panel style={versionGTE5_2 ? undefined : style} {...rest}>
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
