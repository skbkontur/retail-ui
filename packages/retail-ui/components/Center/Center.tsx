import * as React from 'react';

import styles = require('./Center.less');

export type HorizontalAlign = 'left' | 'center' | 'right';

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
  public static defaultProps = {
    align: 'center'
  };

  public render() {
    const { align, style, children, ...rest } = this.props;

    const styleJoined = Object.assign({ textAlign: align }, style);

    return (
      <div className={styles.root} {...rest} style={styleJoined}>
        <span className={styles.spring} />
        <span className={styles.container}>{children}</span>
      </div>
    );
  }
}
