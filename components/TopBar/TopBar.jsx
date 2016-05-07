import React, {PropTypes, Children} from 'react';
import cx from 'classnames';

import Center from 'ui/Center';
import Logotype from 'ui/Logotype';
import Icon from 'ui/Icon';
import DropdownMenu from 'ui/DropdownMenu';

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
    const {children, _onClick, className, iconOnly} = this.props;
    return (
      <div
        className={cx(styles.block, {
          [className]: className,
          [styles.iconOnly]: iconOnly,
        })}
        onClick={_onClick}
      >
        <Center>
          {children}
        </Center>
      </div>
    );
  }
}

class ButtonItem extends React.Component {
  render() {
    const {onClick, children, iconOnly} = this.props;
    return (
      <_Item className={styles.button} _onClick={onClick} iconOnly={iconOnly}>
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
        <Logotype suffix={suffix} color={color}/>
      </_Item>
    );
  }
}

class User extends React.Component {
  state = {
    opened: false,
  };

  render() {
    const {userName} = this.props;
    const {opened} = this.state;
    return (
      <ButtonItem onClick={() => this.setState({opened: !opened})}>
        <Icon color="#666" name="user" /> {userName}
        {opened &&
          <div className={styles.dropdown}>
            <DropdownMenu onClose={() => this.setState({opened: false})}>
              <a href="https://cabinet.kontur.ru" className={styles.userLink}>
                <b>Личный кабинет Контура</b>
              </a>
              <a href="https://cabinet.kontur.ru" className={styles.userLink}>
                Настройка входа в сервисы
              </a>
              <a href="https://cabinet.kontur.ru#certificates" className={styles.userLink}>
                Сертификаты
              </a>
              <a href="https://cabinet.kontur.ru#services" className={styles.userLink}>
                Оплата сервисов
              </a>
            </DropdownMenu>
          </div>
        }
      </ButtonItem>
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
}

type DefaultProps = {
  maxWidth: string | number
}

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

  defaultProps = {
    maxWidth: 1166,
  };

  renderLeftItems = () => {
    const {children} = this.props;
    if (children) {
      const leftItems = Children
      .toArray(children)
      .filter((item) => item.type === TopBar.Left)
      .map(({props}) => props.children);

      return leftItems;
    }
    return null;
  };

  renderRightItems = () => {
    const {children} = this.props;
    if (children) {
      return Children
        .toArray(children)
        .filter((item) => item.type === TopBar.Right)
        .map(({props}) => props.children);
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
      onLogout
    } = this.props;

    return (
      <div
        className={cx(styles.root, {
          [styles.noShadow]: noShadow,
          [styles.noMargin]: noMargin,
        })}
      >
        <div className={styles.center} style={{maxWidth}}>
          <div className={styles.container}>
            <LeftGroup>
              <div id="spwDropdown" style={{display: 'inline-block'}}>
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
