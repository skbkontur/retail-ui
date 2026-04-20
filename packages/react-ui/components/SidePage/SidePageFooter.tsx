import type { Emotion } from '@emotion/css/create-instance';
import React, { type JSX } from 'react';

import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { getDOMRect } from '../../lib/dom/getDOMRect.js';
import type { GlobalObject } from '../../lib/globalObject.js';
import * as LayoutEvents from '../../lib/LayoutEvents.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { getRootNode, rootNode } from '../../lib/rootNode/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { isNonNullable } from '../../lib/utils.js';
import { Gapped } from '../Gapped/index.js';
import type { GappedProps } from '../Gapped/index.js';
import { ModalSeparator } from '../Modal/ModalSeparator.js';
import { responsiveLayout } from '../ResponsiveLayout/decorator.js';
import { getStyles } from './SidePage.styles.js';
import { SidePageContext } from './SidePageContext.js';
import type { SidePageContextType } from './SidePageContext.js';

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
@withRenderEnvironment
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

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private content: HTMLElement | null = null;
  private layoutSub: ReturnType<typeof LayoutEvents.addListener> | null = null;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
    this.context.footerRef(this);
    this.update();
    this.layoutSub = LayoutEvents.addListener(this.update, this.globalObject);
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

  public getSticky(): boolean {
    if (typeof this.props.sticky !== 'undefined') {
      return this.props.sticky;
    }

    if (this.isMobileLayout) {
      return false;
    }

    return true;
  }

  public render(): JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  public update = (): void => {
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
          className={this.styles.footerWrapper()}
        >
          <SidePageContext.Consumer>
            {({ getWidth }) => (
              <div
                className={this.cx(this.styles.footer(this.theme), {
                  [this.styles.positionStatic()]: !this.getSticky(),
                })}
                style={{
                  width: getWidth(),
                }}
              >
                {separator}
                <div
                  className={this.cx(this.styles.footerContent(this.theme), {
                    [this.styles.footerFixed(this.theme)]: this.state.fixed,
                    [this.styles.panel(this.theme)]: !!this.props.panel,
                    [this.styles.panelFixed(this.theme)]: !!this.props.panel && this.state.fixed,
                    [this.styles.mobileFooterContent(this.theme)]: this.isMobileLayout,
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
