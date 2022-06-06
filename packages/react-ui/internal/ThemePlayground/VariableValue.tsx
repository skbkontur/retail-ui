import React from 'react';
import EditIcon from '@skbkontur/react-icons/Edit';
import DeleteIcon from '@skbkontur/react-icons/Delete';
import EventEmitter from 'eventemitter3';

import { isColor } from '../../lib/styles/ColorHelpers';
import { Input } from '../../components/Input';
import { Gapped } from '../../components/Gapped';
import { Theme } from '../../lib/theming/Theme';
import { Link } from '../../components/Link';
import { Hint } from '../../components/Hint';
import { isFunction } from '../../lib/utils';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './Playground.styles';

const emitter = new EventEmitter();

export interface VariableValueProps {
  onChange: (variable: keyof Theme, value: string) => void;
  value: string;
  isError: boolean;
  variable: string;
  theme: Theme;
  baseVariables: Array<keyof Theme>;
  deprecated: boolean;
}

export interface VariableValueState {
  value: string;
  editing: boolean;
}

export class VariableValue extends React.Component<VariableValueProps, VariableValueState> {
  public static defaultProps = {
    deprecated: false,
  };
  public state: VariableValueState = {
    value: this.props.value,
    editing: false,
  };
  private subscription: { remove: () => void } | null = null;
  private rootElement: HTMLElement | null = null;
  private readonly debounceTimeout = 500;
  private debounceInterval: number | undefined = undefined;

  public render() {
    const { variable, theme, baseVariables, deprecated } = this.props;
    return (
      <div className={styles.variable(theme)} ref={this.rootRef} tabIndex={0}>
        <div
          className={cx(styles.variableName(theme), { [styles.deprecated()]: deprecated })}
          title={variable}
        >{`${variable}: `}</div>
        {baseVariables.length > 0 && !this.state.editing ? this.renderBaseVariableLink() : this.renderInputWrapper()}
      </div>
    );
  }

  public componentDidMount(): void {
    if (!this.subscription) {
      emitter.addListener('clicked', this.emitterEventHandler);
      this.subscription = {
        remove: () => {
          emitter.removeListener('clicked', this.emitterEventHandler);
        },
      };
    }
  }

  public componentDidUpdate(prevProps: VariableValueProps) {
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
      <div className={styles.baseVariableRoot()}>
        {this.colorIcon()}
        <div className={styles.baseLinkWrapper()}>
          <Gapped>
            <div style={{ textAlign: 'right' }}>
              <Gapped vertical>
                {baseVariables.map((v) => (
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
        leftIcon={isColorExtended(this.state.value) && this.colorIcon()}
        value={this.state.value}
        onValueChange={this.handleChange}
        onBlur={this.handleBlur}
        align={'right'}
        width={this.state.editing ? 225 : 250}
        error={this.props.isError}
      />
    );
  }

  private renderRollbackIcon() {
    return (
      <Hint text={'Вернуться к базовой переменной'}>
        <div className={styles.linkRoot()}>
          <Link icon={<DeleteIcon />} onClick={this.rollbackToBaseVariable} />
        </div>
      </Hint>
    );
  }

  private rootRef = (instance: HTMLElement | null) => {
    this.rootElement = instance;
  };

  private colorIcon = () => {
    return <div className={styles.colorIcon()} style={{ background: this.state.value }} />;
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

  private handleChange = (value: string) => {
    this.setState({
      value,
    });

    if (this.debounceInterval === undefined) {
      this.debounceInterval = window.setInterval(this.debounceHandler, this.debounceTimeout);
    }
  };

  private debounceHandler = () => {
    const { variable, onChange } = this.props;

    onChange(variable as keyof Theme, this.state.value);
    clearInterval(this.debounceInterval);
    this.debounceInterval = undefined;
  };

  private handleBlur = () => {
    this.setState({
      editing: false,
    });
  };

  private emitterEventHandler = (name: keyof Theme) => {
    if (name === this.props.variable && this.rootElement) {
      this.rootElement.focus();
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

type Color = string | (() => string);

const getColorValue = (color: Color) => {
  if (isFunction(color)) {
    return color();
  }

  return color;
};

function isColorExtended(color: Color) {
  const colorValue = getColorValue(color);

  const style = new Option().style;
  style.color = colorValue;

  if (colorValue) {
    return isColor(colorValue) || style.color === colorValue;
  }

  return false;
}
