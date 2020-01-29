import React from 'react';
import IssueList from '../IssueList/IssueList';
// @ts-ignore
import OriginalPathlineRenderer from 'react-styleguidist/lib/rsg-components/Pathline/PathlineRenderer';

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
