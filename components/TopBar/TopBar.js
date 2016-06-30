// @flow

import classNames from 'classnames';
import React, {PropTypes} from 'react';
import events from 'add-event-listener';

import Dropdown from '../Dropdown';
import Icon from '../Icon';
import CapIcon from '../Icon/20px'
import Logotype from '../Logotype';
import MenuItem from '../MenuItem';
import stopPropagation from '../../lib/events/stopPropagation';

import styles from './TopBar.less';

class Item extends React.Component {
  props: {
    active?: boolean;
    children?: React.Element<any>;
    _onClick?: (e: SyntheticMouseEvent) => void;
    className: string;
    iconOnly?: boolean;
    icon?: string;
    use?: string;
  };

  static propTypes = {
    use: PropTypes.oneOf([
      'pay',
    ]),
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const {
      active,
      children,
      _onClick,
      className,
      iconOnly,
      icon,
      use,
      ...rest,
    } = this.props;

    return (
      <div
        {...rest}
        className={classNames({
          [styles.item]: true,
          [styles.buttonActive]: active,
          [className]: true,
          [styles.iconOnly]: iconOnly,
          [styles['use-' + use]]: use,
        })}
        onClick={_onClick}
      >
        {icon && (
          <span className={styles.icon}>
            <CapIcon color="#666" name={icon}/>
          </span>
        )}
        {children}
      </div>
    );
  }
}

class ButtonItem extends React.Component {
  render() {
    const {onClick, children} = this.props;
    return (
      <Item {...this.props} className={styles.button} _onClick={onClick}>
        {children}
      </Item>
    );
  }
}

class Divider extends React.Component {
  render() {
    return <span className={styles.divider} />;
  }
}

class Logo extends React.Component {
  render() {
    const {suffix, color} = this.props;
    return (
      <Item>
        <Logotype suffix={suffix} color={color} />
      </Item>
    );
  }
}

class TopBarDropdown extends React.Component {
  _dropdown: Dropdown;

  render() {
    return (
      <Dropdown
        ref={this._ref}
        _renderButton={this._renderButton}
        {...this.props}
      >
        {this.props.children}
      </Dropdown>
    );
  }

  _renderButton = params => {
    return (
      <ButtonItem
        active={params.opened}
        icon={this.props.icon}
        tabIndex="0"
        use={this.props.use}
        onClick={params.onClick}
        onKeyDown={params.onKeyDown}
      >
        {params.label}
      </ButtonItem>
    );
  };

  _ref = dropdown => {
    this._dropdown = dropdown;
  };

  open() {
    this._dropdown.open();
  }
}

class User extends React.Component {
  render() {
    const {userName} = this.props;
    return (
      <TopBarDropdown
        icon="user"
        caption={userName}
      >
        <div style={{padding: '6px 18px 7px 15px'}}>
          <b>Личный кабинет Контура</b>
        </div>
        <MenuItem
          loose
          href="https://cabinet.kontur.ru"
          target="_blank"
        >
          Настройка входа в сервисы
        </MenuItem>
        <MenuItem
          loose
          href="https://cabinet.kontur.ru#certificates"
          target="_blank"
        >
          Сертификаты
        </MenuItem>
        <MenuItem
          loose
          href="https://cabinet.kontur.ru#services"
          target="_blank"
        >
          Оплата сервисов
        </MenuItem>
      </TopBarDropdown>
    );
  }
}

type Props = {
  children?: React.Element<any>,
  leftItems?: React.Element<any>[],
  rightItems?: React.Element<any>[],
  maxWidth?: string | number,
  noShadow?: boolean,
  noMargin?: boolean,
  suffix: string,
  color?: string,
  userName: string,
  onLogout: Function,
};

type DefaultProps = {
  maxWidth: string | number
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
 **/
class TopBar extends React.Component {

  props: Props;

  _logoWrapper: HTMLElement;

  static Divider = Divider;
  static Item = ButtonItem;
  static Dropdown = TopBarDropdown;

  static defaultProps: DefaultProps = {
    maxWidth: 1166,
  };

  render() {

    const {
      leftItems,
      rightItems,
      maxWidth,
      noShadow,
      noMargin,
      suffix,
      color,
      userName,
      onLogout,
    } = this.props;

    return (
      <div
        className={classNames({
          [styles.root]: true,
          [styles.noShadow]: noShadow,
          [styles.noMargin]: noMargin,
        })}
      >
        <div className={styles.center} style={{maxWidth}}>
          <div className={styles.container}>
            <div id="spwDropdown" className={styles.spwDropdown}>
              <span ref={this._refLogoWrapper}>
                <Logo suffix={suffix} color={color}/>
                <Divider />
              </span>
              <ButtonItem iconOnly>
                <Icon color="#aaa" size={20} name="angle-bottom"/>
              </ButtonItem>
            </div>
            <div className={styles.leftItems}>
              {this._renderLeftItems(leftItems)}
            </div>
            {this._renderRightItems([
              ...rightItems,
              <User userName={userName}/>,
              <Divider />,
              <ButtonItem onClick={onLogout}>
                Выйти
              </ButtonItem>
            ])}
          </div>
        </div>
      </div>
    );
  }

  _renderLeftItems(items: React.Element<any>[] | void) {
    if (!items) {
      return null;
    }

    return items.map((item, i) => {
      if (!item.key) {
        return React.cloneElement(item, {
          key: '$topbar_' + i,
        });
      }
      return item;
    });
  }

  _renderRightItems(items: React.Element<any>[] | void) {
    if (!items) {
      return null;
    }

    return items.map((item, i) => {
      return (
        <span
          className={styles.rightItem}
          key={'$topbar_' + i}
        >
          {React.cloneElement(item)}
        </span>
      );
    });
  }

  componentDidMount() {
    let calledLoad = false;
    const loadWidget = () => {
      if (calledLoad) {
        return;
      }
      calledLoad = true;

      const script = document.createElement('script');
      script.src = 'https://widget-product.kontur.ru/widget/loader?' +
        'product=&type=service';
      document.getElementsByTagName('head')[0].appendChild(script);
    };

    if (global.jQuery) {
      loadWidget();
    } else {
      const jquery = document.createElement('script');
      jquery.onload = loadWidget;
      jquery.onreadystatechange = function() {
        if (this.readyState === 'loaded' || this.readyState === 'complete') {
          loadWidget();
        }
      };
      jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
      document.getElementsByTagName('head')[0].appendChild(jquery);
    }
  }

  _refLogoWrapper = (el: HTMLElement) => {
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

  _handleNativeLogoClick = (event: Event) => {
    stopPropagation(event);
  };
}

TopBar.propTypes = {
  leftItems: PropTypes.arrayOf(PropTypes.element),

  rightItems: PropTypes.arrayOf(PropTypes.element),

  /**
   * Отключает тень
   */
  noShadow: PropTypes.bool,

  /**
   * Отключает отступ снизу
   */
  noMargin: PropTypes.bool,

  /**
   * Максимальная ширина контейнера в шапке
   */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  children: PropTypes.node,

  /**
   * Суффикс логотипа
   */
  suffix: PropTypes.string.isRequired,

  /**
   * Цвет логотипа
   */
  color: PropTypes.string,

  /**
   * Имя пользователя
   */
  userName: PropTypes.string,

  /**
   * Функция выхода
   */
  onLogout: PropTypes.func.isRequired,
};

export default TopBar;
