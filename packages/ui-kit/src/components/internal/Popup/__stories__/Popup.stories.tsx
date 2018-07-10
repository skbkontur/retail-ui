/* tslint:disable max-classes-per-file */
import { storiesOf } from '@storybook/react';
import React from 'react';
import Popup from '../Popup';

const AllCases: React.SFC<{ small: boolean }> = ({ small }) => (
  <div style={{ transform: 'translate(50%, 15%)' }}>
    <table>
      <tbody>
        <tr>
          <td />
          <td>
            <AlwaysOpened small={small} positions={['top left']} />
          </td>
          <td>
            <AlwaysOpened small={small} positions={['top center']} />
          </td>
          <td>
            <AlwaysOpened small={small} positions={['top right']} />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <AlwaysOpened small={small} positions={['left top']} />
          </td>
          <td />
          <td />
          <td />
          <td>
            <AlwaysOpened small={small} positions={['right top']} />
          </td>
        </tr>
        <tr>
          <td>
            <AlwaysOpened small={small} positions={['left middle']} />
          </td>
          <td />
          <td />
          <td />
          <td>
            <AlwaysOpened small={small} positions={['right middle']} />
          </td>
        </tr>
        <tr>
          <td>
            <AlwaysOpened small={small} positions={['left bottom']} />
          </td>
          <td />
          <td />
          <td />
          <td>
            <AlwaysOpened small={small} positions={['right bottom']} />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <AlwaysOpened small={small} positions={['bottom left']} />
          </td>
          <td>
            <AlwaysOpened small={small} positions={['bottom center']} />
          </td>
          <td>
            <AlwaysOpened small={small} positions={['bottom right']} />
          </td>
          <td />
        </tr>
      </tbody>
    </table>
  </div>
);

storiesOf('Popup', module)
  .add('All pin opened', () => <AllCases small={false} />)
  .add('All pin opened on small elements', () => <AllCases small />)
  .add('Positioning', () => (
    <div>
      <table>
        <tbody>
          {new Array(6 * 5).fill(0).map((x, i) => {
            return Math.floor(i / 6) % 2 ? (
              <tr>
                <td>
                  <div style={{ height: '40px' }} />
                </td>
              </tr>
            ) : (
              <tr>
                <td>
                  <PopupWithPositions />
                </td>
                <td style={{ width: '50%', minWidth: '300px' }} />
                <td>
                  <PopupWithPositions />
                </td>
                <td style={{ width: '50%', minWidth: '300px' }} />
                <td>
                  <PopupWithPositions />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ))
  .add('Hint', () => (
    <div style={{ transform: 'translate(250px, 200px)' }}>
      <Hint positions={['top center', 'right top', 'bottom center', 'left middle']} margin={20} />
    </div>
  ))
  .add('Toast', () => (
    <div style={{ transform: 'translate(250px, 200px)' }}>
      <Toast positions={['top center', 'right top', 'bottom center', 'left middle']} />
    </div>
  ));

interface AlwaysOpenedProps {
  small: boolean;
  positions: string[];
}

interface AlwaysOpenedState {
  anchor: HTMLDivElement | null;
}

class AlwaysOpened extends React.Component<AlwaysOpenedProps, AlwaysOpenedState> {
  public state: AlwaysOpenedState = {
    anchor: null
  };

  private anchor: HTMLDivElement | null = null;

  public componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  public render() {
    const defaultStyle: React.CSSProperties = {
      width: '80px',
      height: '80px',
      margin: '20px',
      border: '1px solid black',
      textAlign: 'center',
      fontSize: '40px'
    };

    const style: React.CSSProperties = this.props.small
      ? {
          ...defaultStyle,
          width: '20',
          height: '20',
          margin: '50'
        }
      : defaultStyle;

    return (
      <div>
        <div ref={e => (this.anchor = e)} style={style}>
          x
        </div>
        {this.state.anchor && (
          <Popup
            anchorElement={this.state.anchor}
            popupOffset={0}
            opened={true}
            margin={10}
            positions={this.props.positions}
            backgroundColor={'#fff'}
            hasShadow={true}
            hasPin={true}
            pinSize={10}
            pinOffset={7}
          >
            <div
              style={{
                textAlign: 'center',
                padding: '10px 20px',
                fontSize: '20px'
              }}
            >
              Text
            </div>
          </Popup>
        )}
      </div>
    );
  }
}

interface PopupWithPositionsState {
  opened: boolean;
  anchor: HTMLDivElement | null;
}

class PopupWithPositions extends React.Component<{}, PopupWithPositionsState> {
  public state: PopupWithPositionsState = {
    opened: false,
    anchor: null
  };

  private anchor: HTMLDivElement | null = null;

  public componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  public render() {
    return (
      <div>
        <div
          onClick={this.handleClick}
          ref={this.handleRef}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '17px',
            background: 'grey'
          }}
        />
        {this.state.anchor && (
          <Popup
            onCloseRequest={this.clickHandler}
            anchorElement={this.state.anchor}
            popupOffset={0}
            opened={this.state.opened}
            margin={13}
            positions={['bottom left', 'bottom right', 'top left', 'top right']}
            backgroundColor={'#fff'}
            hasShadow={true}
            hasPin={true}
            pinSize={10}
            pinOffset={7}
          >
            <div style={{ padding: '10px 20px', fontSize: '30px' }}>Placeholder</div>
          </Popup>
        )}
      </div>
    );
  }

  private handleRef = (element: HTMLDivElement) => {
    this.anchor = element;
  };

  private handleClick = () => {
    this.setState(state => ({ opened: !state.opened }));
  };

  private clickHandler = () => {
    this.setState({ opened: false });
  };
}

interface HintProps {
  positions: string[];
  margin: number;
}

interface HintState {
  anchor: HTMLDivElement | null;
}

class Hint extends React.Component<HintProps, HintState> {
  public state: HintState = {
    anchor: null
  };

  private anchor: HTMLDivElement | null = null;

  public componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  public render() {
    return (
      <div>
        <div
          ref={e => (this.anchor = e)}
          style={{ width: '100px', height: '100px', border: '1px solid black' }}
        >
          Hello
        </div>
        {this.state.anchor && (
          <Popup
            anchorElement={this.state.anchor}
            opened={true}
            positions={this.props.positions}
            margin={this.props.margin}
            backgroundColor={'rgba(0, 0, 0, 0.65)'}
            hasShadow={false}
            hasPin={true}
            pinSize={10}
            pinOffset={7}
          >
            <span style={{ color: '#fefefe' }}>WorldWorldWorldWorldWorld</span>
          </Popup>
        )}
      </div>
    );
  }
}

interface ToastProps {
  positions: string[];
}

interface ToastState {
  anchor: HTMLDivElement | null;
}

class Toast extends React.Component<ToastProps, ToastState> {
  public state: ToastState = {
    anchor: null
  };

  private anchor: HTMLDivElement | null = null;

  public componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  public render() {
    return (
      <div>
        <div
          ref={e => (this.anchor = e)}
          style={{ width: '100px', height: '100px', border: '1px solid black' }}
        >
          Hello
        </div>
        {this.state.anchor && (
          <Popup
            anchorElement={this.state.anchor}
            opened={true}
            positions={this.props.positions}
            backgroundColor={'rgba(0, 0, 0, 0.65)'}
            hasShadow={false}
            hasPin={false}
            pinSize={10}
            pinOffset={7}
          >
            <span style={{ color: '#fefefe' }}>WorldWorldWorldWorldWorld</span>
          </Popup>
        )}
      </div>
    );
  }
}
