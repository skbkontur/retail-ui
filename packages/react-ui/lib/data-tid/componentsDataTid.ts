import * as Components from '../../index';

const tids = Object.keys(Components).filter((componentName) => {
  if (componentName.match(/datatid/i)) {
    return componentName;
  }
});

export const componentsDataTid: { [key: string]: { [key: string]: string } } = tids.reduce((accum, currTid) => {
  return {
    ...accum,
    [Components[currTid].origin]: {
      [currTid]: Object.entries(Components[currTid])
        .map((x) => x.join(':'))
        .join(', \n'),
    },
  };
}, {});
