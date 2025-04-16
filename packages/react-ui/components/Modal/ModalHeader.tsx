import React, { ReactNode, useContext, useLayoutEffect } from 'react';

import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { useResponsiveLayout } from '../ResponsiveLayout';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers';

import { styles } from './Modal.styles';
import { ModalClose } from './ModalClose';
import { ModalContext } from './ModalContext';
import { ModalSeparator } from './ModalSeparator';

export interface ModalHeaderProps extends CommonProps {
  /** Закрепляет хедер сверху модального окна. */
  sticky?: boolean;

  /** @ignore */
  children?: ReactNode;
}

export const ModalHeaderDataTids = {
  root: 'ModalHeader__root',
} as const;

/**
 * Шапка модального окна.
 *
 * @visibleName Modal.Header
 */
function ModalHeader(props: ModalHeaderProps) {
  const theme = useContext(ThemeContext);
  const modal = useContext(ModalContext);
  const layout = useResponsiveLayout();

  const { sticky = !layout.isMobile, children, style } = props;

  useLayoutEffect(() => {
    modal.setHasHeader?.(true);

    return () => modal.setHasHeader?.(false);
  }, []);

  const versionGTE5_2 = isThemeGTE(theme, '5.2');
  const renderContent = (fixed = false) => {
    return (
      <div>
        <div
          data-tid={ModalHeaderDataTids.root}
          className={cx(
            styles.header(theme),
            versionGTE5_2 && styles.header5_2(theme),
            layout.isMobile && styles.mobileHeader(theme),
            Boolean(modal.additionalPadding) && styles.headerAddPadding(theme),
            fixed && styles.fixedHeader(theme),
            versionGTE5_2 && fixed && styles.fixedHeader5_2(),
            fixed && layout.isMobile && styles.mobileFixedHeader(theme),
            versionGTE5_2 && fixed && layout.isMobile && styles.mobileFixedHeader5_2(theme),
            Boolean(modal.close) && styles.headerWithClose(theme),
            Boolean(modal.close) && layout.isMobile && styles.mobileHeaderWithClose(theme),
          )}
          style={versionGTE5_2 ? style : undefined}
        >
          {modal.close && (
            <ModalClose requestClose={modal.close.requestClose} disableClose={modal.close.disableClose} />
          )}
          {children}
        </div>
        {fixed && <ModalSeparator fixed={fixed} />}
      </div>
    );
  };

  const getStickyOffset = () => {
    if (versionGTE5_2 && layout.isMobile && !modal.mobileOnFullScreen) {
      return parseInt(theme.mobileModalContainerMarginTop);
    }
    return 0;
  };

  return (
    <CommonWrapper {...props}>
      {sticky ? (
        <Sticky offset={getStickyOffset()} side="top">
          {renderContent}
        </Sticky>
      ) : (
        renderContent()
      )}
    </CommonWrapper>
  );
}

ModalHeader.__KONTUR_REACT_UI__ = 'ModalHeader';
ModalHeader.displayName = 'ModalHeader';
ModalHeader.__MODAL_HEADER__ = true;

export { ModalHeader };
