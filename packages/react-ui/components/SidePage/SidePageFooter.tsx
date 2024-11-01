import React from 'react';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import type { TSetRootNode } from '../../lib/rootNode';
import { getRootNode, rootNode } from '../../lib/rootNode';
import { getDOMRect } from '../../lib/dom/getDOMRect';
import type { GappedProps } from '../Gapped';
import { Gapped } from '../Gapped';
import { isNonNullable } from '../../lib/utils';
import { ModalSeparator } from '../Modal/ModalSeparator';

import { styles } from './SidePage.styles';
import type { SidePageContextType } from './SidePageContext';
import { SidePageContext } from './SidePageContext';

export interface SidePageFooterProps extends Omit<CommonProps, 'children'> {
  /** @ignore */
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);

  /** Включает серый цвет в футере. */
  panel?: boolean;

  /** Закрепляет футер снизу сайдпейджа. */
  sticky?: boolean;

  /** Задает расстояние между элементами футера в пикселях. */
  gap?: GappedProps['gap'];
}

interface SidePageFooterState {
  fixed: boolean;
}

export const SidePageFooterDataTids = {
  root: 'SidePageFooter__root',
} as const;

/**
 * Футер сайдпейджа.
 *
 * @visibleName SidePage.Footer
 */
@responsiveLayout
@rootNode
export class SidePageFooter extends React.Component<React.PropsWithChildren<SidePageFooterProps>> {
  public static __KONTUR_REACT_UI__ = 'SidePageFooter';
  public static displayName = 'SidePageFooter';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;
  private isMobileLayout!: boolean;

  public state: SidePageFooterState = {
    fixed: false,
  };

  private theme!: Theme;
  private content: HTMLElement | null = null;
  private layoutSub: ReturnType<typeof LayoutEvents.addListener> | null = null;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
    this.context.footerRef(this);
    this.update();
    this.layoutSub = LayoutEvents.addListener(this.update);
    this.context.setHasFooter?.();
    this.context.setHasPanel?.(this.props.panel);
  }

  public componentDidUpdate(prevProps: Readonly<SidePageFooterProps>) {
    this.props.panel !== prevProps.panel && this.context.setHasPanel?.(this.props.panel);
  }

  public componentWillUnmount() {
    this.context.footerRef(null);
    if (this.layoutSub) {
      this.layoutSub.remove();
    }
    this.context.setHasFooter?.(false);
    this.context.setHasPanel?.(false);
  }

  public getSticky() {
    if (typeof this.props.sticky !== 'undefined') {
      return this.props.sticky;
    }

    if (this.isMobileLayout) {
      return false;
    }

    return true;
  }

  public render(): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  public update = () => {
    this.setProperStyles();
  };

  private renderMain() {
    const separator: React.ReactNode = (this.props.panel || this.state.fixed) && (
      <ModalSeparator fixed={this.state.fixed} />
    );

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div
          data-tid={SidePageFooterDataTids.root}
          style={{ height: this.getContentHeight() }}
          className={styles.footerWrapper()}
        >
          <SidePageContext.Consumer>
            {({ getWidth }) => (
              <div
                className={cx(styles.footer(this.theme), {
                  [styles.positionStatic()]: !this.getSticky(),
                })}
                style={{
                  width: getWidth(),
                }}
              >
                {separator}
                <div
                  className={cx(styles.footerContent(this.theme), {
                    [styles.footerFixed(this.theme)]: this.state.fixed,
                    [styles.panel(this.theme)]: !!this.props.panel,
                    [styles.panelFixed(this.theme)]: !!this.props.panel && this.state.fixed,
                    [styles.mobileFooterContent(this.theme)]: this.isMobileLayout,
                  })}
                  ref={this.refContent}
                >
                  {isNonNullable(this.props.gap) ? (
                    <Gapped vertical={this.isMobileLayout} gap={this.props.gap}>
                      {this.props.children}
                    </Gapped>
                  ) : (
                    this.props.children
                  )}
                </div>
              </div>
            )}
          </SidePageContext.Consumer>
        </div>
      </CommonWrapper>
    );
  }

  private refContent = (node: HTMLElement | null) => {
    this.content = node;
  };

  private setProperStyles = () => {
    const wrapper = getRootNode(this);
    if (wrapper && this.content) {
      const wrapperRect = getDOMRect(wrapper);
      const contentRect = getDOMRect(this.content);
      const fixed = wrapperRect.top > contentRect.top;
      this.setState({ fixed });
    }
  };

  private getContentHeight() {
    if (!this.content) {
      return 'auto';
    }
    return getDOMRect(this.content).height;
  }
}
