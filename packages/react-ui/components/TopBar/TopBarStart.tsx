import React from 'react';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { jsStyles } from './TopBar.styles';

export type TopBarStartProps = CommonProps;

/**
 * Контейнер для сдвига к началу
 *
 * @visibleName TopBar.Start
 */

export const TopBarStart: React.FC<TopBarStartProps> = ({ children, ...rest }) => (
  <CommonWrapper {...rest}>
    <div className={jsStyles.startItems()}>{children}</div>
  </CommonWrapper>
);
(TopBarStart as any).__KONTUR_REACT_UI__ = 'TopBarStart';
