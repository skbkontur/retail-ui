import React from 'react';
import OriginalPathlineRenderer from 'react-styleguidist/lib/client/rsg-components/Pathline/PathlineRenderer';

import GuidesLink from '../GuidesLink/GuidesLink';

interface Props {
  children: string;
}

export const PathlineRenderer = (props: Props) => {
  const path = props.children;
  const componentName = path.replace('.tsx', '').split(/\\|\//).reverse()[0];

  return (
    <div>
      <OriginalPathlineRenderer>{path}</OriginalPathlineRenderer>
      <GuidesLink componentName={componentName} />
    </div>
  );
};

export default PathlineRenderer;
