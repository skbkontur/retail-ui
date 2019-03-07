global.ReactSeleniumTesting = {
  attributeWhiteList: {
    error: [/.*/],
    warning: [/.*/],
    disabled: [/.*/],
    disablePortal: ['ComboBoxRenderer'],
    checked: [/.*/],
    items: ['RadioGroup'],
    value: [/.*/],
    customProp1: ['SomeComponent'],
    customProp2: [/^.+SomeComponent.+$/],
    activePage: ['Paging'],
    pagesCount: ['Paging'],
  },
  acceptAttribute: (prevAcceptResult, componentName, propName) => {
    if (componentName === 'Select' && propName === 'items') {
      return true;
    }
    return prevAcceptResult;
  },
};
