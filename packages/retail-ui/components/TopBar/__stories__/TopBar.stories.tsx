import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TopBar from '../TopBar';
import Icon from '../../Icon';
import Logotype from '../../Logotype';

let Item = TopBar.Item;
let Start = TopBar.Start;
let End = TopBar.End;
let ItemStatic = TopBar.ItemStatic;
let User = TopBar.User;
let Divider = TopBar.Divider;

storiesOf('TopBar', module)
  .add('TopBar Old', () => (
    <TopBar
      cabinetUrl="https://cabinet.test.ru"
      userName="Alexander The Great"
      suffix="ui"
      onLogout={() => alert('Logout!')}
      leftItems={[
        <Item>
          <Icon name="Baby" color="#666" />
        </Item>
      ]}
    />
  ))
  .add('TopBar New', () => (
    <TopBar>
      <Start>
        <ItemStatic>
          <Logotype suffix="ui" withWidget />
        </ItemStatic>
        <Item>
          <Icon name="Baby" color="#666" />
        </Item>
        <Item>
          <Icon name="Baby" color="#666" />
        </Item>
      </Start>
      <End>
        <Item>
          <Icon name="Baby" color="#666" />
        </Item>
        <User userName="Alexander The Great" />
        <Divider />
        <Item onClick={() => alert('Logout!')}>Выйти</Item>
      </End>
    </TopBar>
  ));
