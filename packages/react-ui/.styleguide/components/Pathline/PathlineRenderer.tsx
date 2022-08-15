import React from 'react';
import IssueList from '../IssueList/IssueList';
import OriginalPathlineRenderer from 'react-styleguidist/lib/client/rsg-components/Pathline/PathlineRenderer';

interface Props {
  children: string;
}

export const PathlineRenderer = (props: Props) => {
  const path = props.children;
  return (
    <div>
      <OriginalPathlineRenderer>{path}</OriginalPathlineRenderer>
      <IssueList componentPath={path} />
    </div>
  );
};

export default PathlineRenderer;
