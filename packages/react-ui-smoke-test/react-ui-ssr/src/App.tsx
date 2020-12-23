import React from 'react';
import {
  Autocomplete,
  Button,
  Center,
  Checkbox,
  ComboBox,
  CurrencyLabel,
  DateInput,
  DatePicker,
  Dropdown,
  DropdownMenu,
  Fias,
  FiasAPI,
  FiasSearch,
  FxInput,
  Gapped,
  Group,
  Hint,
  Input,
  Kebab,
  LangCodes,
  Link,
  Loader,
  LocaleContext,
  LocaleConsumer,
  LocaleProvider,
  Logotype,
  MenuHeader,
  MenuItem,
  MenuSeparator,
  Modal,
  Paging,
  Radio,
  RadioGroup,
  ScrollContainer,
  Select,
  SidePage,
  Spinner,
  Sticky,
  Switcher,
  Tabs,
  Textarea,
  ThemeProvider,
  ThemeFactory,
  ThemeContext,
  Toast,
  Toggle,
  Token,
  TokenInput,
  TokenInputType,
  Tooltip,
  TooltipMenu,
  TopBar,
} from '@skbkontur/react-ui';
import EditIcon from '@skbkontur/react-icons/Edit';
import { FLAT_THEME } from '@skbkontur/react-ui/lib/theming/themes/FlatTheme';
import { ValidationContainer, ValidationWrapper } from 'react-ui-validations/src';

export const App = () => {
  return (
    <main>
      <Autocomplete source={[]} value={''} onValueChange={() => ({})} />
      <Button>Кнопка</Button>
      <Center style={{ background: '#fdd', height: 150 }}>
        <div style={{ background: 'black', width: 30, height: 30 }} />
      </Center>
      <Checkbox checked={false} onValueChange={() => ({})}>
        Checkbox
      </Checkbox>
      <ComboBox getItems={q => Promise.resolve([{ value: 1, label: 'First' }])} />
      <CurrencyLabel value={12356.1} currencySymbol={'₽'} />
      <DateInput />
      <DatePicker value={''} onValueChange={() => ({})} />
      <Dropdown caption="Click">
        <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
        <MenuSeparator />
        <MenuHeader>Here goes the header</MenuHeader>
        <MenuItem onClick={() => alert('Pow')} comment="With comment.">
          Pow
        </MenuItem>
      </Dropdown>
      <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
        <MenuHeader>Заголовок меню</MenuHeader>
        <MenuSeparator />
        <MenuItem>Раз</MenuItem>
        <MenuItem>Два</MenuItem>
        <MenuItem>Три</MenuItem>
        <MenuSeparator />
        <MenuItem>Раз</MenuItem>
        <MenuItem>Два</MenuItem>
        <MenuItem>Три</MenuItem>
      </DropdownMenu>
      <FxInput onValueChange={() => ({})} />
      <Gapped>
        <Button use="primary">Сохранить</Button>
        <Button>Отмена</Button>
      </Gapped>
      <Group>
        <Button use="primary">Hey</Button>
        <Button>Ma</Button>
      </Group>
      <Hint text="World">Hello</Hint>
      <Input />
      <Kebab size="large">
        <MenuItem icon={<EditIcon />} onClick={() => Toast.push('Nope')}>
          Редактировать
        </MenuItem>
      </Kebab>
      <Link>Enabled</Link>
      <Link href="http://tech.skbkontur.ru/react-ui/">with href</Link>
      <Loader />
      <MenuItem
        href="http://tech.skbkontur.ru/react-ui/"
        component={({ href, ...rest }) => <Link to={href} {...rest} />}
      >
        Awesome link
      </MenuItem>
      <Modal>
        <Modal.Header />
        <Modal.Body />
        <Modal.Footer />
      </Modal>
      <Paging activePage={0} onPageChange={() => ({})} pagesCount={12} />
      <RadioGroup>
        <Radio value="value" />
      </RadioGroup>
      <ScrollContainer>scroll container</ScrollContainer>
      <Select onValueChange={() => ({})} />
      <SidePage>
        <SidePage.Header />
        <SidePage.Body>
          <SidePage.Container>C</SidePage.Container>
        </SidePage.Body>
        <SidePage.Footer panel />
      </SidePage>
      <Spinner type="big" caption="big" />
      <Spinner cloud />
      <Sticky side="top" getStop={() => null}>
        {_ => 'Small loan of a million dollars'}
      </Sticky>
      <Switcher items={['One', 'Two', 'Three']} />
      <Tabs value="fuji">
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
        <Tabs.Tab id="tahat">Tahat</Tabs.Tab>
      </Tabs>
      <Textarea />
      <Toggle />
      <Token>Default</Token>
      <TokenInput type={TokenInputType.Combined} getItems={_ => Promise.resolve(['First'])} />
      <Tooltip render={() => <div />} pos="right top">
        a
      </Tooltip>
      <TooltipMenu caption={<Button use="primary">Открыть меню</Button>}>
        <MenuHeader>Заголовок меню</MenuHeader>
      </TooltipMenu>
      <LocaleProvider langCode={LangCodes.en_GB}>
        <TokenInput type={TokenInputType.Combined} getItems={_ => Promise.resolve(['First'])} />
        <LocaleConsumer>{locale => locale.langCode}</LocaleConsumer>
        <LocaleContext.Consumer>{locale => locale.langCode}</LocaleContext.Consumer>
      </LocaleProvider>
      <LocaleContext.Provider value={{ langCode: LangCodes.ru_RU }}>
        <LocaleContext.Consumer>{locale => locale.langCode}</LocaleContext.Consumer>
      </LocaleContext.Provider>
      <ThemeProvider value={FLAT_THEME}>
        <Input />
      </ThemeProvider>
      <ThemeContext.Provider value={ThemeFactory.create(FLAT_THEME)}>
        <ThemeContext.Consumer>{theme => theme.btnFontSizeMedium}</ThemeContext.Consumer>
      </ThemeContext.Provider>
      <Fias baseUrl={'https://api.kontur.ru/fias/v1/'} value={{}} onValueChange={() => ({})} />
      <FiasSearch api={new FiasAPI('https://api.kontur.ru/fias/v1/')} />
      <Logotype suffix="экстерн" color="#F15600" />
      <TopBar>
        <TopBar.Start>
          <TopBar.ItemStatic>
            <Logotype suffix="ui" withWidget />
          </TopBar.ItemStatic>
          <TopBar.Item>s</TopBar.Item>
        </TopBar.Start>
        <TopBar.End>
          <TopBar.User userName="Alexander The Great" />
          <TopBar.Divider />
          <TopBar.Logout onClick={() => alert('Logout!')} />
        </TopBar.End>
      </TopBar>
      <ValidationContainer scrollOffset={{ top: 100 }}>
        <ValidationWrapper validationInfo={{ type: 'immediate', message: 'Bad' }}>
          <Input />
        </ValidationWrapper>
      </ValidationContainer>
    </main>
  );
};
