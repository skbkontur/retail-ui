import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Popup from '../Popup';

storiesOf('Popup', module)
	.add('Click on me', () => (
		<div style={{ border: "1px solid black"}}>
			<Popup pos="bottom left" trigger={"click"} render={renderMenu}>Кликни по строке</Popup>
		</div>
	))
	.add('Hover on me', () => (
		<div style={{ border: "1px solid black"}}>
			<Popup pos="bottom left" trigger={"hover"} render={renderMenu}>
				<div >Наведи мышкой на блок</div>
			</Popup>
		</div>
	))
  

  
function renderMenu() {
  let data = ["Пункт1", "Пункт2", "Пункт3"];
  return (
    <ul>
      {
        data.map( i => <li key = {i} > {i} </li>)
      }
    </ul>
  );
};