import * as Components from '../../index';

const tids = Object.keys(Components).filter((componentName) => {
  if (componentName.match(/datatids/i)) {
    return componentName;
  }
  return null;
});

export const componentsDataTids: { [key: string]: { [key: string]: string } } = tids.reduce((accum, currTid) => {
  return {
    ...accum,
    // eslint-disable-next-line import/namespace
    [currTid.replace('DataTids', '')]: Object.entries(Components[currTid as keyof typeof Components]),
  };
}, {});
