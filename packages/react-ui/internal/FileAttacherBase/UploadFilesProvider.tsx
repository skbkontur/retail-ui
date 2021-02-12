import React, { ComponentType, PropsWithChildren, useCallback, useState } from 'react';
import { useContextValue } from '../../hooks/useContextValue';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { UploadFilesContext } from './UploadFilesContext';

export const UploadFilesProvider = (props: PropsWithChildren<{}>) => {
  const {children} = props;

  const [files, setFiles] = useState<IUploadFile[]>([]);

  const setFileStatus = useCallback((fileId: string, status: UploadFileStatus) => {
    setFiles(state => {
      const fileIndex = state.findIndex(file => file.id === fileId);
      if (fileIndex === -1) return state;

      const newState = [...state];
      newState[fileIndex] = {...state[fileIndex], status};

      return newState;
    });
  }, []);

  const externalSetFiles = useCallback((files: IUploadFile[]) => {
    setFiles(state => [...state, ...files]);
  }, [])

  const removeFile = useCallback((fileId: string) => {
    setFiles(state => state.filter(file => file.id !== fileId));
  }, []);

  return (
    <UploadFilesContext.Provider value={useContextValue({setFileStatus, files, setFiles: externalSetFiles, removeFile})}>
      {children}
    </UploadFilesContext.Provider>
  );
};

UploadFilesProvider.displayName = "UploadFilesProvider";

export const withUploadFilesProvider = <TProps extends object>(WrappedComponent: ComponentType<TProps>) => (props: TProps) => (
  <UploadFilesProvider>
    <WrappedComponent {...props} />
  </UploadFilesProvider>
);
