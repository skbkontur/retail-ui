import * as Components from '../../index';
import * as Calendar from '../../internal/Calendar';
import * as CustomComboBox from '../../internal/CustomComboBox';
import * as DateSelect from '../../internal/DateSelect';
import * as InputLikeText from '../../internal/InputLikeText';
import * as InternalMenu from '../../internal/InternalMenu';
import * as MaskedInput from '../../internal/MaskedInput';
import * as Menu from '../../internal/Menu';
import * as Popup from '../../internal/Popup';
import * as MobilePopupDataTid from '../../internal/MobilePopup';
import * as PopupMenu from '../../internal/PopupMenu';

const allComponents: any = {
  ...Components,
  ...Calendar,
  ...CustomComboBox,
  ...DateSelect,
  ...InputLikeText,
  ...InternalMenu,
  ...MaskedInput,
  ...Menu,
  ...Popup,
  ...MobilePopupDataTid,
  ...PopupMenu,
};

const tids = Object.keys(allComponents).filter((componentName) => {
  if (componentName.match(/datatids/i)) {
    return componentName;
  }
});

export const componentsDataTids: { [key: string]: { [key: string]: string } } = tids.reduce((accum, currTid) => {
  const componentName = currTid.replace('DataTids', '');
  return {
    ...accum,
    [componentName]: {
      [currTid]: Object.entries(allComponents[currTid])
        .map((x) => x.join(': '))
        .join(', \n'),
    },
  };
}, {});
