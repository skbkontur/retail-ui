import * as React from 'react';
import * as PropTypes from 'prop-types';
import CapIcon, { IconProps } from '../Icon/20px';
import styles from './TopBar.less';
import { createPropsGetter } from '../internal/createPropsGetter';
import { cx as cn } from 'emotion';

export interface ItemProps {
  _onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  _onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  icon?: IconProps['name'];
  iconOnly?: boolean;
  minWidth?: string | number;
  use?: 'danger' | 'pay';
  tabIndex?: number;
}

class Item extends React.Component<ItemProps> {
  public static propTypes = {
    use: PropTypes.oneOf(['danger', 'pay']),
  };

  public static defaultProps = {
    className: '',
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
    if (use) {
      const useClassName = ('use-' + use) as keyof typeof styles;
      classes[styles[useClassName]] = true;
    }

    const iconClasses = {
      [styles.icon]: !!icon,
      [styles.iconOnly]: !!iconOnly,
    };

    return (
      <div {...rest} className={cn(classes)} onClick={_onClick} onKeyDown={_onKeyDown} style={{ minWidth }}>
        {icon && (
          <span className={cn(iconClasses)}>
            <CapIcon color="#666" name={icon} />
          </span>
        )}
        {icon && iconOnly ? null : children}
      </div>
    );
  }
}

export default Item;
