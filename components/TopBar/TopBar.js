// @flow

import classNames from 'classnames';
import React, {PropTypes} from 'react';
import events from 'add-event-listener';

import Dropdown from '../Dropdown';
import Icon from '../Icon';
import CapIcon from '../Icon/20px';
import Logotype from '../Logotype';
import MenuItem from '../MenuItem';
import stopPropagation from '../../lib/events/stopPropagation';

import '../ensureOldIEClassName';
import styles from './TopBar.less';

class Item extends React.Component {
  props: {
    active?: boolean,
    children?: React.Element<any>,
    _onClick?: (e: SyntheticMouseEvent) => void,
    className: string,
    iconOnly?: boolean,
    icon?: string,
    minWidth?: string | number,
    use?: string
  };

  static propTypes = {
    use: PropTypes.oneOf(['danger', 'pay']),
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
      minWidth,
      use,
      ...rest
    } = this.props;

    const classes = {
      [styles.item]: true,
      [styles.buttonActive]: active,
      [className]: true,
      [styles.iconOnly]: iconOnly,
    };
    if (use) {
      classes[styles['use-' + use]] = true;
    }

    return (
      <div
        {...rest}
        className={classNames(classes)}
        onClick={_onClick}
        style={{minWidth}}
      >
        {icon &&
          <span className={styles.icon}>
            <CapIcon color="#666" name={icon} />
          </span>}
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
        minWidth={this.props.minWidth}
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
      <TopBarDropdown icon="user" caption={userName}>
        <div style={{padding: '6px 18px 7px 15px'}}>
          <b>Личный кабинет Контура</b>
        </div>
        <MenuItem loose href="https://cabinet.kontur.ru" target="_blank">
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

class Organizations extends React.Component {
  _caption: HTMLElement;
  _comment: HTMLElement;

  props: {
    caption: string | React.Element<any>,
    comment: ?string,
    children: React.Element<any>
  };

  state: {
    captionWhiteSpace: string,
    minWidth: ?number
  } = {
    captionWhiteSpace: 'normal',
    minWidth: null,
  };

  componentDidMount() {
    this._recalculateWidth();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.caption !== this.props.caption) {
      this._recalculateWidth();
    }
  }

  render() {
    const {caption, comment} = this.props;

    const title = (
      <div>
        <span
          className={styles.organizationsTitle}
          style={{
            paddingRight: this._comment && this._comment.offsetWidth + 30,
          }}
        >
          <span
            className={styles.organizationsCaption}
            ref={this._getCaptionRef}
          >
            {caption}
          </span>
          {comment &&
            <span
              className={styles.organizationsComment}
              ref={this._getCommentRef}
            >
              {comment}
            </span>}
          <span className={styles.organizationsArrow}>
            <Icon color="#aaa" size={14} name="angle-bottom" />
          </span>
        </span>
        <div
          className={styles.organizationsTitleDummy}
          style={{whiteSpace: this.state.captionWhiteSpace}}
        >
          <span className={styles.organizationsCaption}>
            {React.isValidElement(caption)
              ? React.cloneElement((caption: any), {ref: null})
              : caption}
          </span>
          {comment &&
            <span className={styles.organizationsCommentDummy}>
              {comment}
            </span>}
        </div>
      </div>
    );

    return (
      <TopBarDropdown
        {...this.props}
        caption={title}
        minWidth={this.state.minWidth}
      >
        {this.props.children}
      </TopBarDropdown>
    );
  }

  _getCaptionRef = el => {
    this._caption = el;
  };

  _getCommentRef = el => {
    this._comment = el;
  };

  _recalculateWidth() {
    const commentWidth = this._comment ? this._comment.offsetWidth : 0;

    // 360 is minWidth from guides. Apply it when content is bigger.
    // 315 is because of 15px left padding and 30px arrow.
    if (this._caption.offsetWidth + commentWidth > 315) {
      this.setState({
        captionWhiteSpace: 'normal',
        minWidth: 360,
      });
    } else {
      this.setState({
        captionWhiteSpace: 'nowrap',
        minWidth: null,
      });
    }
  }
}

type Props = {
  children?: React.Element<any>,
  leftItems?: React.Element<any>[],
  rightItems: React.Element<any>[],
  maxWidth?: string | number,
  noShadow?: boolean,
  noWidget?: boolean,
  noMargin?: boolean,
  suffix: string,
  color?: string,
  userName?: string,
  onLogout?: Function
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
  static OrganizationsDropdown = Organizations;

  static defaultProps: DefaultProps = {
    maxWidth: 1166,
    rightItems: [],
  };

  render() {
    const {
      leftItems,
      rightItems,
      maxWidth,
      noShadow,
      noMargin,
      userName,
      onLogout,
    } = this.props;

    const _rightItems = [].concat(rightItems);
    if (this.props.userName) {
      _rightItems.push(
        <User userName={userName} />,
        <Divider />
      );
    }

    if (this.props.onLogout) {
      _rightItems.push((
        <ButtonItem onClick={onLogout}>
          Выйти
        </ButtonItem>
      ));
    }

    return (
      <div
        className={classNames({
          [styles.root]: true,
          [styles.noShadow]: noShadow,
          [styles.noMargin]: noMargin,
        })}
      >
        <div className={styles.center} style={{maxWidth}}>
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

  _renderLogo() {
    const {suffix, color} = this.props;
    if (this.props.noWidget) {
      return <Logo suffix={suffix} color={color} />;
    }
    return (
      <div id="spwDropdown" className={styles.spwDropdown}>
        <span ref={this._refLogoWrapper}>
          <Logo suffix={suffix} color={color} />
          <Divider />
        </span>
        <ButtonItem iconOnly>
          <Icon color="#aaa" size={20} name="angle-bottom" />
        </ButtonItem>
      </div>
    );
  }

  _renderLeftItems(items: ?Array<React.Element<any>>) {
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

  _renderRightItems(items: ?Array<React.Element<any>>) {
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

  componentDidMount() {
    if (!this.props.noWidget) {
      this._loadWidget();
    }
  }

  _loadWidget() {
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
  children: PropTypes.node,
  /**
   * Цвет логотипа
   */
  color: PropTypes.string,
  leftItems: PropTypes.arrayOf(PropTypes.element),
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
  suffix: PropTypes.string.isRequired,
  /**
   * Имя пользователя
   */
  userName: PropTypes.node,
  /**
   * Функция выхода
   */
  onLogout: PropTypes.func.isRequired,
};

export default TopBar;
