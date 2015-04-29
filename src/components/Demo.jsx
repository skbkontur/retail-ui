var React = require('react');

var Autocomplete = require('ui/Autocomplete');
var Button = require('ui/Button');
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

var sampleItems = [
  'Grey Face',
  'Grey Space',
  'Kappa',
  'Keepo',
  'Resident Sleeper',
];

module.exports = Demo;
