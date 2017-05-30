import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Popup from '../Popup';

storiesOf('Popup', module)
	.add('клик по строке', () => (
		<div style={{ border: "1px solid black"}}>
			<Popup pos="right top" trigger={"click"} render={renderMenu}>Кликни по строке</Popup>
		</div>
	))
	.add('ховер/блюр', () => (
		<div style={{ border: "1px solid black"}}>
			<Popup pos="right top" trigger={"hover"} render={renderMenu}>
				<div >Наевди мышкой на блок</div>
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