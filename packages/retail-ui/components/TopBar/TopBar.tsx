import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import events from 'add-event-listener';

import stopPropagation from '../../lib/events/stopPropagation';

import Icon from '../Icon';
import Logotype from '../Logotype';
import ProductWidget from './ProductWidget';

import ButtonItem from './ButtonItem';
import Divider from './Divider';
import Item from './Item';
import Organizations from './Organizations';
import TopBarDropdown from './TopBarDropdown';
import User from './User';

import '../ensureOldIEClassName';
import styles from './TopBar.less';
import { createPropsGetter } from '../internal/createPropsGetter';

interface TopBarProps {
  children?: React.ReactNode;
  color?: string;
  leftItems?: Array<React.ReactElement<any>>;
  logoComponent: React.ComponentType<any> | string;
  logoHref?: string;
  maxWidth?: string | number;
  noMargin?: boolean;
  noShadow?: boolean;
  noWidget?: boolean;
  onLogout?: () => void;
  rightItems: Array<React.ReactElement<any>>;
  suffix: string;
  userName?: string;
};

export interface TopBarDefaultProps {
  maxWidth: string | number;
};

/**
 * __DRAFT__
 *
 * Шапка
 *
 * `Item({children: node, iconOnly: bool, onClick: func})`
 *  – кликабельный элемент шапки
 *
 * `Divider()` – разделитель
 *
 */
class TopBar extends React.Component<TopBarProps> {
  public static Divider = Divider;
  public static Item = ButtonItem;
  public static Dropdown = TopBarDropdown;
  public static OrganizationsDropdown = Organizations;

  public static defaultProps = {
    maxWidth: 1166,
    rightItems: []
  };

  public static propTypes = {
    children: PropTypes.node,

    /**
     * Цвет логотипа
     */
    color: PropTypes.string,

    leftItems: PropTypes.arrayOf(PropTypes.element),

    /**
     * Компонент используемый для рендеринга ссылки.
     * Нужно переопределить если вы хотите подставить ссылку для роутера
     */
    logoComponent: PropTypes.any,

    logoHref: PropTypes.string,

    /**
     * Максимальная ширина контейнера в шапке
     */
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Отключает отступ снизу
     */
    noMargin: PropTypes.bool,

    /**
     * Отключает тень
     */
    noShadow: PropTypes.bool,

    /**
     * Отключает виджет
     */
    noWidget: PropTypes.bool,

    rightItems: PropTypes.arrayOf(PropTypes.element),

    /**
     * Суффикс логотипа
     */
    suffix: PropTypes.string,

    /**
     * Имя пользователя
     */
    userName: PropTypes.node,

    /**
     * Функция выхода
     */
    onLogout: PropTypes.func
  };

  private _logoWrapper: Nullable<HTMLElement> = null;
  private getProps = createPropsGetter(TopBar.defaultProps);

  public componentDidMount() {
    if (!this.props.noWidget) {
      ProductWidget.init();
    }
  }

  public render() {
    const {
      leftItems,
      maxWidth,
      noShadow,
      noMargin,
      userName,
      onLogout
    } = this.props;

    const _rightItems: Array<React.ReactElement<any>> = [].concat(this.getProps().rightItems);
    if (userName) {
      _rightItems.push(<User userName={userName} />, <Divider />);
    }

    if (this.props.onLogout) {
      _rightItems.push(<ButtonItem onClick={onLogout}>Выйти</ButtonItem>);
    }

    return (
      <div
        className={classNames({
          [styles.root]: true,
          [styles.noShadow]: noShadow,
          [styles.noMargin]: noMargin
        })}
      >
        <div className={styles.center} style={{ maxWidth }}>
          <div className={styles.containerWrap}>
            <div className={styles.container}>
              {this._renderLogo()}
              <div className={styles.leftItems}>
                {this._renderLeftItems(leftItems)}
              </div>
              {this._renderRightItems(_rightItems)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _renderLogo(): React.ReactNode {
    const {
      suffix,
      color,
      logoHref: href,
      logoComponent: component
    } = this.props;
    const logoProps = { suffix, color, href, component };
    if (this.props.noWidget) {
      return (
        <Item>
          <Logotype {...logoProps} />
        </Item>
      );
    }
    return (
      <div id="spwDropdown" className={styles.spwDropdown}>
        <span ref={this._refLogoWrapper}>
          <Item>
            <Logotype {...logoProps} />
          </Item>
          <Divider />
        </span>
        <ButtonItem iconOnly>
          <Icon color="#aaa" size={20} name="ArrowChevronDown" />
        </ButtonItem>
      </div>
    );
  }

  private _renderLeftItems(items?: Array<React.ReactElement<any>>) {
    if (!items) {
      return null;
    }

    return items.map((item, i) => {
      if (item && !item.key) {
        return React.cloneElement(item, {
          key: '$topbar_' + i
        });
      }
      return item;
    });
  }

  private _renderRightItems(items: Array<React.ReactElement<any>>) {
    if (!items) {
      return null;
    }

    return items.map((item, i) => {
      return (
        <span className={styles.rightItem} key={'$topbar_' + i}>
          {item}
        </span>
      );
    });
  }

  private _refLogoWrapper = (el: Nullable<HTMLElement>) => {
    if (this._logoWrapper) {
      events.removeEventListener(
        this._logoWrapper,
        'click',
        this._handleNativeLogoClick
      );
    }

    if (el) {
      events.addEventListener(el, 'click', this._handleNativeLogoClick);
    }

    this._logoWrapper = el;
  };

  private _handleNativeLogoClick = (event: Event) => {
    stopPropagation(event);
  };
}

export default TopBar;
