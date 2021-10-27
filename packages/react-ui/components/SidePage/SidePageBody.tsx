import React from 'react';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { isIE11 } from '../../lib/client';

import { styles } from './SidePage.styles';
import { SidePageContext, SidePageContextType } from './SidePageContext';

export interface SidePageBodyProps extends CommonProps {
  children?: React.ReactNode;
}
/**
 * Тело для сайдпейджа
 *
 * @visibleName SidePage.Body
 */
export class SidePageBody extends React.Component<SidePageBodyProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageBody';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;

  public componentDidUpdate() {
    this.context.updateLayout();
  }

  public render() {
    return (
      <SidePageContext.Consumer>
        {({ footerHeight }) => (
          <CommonWrapper {...this.props}>
            <div className={styles.body()} style={{ paddingBottom: isIE11 ? 0 : footerHeight }}>
              {this.props.children}
              {/*padding-bottom is not working in IE*/}
              {isIE11 && <div style={{ height: footerHeight }} />}
            </div>
          </CommonWrapper>
        )}
      </SidePageContext.Consumer>
    );
  }
}
