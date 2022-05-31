Аттрибут data-tid экспортируется для компонентов в виде объекта.
При необходимости добавления аттрибута data-tid необходимо создать пулл-реквест

Список экспортируемых data-tid:

```jsx harmony
import {DataTid} from './DataTid';
<DataTid />
// const autocompleteDataTid = {
//   root: 'Autocomplete__root',
// };
// const buttonDataTid = {
//   root: 'Button__root',
// };
// const centerDataTid = {
//   root: 'Center__root',
// };
// const checkboxDataTid = {
//   root: 'Checkbox__root',
// };
// const currencyInputDataTid = {
//   root: 'CurrencyInput__root',
// };
// const currencyLabelDataTid = {
//   root: 'CurrencyLabel__root',
// };
// const dataPickerDataTid = {
//   root: 'DatePicker__root',
// };
// const pickerDataTid = {
//   root: 'Picker__root',
//   todayWrapper: 'Picker__todayWrapper',
// };
// const dropdownDataTid = {
//   root: 'Dropdown__root',
// };
// const fileUploaderDataTid = {
//   root: 'FileUploader__root',
//   content: 'FileUploader__content',
//   link: 'FileUploader__link',
// };
// const fxInputDataTid = {
//   root: 'FxInput__root',
// };
// const gappedDataTid = {
//   vertical: 'Gapped__vertical',
//   horizontal: 'Gapped__horizontal',
// };
// const globalLoaderDataTid = {
//   root: 'GlobalLoader',
// };
// const groupDataTid = {
//   root: 'Group__root',
// };
// const inputDataTid = {
//   root: 'Input__root',
// };
// const linkDataTid = {
//   root: 'Link__root',
// };
// const menuHeaderDataTid = {
//   root: 'MenuHeader__root',
// };
// const menuItemDataTid = {
//   root: 'MenuItem__root',
//   comment: 'MenuItem__comment',
// };
// const menuSeparatorDataTid = {
//   root: 'MenuSeparator__root',
// };
// const modalDataTid = {
//   container: 'modal-container',
//   content: 'modal-content',
// };
// const modalCloseDataTid = {
//   close: 'modal-close',
// };
// const modalFooterDataTid = {
//   root: 'ModalFooter__root',
// };
// const modalHeaderDataTid = {
//   root: 'ModalHeader__root',
// };
// const pagingDataTid = {
//   root: 'Paging__root',
//   dots: 'Paging__dots',
//   forwardLink: 'Paging__forwardLink',
//   pageLinkWrapper: 'Paging__pageLinkWrapper',
//   pageLink: 'Paging__pageLink',
// };
// const passwordInputDataTid = {
//   root: 'PasswordInput',
//   capsLockDetector: 'PasswordInputCapsLockDetector',
//   eyeIcon: 'PasswordInputEyeIcon',
// };
// const radioDataTid = {
//   root: 'Radio__root',
// };
// const radioGroupDataTid = {
//   root: 'RadioGroup__root',
// };
// const scrollContainerDataTid = {
//   root: 'ScrollContainer__root',
//   inner: 'ScrollContainer__inner',
// };
// const selectDataTid = {
//   root: 'Select__root',
// };
// const sidePageDataTid = {
//   root: 'SidePage__root',
//   container: 'SidePage__container',
// };
// const sidePageBodyDataTid = {
//   root: 'SidePageBody__root',
// };
// const sidePageContainerDataTid = {
//   root: 'SidePageContainer__root',
// };
// const sidePageFooterDataTid = {
//   root: 'SidePageFooter__root',
// };
// const sidePageHeaderDataTid = {
//   root: 'SidePageHeader__root',
//   close: 'SidePage__close',
// };
// const spinnerDataTid = {
//   root: 'Spinner__root',
// };
// const stickyDataTid = {
//   root: 'Spinner__root',
// };
// const switcherDataTid = {
//   root: 'Switcher__root',
// };
// const indicatorDataTid = {
//   root: 'Indicator__root',
// };
// const tabDataTid = {
//   root: 'Tab__root',
// };
// const tabsDataTid = {
//   root: 'Tabs__root',
// };
// const textareaDataTid = {
//   root: 'Textarea__root',
// };
// const textareaCounterDataTid = {
//   root: 'TextareaCounter__root',
// };
// const toastStaticDataTid = {
//   root: 'StaticToast',
// };
// const toastViewDataTid = {
//   root: 'ToastView__root',
//   action: 'ToastView__action',
//   close: 'ToastView__close',
// };
// const toggleDataTid = {
//   root: 'Toggle__root',
// };
// const tokenDataTid = {
//   root: 'Token__root',
// };
// const tokenInputDataTid = {
//   root: 'TokenInput__root',
// };
// const tokenInputMenuDataTid = {
//   root: 'TokenInputMenu__root',
// };
// const tooltipDataTid = {
//   root: 'Tooltip__root',
// };
// const tooltipMenuDataTid = {
//   root: 'TooltipMenu__root',
// };
// const calendarDataTid = {
//   root: 'Calendar',
// };
// const monthViewDataTid = {
//   month: 'MonthView__month',
//   headerMonth: 'MonthView__headerMonth',
//   headerYear: 'MonthView__headerYear',
// };
// const comboBoxMenuDataTid = {
//   loading: 'ComboBoxMenu__loading',
//   failed: 'ComboBoxMenu__failed',
//   notFound: 'ComboBoxMenu__notFound',
//   items: 'ComboBoxMenu__items',
//   item: 'ComboBoxMenu__item',
// };
// const comboBoxViewDataTid = {
//   root: 'ComboBoxView__root',
// };
// const dateSelectDataTid = {
//   caption: 'DateSelect__caption',
//   menuItem: 'DateSelect__menuItem',
// };
// const fileUploaderFileDataTid = {
//   file: 'FileUploader__file',
//   fileTooltip: 'FileUploader__fileTooltip',
//   fileName: 'FileUploader__fileName',
//   fileSize: 'FileUploader__fileSize',
//   fileIcon: 'FileUploader__fileIcon',
// };
// const fileUploaderFileListDataTid = {
//   fileList: 'FileUploader__fileList',
// };
// const inputLikeTextDataTid = {
//   root: 'InputLikeText__root',
//   input: 'InputLikeText__input',
// };
// const internalMenuDataTid = {
//   root: 'InternalMenu__root',
// };
// const maskedInputDataTid = {
//   root: 'MaskedInput__root',
// };
// const menuDataTid = {
//   root: 'Menu__root',
// };
// const mobilePopupDataTid = {
//   root: 'MobilePopup__root',
//   container: 'MobilePopup__container',
// };
// const popupDataTid = {
//   content: 'PopupContent',
//   contentInner: 'PopupContentInner',
// };
// const popupPinDataTid = {
//   root: 'PopupPin__root',
// };
// const popupMenuDataTid = {
//   root: 'PopupMenu_root',
//   caption: 'PopupMenu__caption',
// };
```
