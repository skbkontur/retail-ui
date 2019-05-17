import * as React from 'react';
import { cx, css } from 'emotion';
import Button from '../../Button/index';
import Tabs from '../../Tabs/Tabs';
import { ThemeType } from './enums';
import Gapped from '../../Gapped/Gapped';
import Link from '../../Link/Link';

import styles from './styles.less';
import Input from '../../Input/index';
import SearchIcon from '@skbkontur/react-icons/Search';
import { TokenInputPlayground } from './TokenInputPlayground';
import Spinner from '../../Spinner/index';
import { DatePickerPlayground } from './AnotherInputsPlayground';
import { TogglePlayground } from './TogglePlayground';
import { SwitcherPlayground } from './SwitcherPlayground';
import Radio from '../../Radio/index';
import Checkbox from '../../Checkbox/index';
import { FxInputPlayground } from './FxInputPlayground';
import { CurrencyInputPlayground } from './CurrencyInputPlayground';
import { ThemeConsumer } from '../../internal/ThemeContext';
import { PlaygroundTheme } from '../__stories__/ThemeProvider.stories';

export interface IComponentsListProps {
  currentThemeType: ThemeType;
  onThemeChange: ((ev: { target: { value: string } }, value: string) => void);
  onEditLinkClick: () => void;
}

export class Playground extends React.Component<IComponentsListProps, {}> {
  private theme!: PlaygroundTheme;

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

  /* tslint:disable jsx-key */

  private renderMain() {
    return (
      <div
        className={cx(
          styles.playground,
          css`
            background: ${this.theme.backgroundMain};
          `,
        )}
      >
        <Gapped vertical gap={50}>
          {this.renderTabsGroup()}
          {this.renderButtonsGroup()}
          {this.renderInputsGroup()}
          {this.renderTokenInputsGroup()}
          {this.renderDifferentInputsGroup()}
          {this.renderTogglesGroup()}
          {this.renderSwitchersGroup()}
          {this.renderRadiosGroup()}
          {this.renderCheckboxesGroup()}
        </Gapped>
      </div>
    );
  }

  private renderTabsGroup = () => {
    const { currentThemeType, onThemeChange, onEditLinkClick } = this.props;
    return (
      <Gapped vertical={false} verticalAlign={'middle'} gap={80}>
        <Tabs value={currentThemeType} onChange={onThemeChange} vertical={false}>
          <div
            className={css`
              color: ${this.theme.textColorMain};
            `}
          >
            <Tabs.Tab id={ThemeType.Default}>Дефолтная</Tabs.Tab>
            <Tabs.Tab id={ThemeType.Flat}>Плоская</Tabs.Tab>
            <Tabs.Tab id={ThemeType.Dark}>Темная</Tabs.Tab>
          </div>
        </Tabs>
        <Link onClick={onEditLinkClick}>Изменить тему</Link>
      </Gapped>
    );
  };

  private renderButtonsGroup = () => {
    const components = [
      <Button size={'small'}>Small</Button>,
      <Button size={'medium'}>Medium</Button>,
      <Button size={'large'}>Large</Button>,
      <Button size={'medium'} loading>
        Loading
      </Button>,
      <Button size={'medium'} disabled>
        Disabled
      </Button>,
      <Button use="default">Default</Button>,
      <Button use="primary">Primary</Button>,
      <Button use="success">Success</Button>,
      <Button use="danger">Danger</Button>,
      <Button use="pay">Pay</Button>,
      <Button use="link">Link</Button>,
      <Button icon={<Spinner type={'mini'} />} />,
      <Button size={'medium'} arrow>
        Далее
      </Button>,
      <Button size={'medium'} arrow={'left'}>
        Назад
      </Button>,
    ];
    return this.renderComponentsGroup('Кнопки', components);
  };

  private renderInputsGroup = () => {
    const components = [
      <Input width={400} prefix="https://kontur.ru/search?query=" rightIcon={<SearchIcon />} />,
      <Input width={150} error />,
      <Input width={150} warning />,
      <Input width={150} disabled placeholder={'disabled'} />,
      <Input width={150} placeholder={'Small'} size={'small'} />,
      <Input width={150} placeholder={'Medium'} size={'medium'} />,
      <Input width={150} placeholder={'Large'} size={'large'} />,
    ];
    return this.renderComponentsGroup('Поле ввода', components);
  };

  private renderTokenInputsGroup = () => {
    const components = [<TokenInputPlayground />];
    return this.renderComponentsGroup('Поле с токеном', components);
  };

  private renderDifferentInputsGroup = () => {
    const components = [<CurrencyInputPlayground />, <FxInputPlayground />, <DatePickerPlayground />];
    return this.renderComponentsGroup('Прочие поля', components);
  };

  private renderTogglesGroup = () => {
    const components = [<TogglePlayground />];
    return this.renderComponentsGroup('Тумблеры', components);
  };

  private renderSwitchersGroup = () => {
    const components = [<SwitcherPlayground />, <SwitcherPlayground error />];
    return this.renderComponentsGroup('Переключатели', components);
  };

  private renderRadiosGroup = () => {
    const value = '';
    const components = [
      <Radio value={value} checked>
        Первый вариант
      </Radio>,
      <Radio value={value} error>
        Ошибка
      </Radio>,
      <Radio value={value} warning>
        Предупреждение
      </Radio>,
      <Radio value={value} disabled>
        Неактивный
      </Radio>,
    ];
    return this.renderComponentsGroup('Радио', components);
  };

  private renderCheckboxesGroup = () => {
    const components = [
      <Checkbox checked>Первый вариант</Checkbox>,
      <Checkbox error>Ошибка</Checkbox>,
      <Checkbox warning>Предупреждение</Checkbox>,
      <Checkbox disabled>Неактивный</Checkbox>,
      <Checkbox initialIndeterminate>Неопределенный</Checkbox>,
    ];
    return this.renderComponentsGroup('Чекбоксы', components);
  };

  private renderComponentsGroup = (title: string, components: Array<React.ReactElement<any>>) => {
    return (
      <Gapped vertical={false} verticalAlign={'top'} gap={10}>
        <div
          className={cx(
            styles.title,
            css`
              color: ${this.theme.textColorMain};
            `,
          )}
        >
          {title}
        </div>
        <div
          className={cx(
            styles.componentsGroup,
            css`
              color: ${this.theme.textColorMain};
            `,
          )}
        >
          <Gapped verticalAlign={'middle'} gap={20}>
            {components.map((element, index) => React.cloneElement(element, { key: index }))}
          </Gapped>
        </div>
      </Gapped>
    );
  };
}
