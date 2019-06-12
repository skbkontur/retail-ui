import * as React from 'react';
import { Prism as Code } from 'react-syntax-highlighter';
import * as Styles from 'react-syntax-highlighter/dist/styles/prism';

interface SourceCodeProps {
  source: string;
}

export default class SourceCode extends React.Component<SourceCodeProps> {
  public render() {
    return (
      <Code language="tsx" style={Styles.darcula}>
        {this.props.source}
      </Code>
    );
  }
}
