import React, { ReactNode, useContext, useEffect } from 'react';

import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { useResponsiveLayout } from '../ResponsiveLayout';

import { styles } from './Modal.styles';
import { ModalClose } from './ModalClose';
import { ModalContext } from './ModalContext';

export interface ModalHeaderProps extends CommonProps {
  sticky?: boolean;
  children?: ReactNode;
}

export const modalHeaderDataTid = {
  origin: 'ModalHeader',
  root: 'ModalHeader__root',
};

/**
 * Шапка модального окна
 *
 * @visibleName Modal.Header
 */
function ModalHeader(props: ModalHeaderProps) {
  const theme = useContext(ThemeContext);
  const modal = useContext(ModalContext);
  const layout = useResponsiveLayout();

  const { sticky = layout.isMobile ? false : true, children } = props;

  useEffect(() => {
    modal.setHasHeader?.();

    return () => modal.setHasHeader?.(false);
  }, []);

  const renderContent = (fixed = false) => {
    return (
      <div
        data-tid={modalHeaderDataTid.root}
        className={cx({
          [styles.header(theme)]: true,
          [styles.mobileHeader(theme)]: layout.isMobile,
          [styles.headerAddPadding()]: Boolean(modal.additionalPadding),
          [styles.fixedHeader(theme)]: fixed,
          [styles.mobileFixedHeader(theme)]: fixed && layout.isMobile,
          [styles.headerWithClose(theme)]: Boolean(modal.close),
          [styles.mobileHeaderWithClose(theme)]: layout.isMobile,
        })}
      >
        {modal.close && <ModalClose requestClose={modal.close.requestClose} disableClose={modal.close.disableClose} />}
        {children}
      </div>
    );
  };

  return (
    <CommonWrapper {...props}>
      <ZIndex priority={'ModalHeader'} className={styles.headerWrapper()}>
        {sticky ? <Sticky side="top">{renderContent}</Sticky> : renderContent()}
      </ZIndex>
    </CommonWrapper>
  );
}

ModalHeader.__KONTUR_REACT_UI__ = 'ModalHeader';
ModalHeader.__MODAL_HEADER__ = true;

export { ModalHeader };
