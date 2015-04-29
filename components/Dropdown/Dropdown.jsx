var React = require('react');

var PropTypes = React.PropTypes;

var Input = require('../Input');

require('./Dropdown.less');
var cx = require('ui/cx')('RTDropdown');

var Dropdown = React.createClass({
  render() {
    var value = this.getValue_();

    var label;
    if (value) {
      label = (this.props.renderValue || renderValue)(value);
    } else {
      label = <span>&nbsp;</span>;
    }

    var rootProps = {
      ref: 'root',
      className: cx({
        '': true,
        'isOpened': this.state.opened,
      }),
      tabIndex: (this.state.opened && this.props.search) ? "-1" : "0",
      onKeyDown: this.handleKey,
      onBlur: this.handleBlur,
    };
    var labelClass = cx({
      'label': true,
      'label-isOpened': this.state.opened,
    });
    return (
      <span {...rootProps}>
        <span className={labelClass} onClick={this.open_}>
          {label}
          <div className={cx('arrow')} />
        </span>
        {this.state.opened && this.renderMenu()}
      </span>
    );
  },

  renderMenu() {
    var search = null;
    if (this.props.search) {
      search = <Input className={cx('search')} autoFocus
          onBlur={this.close_} />;
    }

    return (
      <div className={cx('container')}>
        <div className={cx('drop')}>
          <div className={cx('overlay')} onMouseDown={this.close_} />
          <div style={{position: 'relative'}}>
            <div className={cx('menu')}>
              {search}
              {this.props.items.map((item, i) => {
                var itemEl = (this.props.renderItem || renderItem)(item);
                var holderProps = {
                  key: itemEl.key,
                  className: cx({
                    'menu-item': true,
                    'menu-item-current': i === this.state.current,
                  }),
                  onMouseDown: e => this.select_(item),
                  onMouseEnter: e => this.setState({current: i}),
                };
                return <div {...holderProps}>{itemEl}</div>;
              })}
            </div>
          </div>
        </div>
        <div className={cx('botBorder')} />
      </div>
    );
  },

  getInitialState() {
    return {
      opened: false,
      current: -1,
    };
  },

  open_() {
    if (!this.state.opened) {
      this.setState({opened: true});
    }
  },

  close_(e) {
    if (this.state.opened) {
      this.setState({opened: false});
    }
  },

  handleBlur(event) {
    if (!this.props.search) {
      this.close_();
    }
  },

  handleKey(e) {
    var key = e.key;
    if (!this.state.opened) {
      if (key === ' ' || key === 'ArrowUp' || key === 'ArrowDown') {
        e.preventDefault();

        this.setState({opened: true});
      }
    } else {
      if (key === 'Escape') {
        this.setState({opened: false}, () => {
          this.refs.root.getDOMNode().focus();
        });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();

        let dif = e.key === 'ArrowUp' ? -1 : 1;
        let current = this.state.current + dif;
        if (current < 0) {
          current = this.props.items.length - 1;
        } else if (current >= this.props.items.length) {
          current = 0;
        }
        this.setState({current});
      } else if (e.key === 'Enter') {
        if (this.props.items[this.state.current]) {
          this.select_(this.props.items[this.state.current]);
        }
      }
    }
  },

  select_(item) {
    this.setState({
      opened: false,
      value: item,
    }, () => {
      setTimeout(() => {
        this.refs.root.getDOMNode().focus();
      }, 0);
    });
    if (this.props.onChange) {
      this.props.onChange({target: {value: item}});
    }
  },

  getValue_() {
    if (this.props.value !== undefined) {
      return this.props.value;
    }
    return this.state.value;
  },
});

function renderValue(item) {
  if (typeof item === 'string') {
    return item;
  } else {
    return item.label;
  }
}

function renderItem(item) {
  if (typeof item === 'string') {
    return <div key={item}>{item}</div>;
  } else {
    return <div key={item.key}>{item.label}</div>;
  }
}

module.exports = Dropdown;
