import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Kebab from '../Kebab';
import Menu from '../../Menu/Menu.js';
import MenuItem from '../../MenuItem';

storiesOf('Kebab', module)
	.add('test', () => (
		<Kebab side={'right top'} trigger={'click'} offset={20} >
			<Menu>
				<MenuItem>123</MenuItem>
				<MenuItem>456</MenuItem>
				<MenuItem>789</MenuItem>
			</Menu>
		</Kebab>
	))
;
