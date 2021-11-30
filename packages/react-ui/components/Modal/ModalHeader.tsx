import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './Modal.styles';
import { ModalClose } from './ModalClose';
import { ModalContext } from './ModalContext';

export interface ModalHeaderProps extends CommonProps {
  sticky?: boolean;
  children?: ReactNode;
}
/**
 * Шапка модального окна
 *
 * @visibleName Modal.Header
 */
function ModalHeader(props: ModalHeaderProps) {
  const { sticky = true, children } = props;
  const theme = useContext(ThemeContext);
  const modal = useContext(ModalContext);
  const [show, setShow] = useState(true);

  useEffect(() => {
    modal.setHasHeader?.();

    return () => modal.setHasHeader?.(false);
  }, []);

  // при вкл/выкл мобильной верстки необходимо перерендерить sticky для сохранения правильной ширины
  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 10);
  }, [modal.isMobile]);

  const renderContent = (fixed = false) => {
    return (
      <div
        className={cx({
          [styles.header(theme)]: true,
          [styles.mobileHeader(theme)]: modal.isMobile,
          [styles.headerAddPadding()]: Boolean(modal.additionalPadding),
          [styles.fixedHeader(theme)]: fixed,
          [styles.headerWithClose(theme)]: Boolean(modal.close),
          [styles.mobileHeaderWithClose(theme)]: modal.isMobile,
        })}
      >
        {modal.close && <ModalClose requestClose={modal.close.requestClose} disableClose={modal.close.disableClose} />}
        {children}
      </div>
    );
  };

  if (!show) {
    return null;
  }

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
