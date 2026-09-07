import type { Emotion } from '@emotion/css/create-instance';
import { IconAttachLinkRegular16 } from '@skbkontur/icons/IconAttachLinkRegular16';
import { IconCheckARegular16 } from '@skbkontur/icons/IconCheckARegular16';
import { IconMinusCircleRegular16 } from '@skbkontur/icons/IconMinusCircleRegular16';
import { IconQuestionCircleRegular16 } from '@skbkontur/icons/IconQuestionCircleRegular16';
import { IconSearchLoupeRegular16 } from '@skbkontur/icons/IconSearchLoupeRegular16';
import { IconTrashCanRegular16 } from '@skbkontur/icons/IconTrashCanRegular16';
import React from 'react';

import { Button } from '../../components/Button/index.js';
import type { ButtonProps } from '../../components/Button/index.js';
import { FileUploader } from '../../components/FileUploader/index.js';
import { Gapped } from '../../components/Gapped/index.js';
import { Input } from '../../components/Input/index.js';
import type { InputProps } from '../../components/Input/index.js';
import { Link } from '../../components/Link/index.js';
import type { LinkProps } from '../../components/Link/index.js';
import { Loader } from '../../components/Loader/index.js';
import { MaskedInput, MaskedInputMasks } from '../../components/MaskedInput/index.js';
import { Spinner } from '../../components/Spinner/index.js';
import { Sticky } from '../../components/Sticky/index.js';
import { Tabs } from '../../components/Tabs/index.js';
import { Textarea } from '../../components/Textarea/index.js';
import { Tooltip } from '../../components/Tooltip/index.js';
import { isTestEnv } from '../../lib/currentEnvironment.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { DatePickerPlayground, DateRangePickerPlayground } from './AnotherInputsPlayground.js';
import { AutocompletePlayground } from './AutocompletePlayground.js';
import { CheckboxPlayground } from './CheckboxPlayground.js';
import { ComboBoxPlayground } from './ComboBoxPlayground.js';
import { ComponentsGroup } from './ComponentsGroup.js';
import { ThemeType } from './constants.js';
import { CurrencyInputPlayground } from './CurrencyInputPlayground.js';
import { DateInputPlayground } from './DateInputPlayground.js';
import { FxInputPlayground } from './FxInputPlayground.js';
import { getComponentsFromPropsList } from './helpers.js';
import { HintPlayground } from './HintPlayground.js';
import { PagingPlayground } from './PagingPlayground.js';
import { PasswordInputPlayground } from './PasswordInputPlayground.js';
import { getStyles } from './Playground.styles.js';
import { RadioPlayground } from './RadioPlayground.js';
import { SelectPlayground } from './SelectPlayground.js';
import { SizesGroup } from './SizesGroup.js';
import { SwitcherPlayground } from './SwitcherPlayground.js';
import { TimePickerPlayground } from './TimePickerPlayground.js';
import { ToastPlayground } from './ToastPlayground.js';
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
        <div className={this.styles.stack()}>
          {this.renderTabsGroup()}
          {this.renderSizesGroup()}
          {this.renderLinksGroup()}
          {this.renderButtonsGroup()}
          {this.renderSelectGroup()}
          {this.renderInputsGroup()}
          {this.renderPasswordInputGroup()}
          {this.renderTextareaGroup()}
          {this.renderMaskedInputGroup()}
          {this.renderAutocompleteGroup()}
          {this.renderComboBoxGroup()}
          {this.renderTokenInputsGroup()}
          {this.renderDateInputGroup()}
          {this.renderDatePickerGroup()}
          {this.renderDateRangePickerGroup()}
          {this.renderTimePickerGroup()}
          {this.renderCurrencyInputGroup()}
          {this.renderFxInputGroup()}
          {this.renderSwitchersGroup()}
          {this.renderCheckboxGroup()}
          {this.renderRadioGroup()}
          {this.renderToggleGroup()}
        </div>
        {this.renderStickyStopElement()}
        <div className={this.styles.stack()}>
          {this.renderHintsGroup()}
          {this.renderTooltip()}
          {this.renderToastGroup()}
          {this.renderPaging()}
          {this.renderFileUploader()}
          {this.renderSpinner()}
          {this.renderLoader()}
        </div>
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
      <ComponentsGroup title={'Sizes'} theme={this.theme}>
        <Gapped gap={24} verticalAlign="top">
          <SizesGroup size={'small'} />
          <SizesGroup size={'medium'} />
          <SizesGroup size={'large'} />
        </Gapped>
      </ComponentsGroup>
    );
  };

  private renderLinksGroup = () => {
    const propsList: LinkProps[] = [
      { icon: <IconAttachLinkRegular16 />, children: 'Перейти' },
      { icon: <IconCheckARegular16 />, use: 'success', children: 'Принять' },
      { icon: <IconMinusCircleRegular16 />, use: 'danger', children: 'Удалить' },
      { icon: <IconTrashCanRegular16 />, use: 'grayed', children: 'Перейти' },
      { icon: <IconTrashCanRegular16 />, children: 'Перейти', disabled: true },
    ];
    return (
      <ComponentsGroup title={'Link'} theme={this.theme}>
        <Gapped wrap verticalAlign="middle" gap={10}>
          {getComponentsFromPropsList(<Link />, propsList)}
        </Gapped>
      </ComponentsGroup>
    );
  };

  private renderButtonsGroup = () => {
    const propsList: ButtonProps[] = [
      { children: 'Outline (Default)', use: 'outline' },
      { children: 'Accent', use: 'accent' },
      { children: 'Fill', use: 'fill' },
      { children: 'Text', use: 'text' },
      { children: 'Danger', use: 'danger' },
      { children: 'Success', use: 'success' },
      { children: 'Pay', use: 'pay' },
      { children: 'Disabled', disabled: true },
      { children: 'Назад', arrow: 'left', size: 'medium', width: 110 },
      { children: 'Далее', arrow: true, size: 'medium', use: 'accent', width: 110 },
      { children: 'Loading', size: 'medium', loading: true },
    ];

    return (
      <ComponentsGroup title={'Button'} theme={this.theme}>
        {getComponentsFromPropsList(<Button width={140} size={'small'} />, propsList)}
      </ComponentsGroup>
    );
  };

  private renderInputsGroup = () => {
    const propsList: InputProps[] = [
      { placeholder: 'Обычное' },
      { placeholder: 'Ошибка', error: true },
      { placeholder: 'Предупреждение', warning: true },
      { placeholder: 'Отключено', disabled: true },
    ];
    const fromProps = getComponentsFromPropsList(<Input width={160} />, propsList);
    return (
      <ComponentsGroup title={'Input'} theme={this.theme}>
        <Input width={380} prefix="https://kontur.ru/search?query=" rightIcon={<IconSearchLoupeRegular16 />} />
        <div>
          <Gapped gap={10}>{fromProps}</Gapped>
        </div>
      </ComponentsGroup>
    );
  };

  private renderPasswordInputGroup = () => {
    return (
      <ComponentsGroup title={'PasswordInput'} theme={this.theme}>
        <PasswordInputPlayground />
      </ComponentsGroup>
    );
  };

  private renderTokenInputsGroup = () => {
    return (
      <ComponentsGroup title={'TokenInput'} theme={this.theme}>
        <TokenInputPlayground />
      </ComponentsGroup>
    );
  };

  private renderTextareaGroup = () => {
    return (
      <ComponentsGroup title={'Textarea'} theme={this.theme}>
        <Textarea width={380} placeholder="Используйте многострочное поле для ввода больших текстов" />
      </ComponentsGroup>
    );
  };

  private renderMaskedInputGroup = () => {
    return (
      <ComponentsGroup title={'MaskedInput'} theme={this.theme}>
        <MaskedInput width={200} mask={MaskedInputMasks.PhoneRU} placeholder="+7" type="tel" />
      </ComponentsGroup>
    );
  };

  private renderAutocompleteGroup = () => {
    return (
      <ComponentsGroup title={'Autocomplete'} theme={this.theme}>
        <AutocompletePlayground />
      </ComponentsGroup>
    );
  };

  private renderComboBoxGroup = () => {
    return (
      <ComponentsGroup title={'ComboBox'} theme={this.theme}>
        <ComboBoxPlayground />
      </ComponentsGroup>
    );
  };

  private renderSelectGroup = () => {
    const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];
    return (
      <ComponentsGroup title={'Select'} theme={this.theme}>
        <SelectPlayground width={160} items={items} value="Счёт-фактура" />
        <SelectPlayground width={160} items={items} value="Счёт-фактура" error />
        <SelectPlayground width={160} items={items} value="Счёт-фактура" warning />
        <SelectPlayground width={160} items={items} value="Счёт-фактура" disabled />
      </ComponentsGroup>
    );
  };

  private renderDateInputGroup = () => {
    return (
      <ComponentsGroup title={'DateInput'} theme={this.theme}>
        <DateInputPlayground />
      </ComponentsGroup>
    );
  };

  private renderDatePickerGroup = () => {
    return (
      <ComponentsGroup title={'DatePicker'} theme={this.theme}>
        <DatePickerPlayground />
      </ComponentsGroup>
    );
  };

  private renderDateRangePickerGroup = () => {
    return (
      <ComponentsGroup title={'DateRangePicker'} theme={this.theme}>
        <DateRangePickerPlayground />
      </ComponentsGroup>
    );
  };

  private renderTimePickerGroup = () => {
    return (
      <ComponentsGroup title={'TimePicker'} theme={this.theme}>
        <TimePickerPlayground />
      </ComponentsGroup>
    );
  };

  private renderCurrencyInputGroup = () => {
    return (
      <ComponentsGroup title={'CurrencyInput'} theme={this.theme}>
        <CurrencyInputPlayground />
      </ComponentsGroup>
    );
  };

  private renderFxInputGroup = () => {
    return (
      <ComponentsGroup title={'FxInput'} theme={this.theme}>
        <FxInputPlayground />
      </ComponentsGroup>
    );
  };

  private renderSwitchersGroup = () => {
    return (
      <ComponentsGroup title={'Switcher'} theme={this.theme}>
        <SwitcherPlayground />
      </ComponentsGroup>
    );
  };

  private renderCheckboxGroup = () => {
    return (
      <ComponentsGroup title={'Checkbox'} theme={this.theme}>
        <CheckboxPlayground />
      </ComponentsGroup>
    );
  };

  private renderRadioGroup = () => {
    return (
      <ComponentsGroup title={'Radio'} theme={this.theme}>
        <RadioPlayground />
      </ComponentsGroup>
    );
  };

  private renderToggleGroup = () => {
    return (
      <ComponentsGroup title={'Toggle'} theme={this.theme}>
        <TogglePlayground />
      </ComponentsGroup>
    );
  };

  private renderHintsGroup = () => {
    return (
      <div className={this.styles.hintGroup()}>
        <ComponentsGroup title={'Hint'} theme={this.theme}>
          <HintPlayground />
        </ComponentsGroup>
      </div>
    );
  };

  private renderToastGroup = () => {
    return (
      <ComponentsGroup title={'Toast'} theme={this.theme}>
        <ToastPlayground />
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
      <div className={this.styles.tooltipGroup()}>
        <ComponentsGroup title={'Tooltip'} theme={this.theme}>
          <Tooltip render={tooltipContent} pos="right middle" trigger={'opened'} disableAnimations>
            <Link icon={<IconQuestionCircleRegular16 />} />
          </Tooltip>
        </ComponentsGroup>
      </div>
    );
  };

  private renderPaging = () => {
    return (
      <ComponentsGroup title={'Paging'} theme={this.theme}>
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

  private renderSpinner = () => {
    return (
      <ComponentsGroup title={'Spinner'} theme={this.theme}>
        <Gapped gap={16} verticalAlign="top">
          <Spinner size="small" caption="small" />
          <Spinner size="medium" caption="medium" />
          <Spinner size="large" caption="large" />
        </Gapped>
      </ComponentsGroup>
    );
  };

  private renderLoader = () => {
    return (
      <ComponentsGroup title={'Loader'} theme={this.theme}>
        <Loader active delayBeforeSpinnerShow={0} caption="Загрузка">
          <div style={{ width: 280, minHeight: 48, padding: 8 }}>
            Заполнение бумажных платежных поручений требует внимания к реквизитам и кодам бюджетной классификации.
          </div>
        </Loader>
      </ComponentsGroup>
    );
  };

  private renderStickyStopElement = () => {
    return <div ref={this.stopEl} style={{ height: 30 }} />;
  };

  private getStickyStop = () => this.stopEl.current;
}
