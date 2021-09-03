import React from 'react';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { theme } from '../../lib/theming/decorators';

import { styles } from './SidePage.styles';
import { SidePageContext } from './SidePageContext';

export interface SidePageFooterProps extends CommonProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
}

/**
 * Футер сайдпейджа.
 *
 * @visibleName SidePage.Footer
 */
@theme
export class SidePageFooter extends React.Component<SidePageFooterProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageFooter';

  public static contextType = SidePageContext;
  public context!: React.ContextType<typeof SidePageContext>;

  public state = {
    fixed: false,
  };

  private readonly theme!: Theme;
  private content: HTMLElement | null = null;
  private wrapper: HTMLElement | null = null;
  private layoutSub: ReturnType<typeof LayoutEvents.addListener> | null = null;

  public componentDidMount() {
    this.context.footerRef?.(this);
    this.update();
    this.layoutSub = LayoutEvents.addListener(this.update);
    this.context.setHasFooter?.();
    this.context.setHasPanel?.(this.props.panel);
  }

  public componentDidUpdate(prevProps: Readonly<SidePageFooterProps>) {
    this.props.panel !== prevProps.panel && this.context.setHasPanel?.(this.props.panel);
  }

  public componentWillUnmount() {
    this.context.footerRef?.(null);
    if (this.layoutSub) {
      this.layoutSub.remove();
    }
    this.context.setHasFooter?.(false);
    this.context.setHasPanel?.(false);
  }

  public update = () => {
    this.setProperStyles();
  };

  public render() {
    return (
      <CommonWrapper {...this.props}>
        <div style={{ height: this.getContentHeight() }} ref={this.refWrapper}>
          <SidePageContext.Consumer>
            {({ getWidth }) => (
              <div
                className={styles.footer()}
                style={{
                  width: getWidth(),
                }}
              >
                <div
                  className={cx(styles.footerContent(this.theme), {
                    [styles.footerFixed(this.theme)]: this.state.fixed,
                    [styles.panel(this.theme)]: !!this.props.panel,
                  })}
                  ref={this.refContent}
                >
                  {this.props.children}
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

  private refWrapper = (node: HTMLElement | null) => {
    this.wrapper = node;
  };

  private setProperStyles = () => {
    if (this.wrapper && this.content) {
      const wrapperRect = this.wrapper.getBoundingClientRect();
      const contentRect = this.content.getBoundingClientRect();
      const fixed = wrapperRect.top > contentRect.top;
      this.setState({ fixed });
    }
  };

  private getContentHeight() {
    if (!this.content) {
      return 'auto';
    }
    return this.content.getBoundingClientRect().height;
  }
}
