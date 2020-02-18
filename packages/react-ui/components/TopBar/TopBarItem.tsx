import React from 'react';
import PropTypes from 'prop-types';

import { Icon, IconProps } from '../internal/icons/20px';
import { createPropsGetter } from '../internal/createPropsGetter';
import { cx } from '../../lib/theming/Emotion';

import styles from './TopBar.module.less';

export interface TopBarItemProps {
  _onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  _onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  icon?: IconProps['name'];
  iconOnly?: boolean;
  minWidth?: string | number;
  use: 'danger' | 'pay' | 'default';
  tabIndex?: number;
}
/**
 * Статичный элемент топбара
 *
 * @visibleName TopBar.StaticItem
 */

export class TopBarItem extends React.Component<TopBarItemProps> {
  public static __KONTUR_REACT_UI__ = 'TopBarItem';

  public static propTypes = {
    use: PropTypes.oneOf(['danger', 'pay', 'default']),
  };

  public static defaultProps = {
    className: '',
    use: 'default',
  };

  private getProps = createPropsGetter(TopBarItem.defaultProps);

  public render() {
    const { active, children, _onClick, _onKeyDown, iconOnly, icon, minWidth, use, ...rest } = this.props;

    const className: string = this.getProps().className;

    const classes = {
      [styles.item]: true,
      [styles.buttonActive]: !!active,
      [className]: true,
    };
    if (use !== 'default') {
      const useClassName = ('use-' + use) as keyof typeof styles;
      classes[styles[useClassName]] = true;
    }

    const iconClasses = {
      [styles.icon]: !!icon,
      [styles.iconOnly]: !!iconOnly,
    };

    return (
      <div {...rest} className={cx(classes)} onClick={_onClick} onKeyDown={_onKeyDown} style={{ minWidth }}>
        {icon && (
          <span className={cx(iconClasses)}>
            <Icon color="#666" name={icon} />
          </span>
        )}
        {icon && iconOnly ? null : children}
      </div>
    );
  }
}
