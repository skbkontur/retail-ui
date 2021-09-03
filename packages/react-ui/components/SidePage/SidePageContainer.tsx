import React from 'react';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { theme } from '../../lib/theming/decorators';

import { styles } from './SidePage.styles';
import { SidePageContext } from './SidePageContext';

export type SidePageContainerProps = CommonProps;

/**
 * Контейнер с отступами
 *
 * @visibleName SidePage.Container
 */
@theme
export class SidePageContainer extends React.Component<SidePageContainerProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageContainer';

  private readonly theme!: Theme;

  public render() {
    return (
      <SidePageContext.Consumer>
        {({ hasHeader, hasFooter, hasPanel }) => (
          <CommonWrapper {...this.props}>
            <div
              className={cx({
                [styles.container(this.theme)]: true,
                [styles.containerWithoutHeader(this.theme)]: !hasHeader,
                [styles.containerWithoutFooter(this.theme)]: !hasFooter,
                [styles.containerWithPanel(this.theme)]: hasPanel,
              })}
            >
              {this.props.children}
            </div>
          </CommonWrapper>
        )}
      </SidePageContext.Consumer>
    );
  }
}
