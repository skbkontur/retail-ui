export var CUSTOM_EVENTS = {
  VIEW_CHANGE: 'view-change',
  COPY: 'copy',
  SHOW_SOURCE_CODE: 'show-source-code',
  SHARE: 'share',
  REFRESH: 'refresh'
};
export function dispatchCustomEvent(eventName, data) {
  document.dispatchEvent(new CustomEvent(eventName, {
    detail: data,
    bubbles: true
  }));
}