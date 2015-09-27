import React, { Component } from 'react';

import content from '../doc/getting-started.md';
import DocText from './DocText';

export default class GettingStarted extends Component {
  render() {
    return <DocText content={content} />;
  }
}
