import React, { AriaAttributes } from 'react';

import { locale } from '../../lib/locale/decorators';
import { emptyHandler } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { colorStyles, styles } from './Token.styles';
import { TokenLocaleHelper } from './locale';
import { TokenView } from './TokenView';

export type TokenColorName = keyof typeof colorStyles;

export interface TokenColors {
  idle: TokenColorName;
  active?: TokenColorName;
}

export type TokenSize = 'small' | 'medium' | 'large';

export interface TokenProps extends Pick<AriaAttributes, 'aria-describedby'>, CommonProps {
  colors?: TokenColors;
  isActive?: boolean;
  /**
   * Состояние валидации при ошибке.
   */
  error?: boolean;
  /**
   * Состояние валидации при предупреждении.
   */
  warning?: boolean;
  disabled?: boolean;
  /**
   * Размер
   */
  size?: TokenSize;
  /**
   * Атрибут для указания id элемента(-ов), описывающих его
   */
  'aria-describedby'?: AriaAttributes['aria-describedby'];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export const TokenDataTids = {
  view: 'TokenView__root',
  removeIcon: 'Token__removeIcon',
} as const;

@rootNode
@locale('Token', TokenLocaleHelper)
export class Token extends React.Component<TokenProps> {
  public static __KONTUR_REACT_UI__ = 'Token';

  private theme!: Theme;
  private setRootNode!: TSetRootNode;

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const {
      size,
      children,
      isActive,
      colors = { idle: 'defaultIdle', active: 'defaultActive' },
      error,
      warning,
      disabled,
      'aria-describedby': ariaDescribedby,
      onClick = emptyHandler,
      onDoubleClick = emptyHandler,
      onRemove = emptyHandler,
      onMouseEnter = emptyHandler,
      onMouseLeave = emptyHandler,
      onFocus = emptyHandler,
      onBlur = emptyHandler,
    } = this.props;

    const tokenChildren = <span className={styles.text(this.theme)}>{children}</span>;

    return (
      <CommonWrapper rootNodeRef={this.setRootNode}>
        <TokenView
          size={size}
          textHolder={tokenChildren}
          isEditing={false}
          disabled={disabled}
          isActive={isActive}
          colors={colors}
          error={error}
          warning={warning}
          aria-describedby={ariaDescribedby}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onRemove={onRemove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </CommonWrapper>
    );
  }
}
