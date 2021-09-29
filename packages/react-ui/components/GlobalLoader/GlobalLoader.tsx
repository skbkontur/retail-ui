import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { Nullable } from '../../typings/utility-types';
import { AnimationKeyframes } from '../../lib/theming/AnimationKeyframes';
import { cx } from '../../lib/theming/Emotion';

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
  success: boolean;
  error: boolean;
}
interface GlobalLoaderState {
  isGlobalLoaderVisible: boolean;
  percents: number;
}

export class GlobalLoader extends React.Component<GlobalLoaderProps, GlobalLoaderState> {
  private globalLoaderVisibleTimeout: Nullable<NodeJS.Timeout>;
  private readonly globalLoaderRef: any;

  constructor(props: GlobalLoaderProps) {
    super(props);
    this.state = {
      isGlobalLoaderVisible: false,
      percents: 0,
    };
    this.globalLoaderVisibleTimeout = null;
    this.globalLoaderRef = React.createRef();
  }

  componentDidMount() {
    this.globalLoaderVisibleTimeout = setTimeout(() => {
      this.setState({ isGlobalLoaderVisible: true });
    }, this.props.delayBeforeGlobalLoaderShow);
  }

  componentDidUpdate(prevProps: Readonly<GlobalLoaderProps>, prevState: Readonly<GlobalLoaderState>, snapshot?: any) {
    if (this.props.success) {
      GlobalLoader.stopTimeout(this.globalLoaderVisibleTimeout);
    }
  }

  componentWillUnmount() {
    GlobalLoader.stopTimeout(this.globalLoaderVisibleTimeout);
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
    let animation = '';

    const standardAnimation = `${AnimationKeyframes.globalLoaderProgress()} ${
      this.props.expectedDownloadTime
    }ms linear, 10s ${AnimationKeyframes.globalLoaderSlowProgress()} ${this.props.expectedDownloadTime}ms linear`;

    animation = standardAnimation;

    if (this.props.success) animation = '0';
    if (this.props.error)
      animation = `${AnimationKeyframes.globalSpinnerMoveToRight(
        this.globalLoaderRef?.current?.getBoundingClientRect().width,
      )} 1s linear, 3s ${AnimationKeyframes.globalLoaderSpinner()} 1s infinite alternate`;

    return (
      this.globalLoaderVisibleTimeout && (
        <div
          className={cx(styles.outer(this.theme), {
            [styles.fullWidth()]: this.props.success,
          })}
        >
          <div
            ref={this.globalLoaderRef}
            className={styles.inner(this.theme)}
            style={{
              animation: animation,
              width: this.props.success ? '100%' : '0%',
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
