import React, {PropTypes, Children} from 'react';
import cx from 'classnames';

import Center from 'ui/Center';
import Logotype from 'ui/Logotype';
import Icon from 'ui/Icon';

import styles from './TopBar.less';

type Props = {
  children?: React.Component | React.Component[] | string | string[],
  maxWidth?: string | number,
  noShadow?: boolean,
  noMargin?: boolean,
  suffix: string,
  color?: string,
  userName: string,
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
 * `Logo({suffix: string, color: string})` – логотип
 *
 * `Item({children: node, iconOnly: bool, className: string})`
 *  – статичный элемент шапки
 *
 * `ButtonItem({children: node, iconOnly: bool, onClick: func})`
 *  – кликабельный элемент шапки
 *
 * `Divider()` – разделитель
 *
 **/
class TopBar extends React.Component {

  props: Props;
  defaultProps: DefaultProps;
  renderLeftItems : () => React.Component[];
  renderRightItems : () =>  React.Component[];

  constructor(props: Props) {
    super(props);

    this.defaultProps = {
      maxWidth: 1166,
    };

  }

  static Divider = Divider;

  static Left = Left;

  static Right = Right;

  static Item = ButtonItem;

  renderLeftItems = () => {
    const {children} = this.props;
    if (children) {
      return Children.toArray(children).filter((item) => item === Left);
    }
    return null;
  };

  renderRightItems = () => {
    const {children} = this.props;
    if (children) {
      return Children.toArray(children).filter((item) => item === Right);
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
            <Left>
              <Logo suffix={suffix} color={color}/>
              <Divider />
              <ButtonItem iconOnly>
                <Icon color="#aaa" size={20} name="angle-bottom"/>
              </ButtonItem>
              {this.renderLeftItems()}
            </Left>

            <Right>
              {this.renderRightItems()}
              <Item>
                <Icon color="#666" name="user" /> {userName}
              </Item>
              <Divider />
              <ButtonItem onClick={() => alert('Logout')}>
                Logout
              </ButtonItem>
            </Right>
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
};

const Left = ({children}) =>
  <div className={styles.left}>{children}</div>;

const Right = ({children}) =>
  <div className={styles.right}>{children}</div>;

const Item = ({children, _onClick, className, iconOnly}) =>
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
  </div>;


const Divider = () =>
  <span className={styles.divider} />;

const Logo = ({suffix, color}) =>
  <Item>
    <Logotype suffix={suffix} color={color}/>
  </Item>;

const ButtonItem = ({onClick, children, iconOnly}) =>
  <Item className={styles.button} _onClick={onClick} iconOnly={iconOnly}>
    {children}
  </Item>;

module.exports = TopBar;
