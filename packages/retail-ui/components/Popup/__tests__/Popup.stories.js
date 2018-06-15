
/* eslint-disable flowtype/no-weak-types */
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Popup from '../Popup';

const AllCases = ({ small }) => (
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
  .add('disableAnimations', () => (
    <div>
      <PopupWithPositions
        disableAnimations={false}
        placeholder={'disableAnimations: false'}
      />
      <PopupWithPositions
        disableAnimations={true}
        placeholder={'disableAnimations: true'}
      />
    </div>
  ))
  .add('Hint', () => (
    <div style={{ transform: 'translate(250%, 200%)' }}>
      <Hint
        positions={['top center', 'right top', 'bottom center', 'left middle']}
        margin={20}
      />
    </div>
  ))
  .add('Toast', () => (
    <div style={{ transform: 'translate(250%, 200%)' }}>
      <Toast
        positions={['top center', 'right top', 'bottom center', 'left middle']}
      />
    </div>
  ));

class AlwaysOpened extends Component<*, *> {
  anchor: ?HTMLElement;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  render() {
    const defaultStyle = {
      width: '80px',
      height: '80px',
      margin: '20px',
      border: '1px solid black',
      textAlign: 'center',
      fontSize: '40px'
    };

    const style = this.props.small
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
            onClickOutside={this._clickHandler}
            onFocusOutside={this._clickHandler}
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

  _handleRef = e => {
    this.anchor = e;
  };

  _clickHandler = e => {};
}

// eslint-disable-next-line react/no-multi-comp
class PopupWithPositions extends Component<*, any> {
  anchor: ?HTMLElement;

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      anchor: null
    };
  }

  componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  render() {
    return (
      <div>
        <div
          onClick={this._handleClick}
          ref={this._handleRef}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '17px',
            background: 'grey'
          }}
        />
        {this.state.anchor && (
          <Popup
            onCloseRequest={this._clickHandler}
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
            disableAnimations={this.props.disableAnimations}
          >
            <div style={{ padding: '10px 20px', fontSize: '30px' }}>
              {this.props.placeholder || 'Placeholder'}
            </div>
          </Popup>
        )}
      </div>
    );
  }

  _handleRef = e => {
    this.anchor = e;
  };

  _handleClick = () => {
    this.setState(state => ({ opened: !state.opened }));
  };

  _clickHandler = e => {
    this.setState({ opened: false });
  };
}

class Hint extends Component<*, any> {
  anchor: ?HTMLElement;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  render() {
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
            onClickOutside={this._clickHandler}
            onFocusOutside={this._clickHandler}
            anchorElement={this.state.anchor}
            opened={true}
            positions={this.props.positions}
            margin={this.props.margin}
            order={this.props.order}
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
  _clickHandler = e => {};
}

// eslint-disable-next-line react/no-multi-comp
class Toast extends Component<*, *> {
  anchor: ?HTMLElement;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  render() {
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
            onClickOutside={this._clickHandler}
            onFocusOutside={this._clickHandler}
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
  _clickHandler = e => {};
}
