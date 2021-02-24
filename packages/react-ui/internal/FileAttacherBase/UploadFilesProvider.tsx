import React, { ComponentType, PropsWithChildren, useCallback, useState } from 'react';
import { useContextValue } from '../../hooks/useContextValue';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { UploadFilesContext } from './UploadFilesContext';
import { FileAttacherBaseProps } from './FileAttacherBase';
import { defaultFileValidate } from './FileValidators';
import { ValidationResult } from './ValidationResult';

export const UploadFilesProvider = (props: PropsWithChildren<FileAttacherBaseProps>) => {
  const {children, onChange, allowedFileTypes = [], fileValidate = defaultFileValidate} = props;

  const [files, setFiles] = useState<IUploadFile[]>([]);

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
      const validationResult = fileValidate(newFiles, allowedFileTypes);
      // FIXME @mozalov: вероятно стоит передавать в onChange только валидные файлы
      onChange && onChange(newFiles);
      return newFiles;
    });
  }, [])

  const removeFile = useCallback((fileId: string) => {
    setFiles(state => {
      const newFiles = state.filter(file => file.id !== fileId);
      // FIXME @mozalov: вероятно стоит передавать в onChange только валидные файлы
      onChange && onChange(newFiles);
      return newFiles;
    });
  }, []);

  return (
    <UploadFilesContext.Provider value={useContextValue({
      setFileStatus,
      files,
      setFiles: externalSetFiles,
      removeFile
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
