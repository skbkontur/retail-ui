import React from 'react';
import { Baby as BabyIcon, Dot12, Ok } from '@skbkontur/react-icons';

import { Nullable } from '../../../typings/utility-types';
import { Button } from '../../Button';
import { Logotype } from '../../Logotype';
import { MenuItem } from '../../MenuItem';
import { TopBar } from '../TopBar';
import { TopBarDropdown } from '../TopBarDropdown';
import { TopBarUser } from '../TopBarUser';

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

const Wrapper = (storyFn: () => JSX.Element) => <div style={{ width: 1024 }}>{storyFn()}</div>;

export default { title: 'TopBar', decorators: [Wrapper] };

export const TopBarOld = () => (
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
);
TopBarOld.story = { name: 'TopBar Old' };

export const TopBarNew = () => (
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
);
TopBarNew.story = { name: 'TopBar New' };

export const TopBarNoShadow = () => (
  <TopBar noShadow={true}>
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
);
TopBarNoShadow.story = { name: 'TopBar noShadow' };

export const TopBarDropdownControlled = () => <TopBarDropdownWithButton />;
TopBarDropdownControlled.story = { name: 'TopBar.Dropdown Controlled', parameters: { creevey: { skip: [true] } } };

export const TopBarWithIcons = () => (
  <TopBar>
    <TopBar.Start>
      <TopBar.Item icon="warning" />
      <TopBar.Item icon="ok" />
      <TopBar.Item icon="gear" />
      <TopBar.Item icon="user" />
      <TopBar.Item icon="wait" />
      <TopBar.Item icon="clear" />
      <TopBar.Item icon="money" />
      <TopBar.Item icon="help-circle" />
      <TopBar.Item icon="kebab" />
      <TopBar.Item icon={<Dot12 size="17.5px" />}>Hello</TopBar.Item>
      <TopBar.Item icon={<Ok size="17.5px" />} />
    </TopBar.Start>
    <TopBar.End>
      <TopBarDropdown icon="gear" label="Dropdown" />
      <TopBarUser userName="User" />
    </TopBar.End>
  </TopBar>
);
