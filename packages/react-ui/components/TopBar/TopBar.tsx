import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import cn from 'classnames';

import { Logotype } from '../Logotype';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { TopBarButtonItem } from './TopBarButtonItem';
import { TopBarDivider } from './TopBarDivider';
import { TopBarItem } from './TopBarItem';
import { TopBarOrganizations } from './TopBarOrganizations';
import { TopBarDropdown } from './TopBarDropdown';
import { TopBarUser } from './TopBarUser';
import { TopBarEnd } from './TopBarEnd';
import { TopBarStart } from './TopBarStart';
import { TopBarLogout } from './TopBarLogout';
import { jsStyles } from './TopBar.styles';

export interface TopBarProps extends CommonProps {
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

/**
 * @deprecated Контур-специфичный компонент, будет удален в 3.0.0, перенесен в `@skbkontur/react-ui-addons` смотри [миграцию](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/MIGRATION.md)
 */
export class TopBar extends React.Component<TopBarProps> {
  public static __KONTUR_REACT_UI__ = 'TopBar';

  public static Divider = TopBarDivider;
  public static Item = TopBarButtonItem;
  public static Dropdown = TopBarDropdown;
  public static OrganizationsDropdown = TopBarOrganizations;
  public static Start = TopBarStart;
  public static End = TopBarEnd;
  public static ItemStatic = TopBarItem;
  public static User = TopBarUser;
  public static Logout = TopBarLogout;

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

  public constructor(props: TopBarProps) {
    super(props);
    warning(
      false,
      `TopBar has been deprecated, use TopBar from @skbkontur/react-ui-addons instead, see [migration](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/MIGRATION.md)`,
    );
  }

  public render(): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
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
      _rightItems.push(<TopBarUser userName={userName} cabinetUrl={cabinetUrl} />, <TopBarDivider />);
    }

    if (onLogout) {
      _rightItems.push(<TopBarLogout onClick={onLogout} />);
    }

    const logoProps = {
      suffix: this.props.suffix,
      color: this.props.color,
      href: this.props.logoHref,
      logoComponent: this.props.logoComponent,
      withWidget: !this.props.noWidget,
    };

    return (
      <CommonWrapper {...this.props}>
        <div
          className={cn({
            [jsStyles.root(this.theme)]: true,
            [jsStyles.noShadow()]: !!noShadow,
            [jsStyles.noMargin()]: !!noMargin,
          })}
        >
          <div className={jsStyles.center()} style={{ maxWidth }}>
            <div className={jsStyles.containerWrap()}>
              {children ? (
                <div className={jsStyles.container()}>{children}</div>
              ) : (
                <div className={jsStyles.container()}>
                  <div className={jsStyles.startItems()}>
                    <TopBarItem>
                      <Logotype {...logoProps} />
                    </TopBarItem>
                    {this._renderItems(leftItems)}
                  </div>
                  <div className={jsStyles.endItems()}>{this._renderItems(_rightItems)}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CommonWrapper>
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
