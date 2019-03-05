import BabyIcon from '@skbkontur/react-icons/Baby';
import { storiesOf } from '@storybook/react';
// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { LangCodes } from "../../LocaleContext";
import LocaleContext from "../../LocaleContext/LocaleContext";
import Logotype from '../../Logotype';

import TopBar from '../TopBar';

const Item = TopBar.Item;
const Start = TopBar.Start;
const End = TopBar.End;
const ItemStatic = TopBar.ItemStatic;
const User = TopBar.User;
const Divider = TopBar.Divider;
const Logout = TopBar.Logout;

storiesOf('TopBar', module)
  .add('TopBar Old', () => (
    <LocaleContext langCode={LangCodes.en_EN}>
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
    </LocaleContext>
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
        <Logout onClick={() => alert('Logout!')} />
      </End>
    </TopBar>
  ));
