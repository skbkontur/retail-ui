import React from 'react';
import PropTypes from 'prop-types';

import { Warning, Ok, Gear, User, Wait, Clear, Money, HelpCircle, Kebab } from './svg';

const MAP = {
  warning: Warning,
  ok: Ok,
  gear: Gear,
  user: User,
  wait: Wait,
  clear: Clear,
  money: Money,
  'help-circle': HelpCircle,
  kebab: Kebab,
};

export interface IconProps {
  name: keyof typeof MAP;
  color?: React.CSSProperties['color'];
}

export class Icon extends React.Component<IconProps> {
  public static __KONTUR_REACT_UI__ = 'Icon20px';

  public static propTypes = {
    color: PropTypes.string,

    /**
     * Icon id.
     */
    name: PropTypes.oneOf(Object.keys(MAP)),
  };

  public static getAllNames() {
    return Object.keys(MAP);
  }

  public render() {
    const { name, color } = this.props;
    return React.createElement(MAP[name], { color });
  }
}
