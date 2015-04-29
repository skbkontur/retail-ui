var React = require('react');

var Autocomplete = require('ui/Autocomplete');
var Button = require('ui/Button');
var Dropdown = require('ui/Dropdown');
var Gapped = require('ui/Gapped');
var Icon = require('ui/Icon');
var Input = require('ui/Input');

require('./Demo.less');
var cx = require('ui/cx')('rt-sc-Demo');

var Demo = React.createClass({
  render() {
    return (
      <div className={cx('')}>
        <Gapped vertical gap={20}>
          <Input rightIcon={<Icon name="warning" />}
              defaultValue="I'm mentally retarded" />

          <div>
            <Autocomplete source={sampleItems} placeholder="Search through"
                leftIcon={<Icon name="search" />} />
          </div>

          <Dropdown items={sampleItems} renderValue={renderDropdownValue}
              renderItem={renderDropdownItem} />

          <Dropdown items={sampleItems} renderValue={renderDropdownValue}
              renderItem={renderDropdownItem} search />

          <Gapped>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </Gapped>
        </Gapped>
      </div>
    );
  },
});

function renderDropdownValue(item) {
  return (
    <div>
      <div style={{color: '#888', float: 'right'}}>420</div>
      <div style={{marginRight: 50}}>{item}</div>
    </div>
  );
}

function renderDropdownItem(item) {
  return (
    <div key={item}>
      <div style={{color: '#888', float: 'right'}}>yo</div>
      <div style={{marginRight: 30}}>{item}</div>
      <div style={{fontSize: 12}}>I shit on you</div>
    </div>
  );
}

var sampleItems = [
  'Grey Face',
  'Grey Space',
  'Kappa',
  'Keepo',
  'Resident Sleeper',
];

module.exports = Demo;
