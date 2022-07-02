import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import PlaygroundError from 'react-styleguidist/lib/client/rsg-components/PlaygroundError';
import ReactExample from 'react-styleguidist/lib/client/rsg-components/ReactExample';
import Context from 'react-styleguidist/lib/client/rsg-components/Context';

const improveErrorMessage = (message: string) =>
  message.replace(
    'Check the render method of `StateHolder`.',
    'Check the code of your example in a Markdown file or in the editor below.',
  );

interface PreviewProps {
  theme: string;
  code: string;
  evalInContext(code: string): () => any;
}

interface PreviewState {
  error: string | null;
}

const withContext = (Wrapped: new (...args: any[]) => React.Component<PreviewProps>) => (props: PreviewProps) =>
  <Context.Consumer>{(value: any) => <Wrapped {...props} theme={value.theme} />}</Context.Consumer>;

/**
 * Измененный компонент Preview, которому был добавлен контекст
 *
 * @see https://github.com/styleguidist/react-styleguidist/issues/1639
 * @see https://github.com/styleguidist/react-styleguidist/blob/master/src/client/rsg-components/Preview/Preview.tsx
 */
const Preview = withContext(
  class extends Component<PreviewProps, PreviewState> {
    public static propTypes = {
      code: PropTypes.string.isRequired,
      evalInContext: PropTypes.func.isRequired,
    };
    public static contextType = Context;

    private mountNode: Element | null = null;

    public state: PreviewState = {
      error: null,
    };

    public componentDidMount() {
      // Clear console after hot reload, do not clear on the first load
      // to keep any warnings
      if (this.context.codeRevision > 0) {
        // eslint-disable-next-line no-console
        console.clear();
      }

      this.executeCode();
    }

    public shouldComponentUpdate(nextProps: PreviewProps, nextState: PreviewState) {
      return this.state.error !== nextState.error || this.props.code !== nextProps.code;
    }

    public componentDidUpdate(prevProps: PreviewProps) {
      if (this.props.code !== prevProps.code || prevProps.theme !== this.props.theme) {
        this.executeCode();
      }
    }

    public componentWillUnmount() {
      this.unmountPreview();
    }

    public unmountPreview() {
      if (this.mountNode) {
        ReactDOM.unmountComponentAtNode(this.mountNode);
      }
    }

    private executeCode() {
      this.setState({
        error: null,
      });

      const { code } = this.props;
      if (!code) {
        return;
      }

      const wrappedComponent: React.FunctionComponentElement<any> = (
        <Context.Provider value={this.context}>
          <ReactExample
            code={code}
            evalInContext={this.props.evalInContext}
            onError={this.handleError}
            compilerConfig={this.context.config.compilerConfig}
          />
        </Context.Provider>
      );

      window.requestAnimationFrame(() => {
        // this.unmountPreview();
        try {
          ReactDOM.render(wrappedComponent, this.mountNode);
        } catch (err) {
          this.handleError(err as Error);
        }
      });
    }

    private handleError = (err: Error) => {
      this.unmountPreview();

      this.setState({
        error: improveErrorMessage(err.toString()),
      });

      console.error(err); // eslint-disable-line no-console
    };

    public render() {
      const { error } = this.state;
      return (
        <>
          <div data-testid="mountNode" ref={(ref) => (this.mountNode = ref)} />
          {error && <PlaygroundError message={error} />}
        </>
      );
    }
  },
);

export default Preview;
