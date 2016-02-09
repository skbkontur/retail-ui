/* @flow */

import ReactDOM from 'react-dom';

import Link from './Link.js';

class LinkAdapter {
  _link: Link;

  constructor(link) {
    this._link = link;
  }

  click() {
    ReactDOM.findDOMNode(this._link).click();
  }
}

Link.__ADAPTER__ = LinkAdapter;

export default Link;
