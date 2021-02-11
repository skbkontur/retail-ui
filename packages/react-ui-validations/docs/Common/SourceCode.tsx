import React from 'react';
import { Prism as Code } from 'react-syntax-highlighter';
import darcula from 'react-syntax-highlighter/dist/esm/styles/prism/darcula';

interface SourceCodeProps {
  source: string;
}

export class SourceCode extends React.Component<SourceCodeProps> {
  public render() {
    return (
      <Code language="tsx" style={darcula}>
        {this.props.source}
      </Code>
    );
  }
}
