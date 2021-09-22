import React from 'react';

import { Theme } from '../../../lib/theming/Theme';
import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { jsStyles } from './MobilePopupHeader.styles';

interface MobilePopupHeaderProps {
  caption?: string;
  onClose: () => void;
  getHeightOnMount?: (height: number) => void;
  withShadow?: boolean;
}

export class MobilePopupHeader extends React.Component<MobilePopupHeaderProps> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuHeader';

  private theme!: Theme;
  private rootDiv: HTMLDivElement | null = null;

  componentDidMount() {
    if (this.rootDiv && this.props.getHeightOnMount) {
      this.props.getHeightOnMount(this.rootDiv.offsetHeight);
    }
  }

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
    const { caption, children, withShadow } = this.props;

    return (
      <div
        className={cx({
          [jsStyles.root(this.theme)]: true,
          [jsStyles.withShadow(this.theme)]: withShadow,
        })}
        ref={(el) => (this.rootDiv = el)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={jsStyles.container()}>
          <div className={jsStyles.closeWrapper()} onClick={this.props.onClose}>
            <div className={jsStyles.closeHolder()} />
          </div>
          {React.isValidElement(children) && (
            <div className={cx({ [jsStyles.childrenWithoutCaption()]: !caption })}>{children}</div>
          )}
          {caption && (
            <div
              className={cx({
                [jsStyles.caption(this.theme)]: true,
              })}
            >
              {caption}
            </div>
          )}
        </div>
      </div>
    );
  }
}
