import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { Nullable } from '../../typings/utility-types';
import { AnimationKeyframes } from '../../lib/theming/AnimationKeyframes';

import { styles } from './GlobalLoader.styles';

interface GlobalLoaderProps {
  /**
   * Время в миллисекундах до появления глобального лоадера после начала запроса на сервер.
   * @default 1000
   */
  delayBeforeGlobalLoaderShow: number;
  /**
   * Ожидаемое время загрузки данных с сервера
   * @default 1000
   */
  expectedDownloadTime: number;
  success: boolean;
  error: boolean;
}
interface GlobalLoaderState {
  isGlobalLoaderVisible: boolean;
  percents: number;
}

export class GlobalLoader extends React.Component<GlobalLoaderProps, GlobalLoaderState> {
  private globalLoaderVisibleTimeout: Nullable<NodeJS.Timeout>;
  // private counterTimeout: Nullable<NodeJS.Timeout>;
  // private counter: number;
  // private readonly timeToWait: number;

  constructor(props: GlobalLoaderProps) {
    super(props);
    this.state = {
      isGlobalLoaderVisible: false,
      percents: 0,
    };
    this.globalLoaderVisibleTimeout = null;
    // this.counterTimeout = null;
    // this.counter = 0;
    // this.timeToWait = this.props.expectedDownloadTime - Math.floor(this.props.expectedDownloadTime * 0.05);
  }

  componentDidMount() {
    this.globalLoaderVisibleTimeout = setTimeout(() => {
      this.setState({ isGlobalLoaderVisible: true });
      // this.updateWidth();
    }, this.props.delayBeforeGlobalLoaderShow);
  }

  componentDidUpdate(prevProps: Readonly<GlobalLoaderProps>, prevState: Readonly<GlobalLoaderState>, snapshot?: any) {
    if (this.props.success) {
      GlobalLoader.stopTimeout(this.globalLoaderVisibleTimeout);
      // if (this.counterTimeout) {
      //   clearInterval(this.counterTimeout);
      // }
    }
  }

  componentWillUnmount() {
    GlobalLoader.stopTimeout(this.globalLoaderVisibleTimeout);
    // if (this.counterTimeout) {
    //   clearInterval(this.counterTimeout);
    // }
  }

  public static defaultProps: Partial<GlobalLoaderProps> = {
    delayBeforeGlobalLoaderShow: 1000,
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
    console.log(
      `${AnimationKeyframes.globalLoaderProgress()} ${this.props.expectedDownloadTime}ms linear, ${
        this.props.expectedDownloadTime
      }ms ${AnimationKeyframes.globalLoaderSlowProgress()} 10s linear`,
    );
    return (
      this.globalLoaderVisibleTimeout && (
        <div className={styles.outer(this.theme)}>
          <div
            className={styles.inner(this.theme)}
            style={{
              animation: `${AnimationKeyframes.globalLoaderProgress()} ${
                this.props.expectedDownloadTime
              }ms linear, 100s ${AnimationKeyframes.globalLoaderSlowProgress()} ${
                this.props.expectedDownloadTime
              }ms linear`,
            }}
          />
        </div>
      )
    );
  }

  // private updateWidth() {
  //   if (!this.props.success || !this.props.error) {
  //     this.counterTimeout = setInterval(() => {
  //       this.counter += 100;
  //       const width = (this.counter * 100) / this.props.expectedDownloadTime;
  //       console.log(this.counter);
  //       if (width < 100) {
  //         this.setState({ percents: width });
  //       } else {
  //         clearInterval(this.counterTimeout!);
  //       }
  //     }, 100);
  //   } else if (this.counterTimeout) {
  //     clearInterval(this.counterTimeout);
  //   }
  // }
  private static stopTimeout(timeoutId: Nullable<NodeJS.Timeout>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
