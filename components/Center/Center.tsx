import * as React from 'react';

import * as styled from '../internal/styledRender';

import JssStyles from './Center.styles';
import * as CssStyles from './Center.less';

let cssStyles: typeof CssStyles;
let jssStyles: typeof JssStyles;
if (process.env.EXPERIMENTAL_CSS_IN_JS) {
  jssStyles = require('./Center.styles').default;
} else {
  cssStyles = require('./Center.less');
}

enum HorizontalAlign {
  left = 'left',
  center = 'center',
  right = 'right'
}

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Горизонтальное выравнивание контента.
   */
  align?: HorizontalAlign;

  style?: React.CSSProperties;

  children?: React.ReactNode;
}

export interface CenterState {}

/**
 * Контейнер для вертикального центрирования. В компонент можно передавать
 * свойства как в любой div.
 */
export default class Center extends React.Component<CenterProps, CenterState> {
  static align = HorizontalAlign;

  static defaultProps = {
    align: 'center'
  };

  render() {
    return styled.element(cssStyles, jssStyles, styles => {
      const { align, style, children, ...rest } = this.props;

      const styleJoined = Object.assign({ textAlign: align }, style);

      return (
        <div className={styles.root} {...rest} style={styleJoined}>
          <span className={styles.spring} />
          <span className={styles.container}>{children}</span>
        </div>
      );
    });
  }
}
