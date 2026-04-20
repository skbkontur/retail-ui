import React, { useContext, useLayoutEffect } from 'react';
import type { ReactNode } from 'react';

import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { useResponsiveLayout } from '../ResponsiveLayout/index.js';
import { Sticky } from '../Sticky/index.js';
import { getStyles } from './Modal.styles.js';
import { ModalClose } from './ModalClose.js';
import { ModalContext } from './ModalContext.js';
import { ModalSeparator } from './ModalSeparator.js';

export interface ModalHeaderProps extends CommonProps {
  /** Закрепляет заголовок модального окна при скролле длинной контент-зоны. */
  sticky?: boolean;

  /** @ignore */
  children?: ReactNode;

  /**
   * Обрезает длинный заголовок. Работает с пропом `sticky`.
   * @default false
   */
  cutTitleOnStuck?: boolean;
}

export const ModalHeaderDataTids = {
  root: 'ModalHeader__root',
} as const;

/**
 * Шапка модального окна, состоит из заголовка и крестика закрытия.
 *
 * @visibleName Modal.Header
 */
function ModalHeader(props: ModalHeaderProps): React.JSX.Element {
  const theme = useContext(ThemeContext);
  const { cx } = useEmotion();
  const styles = useStyles(getStyles);

  const modal = useContext(ModalContext);
  const layout = useResponsiveLayout();

  const { sticky = !layout.isMobile, cutTitleOnStuck = false, children } = props;

  useLayoutEffect(() => {
    modal.setHasHeader?.(true);

    return () => modal.setHasHeader?.(false);
  }, []);

  const renderContent = (fixed = false) => {
    return (
      <div>
        <div
          data-tid={ModalHeaderDataTids.root}
          className={cx(
            styles.header(theme),
            layout.isMobile && styles.mobileHeader(theme),
            Boolean(modal.additionalPadding) && styles.headerAddPadding(theme),
            fixed && styles.fixedHeader(theme),
            cutTitleOnStuck && fixed && styles.titleCut(),
            fixed && layout.isMobile && styles.mobileFixedHeader(theme),
            Boolean(modal.close) && styles.headerWithClose(theme),
            Boolean(modal.close) && layout.isMobile && styles.mobileHeaderWithClose(theme),
          )}
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
    if (layout.isMobile && !modal.mobileOnFullScreen) {
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
