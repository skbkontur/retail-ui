import React from 'react';
import cn from 'classnames';

import { CommonProps } from '../../typings/common';

import { jsStyles } from './TopBar.styles';

export type TopBarEndProps = CommonProps;

/**
 * Контейнер для смещения к концу
 *
 * @visibleName TopBar.End
 */

export const TopBarEnd: React.FC<TopBarEndProps> = ({ className, children, ...rest }) => (
  <div className={cn(className, jsStyles.endItems())} {...rest}>
    {children}
  </div>
);
(TopBarEnd as any).__KONTUR_REACT_UI__ = 'TopBarEnd';
