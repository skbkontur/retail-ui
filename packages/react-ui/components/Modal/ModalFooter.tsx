import React, { ReactNode, useContext, useEffect } from 'react';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { useResponsiveLayout } from '../ResponsiveLayout';

import { styles } from './Modal.styles';
import { ModalContext } from './ModalContext';
import { ModalSeparator } from './ModalSeparator';

export interface ModalFooterProps extends CommonProps {
  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
  sticky?: boolean;
  children?: ReactNode;
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

  const { sticky = !layout.isMobile, panel, children } = props;

  useEffect(() => {
    modal.setHasFooter?.();
    modal.setHasPanel?.(panel);

    return () => {
      modal.setHasFooter?.(false);
      modal.setHasPanel?.(false);
    };
  }, [panel]);

  const renderContent = (fixed = false) => {
    return (
      <>
        <ModalSeparator fixed={fixed} />
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
          {children}
        </div>
      </>
    );
  };

  return (
    <CommonWrapper {...props}>
      <ZIndex priority={'ModalFooter'} className={styles.footerWrapper()}>
        {sticky ? (
          <Sticky side="bottom" offset={modal.horizontalScroll ? getScrollWidth() : 0}>
            {renderContent}
          </Sticky>
        ) : (
          renderContent()
        )}
      </ZIndex>
    </CommonWrapper>
  );
}

ModalFooter.__KONTUR_REACT_UI__ = 'ModalFooter';
ModalFooter.__MODAL_FOOTER__ = true;

export { ModalFooter };
