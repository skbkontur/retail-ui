import React, { ComponentType, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useContextValue } from '../../hooks/useContextValue';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { UploadFilesContext } from './UploadFilesContext';
import { FileAttacherBaseProps } from './FileAttacherBase';
import { ValidationResult } from './ValidationResult';

// FIXME @mozalov: вынести валидацию вне файла

export const UploadFilesProvider = (props: PropsWithChildren<FileAttacherBaseProps>) => {
  const {children, onChange, fileError = []} = props;

  const [files, setFiles] = useState<IUploadFile[]>([]);

  useEffect(() => {
    fileError.forEach(({fileId, message}) => {
      const fileIndex = files.findIndex(file => file.id === fileId);
      if (fileIndex === -1) return;

      const newFiles = [...files];
      const file = files[fileIndex];
      newFiles[fileIndex] = {
        ...file,
        validationResult: ValidationResult.error(message)
      };

      setFiles(newFiles);
    });
  }, [fileError]);

  const setFileStatus = useCallback((fileId: string, status: UploadFileStatus) => {
    setFiles(files => {
      const fileIndex = files.findIndex(file => file.id === fileId);
      if (fileIndex === -1) return files;

      const newFiles = [...files];
      const file = files[fileIndex];
      newFiles[fileIndex] = {
        ...file,
        status,
        validationResult: status === UploadFileStatus.Error
          ? ValidationResult.error('Файл не удалось загрузить на сервер, повторите попытку позже')
          : file.validationResult
      };

      return newFiles;
    });
  }, []);

  const externalSetFiles = useCallback((files: IUploadFile[]) => {
    setFiles(state => {
      const newFiles = [...state, ...files];
      onChange && onChange(newFiles);
      return newFiles;
    });
  }, [])

  const removeFile = useCallback((fileId: string) => {
    setFiles(state => {
      const newFiles = state.filter(file => file.id !== fileId);
      onChange && onChange(newFiles);
      return newFiles;
    });
  }, []);

  return (
    <UploadFilesContext.Provider value={useContextValue({
      setFileStatus,
      files,
      setFiles: externalSetFiles,
      removeFile,
      fileError
    })}>
      {children}
    </UploadFilesContext.Provider>
  );
};

UploadFilesProvider.displayName = "UploadFilesProvider";

export const withUploadFilesProvider = <TProps extends FileAttacherBaseProps>(WrappedComponent: ComponentType<TProps>) => (props: TProps) => (
  <UploadFilesProvider {...props}>
    <WrappedComponent {...props} />
  </UploadFilesProvider>
);
