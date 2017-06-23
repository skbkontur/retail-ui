import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import Popup from '../Popup';

storiesOf('Popup', module)
  .add('All pin opened', () => (
    <div style={{ transform: 'translate(50%, 20%)' }}>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><AlwaysOpened positions={["top left"]}/></td>
            <td><AlwaysOpened positions={["top center"]}/></td>
            <td><AlwaysOpened positions={["top right"]}/></td>
            <td></td>
          </tr>
          <tr>
            <td><AlwaysOpened positions={["left top"]}/></td>
            <td></td>
            <td></td>
            <td></td>
            <td><AlwaysOpened positions={["right top"]}/></td>
          </tr>
          <tr>
            <td><AlwaysOpened positions={["left middle"]}/></td>
            <td></td>
            <td></td>
            <td></td>
            <td><AlwaysOpened positions={["right middle"]}/></td>
          </tr>
          <tr>
            <td><AlwaysOpened positions={["left bottom"]}/></td>
            <td></td>
            <td></td>
            <td></td>
            <td><AlwaysOpened positions={["right bottom"]}/></td>
          </tr>
          <tr>
            <td></td>
            <td><AlwaysOpened positions={["bottom left"]}/></td>
            <td><AlwaysOpened positions={["bottom center"]}/></td>
            <td><AlwaysOpened positions={["bottom right"]}/></td>
            <td></td>
          </tr>
        </tbody>
       </table>
    </div>
  ))
  .add('Hint', () => (
    <div style={{ transform: 'translate(250%, 200%)' }}>
      <Hint positions={["top center", "right top", "bottom center", "left middle"]} margin={20}/>
    </div>
  ))
  .add('Toast', () => (
    <div style={{ transform: 'translate(250%, 200%)' }}>
      <Toast positions={["top center", "right top", "bottom center", "left middle"]}/>
    </div>
  ))
  ;


class AlwaysOpened extends Component {
  self_node: HTMLElement;

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
        <div ref={e => this.anchor = e} style={{ width: "100px", height: "100px", border: "1px solid black"}}>
          Hello
        </div>
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
          <span>World<br/>World<br/>World</span>
        </Popup>
      </div>
    );
  }

  _handleRef = e=>{
      this.anchor = e
  }

  _clickHandler = (e) => {
   }
}

class Hint extends Component {
  self_node: HTMLElement;

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
        <div ref={e => this.anchor = e} style={{ width: "100px", height: "100px", border: "1px solid black"}}>
          Hello
        </div>
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
          <span style={{ color: "#fefefe"}}>WorldWorldWorldWorldWorld</span>
        </Popup>
      </div>
    );
  }
  _clickHandler = (e) => {}
}

class Toast extends Component {
  self_node: HTMLElement;

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
        <div ref={e => this.anchor = e} style={{ width: "100px", height: "100px", border: "1px solid black"}}>
          Hello
        </div>
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
          <span style={{ color: "#fefefe"}}>WorldWorldWorldWorldWorld</span>
        </Popup>
      </div>
    );
  }
  _clickHandler = (e) => {}
}