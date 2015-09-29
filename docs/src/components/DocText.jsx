import React from 'react';

import './DocText.less';
var cx = require('ui/cx')('rt-sc-DocText');

export default class DocText extends React.Component {
  render() {
    var html = this.props.content;
    return <div className={cx('')} dangerouslySetInnerHTML={{__html: html}} />;
  }
}
