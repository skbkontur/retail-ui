import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Popup from '../Popup';

storiesOf('Popup', module)
	.add('top left', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="top left" trigger={'click'} render={renderMenu}  offset={15}>top left</Popup>
		</div>
	))
	.add('top center', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="top center" trigger={'click'} render={renderMenu}  offset={15}>top center</Popup>
		</div>
	))
	.add('top right', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="top right" trigger={'click'} render={renderMenu}  offset={15}>top right</Popup>
		</div>
	))

	.add('right top', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="right top" trigger={'click'} render={renderMenu}  offset={15}>right top</Popup>
		</div>
	))
	.add('right middle', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="right middle" trigger={'click'} render={renderMenu}  offset={15}>right middle</Popup>
		</div>
	))
	.add('right bottom', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="right bottom" trigger={'click'} render={renderMenu}  offset={15}>right bottom</Popup>
		</div>
	))


	.add('bottom right', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="bottom right" trigger={'click'} render={renderMenu}  offset={15}>bottom right</Popup>
		</div>
	))
	.add('bottom center', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="bottom center" trigger={'click'} render={renderMenu}  offset={15}>bottom center</Popup>
		</div>
	))
	.add('bottom left', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="bottom left" trigger={'click'} render={renderMenu}  offset={15}>bottom left</Popup>
		</div>
	))

	.add('left bottom', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="left bottom" trigger={'click'} render={renderMenu}  offset={15}>left bottom</Popup>
		</div>
	))
	.add('left middle', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="left middle" trigger={'click'} render={renderMenu}  offset={15}>left middle</Popup>
		</div>
	))
	.add('left top', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="left top" trigger={'click'} render={renderMenu}  offset={15}>left top</Popup>
		</div>
	))

	.add('with close button', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="top center" trigger={'click'} render={renderMenu} offset={15} enableCloseButton={true}>with close button</Popup>
		</div>
	))
	.add('hover trigger', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup side="top center" trigger={'hover'} render={renderMenu} offset={15}>hover trigger</Popup>
		</div>
	))
	.add('without pin', () => (
		<div style={{ border: '1px solid black', transform: 'translate(300%, 700%)' }}>
			<Popup trigger={'click'} render={renderMenu} offset={15}>without pin</Popup>
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
