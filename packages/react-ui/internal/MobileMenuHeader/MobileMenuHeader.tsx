import React, { useContext } from 'react';

import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { MASK_CHAR_EXEMPLAR } from '../MaskCharLowLine';

import { jsStyles } from './MobileMenuHeader.styles';

interface MobileMenuHeaderProps {
  caption?: string;
  onClose: () => void;
  getHeightOnMount?: (height: number) => void;
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
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { caption } = this.props;
    return (
      <div className={jsStyles.root(this.theme)} ref={el => (this.rootDiv = el)}>
        <div className={jsStyles.container()}>
          <div className={jsStyles.closeWrapper()}>
            <MenuClose onClose={this.props.onClose} />
          </div>
          <div className={jsStyles.caption()}>{caption || MASK_CHAR_EXEMPLAR}</div>
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
