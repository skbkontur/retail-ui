import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import Kebab from '../Kebab';
import Menu from '../../Menu/Menu.js';
import MenuItem from '../../MenuItem';

storiesOf('Kebab', module)
	.add('16px', () => (
		<div style={{ transform: 'translate(1000%, 400%)' }}>
		<SomethingWithKebab size="small"/>
		</div>
	))
	.add('20px', () => (
		<div style={{ transform: 'translate(200%, 400%)' }}>
		<SomethingWithKebab size="large"/>
		</div>
	))
;

class SomethingWithKebab extends Component {
  render() {
    return (
			<Kebab
        size={this.props.size}
        onOpen={this._handleOpen}
        onClose={this._handleClose}
			>
				<MenuItem>123</MenuItem>
				<MenuItem>456</MenuItem>
				<MenuItem>789</MenuItem>
			</Kebab>
    );
  }

  _handleOpen = () => {
}

  _handleClose = () => {
}

}
