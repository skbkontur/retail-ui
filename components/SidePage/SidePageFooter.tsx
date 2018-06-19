import * as React from 'react';
import classNames from 'classnames';
import { SidePageContext } from './SidePageContext';
import styles from './SidePage.less';
import LayoutEvents from '../../lib/LayoutEvents';

export interface SidePageFooterProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);

  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
}

/**
 * Футер модального окна.
 */

export default class SidePageFooter extends React.Component<
  SidePageFooterProps
> {
  public state = {
    fixed: false
  };

  private content: HTMLElement | null = null;

  private wrapper: HTMLElement | null = null;

  public componentDidMount() {
    this.setProperStyles();
    LayoutEvents.addListener(this.setProperStyles);
  }

  public render(): JSX.Element {
    return (
      <tr>
        <td
          className={styles.layoutItem}
          style={{ height: this.getContentHeight() }}
          ref={this.refWrapper}
        >
          <SidePageContext.Consumer>
            {({ width }) => (
              <div
                style={{
                  position: 'fixed',
                  bottom: 0,
                  width
                }}
              >
                <div
                  className={classNames(styles.footer, {
                    [styles.panel]: this.props.panel,
                    [styles.fixed]: this.state.fixed
                  })}
                  ref={this.refContent}
                >
                  {this.props.children}
                </div>
              </div>
            )}
          </SidePageContext.Consumer>
        </td>
      </tr>
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
      const wrapperRect = this.wrapper!.getBoundingClientRect();
      const contentRect = this.content!.getBoundingClientRect();
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
