import React from 'react';

import Autocomplete from 'ui/Autocomplete';
import Button from 'ui/Button';
import DatePicker from 'ui/DatePicker';
import Select from 'ui/Select';
import Gapped from 'ui/Gapped';
import Icon from 'ui/Icon';
import Input from 'ui/Input';
import Link from 'ui/Link';
import RadioGroup from 'ui/RadioGroup';
import Tooltip from 'ui/Tooltip';

import styles from './DemoPage.less';

const TOOLTIP_POSITIONS = [
  'top left', 'top center', 'top right',
  'right top', 'right middle', 'right bottom',
  'bottom left', 'bottom center', 'bottom right',
  'left top', 'left middle', 'left bottom'
];

var Demo = React.createClass({
  getInitialState() {
    return {
      ttTargetWidth: '50px',
      ttTargetHeight: '50px',
      ttWidth: '100px',
      ttHeight: '20px',
      ttPos: 'top center',
      ttTrigger: 'hover'
    };
  },

  render() {
    return (
      <div className={styles.root}>
        <Gapped vertical gap={20}>
          <Input rightIcon={<Icon name="warning" />}
            defaultValue="I'm mentally retarded"
          />

          <div>
            <Autocomplete source={sampleItems} placeholder="Search through"
              leftIcon={<Icon name="search" />}
            />
          </div>

          <Select items={sampleItems} renderValue={renderSelectValue}
            renderItem={renderSelectItem}
          />

          <Select items={sampleItems} renderValue={renderSelectValue}
            renderItem={renderSelectItem} search
            placeholder="мой плэйсхолдер"
          />

          <RadioGroup items={sampleItems} />

          {this.renderTooltip()}

          <div><DatePicker /></div>

          <div>
            Press <Link>69</Link> if you fapped today exactly 2 times.
            Disabled <Link disabled>link</Link>.
          </div>

          <Gapped>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </Gapped>

          <div style={{ height: 500 }} />
        </Gapped>
      </div>
    );
  },

  renderTooltip() {
    const style = {
      background: 'grey',
      width: this.state.ttTargetWidth,
      height: this.state.ttTargetHeight
    };

    return (
      <Gapped vertical>
        <Tooltip pos={this.state.ttPos} render={this.renderTooltipContent}
          trigger={this.state.ttTrigger}
        >
          <div style={style} />
        </Tooltip>
        <div>
          <Select items={TOOLTIP_POSITIONS} value={this.state.ttPos}
            onChange={(e) => this.setState({ ttPos: e.target.value })}
          />
        </div>
        <div>
          Размер объекта{' '}
          <Input value={this.state.ttTargetWidth} width={50}
            onChange={(e) => this.setState({ ttTargetWidth: e.target.value })}
          />
          <Input value={this.state.ttTargetHeight} width={50}
            onChange={(e) => this.setState({ ttTargetHeight: e.target.value })}
          />
        </div>
        <div>
          Размер подсказки{' '}
          <Input value={this.state.ttWidth} width={50}
            onChange={(e) => this.setState({ ttWidth: e.target.value })}
          />
          <Input value={this.state.ttHeight} width={50}
            onChange={(e) => this.setState({ ttHeight: e.target.value })}
          />
        </div>
        <div>
          Триггер{' '}
          <Select items={['hover', 'click']} value={this.state.ttTrigger}
            onChange={(e) => this.setState({ ttTrigger: e.target.value })}
          />
        </div>
      </Gapped>
    );
  },

  renderTooltipContent() {
    const style = {
      width: this.state.ttWidth,
      height: this.state.ttHeight
    };

    return <div style={style} />;
  }
});

function renderSelectValue(item) {
  return (
    <div>
      <div style={{ color: '#888', float: 'right' }}>420</div>
      <div style={{ marginRight: 50 }}>{item}</div>
    </div>
  );
}

function renderSelectItem(item, i, props) {
  return (
    <div key={i} {...props}>
      <div style={{ color: '#888', float: 'right' }}>yo</div>
      <div style={{ marginRight: 30 }}>{item}</div>
      <div style={{ fontSize: 12 }}>I shit on you</div>
    </div>
  );
}

var sampleItems = [
  'Grey Face',
  'Grey Space',
  'Kappa',
  'Keepo',
  'Resident Sleeper'
];

export default Demo;
