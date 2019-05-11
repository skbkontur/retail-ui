import * as React from 'react';
import Button from '../../Button';
import Tabs from '../../Tabs/Tabs';
import { ThemeType } from './enums';
import Gapped from '../../Gapped/Gapped';
import Link from '../../Link/Link';

import styles from './styles.less';
import Input from '../../Input';
import SearchIcon from '@skbkontur/react-icons/Search';
import { TokenInputPlayground } from './TokenInputPlayground';
import Spinner from '../../Spinner';
import { DatePickerPlayground } from './AnotherInputsPlayground';
import { TogglePlayground } from './TogglePlayground';
import { SwitcherPlayground } from './SwitcherPlayground';
import Radio from '../../Radio';
import Checkbox from '../../Checkbox';

export interface IComponentsListProps {
  activeThemeType: ThemeType;
  onThemeChange: ((ev: { target: { value: string } }, value: string) => void);
  onEditLinkClick: () => void;
}

export const Playground = (props: IComponentsListProps) => {
  const { activeThemeType, onThemeChange, onEditLinkClick } = props;

  return (
      <Gapped vertical gap={50}>
        <TabsGroup activeThemeId={activeThemeType} onEditLinkClick={onEditLinkClick} onThemeChange={onThemeChange} />
        <ButtonsGroup />
        <InputsGroup />
        <TokenInputsGroup />
        <DifferentInputsGroup />
        <TogglesGroup />
        <SwitchersGroup />
        <RadiosGroup />
        <CheckboxesGroup />
      </Gapped>
  );
};

interface ITabsGroupProps {
  activeThemeId: ThemeType;
  onThemeChange: ((ev: { target: { value: string } }, value: string) => void);
  onEditLinkClick: () => void;
}

const TabsGroup = (props: ITabsGroupProps) => (
  <Gapped vertical={false} verticalAlign={'middle'} gap={80}>
    <Tabs value={props.activeThemeId} onChange={props.onThemeChange} vertical={false}>
      <Tabs.Tab id={ThemeType.Default}>Дефолтная тема</Tabs.Tab>
      <Tabs.Tab id={ThemeType.Flat}>Плоская тема</Tabs.Tab>
      <Tabs.Tab id={ThemeType.Custom}>Своя тема</Tabs.Tab>
    </Tabs>
    <Link onClick={props.onEditLinkClick}>Изменить свою тему</Link>
  </Gapped>
);

/* tslint:disable jsx-key */
const ButtonsGroup = () => {
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
  return renderComponentsGroup('Кнопки', components);
};

const InputsGroup = () => {
  const components = [
    <Input width={400} prefix="https://kontur.ru/search?query=" rightIcon={<SearchIcon />} />,
    <Input width={150} error />,
    <Input width={150} warning />,
    <Input width={150} disabled placeholder={'disabled'} />,
    <Input width={150} placeholder={'Small'} size={'small'} />,
    <Input width={150} placeholder={'Medium'} size={'medium'} />,
    <Input width={150} placeholder={'Large'} size={'large'} />,
  ];
  return renderComponentsGroup('Поле ввода', components);
};

const TokenInputsGroup = () => {
  const components = [<TokenInputPlayground />];
  return renderComponentsGroup('Поле с токеном', components);
};

const DifferentInputsGroup = () => {
  const components = [<DatePickerPlayground />];
  return renderComponentsGroup('Прочие поля', components);
};

const TogglesGroup = () => {
  const components = [<TogglePlayground />];
  return renderComponentsGroup('Тумблеры', components);
};

const SwitchersGroup = () => {
  const components = [<SwitcherPlayground />, <SwitcherPlayground error />];
  return renderComponentsGroup('Переключатели', components);
};

const RadiosGroup = () => {
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
  return renderComponentsGroup('Радио', components);
};

const CheckboxesGroup = () => {
  const components = [
    <Checkbox checked>Первый вариант</Checkbox>,
    <Checkbox error>Ошибка</Checkbox>,
    <Checkbox warning>Предупреждение</Checkbox>,
    <Checkbox disabled>Неактивный</Checkbox>,
    <Checkbox initialIndeterminate>Неопределенный</Checkbox>,
  ];
  return renderComponentsGroup('Чекбоксы', components);
};

const renderComponentsGroup = (title: string, components: Array<React.ReactElement<any>>) => (
  <Gapped vertical={false} verticalAlign={'top'} gap={10}>
    <div className={styles.title}>{title}</div>
    <div className={styles.componentsGroup}>
      <Gapped verticalAlign={'middle'} gap={20}>
        {components.map((element, index) => React.cloneElement(element, { key: index }))}
      </Gapped>
    </div>
  </Gapped>
);
