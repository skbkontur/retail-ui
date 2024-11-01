import React from 'react';
import {
  LocaleContext,
  TokenInput,
  LangCodes,
  TokenInputType,
  Gapped,
  Spinner,
  Select,
  ComboBox,
  DatePicker,
  Paging,
  DateInput,
} from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Information/Locale',
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  return (
    <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
      <TokenInput type={TokenInputType.Combined} getItems={() => Promise.resolve([]).then(delay(500))} />
    </LocaleContext.Provider>
  );
};
Example1.storyName = 'Дефолтная локализация TokenInput';

export const Example2: Story = () => {
  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const customLocale = {
    TokenInput: {
      addButtonComment: 'Press Enter or type Spacebar',
    },
  };

  return (
    <LocaleContext.Provider value={{ locale: customLocale }}>
      <TokenInput
        type={TokenInputType.Combined}
        delimiters={[' ']}
        getItems={() => Promise.resolve([]).then(delay(500))}
      />
    </LocaleContext.Provider>
  );
};
Example2.storyName = 'Кастомная локализация TokenInput';

export const Example3: Story = () => {
  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const customLocale = {
    Spinner: {
      loading: 'awaiting...',
    },
  };

  return (
    <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
      <Gapped vertical gap={10}>
        <LocaleContext.Provider value={{ locale: customLocale }}>
          <TokenInput getItems={() => Promise.resolve([]).then(delay(1500))} />
        </LocaleContext.Provider>
        <TokenInput getItems={() => Promise.resolve([]).then(delay(1500))} />
        <Spinner />
      </Gapped>
    </LocaleContext.Provider>
  );
};
Example3.storyName = 'Для инкапсуляции локализации можно использовать несколько контекстов';

export const Example4: Story = () => {
  const languages = {
    [LangCodes.ru_RU]: 'Русский',
    [LangCodes.en_GB]: 'English',
  };

  function LocalizedByHook() {
    const { langCode } = React.useContext(LocaleContext);
    return <div>{languages[langCode]}</div>;
  }

  return (
    <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
      <LocalizedByHook />
    </LocaleContext.Provider>
  );
};
Example4.storyName = 'Локализация функционального компонента через useContext';

export const Example5: Story = () => {
  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const items = [
    { label: 'aaa', value: 1 },
    { label: 'bbb', value: 2 },
    { label: 'ccc', value: 3 },
  ];

  const LocalizationControlNames = {
    ComboBox: 'ComboBox',
    Spinner: 'Spinner',
    TokenInput: 'TokenInput',
    Select: 'Select',
    Paging: 'Paging',
    DatePicker: 'DatePicker',
    DateInput: 'DateInput',
  };

  class LocalizationControls extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        langCode: LangCodes.ru_RU,
        controlName: null,
      };
    }

    render() {
      // попробуйте кастомизировать локаль любого контрола
      const customLocaleRU = {};
      const customLocaleEN = {};

      const locale = this.state.langCode === LangCodes.en_GB ? customLocaleEN : customLocaleRU;

      return (
        <Gapped vertical gap={10}>
          <Select
            value={this.state.langCode}
            placeholder="Выбрать язык"
            items={Object.values(LangCodes)}
            onValueChange={(langCode) => this.setState({ langCode })}
          />
          <Select
            value={this.state.controlName}
            placeholder="Выбрать контрол"
            items={Object.values(LocalizationControlNames)}
            onValueChange={(controlName) => this.setState({ controlName })}
          />
          <LocaleContext.Provider value={{ langCode: this.state.langCode, locale }}>
            {this.getControl(this.state.controlName)}
          </LocaleContext.Provider>
        </Gapped>
      );
    }

    getControl(controlName) {
      switch (controlName) {
        case LocalizationControlNames.ComboBox:
          return (
            <ComboBox
              getItems={(str) => Promise.resolve(items.filter(({ label }) => label.includes(str))).then(delay(500))}
              onValueChange={({ label: langCode }) => this.setState({ langCode })}
            />
          );

        case LocalizationControlNames.TokenInput:
          return <TokenInput type={TokenInputType.Combined} getItems={() => Promise.resolve([]).then(delay(500))} />;

        case LocalizationControlNames.Spinner:
          return <Spinner />;

        case LocalizationControlNames.DatePicker:
          return <DatePicker value="30.12.2012" />;

        case LocalizationControlNames.DateInput:
          return <DateInput value="30.12.2012" />;

        case LocalizationControlNames.Select:
          return <Select />;

        case LocalizationControlNames.Paging:
          return <Paging activePage={1} pagesCount={12} onPageChange={(value) => value} />;
      }
      return null;
    }
  }
  return <LocalizationControls />;
};
Example5.storyName = 'Обзор всех доступных контролов';
