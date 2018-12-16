// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import MenuItem from '../../MenuItem';
import Toggle from '../../Toggle';
import DropdownContainer from '../DropdownContainer';
import { findDOMNode } from 'react-dom';
import Menu from '../../Menu/Menu';
import Button from '../../Button/Button';

storiesOf('DropdownContainer', module)
  .add('various aligns, portals, items and scrolls', () => (
    <VariousAlignsPortalsItemsAndScrolls/>
  ));

class  VariousAlignsPortalsItemsAndScrolls extends React.Component {
  public aligns: Array<'left' | 'right'> = ['left', 'right'];
  public portals = [true, false];
  public rows = ['top', 'middle', 'bottom'];
  public cols = ['left', 'center', 'right'];
  public LONG_ITEM = 'LongItemLongItemLongItemLongItemLong LongItem LongItemLongItemLongItemLongItemLongItemLongItem';
  public SHORT_ITEM = 'ShortShortShort Short';
  public toggles: {
    [id: string]: Toggle | null
  } = {};

  public state : {
    show: { [id: string]: boolean },
    long: boolean
  } = {
    show: {},
    long: false,
  };

  public componentDidMount(): void {
    Object.keys(this.toggles).forEach(id =>
      this.toggle(id, true)
    );
  }

  public get isAllShown() {
    const { show } = this.state;
    const all = Object.keys(show);
    return all.length > 0 && all.every(key => show[key]);
  }

  private toggle = (id: string, value: boolean) => {
    this.setState((state: {
      show: { [id: string]: boolean },
      long: boolean
    }) => ({
      show: {
        ...state.show,
        [id]: value
      }
    }));
  };

  private toggleAll = (value: boolean) => {
    const { show } = this.state;
    Object.keys(show).forEach(key => {
      this.toggle(key, value);
    });
  };

  render() {
    const { show, long } = this.state;
    return (
      // makes window scroll
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: -50,
          bottom: -50,
          left: 0,
          border: '50px solid transparent'
        }}>
        <div id="buttons">
          <Button onClick={() => this.setState({ long: !long })}>
            { long ? 'Short' : 'Long' } Items
          </Button>
          &nbsp;
          <Button onClick={() => this.toggleAll(!this.isAllShown)}>
            { this.isAllShown ? 'Hide' : 'Show' } All
          </Button>
        </div>
        <div
          id="inner-scroll"
          style={{
            position: 'absolute',
            top: 50,
            right: 50,
            bottom: 50,
            left: 0,
            overflow: 'auto',
            border: '1px dashed #ccc',
          }}
        >
          {/* makes inner scroll */}
          <div style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'space-between',
            top: 0,
            right: -100,
            bottom: -100,
            left: 0,
            padding: 10
          }}>
            {this.rows.map((row) => (
              <div
                key={row}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {this.cols.map((col) => (
                  <div key={col} style={{ padding: 10 }}>
                    {this.aligns.map(align => {
                      return this.portals.map(portal => {
                        const id = `${row}-${col}-${align}-${portal}`;
                        if (this.toggles[id] === undefined) {
                          this.toggles[id] = null;
                        }
                        return (
                          <div key={`${portal}`}>
                            <span style={{ display: 'inline-block', position: 'relative' }}>
                              <Toggle
                                checked={show[id] === true}
                                onChange={(value) => this.toggle(id, value)}
                                ref={el => this.toggles[id] = el}
                              />
                              {show[id] && (
                                <DropdownContainer
                                  align={align}
                                  disablePortal={!portal}
                                  getParent={() => this.toggles[id] && findDOMNode(this.toggles[id]!) || null}
                                >
                                  <Menu>
                                    <MenuItem>
                                      {this.state.long
                                        ? this.LONG_ITEM
                                        : this.SHORT_ITEM}
                                    </MenuItem>
                                  </Menu>
                                </DropdownContainer>
                              )}
                            </span>
                            &nbsp;
                            {`${align}, portal: ${portal}`}
                          </div>
                        );
                      });
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
