// @flow
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Tabs from '../Tabs';
import Tab from '../Tab';

import FujiImg from './fuji.jpg';
import TahatImg from './tahat.jpg';

storiesOf('Tabs', module)
  .add('Tabs uncontrolled', () => (
    <Tabs>
      <Tab label="Mount Fuji" id="fuji">
        <img src={FujiImg} alt="Mount Fuji" />
        <p>
          Mount Fuji is one of Japan's "Three Holy Mountains" (三霊山? Sanreizan)
          along with Mount Tate and Mount Haku. It is also a Special Place of
          Scenic Beauty and one of Japan's Historic Sites. It was added to
          the World Heritage List as a Cultural Site on June 22, 2013.
        </p>
      </Tab>
      <Tab label="Mount Tahat" id="tahat">
        <img src={TahatImg} alt="Mount Tahat" />
        <p>
          Mount Tahat is of volcanic origin. It is located in an arid,
          rocky high plateau area of the central Sahara Desert.
          The Tuareg inhabit this region. To the north lie the Tassili
          n'Ajjer mountains, which contain cave paintings dating from
          a period between 8000 and 2000 BC.
        </p>
      </Tab>
    </Tabs>
  ))
  .add('Tabs uncontrolled with default tab', () => (
    <Tabs activeTab="tahat">
      <Tab label="Mount Fuji" id="fuji">
        <img src={FujiImg} alt="Mount Fuji" />
        <p>
          Mount Fuji is one of Japan's "Three Holy Mountains" (三霊山? Sanreizan)
          along with Mount Tate and Mount Haku. It is also a Special Place of
          Scenic Beauty and one of Japan's Historic Sites. It was added to
          the World Heritage List as a Cultural Site on June 22, 2013.
        </p>
      </Tab>
      <Tab label="Mount Tahat" id="tahat">
        <img src={TahatImg} alt="Mount Tahat" />
        <p>
          Mount Tahat is of volcanic origin. It is located in an arid,
          rocky high plateau area of the central Sahara Desert.
          The Tuareg inhabit this region. To the north lie the Tassili
          n'Ajjer mountains, which contain cave paintings dating from
          a period between 8000 and 2000 BC.
        </p>
      </Tab>
    </Tabs>
  ))
  .add('Tabs controlled', () => (
    <Tabs activeTab="tahat" onTabChange={action('TabChange')}>
      <Tab label="Mount Fuji" id="fuji">
        <img src={FujiImg} alt="Mount Fuji" />
        <p>
          Mount Fuji is one of Japan's "Three Holy Mountains" (三霊山? Sanreizan)
          along with Mount Tate and Mount Haku. It is also a Special Place of
          Scenic Beauty and one of Japan's Historic Sites. It was added to
          the World Heritage List as a Cultural Site on June 22, 2013.
        </p>
      </Tab>
      <Tab label="Mount Tahat" id="tahat">
        <img src={TahatImg} alt="Mount Tahat" />
        <p>
          Mount Tahat is of volcanic origin. It is located in an arid,
          rocky high plateau area of the central Sahara Desert.
          The Tuareg inhabit this region. To the north lie the Tassili
          n'Ajjer mountains, which contain cave paintings dating from
          a period between 8000 and 2000 BC.
        </p>
      </Tab>
    </Tabs>
  ));
