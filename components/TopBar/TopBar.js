import classNames from 'classnames';
import React, {PropTypes} from 'react';

import Center from '../Center';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import Logotype from '../Logotype';
import MenuItem from '../MenuItem';

import styles from './TopBar.less';

class LeftGroup extends React.Component {
  render() {
    return (
      <div className={styles.left}>
        {this.props.children}
      </div>
    );
  }
}

class RightGroup extends React.Component {
  render() {
    return (
      <div className={styles.right}>
        {this.props.children}
      </div>
    );
  }
}

class _Item extends React.Component {
  render() {
    const {children, _onClick, className, iconOnly, icon, ...rest} = this.props;
    return (
      <div
        {...rest}
        className={classNames(styles.block, {
          [className]: true,
          [styles.iconOnly]: iconOnly,
        })}
        onClick={_onClick}
      >
        <Center>
          {icon &&
            <span className={styles.icon}>
              <Icon color="#666" name={icon} size="20"/>
            </span>
          }
          {children}
        </Center>
      </div>
    );
  }
}

class ButtonItem extends React.Component {
  render() {
    const {onClick, children} = this.props;
    return (
      <_Item {...this.props} className={styles.button} _onClick={onClick}>
        {children}
      </_Item>
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
      <_Item>
        <Logotype suffix={suffix} color={color} />
      </_Item>
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

  _renderButton = (params) => {
    return (
      <ButtonItem
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
      >
        <MenuItem href="https://cabinet.kontur.ru">
          <b>Личный кабинет Контура</b>
        </MenuItem>
        <MenuItem href="https://cabinet.kontur.ru">
          Настройка входа в сервисы
        </MenuItem>
        <MenuItem href="https://cabinet.kontur.ru#certificates">
          Сертификаты
        </MenuItem>
        <MenuItem href="https://cabinet.kontur.ru#services">
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
 * `Left({children: node})` – левая часть шапки
 *
 * `Right({children: node})` – правая часть шапки
 *
 * `Item({children: node, iconOnly: bool, onClick: func})`
 *  – кликабельный элемент шапки
 *
 * `Divider()` – разделитель
 *
 **/
class TopBar extends React.Component {

  props: Props;
  defaultProps: DefaultProps;
  renderLeftItems : () => React.Element;
  renderRightItems : () =>  React.Element;

  static Divider = Divider;
  static Left = LeftGroup;
  static Right = RightGroup;
  static Item = ButtonItem;
  static Dropdown = TopBarDropdown;

  defaultProps = {
    maxWidth: 1166,
  };

  renderLeftItems = () => {
    const {children} = this.props;
    if (children) {
      const leftItems = React.Children.
        toArray(children).
        filter((item) => item.type === TopBar.Left).
        map(({props}) => props.children);

      return leftItems;
    }
    return null;
  };

  renderRightItems = () => {
    const {children} = this.props;
    if (children) {
      return React.Children.
        toArray(children).
        filter(item => item.type === TopBar.Right).
        map(({props}) => props.children);
    }
    return null;
  };

  render() {

    const {
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
        className={classNames(styles.root, {
          [styles.noShadow]: noShadow,
          [styles.noMargin]: noMargin,
        })}
      >
        <div className={styles.center} style={{maxWidth}}>
          <div className={styles.container}>
            <LeftGroup>
              <div id="spwDropdown" className={styles.spwDropdown}>
                <span ref={this._refLogoWrapper}>
                  <Logo suffix={suffix} color={color}/>
                  <Divider />
                </span>
                <ButtonItem iconOnly>
                  <Icon color="#aaa" size={20} name="angle-bottom"/>
                </ButtonItem>
              </div>
              {this.renderLeftItems()}
            </LeftGroup>

            <RightGroup>
              {this.renderRightItems()}
              <User userName={userName}/>
              <Divider />
              <ButtonItem onClick={onLogout}>
                Выйти
              </ButtonItem>
            </RightGroup>
          </div>
        </div>
      </div>
    );
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
  /**
   * Отключает тень
   **/
  noShadow: PropTypes.bool,

  /**
   * Отключает отступ снизу
   **/
  noMargin: PropTypes.bool,

  /**
   * Максимальная ширина контейнера в шапке
   * __(по умолчанию – 1166px)__
   **/
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  children: PropTypes.node,

  /**
   * Суффикс логотипа
   **/
  suffix: PropTypes.string.isRequired,

  /**
   * Цвет логотипа
   **/
  color: PropTypes.string,

  /**
   * Имя пользователя
   **/
  userName: PropTypes.string,

  /**
   * Функция выхода
   **/
  onLogout: PropTypes.func.isRequired,
};

export default TopBar;
