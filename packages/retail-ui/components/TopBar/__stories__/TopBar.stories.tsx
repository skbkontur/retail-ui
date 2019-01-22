// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BabyIcon from '@skbkontur/react-icons/Baby';

import TopBar from '../TopBar';
import Logotype from '../../Logotype';

const Item = TopBar.Item;
const Start = TopBar.Start;
const End = TopBar.End;
const ItemStatic = TopBar.ItemStatic;
const User = TopBar.User;
const Divider = TopBar.Divider;

storiesOf('TopBar', module)
  .add('TopBar Old', () => (
    <TopBar
      cabinetUrl="https://cabinet.test.ru"
      userName="Alexander The Great"
      suffix="ui"
      onLogout={() => alert('Logout!')}
      leftItems={[
        <Item key="left-item-1">
          <BabyIcon color="#666" />
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
          <BabyIcon color="#666" />
        </Item>
        <Item icon="gear" iconOnly>
          Only icon
        </Item>
        <Item icon="gear">Not only icon</Item>
      </Start>
      <End>
        <Item>
          <BabyIcon color="#666" />
        </Item>
        <User userName="Alexander The Great" />
        <Divider />
        <Item onClick={() => alert('Logout!')}>Выйти</Item>
      </End>
    </TopBar>
  ));
