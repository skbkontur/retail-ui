import React from 'react';
import Argument from 'react-styleguidist/lib/client/rsg-components/Argument/ArgumentRenderer';

type ErrorBoundaryState = { hasError: boolean };
class ErrorBoundary extends React.Component {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError = () => ({ hasError: true });

  render = () => (this.state.hasError ? <span>Не удалось отобразить аргументы</span> : this.props.children);
}

export const ArgumentRenderer: typeof Argument = (props) => {
  const { type } = props;
  if (type && type.name) {
    type.type = 'ParameterType';
    type.expression = { type: 'NameExpression', name: '' };
  }

  return (
    <ErrorBoundary>
      <div style={{ minWidth: 200 }}>
        <Argument {...props} />
      </div>
    </ErrorBoundary>
  );
};

export default ArgumentRenderer;
