import React, { AriaAttributes, HTMLAttributes } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Nullable } from '../../typings/utility-types';
import { PopupMenu, PopupMenuProps } from '../../internal/PopupMenu';
import { isProductionEnv, isTestEnv } from '../../lib/currentEnvironment';
import { PopupPositionsType } from '../../internal/Popup';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';

import { getDropdownMenuTheme } from './getDropdownMenuTheme';

export interface DropdownMenuProps
  extends Pick<AriaAttributes, 'aria-label'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
    Pick<PopupMenuProps, 'onOpen' | 'onClose' | 'popupMenuId' | 'preventIconsOffset'>,
    CommonProps {
  /** Максимальная высота меню */
  menuMaxHeight?: React.CSSProperties['maxWidth'];
  /** Ширина меню */
  menuWidth?: React.CSSProperties['width'];
  /** Ширина caption */
  width?: React.CSSProperties['width'];

  /**
   * Элемент или функция возвращающая элемент,
   * если передана, используется вместо `caption`,
   * в таком случае управлять открытием и закрытием меню
   * придется в этой функции
   */
  caption: PopupMenuProps['caption'];

  /**
   * Произвольный элемент, который будет отрендерен в шапке меню.
   *
   * _Примечание_: контрол [MenuHeader](#/Components/MenuHeader) передаётся только в `children` меню-контролов. Не стоит передавать `MenuHeader` в `header`.
   */
  header?: React.ReactNode;
  /**
   * Произвольный элемент, который будет отрендерен в подвале меню.
   *
   * Перед элементом переданным в `footer` будет отрендерен [MenuSeparator](#/Components/MenuSeparator).
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
  positions?: PopupPositionsType[];

  /**
   * Не показывать анимацию
   */
  disableAnimations?: boolean;

  /** @ignore */
  corners?: React.CSSProperties;
}

type DefaultProps = Required<Pick<DropdownMenuProps, 'disableAnimations' | 'positions'>>;

/**
 * Выпадающее меню `DropdownMenu` раскрывается по клику на переданный в `caption` элемент.
 */
@rootNode
export class DropdownMenu extends React.Component<DropdownMenuProps> {
  public static __KONTUR_REACT_UI__ = 'DropdownMenu';
  public static displayName = 'DropdownMenu';

  public static defaultProps: DefaultProps = {
    disableAnimations: isTestEnv,
    positions: ['bottom left', 'bottom right', 'top left', 'top right'],
  };

  private getProps = createPropsGetter(DropdownMenu.defaultProps);

  private popupMenu: Nullable<PopupMenu> = null;
  private setRootNode!: TSetRootNode;

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
          return <ThemeContext.Provider value={getDropdownMenuTheme(theme)}>{this.renderMain()}</ThemeContext.Provider>;
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain() {
    if (!this.props.caption) {
      return null;
    }
    const { positions, disableAnimations } = this.getProps();
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <PopupMenu
          id={this.props.id}
          aria-label={this.props['aria-label']}
          ref={this.refPopupMenu}
          caption={this.props.caption}
          menuMaxHeight={this.props.menuMaxHeight}
          menuWidth={this.props.menuWidth}
          preventIconsOffset={this.props.preventIconsOffset}
          popupHasPin={false}
          positions={positions}
          disableAnimations={disableAnimations}
          header={this.props.header}
          footer={this.props.footer}
          width={this.props.width}
          corners={this.props.corners}
          onClose={this.props.onClose}
          onOpen={this.props.onOpen}
          popupMenuId={this.props.popupMenuId}
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
}
