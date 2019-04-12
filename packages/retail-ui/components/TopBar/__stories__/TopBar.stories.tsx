import BabyIcon from '@skbkontur/react-icons/Baby';
import { storiesOf } from '@storybook/react';
// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { Nullable } from '../../../typings/utility-types';
import Button from '../../Button/Button';
import Logotype from '../../Logotype';
import MenuItem from '../../MenuItem/MenuItem';

import TopBar from '../TopBar';
import TopBarDropdown from '../TopBarDropdown';

const Item = TopBar.Item;
const Start = TopBar.Start;
const End = TopBar.End;
const ItemStatic = TopBar.ItemStatic;
const User = TopBar.User;
const Divider = TopBar.Divider;
const Logout = TopBar.Logout;

class TopBarDropdownWithButton extends React.Component {
  private ref: Nullable<TopBarDropdown> = null;
  public render() {
    return (
      <div>
        <TopBar>
          <Start>
            <ItemStatic>
              <Logotype suffix="ui" withWidget />
            </ItemStatic>
          </Start>
          <End>
            <TopBarDropdown label="TabBar.Dropdown" ref={ref => (this.ref = ref)}>
              <MenuItem loose>MenuItem</MenuItem>
            </TopBarDropdown>
          </End>
        </TopBar>
        <Button onClick={this.openAndClose}>Open And Close</Button>
      </div>
    );
  }

  private openAndClose = () => {
    this.open();
    setTimeout(this.close, 2000);
  };

  private open = () => this.ref && this.ref.open();
  private close = () => this.ref && this.ref.close();
}

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
        </Item>,
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
        <Logout onClick={() => alert('Logout!')} />
      </End>
    </TopBar>
  ))
  .add('TopBar.Dropdown Controlled', () => <TopBarDropdownWithButton />);
