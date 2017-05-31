import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Popup from '../Popup';

storiesOf('Popup', module)
	.add('top left', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="top left" trigger={'click'} render={renderMenu} enableCloseButton={true}>top left</Popup>
		</div>
	))
	.add('top center', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="top center" trigger={'click'} render={renderMenu}>top center</Popup>
		</div>
	))
	.add('top right', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="top right" trigger={'click'} render={renderMenu}>top right</Popup>
		</div>
	))
	.add('right top', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="right top" trigger={'click'} render={renderMenu}>right top</Popup>
		</div>
	))
	.add('right middle', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="right middle" trigger={'click'} render={renderMenu}>right middle</Popup>
		</div>
	))
	.add('right bottom', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="right bottom" trigger={'click'} render={renderMenu}>right bottom</Popup>
		</div>
	))
	.add('bottom right', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="bottom right" trigger={'click'} render={renderMenu}>bottom right</Popup>
		</div>
	))
	.add('bottom center', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="bottom center" trigger={'click'} render={renderMenu}>bottom center</Popup>
		</div>
	))
	.add('bottom left', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="bottom left" trigger={'click'} render={renderMenu}>bottom left</Popup>
		</div>
	))
	.add('left bottom', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="left top" trigger={'click'} render={renderMenu}>left top</Popup>
		</div>
	))
	.add('left middle', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="left middle" trigger={'click'} render={renderMenu}>left middle</Popup>
		</div>
	))
	.add('left top', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="left bottom" trigger={'click'} render={renderMenu}>left bottom</Popup>
		</div>
	))
	.add('Click on me', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="bottom left" trigger={'click'} render={renderMenu}>
				Click on me
			</Popup>
		</div>
	))
	.add('Hover on me', () => (
		<div style={{ border: '1px solid black', transform: 'translate(250%, 700%)' }}>
			<Popup pos="bottom left" trigger={'hover'} render={renderMenu}>
				Hover on me
			</Popup>
		</div>
	));

function renderMenu() {
  let data = ['Пункт1', 'Пункт2', 'Пункт3'];
  return (
	<ul style={{ margin: 0 }}>
		{
			data.map(i => <li key = {i} > {i} </li>)
		}
	</ul>);
}
