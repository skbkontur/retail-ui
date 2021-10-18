import React, { ComponentType, PropsWithChildren, useCallback, useState } from 'react';

import { useMemoObject } from '../../hooks/useMemoObject';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';

import { UploadFileControlContext } from './UploadFileControlContext';
import { IUploadFileControlProps } from './UploadFileControl';
import { UploadFileControlValidationResult } from './UploadFileControlValidationResult';
import { useControlLocale } from './UploadFileControlHooks';

export interface IUploadFilesProviderProps {
  onValueChange?: (files: IUploadFile[]) => void;
  onRemove?: (fileId: string) => void;
}

const updateFile = (
  files: IUploadFile[],
  fileId: string,
  getFileUpdatedProps: (file: IUploadFile) => Partial<IUploadFile>,
): IUploadFile[] => {
  const fileIndex = files.findIndex((file) => file.id === fileId);
  if (fileIndex === -1) return files;

  const newFiles = [...files];
  const file = files[fileIndex];

  const updatedProps = getFileUpdatedProps(file);

  newFiles[fileIndex] = {
    ...file,
    ...updatedProps,
  };

  return newFiles;
};

export const UploadFileControlProvider = (props: PropsWithChildren<IUploadFilesProviderProps>) => {
  const { children, onValueChange, onRemove } = props;

  // в files попадат только те, что попали в onSelect
  const [files, setFiles] = useState<IUploadFile[]>([]);
  const locale = useControlLocale();

  const setFileStatus = useCallback(
    (fileId: string, status: UploadFileStatus) => {
      setFiles((files) => {
        return updateFile(files, fileId, (file) => {
          return {
            status,
            validationResult:
              status === UploadFileStatus.Error
                ? UploadFileControlValidationResult.error(locale.requestErrorText)
                : file.validationResult,
          };
        });
      });
    },
    [locale],
  );

  const handleExternalSetFiles = useCallback(
    (files: IUploadFile[]) => {
      setFiles((state) => {
        const newFiles = [...state, ...files];
        onValueChange?.(newFiles);
        return newFiles;
      });
    },
    [onValueChange],
  );

  const removeFile = useCallback(
    (fileId: string) => {
      onRemove?.(fileId);
      setFiles((state) => {
        const newFiles = state.filter((file) => file.id !== fileId);
        onValueChange?.(newFiles);
        return newFiles;
      });
    },
    [onValueChange, onRemove],
  );

  const setFileValidationResult = useCallback((fileId: string, validationResult: UploadFileControlValidationResult) => {
    setFiles((files) => updateFile(files, fileId, () => ({ validationResult })));
  }, []);

  return (
    <UploadFileControlContext.Provider
      value={useMemoObject({
        setFileStatus,
        files,
        setFiles: handleExternalSetFiles,
        removeFile,
        setFileValidationResult,
      })}
    >
      {children}
    </UploadFileControlContext.Provider>
  );
};

UploadFileControlProvider.displayName = 'UploadFileControlProvider';

export const withUploadFilesProvider =
  <TProps extends IUploadFileControlProps>(WrappedComponent: ComponentType<TProps>) =>
  (props: TProps) =>
    (
      <UploadFileControlProvider {...props}>
        <WrappedComponent {...props} />
      </UploadFileControlProvider>
    );
