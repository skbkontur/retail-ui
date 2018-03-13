// @flow
import * as React from 'react';

import PropTypes from 'prop-types';
import styled from '../internal/styledRender';

let cssStyles;
let jssStyles;
if (process.env.EXPERIMENTAL_CSS_IN_JS) {
  jssStyles = require('./Center.styles').default;
} else {
  cssStyles = require('./Center.less');
}

type Props = {
  align?: 'left' | 'center' | 'right',
  // eslint-disable-next-line flowtype/no-weak-types
  style?: Object,
  children?: React.Node,
  // eslint-disable-next-line flowtype/no-weak-types
  [key: string]: any
};

/**
 * Контейнер для вертикального центрирования. В компонент можно передавать
 * свойства как в любой div.
 */
export default class Center extends React.Component<Props> {
  static propTypes = {
    /**
     * Горизонтальное выравнивание контента.
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),

    style: PropTypes.object
  };

  static defaultProps = {
    align: 'center'
  };

  render = styled(cssStyles, jssStyles, styles => {
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
