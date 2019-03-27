import React from 'react';
import Input from 'retail-ui/components/Input';
import ComboBox from 'retail-ui/components/ComboBox';
import Link from 'retail-ui/components/Link';
import Button from 'retail-ui/components/Button';
import Checkbox from 'retail-ui/components/Checkbox';
import Select from 'retail-ui/components/Select';
import Textarea from 'retail-ui/components/Textarea';
import Modal from 'retail-ui/components/Modal';
import Autocomplete from 'retail-ui/components/Autocomplete';
import RadioGroup from 'retail-ui/components/RadioGroup';
import DatePicker from 'retail-ui/components/DatePicker';
import Tooltip from 'retail-ui/components/Tooltip';
import FxInput from 'retail-ui/components/FxInput';
import Label from '../common/Label';

function bind(name) {
  return {
    value: this.state[name],
    onChange: (e, v) => {
      this.setState({ [name]: v });
    },
  };
}

var items = [{ id: 1, name: 'Kappa' }, { id: 2, name: 'Keepo' }, { id: 3, name: 'ResidentSleeper' }];

var loader = id => {
  return Promise.resolve(items.find(item => item.id === id));
};

var selectItems = ['EdiXml', 'Edifact', 'EancomXml', 'KorusXml', 'CISLinkXml'];

var doubleSelectItems = [['Item1Key', 'Item1Value'], ['Item2Key', 'Item2Value']];

var radioItems = [['1', 'One'], ['2', 'Two'], ['3', 'Three']];

var autocompleteValue = ['EdiXml', 'Edifact', 'EancomXml', 'KorusXml', 'CISLinkXml'];

function search(pattern) {
  pattern = pattern.toLowerCase();
  var results = items.filter(item => item.name.toLowerCase().indexOf(pattern) !== -1);
  return Promise.resolve({
    values: results.map(d => d.id),
    infos: results,
  });
}

function renderValue(value, info) {
  return <span>{info ? info.name : 'Loading'}</span>;
}

function renderItem(value, info) {
  return <span>{info.name}!</span>;
}

function recover(searchText) {
  return {
    value: searchText,
    info: { id: 10, name: `<${searchText}>` },
  };
}

function renderTooltip() {
  return <div data-tid="tooltipHint">Hello, kitty</div>;
}

export default class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      value: 3,
      showModal: false,
      autoFxInput: true,
      fxInputValue: '',
      radioGroupValue: null,
      acValue: '',
      datePickerValue: null,
      checkboxValue: false,
      listValues: [false, false, false],
      textAreaValue: '',
      buttonText: 'bla',
    };
  }

  render() {
    const { buttonText } = this.state;
    var list = [1, 2, 3];
    return (
      <div>
        <h4>Input</h4>
        <Input data-tid="input" {...this::bind('inputValue')} />
        <hr />

        <h4>ComboBox</h4>
        <ComboBox
          data-tid="combobox"
          info={loader}
          source={search}
          recover={recover}
          renderValue={renderValue}
          renderItem={renderItem}
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
        />
        <hr />

        <h4>Link</h4>
        <Link data-tid="link" href="http://www.google.com">
          google
        </Link>
        <hr />

        <h4>CheckBox</h4>
        <Checkbox
          checked={this.state.checkboxValue}
          onChange={e => {
            console.log('checkbox update');
            this.setState({ checkboxValue: !this.state.checkboxValue });
          }}
          data-tid="checkbox"
        >
          CheckBox
        </Checkbox>
        <hr />

        <h4>Label</h4>
        <Label data-tid="label">Label</Label>
        <hr />

        <h4>Button</h4>
        <Button data-tid="button" onClick={e => this.setState({ buttonText: buttonText + 'bla' })}>
          Button
        </Button>
        <Label data-tid="innerLabel">{buttonText}</Label>
        <Button data-tid="disabledButton" disabled onClick={e => this.setState({ buttonText: buttonText + 'bla' })}>
          DisabledButton
        </Button>
        <hr />

        <h4>Select</h4>
        <Label data-tid="selectLabel">{this.state.type}</Label>
        <Select
          data-tid="select"
          items={selectItems}
          value={this.state.type}
          onChange={e => {
            this.setState({ type: e.target.value });
          }}
        />
        <Select
          data-tid="doubleSelect"
          items={doubleSelectItems}
          value={this.state.doubleSelectState}
          onChange={e => {
            this.setState({ doubleSelectState: e.target.value });
          }}
        />
        <Label data-tid="doubleSelectLabel">{this.state.doubleSelectState}</Label>
        <hr />

        <h4>Textarea</h4>
        <Textarea data-tid="textarea" {...this::bind('textAreaValue')}>
          TextArea
        </Textarea>
        <hr />

        <h4>Modal</h4>
        <Button data-tid="openModal" onClick={() => this.setState({ showModal: true })}>
          OpenModal
        </Button>
        {this.state.showModal && (
          <Modal data-tid="modal" onClose={() => this.setState({ showModal: false })}>
            <div>
              <Modal.Header data-tid="modalHeader">Modal</Modal.Header>
            </div>
            <Modal.Body>
              <Label data-tid="modalLabel">Hellloooooooo!</Label>
            </Modal.Body>
          </Modal>
        )}
        <hr />

        <h4>Autocomplete</h4>
        <Autocomplete {...this::bind('acValue')} data-tid="autocomplete" source={autocompleteValue} />
        <hr />

        <h4>List</h4>
        <div data-tid="list">{list.map(x => this.renderListItem(x))}</div>
        <hr />

        <h4>RadioGroup</h4>
        <RadioGroup
          data-tid="radioGroup"
          items={radioItems}
          onChange={(e, v) => this.setState({ radioGroupValue: v })}
          value={this.state.radioGroupValue}
        />
        <hr />
        <h4>DatePicker</h4>
        <DatePicker {...this::bind('datePickerValue')} data-tid="datePicker" />
        <hr />
        <h4>Tooltip</h4>
        <Tooltip data-tid="tooltip" render={renderTooltip} trigger="click">
          Click me
        </Tooltip>
        <hr />
        <h4>FxInput</h4>
        <FxInput
          data-tid="fxInput"
          auto={this.state.autoFxInput}
          onRestore={() => this.fxInputRestore()}
          onChange={(e, v) => this.fxInputChange(e, v)}
          value={this.state.fxInputValue}
        />
        <hr />
      </div>
    );
  }

  renderListItem(item) {
    return (
      <Checkbox
        checked={this.state.listValues[item - 1]}
        onChange={e => {
          var values = this.state.listValues;
          values[item - 1] = !values[item - 1];
          this.setState({ listValues: values });
        }}
        data-tid="item"
        key={item - 1}
      >
        {item}
      </Checkbox>
    );
  }

  fxInputRestore() {
    this.setState({ autoFxInput: true });
    this.setState({ fxInputValue: 'auto' });
  }

  fxInputChange(event, value) {
    this.setState({ autoFxInput: false });
    this.setState({ fxInputValue: value });
  }
}
