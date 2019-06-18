import * as React from 'react';
import { cx, css } from '../../../lib/theming/Emotion';
import Input from '../../Input/index';
import styles from './styles.less';
import Gapped from '../../Gapped';
import { ITheme } from '../../../lib/theming/Theme';
import Link from '../../Link';
import EditIcon from '@skbkontur/react-icons/Edit';
import DeleteIcon from '@skbkontur/react-icons/Delete';
import Hint from '../../Hint';
import { EventEmitter, EventSubscription } from 'fbemitter';
import { PlaygroundTheme } from './ThemeProviderPlayground';

const emitter = new EventEmitter();

export interface IVariableValueProps {
  onChange: (variable: keyof PlaygroundTheme, value: string) => void;
  value: string;
  isError: boolean;
  variable: string;
  theme: PlaygroundTheme;
  baseVariables: Array<keyof ITheme>;
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
  private readonly debounceTimeout = 500;
  private debounceInterval: number | undefined = undefined;

  public render() {
    const { variable, theme, baseVariables } = this.props;
    const wrapperClassName = cx(
      styles.variableName,
      css`
        color: ${theme.textColorMain};
      `,
    );
    return (
      <Gapped gap={30}>
        <div className={wrapperClassName} title={variable}>{`${variable}: `}</div>
        {baseVariables.length > 0 && !this.state.editing ? this.renderBaseVariableLink() : this.renderInputWrapper()}
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
    if (this.debounceInterval !== undefined) {
      clearInterval(this.debounceInterval);
    }
  }

  private renderBaseVariableLink = () => {
    const baseVariables = this.props.baseVariables;
    return (
      <div className={styles.baseVariableRoot}>
        {this.colorIcon()}
        <div className={styles.baseLinkWrapper}>
          <Gapped>
            <div style={{ textAlign: 'right' }}>
              <Gapped vertical={true} verticalAlign={'top'}>
                {baseVariables.map(v => (
                  <BaseVariableLink key={v} baseVariable={v} emitClickEvent={this.emitClickEvent} />
                ))}
              </Gapped>
            </div>
            <Hint text={'Изменить значение'}>
              <Link icon={<EditIcon />} onClick={this.handleEditLinkClick} />
            </Hint>
          </Gapped>
        </div>
      </div>
    );
  };

  private renderInputWrapper = () => {
    return this.state.editing ? (
      <Gapped>
        {this.renderInput()}
        {this.renderRollbackIcon()}
      </Gapped>
    ) : (
      this.renderInput()
    );
  };

  private renderInput() {
    return (
      <Input
        leftIcon={isColor(this.state.value) && this.colorIcon()}
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        align={'right'}
        width={this.state.editing ? 225 : undefined}
        ref={this.inputRef}
        error={this.props.isError}
      />
    );
  }

  private renderRollbackIcon() {
    return (
      <Hint text={'Вернуться к базовой переменной'} pos={'left'}>
        <div className={styles.linkRoot}>
          <Link icon={<DeleteIcon />} onClick={this.rollbackToBaseVariable} />
        </div>
      </Hint>
    );
  }

  private inputRef = (instance: Input) => {
    this.inputInstance = instance;
  };

  private colorIcon = () => {
    return <div className={styles.colorIcon} style={{ background: this.state.value }} />;
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

  private emitClickEvent = (variable: string | number) => {
    emitter.emit('clicked', variable);
  };

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    this.setState({
      value,
    });

    if (this.debounceInterval === undefined) {
      this.debounceInterval = setInterval(this.debounceHandler, this.debounceTimeout);
    }
  };

  private debounceHandler = () => {
    const { variable, onChange } = this.props;

    onChange(variable as keyof PlaygroundTheme, this.state.value);
    clearInterval(this.debounceInterval);
    this.debounceInterval = undefined;
  };

  private handleBlur = () => {
    this.setState({
      editing: false,
    });
  };

  private emitterEventHandler = (name: keyof ITheme) => {
    if (name === this.props.variable && this.inputInstance) {
      this.inputInstance.focus();
    }
  };
}

interface BaseVariableLinkProps {
  baseVariable: string | number;
  emitClickEvent: (baseVariable: string | number) => void;
}
class BaseVariableLink extends React.Component<BaseVariableLinkProps> {
  public render() {
    return <Link onClick={this.emitClickEvent}>{this.props.baseVariable}</Link>;
  }
  private emitClickEvent = () => {
    this.props.emitClickEvent(this.props.baseVariable);
  };
}

function isColor(color: string) {
  const style = new Option().style;
  style.color = color;

  return (
    !!color && (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('hsl') || style.color === color)
  );
}
