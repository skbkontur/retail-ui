import React, { ComponentType, PropsWithChildren, useCallback, useState } from 'react';
import { useContextValue } from '../../hooks/useContextValue';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { UploadFilesContext } from './UploadFilesContext';
import { FileAttacherBaseProps, FileAttacherBaseValidationError } from './FileAttacherBase';
import { ValidationResult } from './ValidationResult';

export const UploadFilesProvider = (props: PropsWithChildren<FileAttacherBaseProps>) => {
  const {children, maxFilesCount} = props;

  const [files, setFiles] = useState<IUploadFile[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult<FileAttacherBaseValidationError>>(ValidationResult.ok());

  const setFileStatus = useCallback((fileId: string, status: UploadFileStatus) => {
    setFiles(state => {
      const fileIndex = state.findIndex(file => file.id === fileId);
      if (fileIndex === -1) return state;

      const newState = [...state];
      newState[fileIndex] = {...state[fileIndex], status};

      return newState;
    });
  }, []);

  const controlValidate = useCallback((newFiles: IUploadFile[]): ValidationResult<FileAttacherBaseValidationError> => {
    if (maxFilesCount && newFiles.length + files.length > maxFilesCount) {
      return ValidationResult.error(FileAttacherBaseValidationError.MaxFilesError);
    }
    return ValidationResult.ok();
  }, [maxFilesCount, files]);

  const validate = useCallback((files: IUploadFile[]) => {
    const controlValidationResult = controlValidate(files);
    setValidationResult(controlValidationResult);
  }, [controlValidate]);

  const externalSetFiles = useCallback((files: IUploadFile[]) => {
    setFiles(state => {
      const newFiles = [...state, ...files];
      validate(newFiles);
      return newFiles;
    });
  }, [])

  const removeFile = useCallback((fileId: string) => {
    setFiles(state => {
      const newFiles = state.filter(file => file.id !== fileId);
      validate(newFiles);
      return newFiles;
    });
  }, [validate]);

  return (
    <UploadFilesContext.Provider value={useContextValue({
      setFileStatus,
      files,
      setFiles: externalSetFiles,
      removeFile,
      validationResult
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
