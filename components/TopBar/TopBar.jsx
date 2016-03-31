import React, {PropTypes, Children} from 'react';
import cx from 'classnames';

import Center from 'ui/Center';
import Logotype from 'ui/Logotype';
import Icon from 'ui/Icon';
import Link from 'ui/Link';
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
              <Link href="https://cabinet.kontur.ru">
                <b>Личный кабинет Контура</b>
              </Link>
              <Link href="https://cabinet.kontur.ru">
                Настройка входа в сервисы
              </Link>
              <Link href="https://cabinet.kontur.ru#certificates">
                Сертификаты
              </Link>
              <Link href="https://cabinet.kontur.ru#services">
                Оплата сервисов
              </Link>
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
  logout: Function,
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
      logout
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
              <Logo suffix={suffix} color={color}/>
              <Divider />
              <ButtonItem iconOnly>
                <Icon color="#aaa" size={20} name="angle-bottom"/>
              </ButtonItem>
              {this.renderLeftItems()}

            </LeftGroup>

            <RightGroup>
              {this.renderRightItems()}
              <User userName={userName}/>
              <Divider />
              <ButtonItem onClick={logout}>
                Logout
              </ButtonItem>
            </RightGroup>
          </div>
        </div>
      </div>
    );
  }
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
  logout: PropTypes.func,
};

export default TopBar;
