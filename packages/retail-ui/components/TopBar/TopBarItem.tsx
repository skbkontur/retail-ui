import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Icon as  CapIcon, IconProps } from '../internal/icons/20px';
import styles from './TopBar.module.less';
import { createPropsGetter } from '../internal/createPropsGetter';
import { cx } from '../../lib/theming/Emotion';

export interface ItemProps {
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

export class Item extends React.Component<ItemProps> {
  public static propTypes = {
    use: PropTypes.oneOf(['danger', 'pay', 'default']),
  };

  public static defaultProps = {
    className: '',
    use: 'default',
  };

  private getProps = createPropsGetter(Item.defaultProps);

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
            <CapIcon color="#666" name={icon} />
          </span>
        )}
        {icon && iconOnly ? null : children}
      </div>
    );
  }
}
