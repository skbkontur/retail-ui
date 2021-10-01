import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { Nullable } from '../../typings/utility-types';
import { AnimationKeyframes } from '../../lib/theming/AnimationKeyframes';
import { cx } from '../../lib/theming/Emotion';
import { ZIndex } from '../../internal/ZIndex';

import { styles } from './GlobalLoader.styles';

interface GlobalLoaderProps {
  /**
   * Время в миллисекундах до появления глобального лоадера после начала запроса на сервер.
   * @default 1000
   */
  delayBeforeGlobalLoaderShow: number;
  /**
   * Ожидаемое время загрузки данных с сервера
   */
  expectedDownloadTime: number;
  downloadSuccess: boolean;
  downloadError: boolean;
}
interface GlobalLoaderState {
  isGlobalLoaderVisible: boolean;
}

export class GlobalLoader extends React.Component<GlobalLoaderProps, GlobalLoaderState> {
  private globalLoaderVisibleTimeout: Nullable<NodeJS.Timeout>;
  private globalLoaderSuccessTimeout: Nullable<NodeJS.Timeout>;
  private readonly globalLoaderRef: any;

  constructor(props: GlobalLoaderProps) {
    super(props);
    this.state = {
      isGlobalLoaderVisible: false,
    };
    this.globalLoaderVisibleTimeout = null;
    this.globalLoaderSuccessTimeout = null;
    this.globalLoaderRef = React.createRef();
  }

  componentDidMount() {
    this.globalLoaderVisibleTimeout = setTimeout(() => {
      this.setState({ isGlobalLoaderVisible: true });
    }, this.props.delayBeforeGlobalLoaderShow);
  }

  componentWillUnmount() {
    GlobalLoader.stopTimeout(this.globalLoaderVisibleTimeout);
    GlobalLoader.stopTimeout(this.globalLoaderSuccessTimeout);
  }

  public static defaultProps: Partial<GlobalLoaderProps> = {
    delayBeforeGlobalLoaderShow: 1000,
    downloadError: false,
    downloadSuccess: false,
  };

  private theme!: Theme;

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
    let animation = '';
    const color = this.theme.globalLoaderBackgroundColor;

    animation = `${AnimationKeyframes.globalLoaderProgress()} ${this.props.expectedDownloadTime}ms linear, ${
      this.props.expectedDownloadTime * 2
    }ms ${AnimationKeyframes.globalLoaderSlowProgress()} ${
      this.props.expectedDownloadTime
    }ms linear, 2s ${AnimationKeyframes.globalLoaderWaiting(color)} ${
      this.props.expectedDownloadTime * 3
    }ms linear infinite`;

    if (this.props.downloadError) {
      animation = `${AnimationKeyframes.globalSpinnerMoveToRight(
        this.globalLoaderRef?.current?.getBoundingClientRect().width,
      )} 1s linear, 3s ${AnimationKeyframes.globalLoaderSpinner()} 1s infinite alternate`;
    }

    if (this.props.downloadSuccess) {
      animation = 'none';
      this.globalLoaderSuccessTimeout = setTimeout(() => {
        this.setState({ isGlobalLoaderVisible: false });
      }, 1000);
    }

    return (
      this.state.isGlobalLoaderVisible && (
        <ZIndex priority="GlobalLoader" className={styles.outer(this.theme)}>
          <div
            ref={this.globalLoaderRef}
            className={cx(styles.inner(this.theme), {
              [styles.fullWidth()]: this.props.downloadSuccess,
            })}
            style={{
              animation: animation,
            }}
          />
        </ZIndex>
      )
    );
  }
  private static stopTimeout(timeoutId: Nullable<NodeJS.Timeout>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
