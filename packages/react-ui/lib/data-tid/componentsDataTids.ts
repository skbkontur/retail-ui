import * as Components from '../../index';

const tids = Object.keys(Components).filter((componentName) => {
  if (componentName.match(/datatids/i)) {
    return componentName;
  }
  return null;
});

export const componentsDataTids: { [key: string]: { [key: string]: string } } = tids.reduce((accum, currTid) => {
  const componentName = currTid.replace('DataTids', '');
  return {
    ...accum,
    [componentName]: {
      // @ts-ignore
      // eslint-disable-next-line import/namespace
      [currTid]: Object.entries(Components[currTid])
        .map((x) => x.join(': '))
        .join(', \n'),
    },
  };
}, {});
