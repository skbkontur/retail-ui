// @flow
import * as React from 'react';

import PropTypes from 'prop-types';

import styles from './Center.less';

type Props = {
  align?: 'left' | 'center' | 'right',
  // eslint-disable-next-line flowtype/no-weak-types
  style?: Object,
  children?: React.Node
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
    align: PropTypes.oneOf(['left', 'center', 'right'])
  };

  static defaultProps = {
    align: 'center'
  };

  render() {
    const { align, ...rest } = this.props;

    const style = Object.assign(
      {
        textAlign: align
      },
      this.props.style
    );

    return (
      <div className={styles.root} {...rest} style={style}>
        <span className={styles.spring} />
        <span className={styles.container}>
          {this.props.children}
        </span>
      </div>
    );
  }
}
