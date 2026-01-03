import type { HTMLAttributes } from 'react';
import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { isKeyArrowHorizontal, isKeyArrowLeft, isKeyEnter } from '../../lib/events/keyboard/identifiers.js';
import { getButtonCorners, Group } from '../Group/index.js';
import type { ButtonProps } from '../Button/index.js';
import { Button } from '../Button/index.js';
import type { Nullable } from '../../typings/utility-types.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import type { SizeProp } from '../../lib/types/props.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './Switcher.styles.js';
import { getSwitcherTheme } from './switcherTheme.js';
import { mod } from './helpers.js';

export type SwitcherItems = string | SwitcherItem;

export const SwitcherDataTids = {
  root: 'Switcher__root',
} as const;

export interface SwitcherProps extends Pick<HTMLAttributes<unknown>, 'role'>, CommonProps {
  /** Задает список элементов в свитчере. Это массив строк или объектов типа `{ label: string, value: string, buttonProps?: Partial<ButtonProps> }` */
  items: SwitcherItems[];

  /** Устанавливает значение свитчера. */
  value?: string;

  /** Задает функцию, которая вызывается при изменении значения свитчера (value). */
  onValueChange?: (value: string) => void;

  /** Задает подпись около свитчера. */
  caption?: string;

  /** Переводит контрол в состояние валидации "ошибка". */
  error?: boolean;

  /** Задает размер контрола. */
  size?: SizeProp;

  /** Задает ширину контрола. С этим пропом элементы внутри автоматически равномерно растянутся. */
  width?: React.CSSProperties['width'];

  /** Делает компонент недоступным. */
  disabled?: boolean;

  /** Задает функцию отрисовки элемента. Параметр `renderDefault` - это встроенная дефолтная функция отрисовки элемента, которую можно вызывать в `renderItem`. */
  renderItem?: (
    label: string,
    value: string,
    buttonProps: ButtonProps,
    renderDefault: () => React.ReactNode,
    ariaLabel?: string,
  ) => React.ReactNode;
}

type DefaultProps = Required<Pick<SwitcherProps, 'role'>>;

export interface SwitcherState {
  focusedIndex: Nullable<number>;
}

interface SwitcherItem {
  value: string;
  label: string;
  'aria-label'?: string;
  buttonProps?: Partial<ButtonProps>;
}

/**
 * Переключатель `Switcher` — это замена RadioGroup.
 *
 * Не используйте переключатель в качестве навигации, для этого лучше подходят Tabs.
 */
@withRenderEnvironment
@rootNode
export class Switcher extends React.Component<SwitcherProps, SwitcherState> {
  public static __KONTUR_REACT_UI__ = 'Switcher';
  public static displayName = 'Switcher';

  public static defaultProps: DefaultProps = {
    role: 'switch',
  };

  public state: SwitcherState = {
    focusedIndex: null,
  };

  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = getSwitcherTheme(theme);
          return <ThemeContext.Provider value={this.theme}>{this.renderMain()}</ThemeContext.Provider>;
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const inputProps = {
      type: 'checkbox',
      onKeyDown: this.handleKey,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      className: this.styles.input(),
    };
    const items = <Group width={'100%'}>{this._renderItems()}</Group>;

    const captionClassName = this.cx(this.styles.caption(this.theme), this.getLabelSizeClassName());
    const wrapperClassName = this.cx(this.styles.wrap(), {
      [this.styles.error(this.theme)]: this.props.error,
      [this.styles.wrapCustomWidth()]: this.props.width !== undefined,
    });

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div data-tid={SwitcherDataTids.root} className={this.styles.root()} style={{ width: this.props.width }}>
          {this.props.caption ? <div className={captionClassName}>{this.props.caption}</div> : null}
          <div className={wrapperClassName}>
            <input {...inputProps} />
            {items}
          </div>
        </div>
      </CommonWrapper>
    );
  }

  private selectItem = (value: string) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  };

  private _extractPropsFromItem = (item: string | SwitcherItem): SwitcherItem => {
    return typeof item === 'object' ? item : { label: item, value: item };
  };

  private _extractValuesFromItems = (): string[] => {
    return this.props.items.map((item) => {
      const { value } = this._extractPropsFromItem(item);
      return value;
    });
  };

  private _focus = (index: number) => {
    this.setState({ focusedIndex: index });
  };

  private handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const focusedIndex = this.state.focusedIndex;
    if (typeof focusedIndex !== 'number') {
      return;
    }

    if (isKeyEnter(e)) {
      if (this.props.onValueChange) {
        const { value, buttonProps } = this._extractPropsFromItem(this.props.items[focusedIndex]);
        if (!buttonProps?.disabled) {
          this.selectItem(value);
        }
      }
      return;
    }

    if (isKeyArrowHorizontal(e)) {
      e.preventDefault();
      this.move(isKeyArrowLeft(e));
    }
  };

  private move = (left: boolean) => {
    const selectedIndex = this.state.focusedIndex;

    if (typeof selectedIndex !== 'number') {
      return;
    }
    const newFocusedIndex = this._getNextFocusedIndex(left, selectedIndex);
    this._focus(newFocusedIndex);
  };

  private _getNextFocusedIndex = (left: boolean, focusedIndex: number): number => {
    const { items, disabled } = this.props;
    if (disabled) {
      return focusedIndex;
    }

    for (let i = 1; i < items.length; i++) {
      const index = mod(focusedIndex + (left ? -i : i), items.length);
      const { buttonProps } = this._extractPropsFromItem(items[index]);
      if (!buttonProps?.disabled) {
        return index;
      }
    }
    return focusedIndex;
  };

  private _handleFocus = () => {
    const { value } = this.props;

    const items = this._extractValuesFromItems();
    const currentIndex = [...items].indexOf(value as string);
    const index = currentIndex > -1 ? currentIndex : 0;

    this.setState({ focusedIndex: index });
  };

  private _handleBlur = () => {
    this.setState({ focusedIndex: null });
  };

  private _renderItems = () => {
    const { items, value, size, width, disabled, role, renderItem } = this.props;

    return items.map((item, i) => {
      const {
        'aria-label': ariaLabel,
        label,
        value: itemValue,
        buttonProps: customButtonProps,
      } = this._extractPropsFromItem(item);

      const isChecked = value === itemValue;
      const commonButtonProps = {
        'aria-checked': isChecked,
        role,
        checked: isChecked,
        visuallyFocused: this.state.focusedIndex === i,
        onClick: () => {
          this.selectItem(itemValue);
        },
        disableFocus: true,
        size,
        disabled,
        corners: getButtonCorners(i === 0, i === items.length - 1),
      };

      const buttonProps = {
        ...commonButtonProps,
        ...customButtonProps,
      };

      if (!buttonProps.width && width) {
        buttonProps.width = '100%';
      }

      const renderDefault = () => this.renderDefaultItem(label, itemValue, buttonProps, ariaLabel);
      return renderItem ? renderItem(label, itemValue, buttonProps, renderDefault, ariaLabel) : renderDefault();
    });
  };

  private renderDefaultItem = (label: string, value: string, buttonProps: ButtonProps, ariaLabel?: string) => (
    <Button aria-label={ariaLabel} key={value} {...buttonProps}>
      {label}
    </Button>
  );

  private getLabelSizeClassName = (): string => {
    switch (this.props.size) {
      case 'large':
        return this.styles.captionLarge(this.theme);
      case 'medium':
        return this.styles.captionMedium(this.theme);
      case 'small':
      default:
        return this.styles.captionSmall(this.theme);
    }
  };
}
