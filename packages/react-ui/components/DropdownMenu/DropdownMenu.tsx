import type { AriaAttributes, HTMLAttributes } from 'react';
import React from 'react';
import warning from 'warning';

import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { CommonProps } from '../../internal/CommonWrapper/types.js';
import type { PopupPositionsType } from '../../internal/Popup/index.js';
import { PopupMenu } from '../../internal/PopupMenu/index.js';
import type { PopupMenuProps } from '../../internal/PopupMenu/index.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { isTestEnv } from '../../lib/currentEnvironment.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode//rootNodeDecorator.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Nullable } from '../../typings/utility-types.js';
import { getDropdownMenuTheme } from './getDropdownMenuTheme.js';

export interface DropdownMenuProps
  extends
    Pick<AriaAttributes, 'aria-label'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
    Pick<PopupMenuProps, 'onOpen' | 'onClose' | 'popupMenuId' | 'preventIconsOffset'>,
    CommonProps {
  /** Максимальная высота меню. */
  menuMaxHeight?: React.CSSProperties['maxWidth'];
  /** Ширина раскрывающегося меню. */
  menuWidth?: React.CSSProperties['width'];
  /** Ширина контейнера с `caption`. */
  width?: React.CSSProperties['width'];

  /**
   * Элемент или render-функция, по которым открывается меню.
   *
   * Если передать функцию, ей нужно самостоятельно вызвать `openMenu`, `closeMenu` или `toggleMenu`.
   */
  caption: PopupMenuProps['caption'];

  /**
   * Рендерит произвольный элемент в шапке меню.
   *
   * _Примечание_: `MenuHeader` передается только в `children` меню-контролов. Не передавайте `MenuHeader` в `header`.
   */
  header?: React.ReactNode;
  /**
   * Рендерит произвольный элемент в подвале меню.
   *
   * Перед элементом из `footer` автоматически добавляется `MenuSeparator`.
   */
  footer?: React.ReactNode;
  /**
   * Список допустимых положений раскрывающегося меню относительно `caption`.
   *
   * Если меню выходит за пределы `viewport` во всех положениях, будет использовано первое положение из списка.
   *
   * **Возможные значения**: `top left`, `top center`, `top right`, `right top`, `right middle`, `right bottom`, `bottom left`, `bottom center`, `bottom right`, `left top`, `left middle`, `left bottom`
   * @default ['bottom left', 'bottom right', 'top left', 'top right']
   */
  positions?: PopupPositionsType[];

  /**
   * Отключает анимацию раскрывающегося меню.
   */
  disableAnimations?: boolean;

  /** @ignore */
  corners?: React.CSSProperties;
}

type DefaultProps = Required<Pick<DropdownMenuProps, 'disableAnimations' | 'positions'>>;

/**
 * Выпадающее меню `DropdownMenu`. Раскрывается по клику на переданный в `caption` элемент.
 *
 * Поддерживает настройку `header`, `footer`, позиций открытия `positions` и другие настройки внешнего вида.
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
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  constructor(props: DropdownMenuProps) {
    super(props);

    if (!props.caption) {
      warning(false, 'Prop "caption" is required!!!');
    }
  }

  public render(): React.JSX.Element {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return <ThemeContext.Provider value={getDropdownMenuTheme(theme)}>{this.renderMain()}</ThemeContext.Provider>;
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain(): React.JSX.Element | null {
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

  private refPopupMenu = (ref: Nullable<PopupMenu>) => {
    this.popupMenu = ref;
  };
}
