import React from 'react';
import pt from 'prop-types';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Nullable } from '../../typings/utility-types';
import { PopupMenu, PopupMenuProps } from '../../internal/PopupMenu';
import { isProductionEnv, isTestEnv } from '../../lib/currentEnvironment';
import { PopupPosition } from '../../internal/Popup';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

export interface DropdownMenuProps extends CommonProps {
  /**
   * Максимальная высота меню.
   */
  menuMaxHeight?: React.CSSProperties['maxWidth'];
  /**
   * Ширина меню.
   */
  menuWidth?: React.CSSProperties['width'];
  /**
   * Ширина caption.
   */
  width?: React.CSSProperties['width'];
  /**
   * Элемент или функция возвращающая элемент,
   * если передана, используется вместо `caption`,
   * в таком случае управлять открытием и закрытием меню
   * придется в этой функции.
   */
  caption: PopupMenuProps['caption'];
  /**
   * Произвольный элемент, который будет отрендерен в шапке меню.
   *
   * _Примечание_: контрол [`MenuHeader`](#/Components/MenuHeader) передаётся только в `children` меню-контролов. Не стоит передавать `MenuHeader` в `header`.
   */
  header?: React.ReactNode;
  /**
   * Произвольный элемент, который будет отрендерен в подвале меню.
   *
   * Перед элементом переданным в `footer` будет отрендерен [`MenuSeparator`](#/Components/MenuSeparator).
   */
  footer?: React.ReactNode;
  /**
   *  Список позиций доступных для расположения выпадашки относительно `caption`.
   *
   * Если во всех позициях выпадашка вылезает за пределы `viewport`, будет использована первая из этого списка.
   *
   * **Возможные значения**: `top left`, `top center`, `top right`, `right top`, `right middle`, `right bottom`, `bottom left`, `bottom center`, `bottom right`, `left top`, `left middle`, `left bottom`
   * @default ['bottom left', 'bottom right', 'top left', 'top right']
   */
  positions?: PopupPosition[];
  /**
   * Функция, вызывающаяся при открытии выпадашки.
   */
  onOpen?: () => void;
  /**
   * Функция, вызывающаяся при закрытии выпадашки.
   */
  onClose?: () => void;
  /**
   * Не показывать анимацию.
   */
  disableAnimations: boolean;
}

/**
 * Меню, раскрывающееся по клику на переданный в `caption` элемент
 */
export class DropdownMenu extends React.Component<DropdownMenuProps> {
  public static __KONTUR_REACT_UI__ = 'DropdownMenu';

  public static defaultProps = {
    disableAnimations: isTestEnv,
    positions: ['bottom left', 'bottom right', 'top left', 'top right'],
  };

  // TODO: уточнить тип positions, когда #2623 будет смёржен.
  public static propTypes = {
    menuMaxHeight: pt.oneOf([pt.string, pt.number]),
    menuWidth: pt.oneOf([pt.string, pt.number]),
    width: pt.oneOf([pt.string, pt.number]),
    caption: pt.oneOfType([pt.node, pt.func]).isRequired,
  };

  private popupMenu: Nullable<PopupMenu> = null;

  constructor(props: DropdownMenuProps) {
    super(props);

    if (!props.caption && !isProductionEnv) {
      throw new Error('Prop "caption" is required!!!');
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  popupMargin: '0px',
                },
                theme,
              )}
            >
              {this.renderMain()}
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain() {
    if (!this.props.caption) {
      return null;
    }
    return (
      <CommonWrapper {...this.props}>
        <PopupMenu
          ref={this.refPopupMenu}
          caption={this.props.caption}
          menuMaxHeight={this.props.menuMaxHeight}
          menuWidth={this.props.menuWidth}
          onChangeMenuState={this.handleChangeMenuState}
          popupHasPin={false}
          positions={this.props.positions}
          disableAnimations={this.props.disableAnimations}
          header={this.props.header}
          footer={this.props.footer}
          width={this.props.width}
        >
          {this.props.children}
        </PopupMenu>
      </CommonWrapper>
    );
  }

  public open = (): void => {
    if (this.popupMenu) {
      this.popupMenu.open();
    }
  };

  public close = (): void => {
    if (this.popupMenu) {
      this.popupMenu.close();
    }
  };

  private refPopupMenu = (ref: Nullable<PopupMenu>) => (this.popupMenu = ref);

  private handleChangeMenuState = (menuVisible: boolean) => {
    if (menuVisible && this.props.onOpen) {
      this.props.onOpen();
      return;
    }

    if (!menuVisible && this.props.onClose) {
      this.props.onClose();
      return;
    }
  };
}
