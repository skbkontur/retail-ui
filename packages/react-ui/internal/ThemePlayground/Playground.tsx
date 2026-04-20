import type { Emotion } from '@emotion/css/create-instance';
import { AttachLinkIcon16Regular } from '@skbkontur/icons/icons/AttachLinkIcon/AttachLinkIcon16Regular.js';
import { CheckAIcon16Regular } from '@skbkontur/icons/icons/CheckAIcon/CheckAIcon16Regular.js';
import { MinusCircleIcon16Regular } from '@skbkontur/icons/icons/MinusCircleIcon/MinusCircleIcon16Regular.js';
import { QuestionCircleIcon16Regular } from '@skbkontur/icons/icons/QuestionCircleIcon/QuestionCircleIcon16Regular.js';
import { SearchLoupeIcon16Regular } from '@skbkontur/icons/icons/SearchLoupeIcon/SearchLoupeIcon16Regular.js';
import { TrashCanIcon16Regular } from '@skbkontur/icons/icons/TrashCanIcon/TrashCanIcon16Regular.js';
import React from 'react';

import { Button } from '../../components/Button/index.js';
import type { ButtonProps } from '../../components/Button/index.js';
import { FileUploader } from '../../components/FileUploader/index.js';
import { Gapped } from '../../components/Gapped/index.js';
import { Input } from '../../components/Input/index.js';
import type { InputProps } from '../../components/Input/index.js';
import { Link } from '../../components/Link/index.js';
import type { LinkProps } from '../../components/Link/index.js';
import { Sticky } from '../../components/Sticky/index.js';
import { Tabs } from '../../components/Tabs/index.js';
import { Tooltip } from '../../components/Tooltip/index.js';
import { isTestEnv } from '../../lib/currentEnvironment.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { DatePickerPlayground } from './AnotherInputsPlayground.js';
import { CheckboxPlayground } from './CheckboxPlayground.js';
import { ComponentsGroup } from './ComponentsGroup.js';
import { ThemeType } from './constants.js';
import { CurrencyInputPlayground } from './CurrencyInputPlayground.js';
import { FxInputPlayground } from './FxInputPlayground.js';
import { getComponentsFromPropsList } from './helpers.js';
import { HintPlayground } from './HintPlayground.js';
import { PagingPlayground } from './PagingPlayground.js';
import { getStyles } from './Playground.styles.js';
import { RadioPlayground } from './RadioPlayground.js';
import { SizesGroup } from './SizesGroup.js';
import { SwitcherPlayground } from './SwitcherPlayground.js';
import { TogglePlayground } from './TogglePlayground.js';
import { TokenInputPlayground } from './TokenInputPlayground.js';

const useSticky = !isTestEnv;

export interface PlaygroundProps {
  currentThemeType: ThemeType;
  onThemeChange: (value: string) => void;
  onEditLinkClick: () => void;
}

@withRenderEnvironment
export class Playground extends React.Component<PlaygroundProps> {
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private stopEl = React.createRef<HTMLDivElement>();

  public render() {
    this.styles = getStyles(this.emotion);

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
    const wrapperClassName = this.cx(this.styles.playground(), this.styles.playgroundWrapper(this.theme));
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
    const tabsOuterWrapperStyle = { background: this.theme.bgDefault, marginTop: 36 };
    const tabsOuterWrapperClass = this.cx({
      [this.styles.tabsWrapper(this.theme)]: true,
      [this.styles.stickyTabsWrapper(this.theme)]: useSticky,
    });

    return (
      <div style={tabsOuterWrapperStyle} className={tabsOuterWrapperClass}>
        <Gapped gap={40}>
          <Tabs value={this.getCurrentTab()} onValueChange={onThemeChange} vertical={false}>
            <div className={this.styles.tabsInnerWrapper(this.theme)}>
              <Tabs.Tab id={ThemeType.LightTheme} data-tab-id={ThemeType.LightTheme}>
                Светлая тема
              </Tabs.Tab>
              <Tabs.Tab id={ThemeType.DarkTheme} data-tab-id={ThemeType.DarkTheme}>
                Тёмная тема
              </Tabs.Tab>
            </div>
          </Tabs>
          <Link onClick={onEditLinkClick}>Настроить тему</Link>
        </Gapped>
      </div>
    );
  }

  private getCurrentTab = () => {
    switch (this.props.currentThemeType) {
      case ThemeType.DarkTheme:
        return ThemeType.DarkTheme;
      default:
        return ThemeType.LightTheme;
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
      { icon: <AttachLinkIcon16Regular />, children: 'Enabled' },
      { icon: <CheckAIcon16Regular />, use: 'success', children: 'Success' },
      { icon: <MinusCircleIcon16Regular />, use: 'danger', children: 'Danger' },
      { icon: <TrashCanIcon16Regular />, use: 'grayed', children: 'Grayed' },
      { icon: <TrashCanIcon16Regular />, children: 'Disabled', disabled: true },
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
        <Input width={380} prefix="https://kontur.ru/search?query=" rightIcon={<SearchLoupeIcon16Regular />} />
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
      <div className={this.styles.tooltipContent()}>
        {'Информация об ошибке. Короткий объясняющий текст и ссылка, если нужно'}
      </div>
    );
    return (
      <ComponentsGroup title={'Тултип'} theme={this.theme}>
        <Tooltip render={tooltipContent} pos="right middle" trigger={'opened'} disableAnimations>
          <Link icon={<QuestionCircleIcon16Regular />} />
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
