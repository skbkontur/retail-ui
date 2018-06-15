

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

type Props = {
  children?: React.Element<*> | string,
  color?: string,
  leftItems?: React.Element<*>[],
  logoComponent: React.ComponentType<*> | string,
  logoHref?: string,
  maxWidth?: string | number,
  noMargin?: boolean,
  noShadow?: boolean,
  noWidget?: boolean,
  onLogout?: () => void,
  rightItems: React.Element<*>[],
  suffix: string,
  userName?: string
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
class TopBar extends React.Component<Props> {
  _logoWrapper: ?HTMLElement = null;

  static Divider = Divider;
  static Item = ButtonItem;
  static Dropdown = TopBarDropdown;
  static OrganizationsDropdown = Organizations;

  static defaultProps: DefaultProps = {
    maxWidth: 1166,
    rightItems: []
  };

  componentDidMount() {
    if (!this.props.noWidget) {
      ProductWidget.init();
    }
  }

  render() {
    const {
      leftItems,
      rightItems,
      maxWidth,
      noShadow,
      noMargin,
      userName,
      onLogout
    } = this.props;

    const _rightItems = [].concat(rightItems);
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

  _renderLogo() {
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

  _renderLeftItems(items) {
    if (!items) {
      return null;
    }

    return items.map((item, i) => {
      if (!item.key) {
        return React.cloneElement(item, {
          key: '$topbar_' + i
        });
      }
      return item;
    });
  }

  _renderRightItems(items) {
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

  _refLogoWrapper = (el: ?HTMLElement) => {
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

export default TopBar;
