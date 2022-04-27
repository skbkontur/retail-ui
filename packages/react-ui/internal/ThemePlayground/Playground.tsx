import React from 'react';
import SearchIcon from '@skbkontur/react-icons/Search';
import LinkIcon from '@skbkontur/react-icons/Link';
import OkIcon from '@skbkontur/react-icons/Ok';
import ErrorIcon from '@skbkontur/react-icons/Error';
import TrashIcon from '@skbkontur/react-icons/Trash';
import HelpDotIcon from '@skbkontur/react-icons/HelpDot';

import { Button, ButtonProps } from '../../components/Button';
import { Tabs } from '../../components/Tabs';
import { Gapped } from '../../components/Gapped';
import { Link, LinkProps } from '../../components/Link';
import { Input, InputProps } from '../../components/Input';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Tooltip } from '../../components/Tooltip';
import { Sticky } from '../../components/Sticky';
import { Theme } from '../../lib/theming/Theme';
import { isTestEnv } from '../../lib/currentEnvironment';
import { cx } from '../../lib/theming/Emotion';
import { FileUploader } from '../../components/FileUploader';

import { ThemeType } from './constants';
import { TokenInputPlayground } from './TokenInputPlayground';
import { DatePickerPlayground } from './AnotherInputsPlayground';
import { TogglePlayground } from './TogglePlayground';
import { SwitcherPlayground } from './SwitcherPlayground';
import { FxInputPlayground } from './FxInputPlayground';
import { CurrencyInputPlayground } from './CurrencyInputPlayground';
import { getComponentsFromPropsList } from './helpers';
import { CheckboxPlayground } from './CheckboxPlayground';
import { RadioPlayground } from './RadioPlayground';
import { PagingPlayground } from './PagingPlayground';
import { HintPlayground } from './HintPlayground';
import { ComponentsGroup } from './ComponentsGroup';
import { styles } from './Playground.styles';
import { SizesGroup } from './SizesGroup';

const useSticky = !isTestEnv;

export interface PlaygroundProps {
  currentThemeType: ThemeType;
  onThemeChange: (value: string) => void;
  onEditLinkClick: () => void;
}

export class Playground extends React.Component<PlaygroundProps> {
  private theme!: Theme;
  private stopEl = React.createRef<HTMLDivElement>();

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }
  private renderMain() {
    const wrapperClassName = cx(styles.playground(), styles.playgroundWrapper(this.theme));
    return (
      <div className={wrapperClassName}>
        <Gapped vertical gap={50}>
          {this.renderTabsGroup()}
          {this.renderSizesGroup()}
          {this.renderLinksGroup()}
          {this.renderButtonsGroup()}
          {this.renderInputsGroup()}
          {this.renderOtherInputsGroup()}
          {this.renderTokenInputsGroup()}
          {this.renderSwitchersGroup()}
          {this.renderControlsGroup()}
        </Gapped>
        {this.renderStickyStopElement()}
        <Gapped vertical gap={50}>
          {this.renderHintsGroup()}
          {this.renderTooltip()}
          {this.renderPaging()}
          {this.renderFileUploader()}
        </Gapped>
      </div>
    );
  }

  private renderTabsGroup = () => {
    return useSticky ? (
      <Sticky side={'top'} getStop={this.getStickyStop}>
        {this.renderTabs()}
      </Sticky>
    ) : (
      this.renderTabs()
    );
  };

  private renderTabs() {
    const { onThemeChange, onEditLinkClick } = this.props;
    const tabsOuterWrapperStyle = { background: this.theme.bgDefault };
    const tabsOuterWrapperClass = cx({
      [styles.tabsWrapper(this.theme)]: true,
      [styles.stickyTabsWrapper(this.theme)]: useSticky,
    });

    return (
      <div style={tabsOuterWrapperStyle} className={tabsOuterWrapperClass}>
        <Gapped gap={40}>
          <Tabs value={this.getCurrentTab()} onValueChange={onThemeChange} vertical={false}>
            <div className={styles.tabsInnerWrapper(this.theme)}>
              <Tabs.Tab id={ThemeType.Default}>Дефолтная</Tabs.Tab>
              <Tabs.Tab id={ThemeType.Dark}>Темная</Tabs.Tab>
              <Tabs.Tab id={ThemeType.DefaultOld}>Дефолтная 3.0</Tabs.Tab>
              <Tabs.Tab id={ThemeType.FlatOld}>Плоская 3.0</Tabs.Tab>
            </div>
          </Tabs>
          <Link onClick={onEditLinkClick}>Настроить тему</Link>
        </Gapped>
      </div>
    );
  }

  private getCurrentTab = () => {
    switch (this.props.currentThemeType) {
      case ThemeType.Dark:
        return ThemeType.Dark;
      case ThemeType.FlatOld:
        return ThemeType.FlatOld;
      case ThemeType.DefaultOld:
        return ThemeType.DefaultOld;
      default:
        return ThemeType.Default;
    }
  };

  private renderSizesGroup = () => {
    return (
      <ComponentsGroup title={'Размеры'} theme={this.theme}>
        <SizesGroup size={'small'} />
        <SizesGroup size={'medium'} />
        <SizesGroup size={'large'} />
      </ComponentsGroup>
    );
  };

  private renderLinksGroup = () => {
    const propsList: LinkProps[] = [
      { icon: <LinkIcon />, children: 'Enabled' },
      { icon: <OkIcon />, use: 'success', children: 'Success' },
      { icon: <ErrorIcon />, use: 'danger', children: 'Danger' },
      { icon: <TrashIcon />, use: 'grayed', children: 'Grayed' },
      { icon: <TrashIcon />, children: 'Disabled', disabled: true },
    ];
    return (
      <ComponentsGroup title={'Ссылки'} theme={this.theme}>
        <Gapped wrap verticalAlign="middle" gap={10}>
          {getComponentsFromPropsList(<Link />, propsList)}
        </Gapped>
      </ComponentsGroup>
    );
  };

  private renderButtonsGroup = () => {
    const propsList: ButtonProps[] = [
      { children: 'Default' },
      { children: 'Primary', use: 'primary' },
      { children: 'Danger', use: 'danger' },
      { children: 'Pay', use: 'pay' },
      { children: 'Success', use: 'success' },
      { children: 'Disabled', disabled: true },
      { children: 'Back', arrow: 'left', size: 'medium', width: 110 },
      { children: 'Forward', arrow: true, size: 'medium', use: 'primary', width: 110 },
      { children: 'Loading', size: 'medium', loading: true },
    ];

    return (
      <ComponentsGroup title={'Кнопки'} theme={this.theme}>
        {getComponentsFromPropsList(<Button width={120} size={'small'} />, propsList)}
      </ComponentsGroup>
    );
  };

  private renderInputsGroup = () => {
    const propsList: InputProps[] = [
      { placeholder: 'Enabled' },
      { placeholder: 'Error', error: true },
      { placeholder: 'Warning', warning: true },
      { placeholder: 'Disabled', disabled: true },
    ];
    const fromProps = getComponentsFromPropsList(<Input width={120} />, propsList);
    return (
      <ComponentsGroup title={'Поле ввода'} theme={this.theme}>
        <Input width={380} prefix="https://kontur.ru/search?query=" rightIcon={<SearchIcon />} />
        <div>
          <Gapped gap={10}>{fromProps}</Gapped>
        </div>
      </ComponentsGroup>
    );
  };

  private renderTokenInputsGroup = () => {
    return (
      <ComponentsGroup title={'Поле с токеном'} theme={this.theme}>
        <TokenInputPlayground />
      </ComponentsGroup>
    );
  };

  private renderOtherInputsGroup = () => {
    return (
      <ComponentsGroup title={'Прочие поля'} theme={this.theme}>
        <CurrencyInputPlayground />
        <FxInputPlayground />
        <DatePickerPlayground />
      </ComponentsGroup>
    );
  };

  private renderSwitchersGroup = () => {
    return (
      <ComponentsGroup title={'Переключатели'} theme={this.theme}>
        <SwitcherPlayground />
      </ComponentsGroup>
    );
  };

  private renderControlsGroup = () => {
    return (
      <ComponentsGroup title={'Радио, чекбоксы'} theme={this.theme}>
        <Gapped verticalAlign={'top'} gap={60}>
          <CheckboxPlayground />
          <RadioPlayground />
          <TogglePlayground />
        </Gapped>
      </ComponentsGroup>
    );
  };

  private renderHintsGroup = () => {
    return (
      <ComponentsGroup title={'Тултип'} theme={this.theme}>
        <HintPlayground />
      </ComponentsGroup>
    );
  };

  private renderTooltip = () => {
    const tooltipContent = () => (
      <div className={styles.tooltipContent()}>
        {'Информация об ошибке. Короткий объясняющий текст и ссылка, если нужно'}
      </div>
    );
    return (
      <ComponentsGroup title={'Тултип'} theme={this.theme}>
        <Tooltip render={tooltipContent} pos="right middle" trigger={'opened'} disableAnimations>
          <Link icon={<HelpDotIcon />} />
        </Tooltip>
      </ComponentsGroup>
    );
  };

  private renderPaging = () => {
    return (
      <ComponentsGroup title={'Пейджинг'} theme={this.theme}>
        <PagingPlayground />
      </ComponentsGroup>
    );
  };

  private renderFileUploader = () => {
    return (
      <ComponentsGroup title={'FileUploader'} theme={this.theme}>
        <FileUploader multiple />
      </ComponentsGroup>
    );
  };

  private renderStickyStopElement = () => {
    return <div ref={this.stopEl} style={{ height: 50 }} />;
  };

  private getStickyStop = () => this.stopEl.current;
}
