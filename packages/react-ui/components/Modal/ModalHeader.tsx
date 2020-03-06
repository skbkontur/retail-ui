import React, { ReactNode, useContext } from 'react';

import { Sticky } from '../Sticky';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ZIndex } from '../ZIndex';

import { jsStyles } from './Modal.styles';
import styles from './Modal.module.less';
import { ModalClose } from './ModalClose';
import { CloseProps, ModalContext } from './ModalContext';

export interface ModalHeaderProps {
  sticky?: boolean;
  children?: ReactNode;
}
/**
 * Шапка модального окна
 *
 * @visibleName Modal.Header
 */
function ModalHeader({ sticky = true, children }: ModalHeaderProps) {
  const theme = useContext(ThemeContext);

  const renderContent = (close?: CloseProps, additionalPadding?: boolean) => (fixed = false) => {
    return (
      <div
        className={cx({
          [styles.header]: true,
          [styles.fixedHeader]: fixed,
          [jsStyles.fixedHeader(theme)]: fixed,
          [styles.headerAddPadding]: !!additionalPadding,
        })}
      >
        {close && (
          <div className={styles.absoluteClose}>
            <ModalClose requestClose={close.requestClose} disableClose={close.disableClose} />
          </div>
        )}
        {children}
      </div>
    );
  };

  return (
    <ZIndex style={{ position: 'relative' }} priority={'ModalHeader'}>
      <ModalContext.Consumer>
        {({ close, additionalPadding }) => {
          if (sticky) {
            return <Sticky side="top">{renderContent(close, additionalPadding)}</Sticky>;
          }

          return renderContent(close, additionalPadding)();
        }}
      </ModalContext.Consumer>
    </ZIndex>
  );
}

ModalHeader.__KONTUR_REACT_UI__ = 'ModalHeader';
ModalHeader.__MODAL_HEADER__ = true;

export { ModalHeader };
