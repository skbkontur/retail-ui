import React from 'react';

import { DropZone } from '../DropZone';

export default {
  title: 'DropZone',
  decorators: [(storyFn: () => JSX.Element) => <div style={{ padding: '10px' }}>{storyFn()}</div>],
};


const successRequest = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

export const DropZoneDefault = () => <DropZone request={successRequest} />;

export const DropZoneWithCustomContent = () => <DropZone request={successRequest} customContent={"custom text"} />;
export const DropZoneWithCustomContentAndSize = () => <DropZone
  request={successRequest}
  customContent={"custom text"}
  width={532}
  height={288}
/>;
