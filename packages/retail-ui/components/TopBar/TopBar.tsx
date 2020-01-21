import React from 'react';
import PropTypes from 'prop-types';

import { Logotype } from '../Logotype';
import { cx } from '../../lib/theming/Emotion';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

import { ButtonItem } from './TopBarButtonItem';
import { Divider } from './TopBarDivider';
import { Item } from './TopBarItem';
import { Organizations } from './TopBarOrganizations';
import { TopBarDropdown } from './TopBarDropdown';
import { User } from './TopBarUser';
import '../ensureOldIEClassName';
import styles from './TopBar.module.less';
import { TopBarEnd } from './TopBarEnd';
import { TopBarStart } from './TopBarStart';
import { Logout } from './TopBarLogout';
import { jsStyles } from './TopBar.styles';


export interface TopBarProps {
  children?: React.ReactNode;
  color?: string;
  cabinetUrl?: string;
  leftItems?: Array<React.ReactElement<any>>;
  logoComponent?: React.ComponentType<any> | string;
  logoHref?: string;
  maxWidth?: string | number;
  noMargin?: boolean;
  noShadow?: boolean;
  noWidget?: boolean;
  onLogout?: () => void;
  rightItems?: Array<React.ReactElement<any>>;
  suffix?: string;
  userName?: string;
}

export interface TopBarDefaultProps {
  maxWidth: string | number;
  rightItems: Array<React.ReactElement<any>>;
}

/**
 * __DRAFT__
 *
 * Шапка
 *
 * `Item({children: node, iconOnly: bool, onClick: func})` – кликабельный элемент шапки
 *
 * `Divider()` – разделитель
 *
 * `TopBarStart({children: node})` – контейнер для элементов в начале шапки
 *
 * `TopBarEnd({children: node})` – контейнер для элементов в конце шапки
 *
 * `Logout({children?: node})` – обёртка над `Item`. По умолчанию выводит локализованный текст
 *
 */
export class TopBar extends React.Component<TopBarProps> {
  public static Divider = Divider;
  public static Item = ButtonItem;
  public static Dropdown = TopBarDropdown;
  public static OrganizationsDropdown = Organizations;
  public static Start = TopBarStart;
  public static End = TopBarEnd;
  public static ItemStatic = Item;
  public static User = User;
  public static Logout = Logout;

  public static defaultProps: TopBarDefaultProps = {
    maxWidth: 1166,
    rightItems: [],
  };

  public static propTypes = {
    /**
     * URL для кастомизации ссылок в меню пользователя
     */
    cabinetUrl: PropTypes.string,

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
    onLogout: PropTypes.func,
  };

  private theme!: Theme;

  public render(): JSX.Element {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const {
      children,
      leftItems,
      cabinetUrl,
      maxWidth,
      noShadow,
      noMargin,
      userName,
      onLogout,
      rightItems = TopBar.defaultProps.rightItems,
    } = this.props;

    const _rightItems: Array<React.ReactElement<any>> = [...rightItems];

    if (userName) {
      _rightItems.push(<User userName={userName} cabinetUrl={cabinetUrl} />, <Divider />);
    }

    if (onLogout) {
      _rightItems.push(<Logout onClick={onLogout} />);
    }

    const logoProps = {
      suffix: this.props.suffix,
      color: this.props.color,
      href: this.props.logoHref,
      logoComponent: this.props.logoComponent,
      withWidget: !this.props.noWidget,
    };

    return (
      <div
        className={cx({
          [styles.root]: true,
          [jsStyles.root(this.theme)]: true,
          [jsStyles.noShadow()]: !!noShadow,
          [styles.noMargin]: !!noMargin,
        })}
      >
        <div className={styles.center} style={{ maxWidth }}>
          <div className={styles.containerWrap}>
            {children ? (
              <div className={styles.container}>{children}</div>
            ) : (
              <div className={styles.container}>
                <div className={styles.startItems}>
                  <Item>
                    <Logotype {...logoProps} />
                  </Item>
                  {this._renderItems(leftItems)}
                </div>
                <div className={styles.endItems}>{this._renderItems(_rightItems)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  private _renderItems(items?: Array<React.ReactElement<any>>) {
    if (!items) {
      return null;
    }

    return items.map((item, i) => {
      if (item && !item.key) {
        return React.cloneElement(item, {
          key: '$topbar_' + i,
        });
      }
      return item;
    });
  }
}
