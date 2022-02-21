import React from 'react';

type BGRulerInterface = {
  width?: string | number;
  bottom?: string | number;
};

type BGRulerProps = BGRulerInterface & Partial<DefaultProps>;

type DefaultProps = {
  height: string | number;
  top: string | number;
  left: string | number;
  right: string | number;
  color: string;
};

type BgRulerComponentProps = BGRulerProps & DefaultProps;

/**
 * Компонент рисует пиксельную линейку на заднем фоне.
 * Помогает контролировать размеры элементов при скриншотном тестировании.
 *
 * @see FxInput/__stories__/FxInput.stories.tsx
 */
export class BGRuler extends React.Component<BgRulerComponentProps> {
  public static defaultProps: DefaultProps = {
    height: 20,
    top: 0,
    left: 0,
    right: 0,
    color: '#333',
  };

  private iframe: HTMLIFrameElement | null = null;

  public componentDidMount = () => {
    if (this.iframe && this.iframe.contentWindow) {
      this.iframe.contentWindow.addEventListener('resize', this.update, true);
    }
    this.update();
  };

  public componentWillUnmount = () => {
    if (this.iframe && this.iframe.contentWindow) {
      this.iframe.contentWindow.removeEventListener('resize', this.update, true);
    }
  };

  public update = () => {
    this.forceUpdate();
  };

  public render() {
    const { width, height, color, top, bottom, left, right } = this.props;
    const wrapper: React.CSSProperties = {
      position: 'absolute',
      width,
      height,
      top,
      bottom,
      left,
      right,
      overflow: 'hidden',
    };
    const iframe: React.CSSProperties = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      border: 0,
      visibility: 'hidden',
    };
    const marks: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      backgroundSize: '100px 20px',
      backgroundRepeat: 'repeat-x',
    };
    const highMarks: React.CSSProperties = {
      ...marks,
      height: '100%',
      backgroundImage: `linear-gradient(90deg, ${color} 0, ${color} 1px, transparent 1px)`,
    };
    const middleMarks: React.CSSProperties = {
      ...marks,
      height: '75%',
      backgroundImage: `linear-gradient(90deg, transparent 0, transparent 49px, ${color} 49px, ${color} 50px, transparent 50px)`,
    };
    const shortMarks: React.CSSProperties = {
      ...marks,
      height: '40%',
      backgroundImage: `
        linear-gradient(90deg, transparent 0, transparent 9px, ${color} 9px, ${color} 10px, transparent 10px),
        linear-gradient(90deg, transparent 0, transparent 19px, ${color} 19px, ${color} 20px, transparent 20px),
        linear-gradient(90deg, transparent 0, transparent 29px, ${color} 29px, ${color} 30px, transparent 30px),
        linear-gradient(90deg, transparent 0, transparent 39px, ${color} 39px, ${color} 40px, transparent 40px),
        linear-gradient(90deg, transparent 0, transparent 59px, ${color} 59px, ${color} 60px, transparent 60px),
        linear-gradient(90deg, transparent 0, transparent 69px, ${color} 69px, ${color} 70px, transparent 70px),
        linear-gradient(90deg, transparent 0, transparent 79px, ${color} 79px, ${color} 80px, transparent 80px),
        linear-gradient(90deg, transparent 0, transparent 89px, ${color} 89px, ${color} 90px, transparent 90px)
      `,
    };
    const rulerWidth = this.iframe ? this.iframe.getBoundingClientRect().width : 0;
    const labels = Array(Math.ceil(rulerWidth / 100) + 1)
      .fill(null)
      .map((value, index) => {
        const label: React.CSSProperties = {
          position: 'absolute',
          fontFamily: 'Arial',
          fontSize: 10,
          lineHeight: 1,
          color,
          bottom: -1,
          left: index * 100 + 5,
        };
        return (
          <span key={index} style={label}>
            {index * 100}
          </span>
        );
      });
    return (
      <div style={wrapper}>
        <div style={highMarks} />
        <div style={middleMarks} />
        <div style={shortMarks} />
        {labels}
        <iframe title="BGRuler" style={iframe} ref={this.iframeRef} />
      </div>
    );
  }

  private iframeRef = (ref: HTMLIFrameElement | null) => {
    this.iframe = ref;
  };
}
