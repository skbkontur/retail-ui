import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { InternalDate } from '../../../lib/date/InternalDate';
import InternalDateGetter from '../../../lib/date/InternalDateGetter';
import { InternalDateConstructorProps, InternalDateSeparator } from '../../../lib/date/types';
import Calendar from '../../Calendar';
import styles from '../../DatePicker/Picker.less';
import DateSelect from '../../DateSelect';
import DropdownContainer from '../../DropdownContainer/DropdownContainer';
import LocaleProvider, { LangCodes, LocaleControls } from '../../LocaleProvider';
import { defaultLangCode } from '../../LocaleProvider/constants';
import DatePicker, { DatePickerProps } from '../DatePicker';
import { DatePickerLocaleHelper } from '../locale';

const handleChange = () => undefined;
const renderDatePicker = (props?: Partial<DatePickerProps<string>>) =>
  mount<DatePicker>(<DatePicker onChange={handleChange} value="02.07.2017" {...props} />);
const renderDatePickerLocale = ({
  props = {},
  langCode = defaultLangCode,
  locale = {},
}: {
  props?: Partial<DatePickerProps<string>>;
  langCode?: LangCodes;
  locale?: LocaleControls;
} = {}) =>
  mount<LocaleProvider>(
    <LocaleProvider langCode={langCode} locale={locale}>
      <DatePicker onChange={handleChange} value="02.07.2017" {...props} />
    </LocaleProvider>,
  );
const generateSelector = (name: keyof typeof styles) => `.${styles[name]}`;

describe('DatePicker', () => {
  it('renders', () => {
    const datePicker = renderDatePicker();
    expect(datePicker.exists());
  });

  it('renders date select when open', () => {
    const datePicker = renderDatePicker();
    datePicker.setState({ opened: true });
    const dateSelect = datePicker.find('DateSelect');
    expect(dateSelect.exists());
  });

  it('correctly passes max and min date to year select', () => {
    const datePicker = renderDatePicker({
      minDate: '21.03.2017',
      maxDate: '15.08.2020',
    });
    datePicker.setState({ opened: true });
    const yearSelect = datePicker.find(DateSelect).findWhere(node => node.props().type === 'year');
    expect(yearSelect.prop('minValue')).toEqual(2017);
    expect(yearSelect.prop('maxValue')).toEqual(2020);
  });

  it('correctly initial month/year with min date', () => {
    const datePicker = renderDatePicker({
      minDate: '21.01.2099',
    });

    datePicker.setState({ opened: true });

    const calendar = datePicker.find(Calendar);

    expect(calendar.prop('initialMonth')).toBe(6);
    expect(calendar.prop('initialYear')).toBe(2017);
  });

  it('correctly initial month/year with max date', () => {
    const datePicker = renderDatePicker({
      maxDate: '15.11.1959',
    });

    datePicker.setState({ opened: true });

    const calendar = datePicker.find(Calendar);

    expect(calendar.prop('initialMonth')).toBe(6);
    expect(calendar.prop('initialYear')).toBe(2017);
  });

  it("doesn't open on focus if disabled", () => {
    const datePicker = renderDatePicker({
      disabled: true,
    });
    datePicker.instance().focus();
    datePicker.update();
    expect(datePicker.find(DropdownContainer)).toHaveLength(0);
  });

  it('closes when become disabled', () => {
    const datePicker = renderDatePicker();
    datePicker.instance().focus();
    datePicker.setProps({ disabled: true });
    datePicker.update();
    expect(datePicker.find(DropdownContainer)).toHaveLength(0);
  });

  describe('Locale', () => {
    const getTextLoading = (wrapper: ReactWrapper<any>): string => {
      return wrapper.find(generateSelector('todayWrapper')).text();
    };
    const getToday = (args: InternalDateConstructorProps) =>
      new InternalDate(args)
        .setComponents(InternalDateGetter.getTodayComponents())
        .toString({ withPad: true, withSeparator: true });

    it('render without LocaleProvider', () => {
      const datePicker = renderDatePicker({ enableTodayLink: true });
      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;
      const today = getToday({ langCode: defaultLangCode });

      datePicker.setState({ opened: true });
      datePicker.update();

      expect(getTextLoading(datePicker)).toBe(`${expectedText} ${today}`);
    });

    it('render default locale', () => {
      const wrapper = renderDatePickerLocale({ props: { enableTodayLink: true } });
      const datePicker = wrapper.find(DatePicker).instance();
      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;
      const today = getToday({ langCode: defaultLangCode });

      datePicker.setState({ opened: true });
      wrapper.update();

      expect(getTextLoading(wrapper)).toBe(`${expectedText} ${today}`);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = renderDatePickerLocale({ props: { enableTodayLink: true }, langCode: LangCodes.en_EN });
      const datePicker = wrapper.find(DatePicker).instance();
      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_EN).today;
      const today = getToday({ langCode: LangCodes.en_EN });

      datePicker.setState({ opened: true });
      wrapper.update();

      expect(getTextLoading(wrapper)).toBe(`${expectedText} ${today}`);
    });

    it('render custom locale', () => {
      const wrapper = renderDatePickerLocale({
        props: { enableTodayLink: true },
        langCode: LangCodes.en_EN,
        locale: { DatePicker: { separator: InternalDateSeparator.Dash } },
      });
      const datePicker = wrapper.find(DatePicker).instance();
      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_EN).today;
      const today = getToday({ langCode: LangCodes.en_EN, separator: InternalDateSeparator.Dash });

      datePicker.setState({ opened: true });
      wrapper.update();

      expect(getTextLoading(wrapper)).toBe(`${expectedText} ${today}`);
    });

    it('updates when langCode changes', () => {
      const wrapper = renderDatePickerLocale({
        props: { enableTodayLink: true },
      });
      const datePicker = wrapper.find(DatePicker).instance();
      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_EN).today;
      const today = getToday({ langCode: LangCodes.en_EN });

      wrapper.setProps({ langCode: LangCodes.en_EN });
      datePicker.setState({ opened: true });
      wrapper.update();

      expect(getTextLoading(wrapper)).toBe(`${expectedText} ${today}`);
    });
  });
});
