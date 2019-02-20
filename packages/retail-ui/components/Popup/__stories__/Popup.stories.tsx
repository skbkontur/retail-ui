// tslint:disable:jsx-no-lambda
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Popup from '../Popup';
import { Nullable } from '../../../typings/utility-types';
import Tooltip, { TooltipProps } from '../../Tooltip';
import ComboBox, { ComboBoxProps } from '../../ComboBox';
import Hint, { HintProps } from '../../Hint';
import Select, { SelectProps } from '../../Select';

storiesOf('Popup', module)
  .add('All pin opened', () => (
    <AllCases small={false} padding={'50px 100px'} />
  ))
  .add('All pin opened on small elements', () => (
    <AllCases small padding={'70px 150px'} />
  ))
  .add('Positioning', () => <Positioning />)
  .add('disableAnimations', () => (
    <div>
      <PopupWithPositions
        disableAnimations={false}
        placeholder={'disableAnimations: false'}
      />
      <PopupWithPositions
        disableAnimations={true}
        placeholder={'disableAnimations: true'}
      />
    </div>
  ))
  .add('Hint', () => (
    <div style={{ padding: '100px' }}>
      <FakeHint
        positions={['top center', 'right top', 'bottom center', 'left middle']}
        margin={20}
      />
    </div>
  ))
  .add('Toast', () => (
    <div style={{ padding: '100px' }}>
      <Toast
        positions={['top center', 'right top', 'bottom center', 'left middle']}
      />
    </div>
  ))
  .add('Small width', () => <MinWidth />)
  .add('Hover behaviour', () => <HoverBehaviour />);

const AllCases = ({ small, padding }: { small: boolean; padding: string }) => (
  <div style={{ padding }}>
    <table>
      <tbody>
        <tr>
          <td />
          <td>
            <AlwaysOpened small={small} positions={['top left']} />
          </td>
          <td>
            <AlwaysOpened small={small} positions={['top center']} />
          </td>
          <td>
            <AlwaysOpened small={small} positions={['top right']} />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <AlwaysOpened small={small} positions={['left top']} />
          </td>
          <td />
          <td />
          <td />
          <td>
            <AlwaysOpened small={small} positions={['right top']} />
          </td>
        </tr>
        <tr>
          <td>
            <AlwaysOpened small={small} positions={['left middle']} />
          </td>
          <td />
          <td />
          <td />
          <td>
            <AlwaysOpened small={small} positions={['right middle']} />
          </td>
        </tr>
        <tr>
          <td>
            <AlwaysOpened small={small} positions={['left bottom']} />
          </td>
          <td />
          <td />
          <td />
          <td>
            <AlwaysOpened small={small} positions={['right bottom']} />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <AlwaysOpened small={small} positions={['bottom left']} />
          </td>
          <td>
            <AlwaysOpened small={small} positions={['bottom center']} />
          </td>
          <td>
            <AlwaysOpened small={small} positions={['bottom right']} />
          </td>
          <td />
        </tr>
      </tbody>
    </table>
  </div>
);

const Positioning = () => (
  <div>
    <table>
      <tbody>
        {new Array(6 * 5).fill(0).map((x, i) => {
          return Math.floor(i / 6) % 2 ? (
            <tr>
              <td>
                <div style={{ height: '40px' }} />
              </td>
            </tr>
          ) : (
            <tr>
              <td>
                <PopupWithPositions />
              </td>
              <td style={{ width: '50%', minWidth: '300px' }} />
              <td>
                <PopupWithPositions />
              </td>
              <td style={{ width: '50%', minWidth: '300px' }} />
              <td>
                <PopupWithPositions />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

class MinWidth extends React.Component {
  public state: AlwaysOpenedState = {
    anchor: null
  };

  private anchor: Nullable<HTMLElement>;

  public componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  public render() {
    return (
      <div style={{ padding: '100px' }}>
        <span ref={el => (this.anchor = el)}>x</span>
        {this.state.anchor && (
          <Popup
            hasShadow
            hasPin
            opened
            anchorElement={this.anchor}
            positions={['bottom center']}
          >
            <div
              style={{
                textAlign: 'center',
                padding: '5px'
              }}
            >
              {'21:00'}
            </div>
          </Popup>
        )}
      </div>
    );
  }
}

interface AlwaysOpenedProps {
  small: boolean;
  positions: string[];
}

interface AlwaysOpenedState {
  anchor: Nullable<HTMLElement>;
}

class AlwaysOpened extends Component<AlwaysOpenedProps, AlwaysOpenedState> {
  public state: AlwaysOpenedState = {
    anchor: null
  };

  private anchor: Nullable<HTMLElement>;

  public componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  public render() {
    const defaultStyle: React.CSSProperties = {
      width: '80px',
      height: '70px',
      margin: '20px',
      border: '1px solid black',
      textAlign: 'center',
      fontSize: '40px'
    };

    const style: React.CSSProperties = this.props.small
      ? {
          ...defaultStyle,
          width: '20',
          height: '20',
          margin: '50'
        }
      : defaultStyle;

    return (
      <div>
        <div ref={this._handleRef} style={style}>
          x
        </div>
        {this.state.anchor && (
          <Popup
            opened
            hasPin
            hasShadow
            anchorElement={this.state.anchor}
            positions={this.props.positions}
            backgroundColor={'#fff'}
            pinSize={10}
            pinOffset={7}
          >
            <div
              style={{
                textAlign: 'center',
                padding: '10px 20px',
                fontSize: '20px'
              }}
            >
              Text
            </div>
          </Popup>
        )}
      </div>
    );
  }

  private _handleRef = (e: HTMLDivElement) => {
    this.anchor = e;
  };
}

class PopupWithPositions extends Component<any, any> {
  public state = {
    opened: false,
    anchor: null
  };

  private anchor: Nullable<HTMLElement>;

  public componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  public render() {
    return (
      <div>
        <div
          onClick={this._handleClick}
          ref={this._handleRef}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '17px',
            background: 'grey'
          }}
        />
        {this.state.anchor && (
          <Popup
            hasPin
            hasShadow
            onCloseRequest={this._clickHandler}
            anchorElement={this.state.anchor}
            opened={this.state.opened}
            margin={13}
            positions={['bottom left', 'bottom right', 'top left', 'top right']}
            backgroundColor={'#fff'}
            pinSize={10}
            pinOffset={7}
            disableAnimations={this.props.disableAnimations}
          >
            <div style={{ padding: '10px 20px', fontSize: '30px' }}>
              {this.props.placeholder || 'Placeholder'}
            </div>
          </Popup>
        )}
      </div>
    );
  }

  private _handleRef = (element: HTMLDivElement) => {
    this.anchor = element;
  };

  private _handleClick = () => {
    const currentOpened = this.state.opened;
    this.setState({ opened: !currentOpened });
  };

  private _clickHandler = () => {
    this.setState({ opened: false });
  };
}

class FakeHint extends Component<any, any> {
  public state = {
    anchor: null
  };

  private anchor: Nullable<HTMLElement>;

  public componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  public render() {
    return (
      <div>
        <div
          ref={e => (this.anchor = e)}
          style={{ width: '100px', height: '100px', border: '1px solid black' }}
        >
          Hello
        </div>
        {this.state.anchor && (
          <Popup
            hasPin
            opened
            anchorElement={this.state.anchor}
            positions={this.props.positions}
            margin={this.props.margin}
            backgroundColor={'rgba(0, 0, 0, 0.65)'}
            pinSize={10}
            pinOffset={7}
          >
            <span style={{ color: '#fefefe' }}>WorldWorldWorldWorldWorld</span>
          </Popup>
        )}
      </div>
    );
  }
}

class Toast extends Component<any, any> {
  public state = {
    anchor: null
  };

  private anchor: Nullable<HTMLElement>;

  public componentDidMount() {
    this.setState({
      anchor: this.anchor
    });
  }

  public render() {
    return (
      <div>
        <div
          ref={e => (this.anchor = e)}
          style={{ width: '100px', height: '100px', border: '1px solid black' }}
        >
          Hello
        </div>
        {this.state.anchor && (
          <Popup
            opened
            anchorElement={this.state.anchor}
            positions={this.props.positions}
            backgroundColor={'rgba(0, 0, 0, 0.65)'}
            pinSize={10}
            pinOffset={7}
          >
            <span style={{ color: '#fefefe' }}>WorldWorldWorldWorldWorld</span>
          </Popup>
        )}
      </div>
    );
  }
}

const renderPopupContent = () => {
  return <span>Popup content</span>;
};

const COMBOBOX_ITEMS = [
  { value: 1, label: 'First' },
  { value: 2, label: 'Second' }
];
const SELECT_ITEMS = COMBOBOX_ITEMS.map(i => [i.value, i.label]);
const getComboboxItems = () => Promise.resolve(COMBOBOX_ITEMS);

interface IDropdownValue {
  value: number;
  label: string;
}
interface IHasDropdownState {
  selected?: IDropdownValue;
}

interface IRenderTooltipWithComboboxProps {
  tooltipProps?: Partial<TooltipProps>;
  comboboxProps?: Partial<ComboBoxProps<any>>;
}
class RenderTooltipWithCombobox extends Component<
  IRenderTooltipWithComboboxProps,
  IHasDropdownState
> {
  constructor(props: IRenderTooltipWithComboboxProps) {
    super(props);
    this.state = {};
  }
  public render() {
    const tooltipProps = this.props.tooltipProps || {};
    const comboboxProps = this.props.comboboxProps || {};
    return (
      <Tooltip
        pos={'top left'}
        trigger={'hover'}
        closeButton={false}
        render={renderPopupContent}
        disableAnimations={true}
        {...tooltipProps}
      >
        <ComboBox
          size={'large'}
          getItems={getComboboxItems}
          value={this.state.selected}
          onChange={this._handleOnChange}
          {...comboboxProps}
        />
      </Tooltip>
    );
  }
  private _handleOnChange = (event: any, value: IDropdownValue) => {
    this.setState({ selected: value });
  };
}

interface IRenderHintWithSelectProps {
  hintProps?: Partial<HintProps>;
  selectProps?: Partial<SelectProps<any, any>>;
}

class RenderHintWithSelect extends Component<
  IRenderHintWithSelectProps,
  IHasDropdownState
> {
  constructor(props: IRenderHintWithSelectProps) {
    super(props);
    this.state = {};
  }
  public render() {
    const hintProps = this.props.hintProps || {};
    const selectProps = this.props.selectProps || {};
    return (
      <Hint
        pos={'top left'}
        text={'Hint text'}
        disableAnimations={true}
        {...hintProps}
      >
        <Select
          size={'large'}
          items={SELECT_ITEMS}
          value={this.state.selected}
          onChange={this._handleOnChange}
          {...selectProps}
        />
      </Hint>
    );
  }
  private _handleOnChange = (event: any, value: IDropdownValue) => {
    this.setState({ selected: value });
  };
}

class HoverBehaviour extends Component<any, any> {
  public render() {
    return (
      <table cellPadding={20}>
        <thead>
          <tr>
            <td>Case</td>
            <td>Tooltip</td>
            <td>Hint</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>disablePortal=true</td>
            <td>
              <RenderTooltipWithCombobox
                comboboxProps={{ disablePortal: true }}
              />
            </td>
            <td>
              <RenderHintWithSelect selectProps={{ disablePortal: true }} />
            </td>
          </tr>
          <tr>
            <td>component && useWrapper=true</td>
            <td>
              <RenderTooltipWithCombobox tooltipProps={{ useWrapper: true }} />
            </td>
            <td>
              <RenderHintWithSelect hintProps={{ useWrapper: true }} />
            </td>
          </tr>
          <tr>
            <td>component && useWrapper=false</td>
            <td>
              <RenderTooltipWithCombobox tooltipProps={{ useWrapper: false }} />
            </td>
            <td>
              <RenderHintWithSelect hintProps={{ useWrapper: false }} />
            </td>
          </tr>
          <tr>
            <td>text && useWrapper=true</td>
            <td>
              <Tooltip
                pos={'top left'}
                trigger={'hover'}
                closeButton={false}
                render={renderPopupContent}
                disableAnimations={true}
                useWrapper={true}
              >
                Sample tooltip text
              </Tooltip>
            </td>
            <td>
              <Hint
                pos={'top left'}
                text={'Hint text'}
                useWrapper={true}
                disableAnimations={true}
              >
                Sample hint text
              </Hint>
            </td>
          </tr>
          <tr>
            <td>text && useWrapper=false</td>
            <td>
              <Tooltip
                pos={'top left'}
                trigger={'hover'}
                closeButton={false}
                render={renderPopupContent}
                disableAnimations={true}
                useWrapper={true}
              >
                Sample text
              </Tooltip>
            </td>
            <td>
              <Hint
                pos={'top left'}
                text={'Hint text'}
                useWrapper={false}
                disableAnimations={true}
              >
                Sample hint text
              </Hint>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
