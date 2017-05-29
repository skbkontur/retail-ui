// @flow
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Tabs from '../Tabs';
import Tab from '../Tab';
import Menu from '../Menu';

import FujiImg from './fuji.jpg';
import TahatImg from './tahat.jpg';

const tabs = [
  <Tab label="Fuji" id="fuji" key="fuji">
    <img src={FujiImg} alt="Mount Fuji" />
    <p>
      Mount Fuji is one of Japan's "Three Holy Mountains" (三霊山? Sanreizan)
      along with Mount Tate and Mount Haku. It is also a Special Place of
      Scenic Beauty and one of Japan's Historic Sites. It was added to
      the World Heritage List as a Cultural Site on June 22, 2013.
    </p>
  </Tab>,
  <Tab label="Mountain Tahat" id="tahat" key="tahat">
    <img src={TahatImg} alt="Mount Tahat" />
    <p>
      Mount Tahat is of volcanic origin. It is located in an arid,
      rocky high plateau area of the central Sahara Desert.
      The Tuareg inhabit this region. To the north lie the Tassili
      n'Ajjer mountains, which contain cave paintings dating from
      a period between 8000 and 2000 BC.
    </p>
  </Tab>
];

storiesOf('Tabs', module)
  .addDecorator(story => (
    <div style={{ border: '1px solid #dfdede', overflow: 'hidden' }}>
      {story()}
    </div>
  ))
  .add('Tabs uncontrolled', () => (
    <Tabs>
      <Menu />
      {tabs}
    </Tabs>
  ))
  .add('Tabs uncontrolled with default tab and onTabChange listener', () => (
    <Tabs defaultTab="tahat" onTabChange={action('TabChange')}>
      <Menu />
      {tabs}
    </Tabs>
  ))
  .add('Tabs controlled', () => (
    <Tabs activeTab="tahat" onTabChange={action('TabChange')}>
      <Menu />
      {tabs}
    </Tabs>
  ))
  .add('Tabs without menu', () => (
    <Tabs>
      {tabs}
    </Tabs>
  ))
  .add('Tabs without menu at bottom', () => (
    <Tabs>
      {tabs}
      <Menu />
    </Tabs>
  ))
  .add('Tabs with wrapped menu', () => (
    <Tabs>
      <div
        style={{
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
          marginBottom: 20
        }}
      >
        <Menu />
      </div>
      {tabs}
    </Tabs>
  ));
