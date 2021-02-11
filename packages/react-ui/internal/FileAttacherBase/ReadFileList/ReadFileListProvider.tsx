import React, { ComponentType, PropsWithChildren, useCallback, useState } from 'react';
import { ReadFileItemStatus, ReadFileListContext } from './ReadFileListContext';
import { useContextValue } from '../../../hooks/useContextValue';

export const ReadFileListProvider = (props: PropsWithChildren<{}>) => {
  const {children} = props;

  const [fileStatusesMap, setFileStatusesMap] = useState<{[fileId: number]: ReadFileItemStatus}>({});

  const getFileStatus = useCallback((fileId: number) => (
    fileStatusesMap[fileId] || ReadFileItemStatus.Default
  ), [fileStatusesMap]);

  const setFileStatus = useCallback((fileId: number, status: ReadFileItemStatus) => {
    setFileStatusesMap(state => ({
      ...state,
      [fileId]: status
    }));
  }, [fileStatusesMap]);

  return (
    <ReadFileListContext.Provider value={useContextValue({getFileStatus, setFileStatus})}>
      {children}
    </ReadFileListContext.Provider>
  );
};

ReadFileListProvider.displayName = "ReadFileListProvider";

export const withReadFileListProvider = <TProps extends object>(WrappedComponent: ComponentType<TProps>) => (props: TProps) => (
  <ReadFileListProvider>
    <WrappedComponent {...props} />
  </ReadFileListProvider>
);
