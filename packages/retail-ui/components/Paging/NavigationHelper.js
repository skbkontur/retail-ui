

let keyDescription = null;

const getKeyDescription = () =>
  keyDescription || (keyDescription = createKeyDescription());

const createKeyDescription = () =>
  navigator.platform.includes('Mac')
    ? { name: 'Alt', checkPressed: event => event.altKey }
    : { name: 'Ctrl', checkPressed: event => event.ctrlKey };

export default {
  getKeyName() {
    return getKeyDescription().name;
  },
  checkKeyPressed(event: SyntheticKeyboardEvent<>) {
    return getKeyDescription().checkPressed(event);
  }
};
