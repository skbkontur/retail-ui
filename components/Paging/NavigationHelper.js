// @flow

class NavigationHelper {
  static _keyDescription = null;

  static checkKeyPressed(event: SyntheticKeyboardEvent): boolean {
    return NavigationHelper._getKeyDescription().checkPressed(event);
  }

  static getKeyName(): string {
    return NavigationHelper._getKeyDescription().name;
  }

  static _getKeyDescription() {
    let helper = NavigationHelper;
    return (
      helper._keyDescription ||
      (helper._keyDescription = helper._getKeyDescriptionInternal())
    );
  }

  static _getKeyDescriptionInternal() {
    const isMac = navigator.platform.includes('Mac');
    return isMac
      ? {
          name: 'Alt',
          checkPressed: (event: SyntheticKeyboardEvent) => event.altKey
        }
      : {
          name: 'Ctrl',
          checkPressed: (event: SyntheticKeyboardEvent) => event.ctrlKey
        };
  }
}

export default NavigationHelper;
