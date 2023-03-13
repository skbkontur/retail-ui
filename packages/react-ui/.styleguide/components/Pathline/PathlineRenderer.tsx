import React from 'react';
import GuidesLink from '../GuidesLink/GuidesLink';
import OriginalPathlineRenderer from 'react-styleguidist/lib/client/rsg-components/Pathline/PathlineRenderer';

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
