import classNames from 'classnames';
import React, {PropTypes} from 'react';

import Dropdown from '../Dropdown';
import Icon from '../Icon';
import Logotype from '../Logotype';
import MenuItem from '../MenuItem';

import styles from './TopBar.less';

class Item extends React.Component {
  render() {
    const {
      active,
      children,
      _onClick,
      className,
      iconOnly,
      icon,
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
        })}
        onClick={_onClick}
      >
        {icon && (
          <span className={styles.icon}>
            <Icon color="#666" name={icon} size="20"/>
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
  render() {
    return (
      <Dropdown _renderButton={this._renderButton} {...this.props}>
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
        onClick={params.onClick}
        onKeyDown={params.onKeyDown}
      >
        {params.label}
      </ButtonItem>
    );
  };
}

class User extends React.Component {
  render() {
    const {userName} = this.props;
    return (
      <TopBarDropdown
        icon="user"
        caption={userName}
        menuAlign="right"
      >
        <MenuItem loose href="https://cabinet.kontur.ru">
          <b>Личный кабинет Контура</b>
        </MenuItem>
        <MenuItem loose href="https://cabinet.kontur.ru">
          Настройка входа в сервисы
        </MenuItem>
        <MenuItem loose href="https://cabinet.kontur.ru#certificates">
          Сертификаты
        </MenuItem>
        <MenuItem loose href="https://cabinet.kontur.ru#services">
          Оплата сервисов
        </MenuItem>
      </TopBarDropdown>
    );
  }
}

type Props = {
  children?: React.Component | React.Component[] | string | string[],
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
            <div className={styles.left}>
              <div id="spwDropdown" className={styles.spwDropdown}>
                <span ref={this._refLogoWrapper}>
                  <Logo suffix={suffix} color={color}/>
                  <Divider />
                </span>
                <ButtonItem iconOnly>
                  <Icon color="#aaa" size={20} name="angle-bottom"/>
                </ButtonItem>
              </div>
              {this._renderItems(leftItems)}
            </div>

            <div className={styles.right}>
              {this._renderItems(rightItems)}
              <User userName={userName}/>
              <Divider />
              <ButtonItem onClick={onLogout}>
                Выйти
              </ButtonItem>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _renderItems(items) {
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

  componentDidMount() {
    const loadWidget = () => {
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
      jquery.src = 'https://code.jquery.com/jquery-2.2.2.min.js';
      document.getElementsByTagName('head')[0].appendChild(jquery);
    }
  }

  _refLogoWrapper = el => {
    if (this._logoWrapper) {
      this._logoWrapper.removeEventListener(
        'click',
        this._handleNativeLogoClick
      );
    }

    if (el) {
      el.addEventListener('click', this._handleNativeLogoClick);
    }

    this._logoWrapper = el;
  };

  _handleNativeLogoClick = event => {
    event.stopPropagation();
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
