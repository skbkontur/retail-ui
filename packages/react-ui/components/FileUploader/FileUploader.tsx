import React, { useCallback, useContext, useState } from 'react';
import {
  IUploadFilesProviderProps,
  withUploadFilesProvider,
} from '../../internal/FileAttacherBase/UploadFilesProvider';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { FileAttacherBase, IFileAttacherBaseProps, FileError } from '../../internal/FileAttacherBase';
import { UploadFilesContext } from '../../internal/FileAttacherBase/UploadFilesContext';
import { useValidationSetter } from '../../internal/FileAttacherBase/FileAttacherBaseHooks';

// FIXME @mozalov: добавить типы ошибок
// FIXME @mozalov: а как обрабатываются сейчас асинхронные ошибки?

export type RequestFunction = (
  file: IUploadFile,
  onSuccess: () => void,
  onError: (error: object) => void,
) => void;

export interface IFileUploaderProps extends IFileAttacherBaseProps, IUploadFilesProviderProps {
  request: RequestFunction;
  // FIXME @mozalov: мб возвращать не строку, а объект валидации?
  fileValidation?: (file: IUploadFile) => Promise<string>;
}

export const FileUploader = withUploadFilesProvider((props: IFileUploaderProps) => {
  const {request, controlError, fileValidation, onSelect} = props;
  const {setFileStatus} = useContext(UploadFilesContext);

  const [fileErrors, setFileErrors] = useState<FileError[]>([]);

  const handleStart = useCallback((fileId: string) => {
    setFileStatus(fileId, UploadFileStatus.Loading);
  }, [setFileStatus]);

  const handleSuccess = useCallback((fileId: string) => {
    setFileStatus(fileId, UploadFileStatus.Uploaded);
  }, [setFileStatus]);

  const handleError = useCallback((fileId: string) => {
    setFileStatus(fileId, UploadFileStatus.Error);
  }, [setFileStatus]);

  const upload = useCallback((file: IUploadFile) => {
    const {id} = file;
    handleStart(id);
    request(file, () => handleSuccess(id), () => handleError(id));
  }, [request, handleSuccess, handleError, handleStart])

  const handleSelect = useCallback((files: IUploadFile[]) => {
    onSelect && onSelect(files);

    if (controlError) {
      return;
    }

    files.forEach(async file => {
      const validationMessage = fileValidation && await fileValidation(file);

      if (!validationMessage) {
        upload(file);
      } else {
        setFileErrors(state => [...state, {fileId: file.id, message: validationMessage}]);
      }
    });
  }, [upload, controlError, fileValidation, onSelect]);

  useValidationSetter(fileErrors);

  return (
    <FileAttacherBase
      {...props}
      onSelect={handleSelect}
    />
  );
});
