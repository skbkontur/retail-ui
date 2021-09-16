import React, { useContext } from 'react';
import cn from 'classnames';

import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { MASK_CHAR_EXEMPLAR } from '../MaskCharLowLine';

import { jsStyles } from './MobileMenuHeader.styles';

interface MobileMenuHeaderProps {
  caption?: string;
  onClose: () => void;
  getHeightOnMount?: (height: number) => void;
  withShadow?: boolean;
  /**
   * Убрать бордер-радиусы
   */
  withoutBorderRadius?: boolean;
}

export class MobileMenuHeader extends React.Component<MobileMenuHeaderProps> {
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
        className={cn({
          [jsStyles.root(this.theme)]: true,
          [jsStyles.withShadow(this.theme)]: withShadow,
          [jsStyles.withoutBorderRadius()]: this.props.withoutBorderRadius,
        })}
        ref={(el) => (this.rootDiv = el)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={jsStyles.container()}>
          <div className={jsStyles.closeWrapper()}>
            <MenuClose onClose={this.props.onClose} />
          </div>
          <div
            className={cn({
              [jsStyles.caption(this.theme)]: true,
              [jsStyles.withChild(this.theme)]: Boolean(children),
            })}
          >
            {caption || MASK_CHAR_EXEMPLAR}
          </div>
          {children}
        </div>
      </div>
    );
  }
}

const MenuClose: React.FunctionComponent<{ onClose: () => void }> = ({ onClose }) => {
  const theme = useContext(ThemeContext);

  return (
    <button className={jsStyles.close(theme)} onClick={onClose} data-tid="modal-close">
      <CrossIcon />
    </button>
  );
};
