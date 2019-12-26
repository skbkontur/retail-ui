import * as React from 'react';
import { cx } from '../../../lib/theming/Emotion';
import SearchIcon from '@skbkontur/react-icons/Search';
import CardIcon from '@skbkontur/react-icons/Card';
import LinkIcon from '@skbkontur/react-icons/Link';
import OkIcon from '@skbkontur/react-icons/Ok';
import ErrorIcon from '@skbkontur/react-icons/Error';
import TrashIcon from '@skbkontur/react-icons/Trash';
import HelpDotIcon from '@skbkontur/react-icons/HelpDot';
import styles from './styles.module.less';
import jsStyles from './jsStyles';
import Button, { ButtonProps } from '../../Button';
import Tabs from '../../Tabs/Tabs';
import { ThemeType } from './constants';
import Gapped from '../../Gapped/Gapped';
import Link, { LinkProps } from '../../Link/Link';
import Input, { InputProps } from '../../Input';
import { TokenInputPlayground } from './TokenInputPlayground';
import { DatePickerPlayground } from './AnotherInputsPlayground';
import { TogglePlayground } from './TogglePlayground';
import { SwitcherPlayground } from './SwitcherPlayground';
import { FxInputPlayground } from './FxInputPlayground';
import { CurrencyInputPlayground } from './CurrencyInputPlayground';
import { ThemeConsumer } from '../../ThemeConsumer';
import { SelectPlayground } from './SelectPlayground';
import { getComponentsFromPropsList } from './helpers';
import { CheckboxPlayground } from './CheckboxPlayground';
import { RadioPlayground } from './RadioPlayground';
import Tooltip from '../../Tooltip';
import { PagingPlayground } from './PagingPlayground';
import { HintPlayground } from './HintPlayground';
import { ComponentsGroup } from './ComponentsGroup';
import Sticky from '../../Sticky';
import { PlaygroundTheme } from './ThemeProviderPlayground';

const enableReactTesting = process.env.enableReactTesting === 'true';
const useSticky = !enableReactTesting;

export interface IComponentsListProps {
  currentThemeType: ThemeType;
  onThemeChange: (ev: { target: { value: string } }, value: string) => void;
  onEditLinkClick: () => void;
}

export class Playground extends React.Component<IComponentsListProps, {}> {
  private theme!: PlaygroundTheme;
  private stickyStop: HTMLElement | null = null;

  public render() {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme as PlaygroundTheme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const wrapperClassName = cx(styles.playground, jsStyles.playgroundWrapper(this.theme));
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
    const { currentThemeType, onThemeChange, onEditLinkClick } = this.props;
    const tabsOuterWrapperStyle = { background: this.theme.backgroundMain || 'white' };
    const tabsOuterWrapperClass = cx(styles.tabsWrapper, useSticky && jsStyles.stickyTabsWrapper(this.theme));

    return (
      <div style={tabsOuterWrapperStyle} className={tabsOuterWrapperClass}>
        <Gapped vertical={false} verticalAlign={'middle'} gap={40}>
          <Tabs value={currentThemeType} onChange={onThemeChange} vertical={false}>
            <div className={jsStyles.tabsInnerWrapper(this.theme)}>
              <Tabs.Tab id={ThemeType.Default}>Дефолтная</Tabs.Tab>
              <Tabs.Tab id={ThemeType.Flat}>Плоская</Tabs.Tab>
              <Tabs.Tab id={ThemeType.Dark}>Темная</Tabs.Tab>
            </div>
          </Tabs>
          <Link onClick={onEditLinkClick}>Настроить тему</Link>
        </Gapped>
      </div>
    );
  }

  private renderSizesGroup = () => {
    const sizes = ['small', 'medium', 'large'];
    const group = [
      <SelectPlayground width={120} />,
      <Input rightIcon={<CardIcon />} placeholder={'Text value'} />,
      <Button width={120}>Button</Button>,
      <Button icon={<LinkIcon />} use={'link'}>
        Button like a link
      </Button>,
    ];
    const components = sizes.reduce((result: Array<React.ReactElement<any>>, size: string) => {
      return [...result, ...group.map(comp => React.cloneElement(comp, { size }))];
    }, []);
    return <ComponentsGroup title={'Размеры'} components={components} theme={this.theme} />;
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
      <ComponentsGroup
        title={'Ссылки'}
        components={getComponentsFromPropsList(<Link />, propsList)}
        theme={this.theme}
      />
    );
  };

  private renderButtonsGroup = () => {
    const propsList: ButtonProps[] = [
      { children: 'Default' },
      { children: 'Primary', use: 'primary' },
      { children: 'Danger', use: 'danger' },
      { children: 'Pay', use: 'pay' },
      { children: 'Disabled', disabled: true },
      { children: 'Back', arrow: 'left', size: 'medium', width: 110 },
      { children: 'Forward', arrow: true, size: 'medium', use: 'primary', width: 110 },
      { children: 'Loading', size: 'medium', loading: true },
    ];

    return (
      <ComponentsGroup
        title={'Кнопки'}
        components={getComponentsFromPropsList(<Button width={120} size={'small'} />, propsList)}
        theme={this.theme}
      />
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
    const components = [
      <Input width={380} prefix="https://kontur.ru/search?query=" rightIcon={<SearchIcon />} />,
      <div>
        <Gapped gap={10}>{fromProps}</Gapped>
      </div>,
    ];
    return <ComponentsGroup title={'Поле ввода'} components={components} theme={this.theme} />;
  };

  private renderTokenInputsGroup = () => {
    const components = [<TokenInputPlayground />];
    return <ComponentsGroup title={'Поле с токеном'} components={components} theme={this.theme} />;
  };

  private renderOtherInputsGroup = () => {
    const components = [<CurrencyInputPlayground />, <FxInputPlayground />, <DatePickerPlayground />];
    return <ComponentsGroup title={'Прочие поля'} components={components} theme={this.theme} />;
  };

  private renderSwitchersGroup = () => {
    const components = [<SwitcherPlayground />];
    return <ComponentsGroup title={'Переключатели'} components={components} theme={this.theme} />;
  };

  private renderControlsGroup = () => {
    const components = [
      <Gapped verticalAlign={'top'} gap={60}>
        <CheckboxPlayground />
        <RadioPlayground />
        <TogglePlayground />
      </Gapped>,
    ];
    return <ComponentsGroup title={'Радио, чекбоксы'} components={components} theme={this.theme} />;
  };

  private renderHintsGroup = () => {
    const components = [<HintPlayground />];
    return <ComponentsGroup title={'Тултип'} components={components} theme={this.theme} />;
  };

  private renderTooltip = () => {
    const tooltipContent = () => (
      <div className={styles.tooltipContent}>
        {'Информация об ошибке. Короткий объясняющий текст и ссылка, если нужно'}
      </div>
    );
    const components = [
      <Tooltip render={tooltipContent} pos="right middle" trigger={'opened'} disableAnimations={true}>
        <Link icon={<HelpDotIcon />} />
      </Tooltip>,
    ];
    return <ComponentsGroup title={'Тултип'} components={components} theme={this.theme} />;
  };

  private renderPaging = () => {
    const components = [<PagingPlayground />];
    return <ComponentsGroup title={'Пейджинг'} components={components} theme={this.theme} />;
  };

  private renderStickyStopElement = () => {
    return <div ref={this.stopRef} style={{ height: 50 }} />;
  };

  private stopRef = (el: HTMLElement | null) => (this.stickyStop = el);

  private getStickyStop = () => this.stickyStop;
}
