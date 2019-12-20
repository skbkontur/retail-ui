// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Menu from '../Menu';
import MenuItem from '../../MenuItem';
import MenuHeader from '../../MenuHeader';
import MenuSeparator from '../../MenuSeparator';

storiesOf('Menu', module)
  .addDecorator(story => (
    <div id="menu-test-container" style={{ padding: 10 }}>
      {story()}
    </div>
  ))
  .add('with Items', () => (
    <Menu>
      <MenuItem>MenuItem1</MenuItem>
      <MenuItem>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </Menu>
  ))
  .add('with Header', () => (
    <Menu>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem>MenuItem1</MenuItem>
      <MenuItem>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </Menu>
  ))
  .add('with Separator', () => (
    <Menu>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem>MenuItem1</MenuItem>
      <MenuSeparator />
      <MenuItem>MenuItem2</MenuItem>
    </Menu>
  ))
  .add('with Custom Child', () => (
    <Menu>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem>MenuItem1</MenuItem>
      <MenuSeparator />
      <MenuItem>MenuItem2</MenuItem>
      <div style={{ padding: '8px' }}>
        <i>CustomChild</i>
      </div>
    </Menu>
  ))
  .add('with maxHeight', () => (
    <MoveControls>
      <Menu maxHeight={100}>
        <MenuHeader>MenuHeader</MenuHeader>
        <MenuItem>MenuItem1</MenuItem>
        <MenuSeparator />
        <MenuItem>MenuItem2</MenuItem>
        <MenuItem>MenuItem3</MenuItem>
        <MenuHeader>MenuFooter</MenuHeader>
      </Menu>
    </MoveControls>
  ))
  .add('with width', () => (
    <Menu width={300}>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem>MenuItem1</MenuItem>
      <MenuSeparator />
      <MenuItem>MenuItem2</MenuItem>
      <MenuItem>LongItem LongItem LongItem LongItem LongItem LongItem</MenuItem>
    </Menu>
  ))
  .add('with long Items', () => (
    <Menu>
      <MenuHeader>MenuHeaderMenuHeaderMenuHeaderMenuHeader</MenuHeader>
      <MenuItem>MenuItem1 MenuItem1 MenuItem1 MenuItem1 MenuItem1</MenuItem>
      <MenuSeparator />
      <MenuItem>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </Menu>
  ))
  .add('without Shadow', () => (
    <Menu hasShadow={false}>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem>MenuItem1</MenuItem>
      <MenuSeparator />
      <MenuItem>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </Menu>
  ))
  .add('with disabled MenuItem', () => (
    <Menu hasShadow={false}>
      <MenuItem disabled>MenuItem1</MenuItem>
      <MenuItem data-tid="menuitem-notdisabled">MenuItem2</MenuItem>
    </Menu>
  ));

class MoveControls extends React.Component {
  private menu: Menu | null = null;

  public render() {
    return (
      <div>
        <div id="move-buttons">
          <button id="move-up" onClick={this.moveUp}>
            Move Up
          </button>
          <button id="move-down" onClick={this.moveDown}>
            Move Down
          </button>
        </div>
        <br />
        <div data-tid="menu-container" style={{ padding: 10 }}>
          {React.isValidElement(this.props.children)
            ? React.cloneElement(this.props.children, { ref: this.refMenu })
            : this.props.children}
        </div>
      </div>
    );
  }

  private refMenu = (el: Menu) => {
    this.menu = el;
  };

  private moveUp = () => {
    if (this.menu) {
      this.menu.up();
    }
  };

  private moveDown = () => {
    if (this.menu) {
      this.menu.down();
    }
  };
}
