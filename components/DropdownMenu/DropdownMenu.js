import React, {Children} from 'react';
import cx from 'classnames';

import styles from './DropdownMenu.less';

class Separator extends React.Component {
  render() {
    return null;
  }
}

const isSeparator = (item : React.Element) =>
  item && item.type === DropdownMenu.SEP;

type Props = {
  onClose: () => void;
  children: React.Element;
}

type State = {
  selected: number;
}

class DropdownMenu extends React.Component {
  props: Props;
  state: State;

  __element : HTMLElement;

  static SEP = Separator;

  state = {
    selected: -1,
  };

  componentDidMount() {
    this.__element.focus();
  }

  countItems = () => {
    const {children} = this.props;
    return Children.toArray(children).length;
  };

  isSeparator = (index) => {
    const {children} = this.props;
    const item = Children.toArray(children)[index];
    return isSeparator(item);
  };

  selectNext = (inc : number) => {
    const {selected} = this.state;
    const maxIndex = this.countItems();
    let nextIndex = selected + inc;
    if (this.isSeparator(nextIndex)) {
      nextIndex += inc;
    }
    if (nextIndex === -1) {
      nextIndex = maxIndex - 1;
    }
    if (nextIndex === maxIndex) {
      nextIndex = 0;
    }
    this.setState({selected: nextIndex});
  };

  handleKeyDown = (e) => {
    const {key} = e;
    if (key === 'ArrowUp') {
      e.preventDefault();
      this.selectNext(-1);
    }
    if (key === 'ArrowDown') {
      e.preventDefault();
      this.selectNext(1);
    }
    if (key === 'Escape') {
      e.preventDefault();
      this.props.onClose();
    }
  }

  renderItem: (item: React.Element) => React.Element
  renderItem = (item, index) =>
    isSeparator(item) ?
    <div className={styles.separator}/> :
    <div
      className={cx(styles.item, {
        [styles.selected]: this.state.selected === index,
      })}
      onMouseEnter={() => this.setState({selected: index})}
      onMouseLeave={() => this.setState({selected: -1})}
    >
      {item}
    </div>;

  render() {
    const {children, onClose} = this.props;
    return (
      <div>
        <div className={styles.background} onMouseDown={onClose}/>
        <div
          className={styles.root}
          ref={(el) => this.__element = el}
          onClick={onClose}
          onKeyDown={this.handleKeyDown}
          tabIndex={0}
        >
          {Children.map(children, this.renderItem)}
        </div>
      </div>
    );
  }
}

export default DropdownMenu;
