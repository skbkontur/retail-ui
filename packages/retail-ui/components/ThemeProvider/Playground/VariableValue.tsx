import * as React from 'react';
import { cx, css } from 'emotion';
import Input from '../../Input/index';
import styles from './styles.less';
import { PlaygroundTheme } from '../__stories__/ThemeProvider.stories';
import Gapped from '../../Gapped';
import { ITheme } from '../../../lib/theming/Theme';
import Link from '../../Link';
import EditIcon from '@skbkontur/react-icons/Edit';
import DeleteIcon from '@skbkontur/react-icons/Delete';
import Hint from '../../Hint';
import { EventEmitter, EventSubscription } from 'fbemitter';

const emitter = new EventEmitter();

export interface IVariableValueProps {
  onChange: (variable: keyof PlaygroundTheme, value: string) => void;
  value: string;
  variable: string;
  theme: PlaygroundTheme;
  baseVariable: keyof ITheme;
}
export interface IVariableValueState {
  value: string;
  editing: boolean;
}

export class VariableValue extends React.Component<IVariableValueProps, IVariableValueState> {
  public state = {
    value: this.props.value,
    editing: false,
  };
  private subscription: EventSubscription | null = null;
  private inputInstance: Input | null = null;

  public render() {
    const { variable, theme, baseVariable } = this.props;
    return (
      <Gapped gap={30}>
        <div
          className={cx(
            styles.variableName,
            css`
              color: ${theme.textColorMain};
            `,
          )}
          title={variable}
        >{`${variable}: `}</div>
        {baseVariable && !this.state.editing ? this.renderBaseVariableLink() : this.renderInput()}
      </Gapped>
    );
  }

  public componentDidMount(): void {
    if (!this.subscription) {
      this.subscription = emitter.addListener('clicked', this.emitterEventHandler);
    }
  }

  public componentDidUpdate(prevProps: IVariableValueProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  public componentWillUnmount(): void {
    if (this.subscription) {
      this.subscription.remove();
    }
  }

  private renderBaseVariableLink = () => {
    return (
      <div className={styles.linkRoot}>
        <Gapped>
          <Hint text={'Изменить значение'}>
            <Link icon={<EditIcon />} onClick={this.handleEditLinkClick} />
          </Hint>
          <Link onClick={this.scrollToBaseVariable}>{this.props.baseVariable}</Link>
        </Gapped>
      </div>
    );
  };

  private renderInput = () => {
    return this.state.editing ? (
      <Gapped>
        {this.input}
        <Hint text={'Вернуться к базовой переменной'} pos={'left'}>
          <div className={styles.linkRoot}>
            <Link icon={<DeleteIcon />} onClick={this.rollbackToBaseVariable} />
          </div>
        </Hint>
      </Gapped>
    ) : (
      this.input
    );
  };

  private get input() {
    return (
      <Input
        leftIcon={isColor(this.state.value) && this.inputIcon()}
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        align={'right'}
        width={this.state.editing ? 225 : undefined}
        ref={this.inputRef}
      />
    );
  }

  private inputRef = (instance: Input) => {
    this.inputInstance = instance;
  };

  private inputIcon = () => {
    return <div className={styles.inputIcon} style={{ background: this.state.value }} />;
  };

  private handleEditLinkClick = () => {
    this.setState({
      editing: true,
    });
  };

  private rollbackToBaseVariable = () => {
    this.setState({
      editing: false,
      value: this.props.value,
    });
  };

  private scrollToBaseVariable = () => {
    const { baseVariable } = this.props;
    const domNode = document.querySelector(`[title='${baseVariable}']`)!;
    if (domNode && domNode.scrollIntoView) {
      domNode.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
    emitter.emit('clicked', baseVariable);
  };

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    this.setState({
      value,
    });
  };

  private handleBlur = () => {
    const { variable, value, onChange } = this.props;
    if (this.state.value !== value) {
      onChange(variable as keyof PlaygroundTheme, this.state.value);
    }
  };

  private emitterEventHandler = (name: keyof ITheme) => {
    if (name === this.props.variable && this.inputInstance) {
      this.inputInstance.focus();
    }
  };
}

function isColor(color: string) {
  const style = new Option().style;
  style.color = color;

  return (
    !!color && (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('hsl') || style.color === color)
  );
}
