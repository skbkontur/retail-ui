import React from 'react';

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
  /** id иконки. */
  name: keyof typeof MAP;

  color?: React.CSSProperties['color'];
}

export class Icon extends React.Component<IconProps> {
  public static __KONTUR_REACT_UI__ = 'Icon20px';
  public static displayName = 'Icon20px';

  public static getAllNames() {
    return Object.keys(MAP);
  }

  public render() {
    const { name, color } = this.props;
    return React.createElement(MAP[name], { color });
  }
}
