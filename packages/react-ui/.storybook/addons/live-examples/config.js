import { addons } from '@storybook/manager-api';
export var LIVE_EXAMPLES_ADDON_ID = 'storybook-addon-live-examples';
export var getConfig = function getConfig() {
  return addons.getConfig()[LIVE_EXAMPLES_ADDON_ID];
};
export var configValue = function configValue(key, defaultValue) {
  return getConfig()[key] || defaultValue;
};