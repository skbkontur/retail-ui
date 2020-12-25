import React, { ReactNode, useContext } from 'react';
import cn from 'classnames';

import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ZIndex } from '../../internal/ZIndex';
import { CommonProps } from '../../typings/common';
import { extractCommonProps } from '../../lib/filterProps';

import { jsStyles } from './Modal.styles';
import { ModalClose } from './ModalClose';
import { CloseProps, ModalContext } from './ModalContext';

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

  const renderContent = (close?: CloseProps, additionalPadding?: boolean) => (fixed = false) => {
    return (
      <div
        className={cn({
          [jsStyles.header()]: true,
          [jsStyles.fixedHeader(theme)]: fixed,
          [jsStyles.headerAddPadding()]: Boolean(additionalPadding),
          [jsStyles.headerWithClose()]: Boolean(close),
        })}
      >
        {close && <ModalClose requestClose={close.requestClose} disableClose={close.disableClose} />}
        {children}
      </div>
    );
  };

  const [{ className, ...commonProps }] = extractCommonProps(props);
  const wrapperProps = {
    ...commonProps,
    className: cn(className, jsStyles.headerWrapper()),
  };

  return (
    <ZIndex priority={'ModalHeader'} {...wrapperProps}>
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
