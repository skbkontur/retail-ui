// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import MenuItem from '../../MenuItem';
import Toggle from '../../Toggle';
import DropdownContainer, { DropdownContainerProps } from '../DropdownContainer';
import { findDOMNode } from 'react-dom';
import Menu from '../../Menu/Menu';
import Button from '../../Button/Button';

storiesOf('DropdownContainer', module).add('various aligns, portals, items and scrolls', () => (
  <VariousAlignsPortalsItemsAndScrolls />
));

class VariousAlignsPortalsItemsAndScrolls extends React.Component {
  public aligns: Array<'left' | 'right'> = ['left', 'right'];
  public portals = [false, true];
  public rows = ['top', 'middle', 'bottom'];
  public cols = ['left', 'center', 'right'];
  public LONG_ITEM = 'LongItemLongItemLongItemLongItemLong LongItem LongItemLongItemLongItemLongItemLongItemLongItem';
  public SHORT_ITEM = 'ShortShortShort Short';
  public dropdowns: {
    [id: string]: DropdownWithToggle | null;
  } = {};

  public state: {
    shown: { [id: string]: boolean };
    long: boolean;
  } = {
    shown: {},
    long: false,
  };

  public componentDidMount(): void {
    Object.keys(this.dropdowns).forEach(dropdown => this.toggle(dropdown, true));
  }

  public get isAllShown() {
    const { shown } = this.state;
    const all = Object.keys(shown);
    return all.length > 0 && all.every(id => shown[id]);
  }

  public toggle = (id: string, value: boolean) => {
    this.setState((state: { shown: { [id: string]: boolean }; long: boolean }) => ({
      shown: {
        ...state.shown,
        [id]: value,
      },
    }));
  };

  public toggleAll = (value: boolean) => {
    const { shown } = this.state;
    Object.keys(shown).forEach(key => {
      this.toggle(key, value);
    });
  };

  public render() {
    return (
      <ScrollMaker>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderStyle: 'solid',
            borderColor: 'transparent',
            borderWidth: '50px 150px 150px 50px',
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          {this.renderControls()}
          <ScrollableContainer id="inner-scroll">
            <ScrollMaker>{this.renderDropdowns()}</ScrollMaker>
          </ScrollableContainer>
        </div>
      </ScrollMaker>
    );
  }

  private renderControls = () => (
    <div style={{ marginBottom: 16, flexShrink: 0, flexGrow: 0 }}>
      <div id="buttons" style={{ display: 'inline-block' }}>
        <Button onClick={() => this.setState({ long: !this.state.long })}>
          {this.state.long ? 'Short' : 'Long'} Items
        </Button>
        &nbsp;
        <Button onClick={() => this.toggleAll(!this.isAllShown)}>{this.isAllShown ? 'Hide' : 'Show'} All</Button>
      </div>
    </div>
  );

  private renderDropdowns = () => {
    const { rows, cols, aligns, portals, LONG_ITEM, SHORT_ITEM } = this;
    const { long, shown } = this.state;
    return (
      <Grid rows={rows} cols={cols}>
        {(row, col) =>
          aligns.map(align =>
            portals.map(disablePortal => {
              const dropdownId = `${row}-${col}-${align}-${disablePortal}`;
              return (
                <div key={`${disablePortal}`}>
                  <DropdownWithToggle
                    ref={this.createDropdownRef(dropdownId)}
                    show={shown[dropdownId]}
                    onToggle={value => this.toggle(dropdownId, value)}
                    dropdownProps={{ align, disablePortal }}
                  >
                    <Menu>
                      <MenuItem>{long ? LONG_ITEM : SHORT_ITEM}</MenuItem>
                    </Menu>
                  </DropdownWithToggle>
                  &nbsp;
                  {`${align}, portal: ${!disablePortal}`}
                </div>
              );
            }),
          )
        }
      </Grid>
    );
  };

  private createDropdownRef = (id: string) => (element: DropdownWithToggle | null) => {
    if (element) {
      this.dropdowns[id] = element;
    }
  };
}

class ScrollableContainer extends React.Component<{
  id?: string;
}> {
  public render() {
    return (
      <div
        id={this.props.id}
        style={{
          overflow: 'auto',
          border: '1px dashed #ccc',
          position: 'relative',
          height: '100%',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

class ScrollMaker extends React.Component<{
  xScroll: number;
  yScroll: number;
}> {
  public static defaultProps = {
    xScroll: 100,
    yScroll: 100,
  };

  public render() {
    const { xScroll, yScroll } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: -xScroll,
          bottom: -yScroll,
          left: 0,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

class Grid extends React.Component<{
  rows: string[];
  cols: string[];
  children: (row: string, col: string) => React.ReactNode;
}> {
  public static Row = class Row extends React.Component {
    public render() {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {this.props.children}
        </div>
      );
    }
  };

  public static Cell = class Cell extends React.Component {
    public render() {
      return <div style={{ padding: 20 }}>{this.props.children}</div>;
    }
  };

  public render() {
    const { rows, cols } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {rows.map(row => (
          <Grid.Row key={row}>
            {cols.map(col => (
              <Grid.Cell key={col}>{this.props.children(row, col)}</Grid.Cell>
            ))}
          </Grid.Row>
        ))}
      </div>
    );
  }
}

class DropdownWithToggle extends React.Component<{
  show: boolean;
  onToggle: (value: boolean) => void;
  dropdownProps: {
    align: DropdownContainerProps['align'];
    disablePortal: DropdownContainerProps['disablePortal'];
  };
}> {
  private DOMNode: Element | Text | null = null;

  public componentDidMount(): void {
    this.DOMNode = findDOMNode(this);
  }

  public render() {
    const { show, onToggle, dropdownProps } = this.props;
    return (
      <span style={{ display: 'inline-block', position: 'relative' }}>
        <Toggle checked={show === true} onChange={onToggle} />
        {show && (
          <DropdownContainer
            align={dropdownProps.align}
            disablePortal={dropdownProps.disablePortal}
            getParent={() => this.DOMNode}
          >
            {this.props.children}
          </DropdownContainer>
        )}
      </span>
    );
  }
}
