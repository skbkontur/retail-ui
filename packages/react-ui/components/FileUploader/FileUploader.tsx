import React, { useCallback, useContext, useState } from 'react';
import {
  IUploadFilesProviderProps,
  withUploadFilesProvider,
} from '../../internal/FileAttacherBase/UploadFileControlProvider';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { UploadFileControl, IUploadFileControlProps, IUploadFileError } from '../../internal/FileAttacherBase';
import { UploadFileControlContext } from '../../internal/FileAttacherBase/UploadFileControlContext';
import { useValidationSetter } from '../../internal/FileAttacherBase/UploadFileControlHooks';

export interface IFileUploaderProps extends IUploadFileControlProps, IUploadFilesProviderProps {
  // Функция, через которую отправляем файлы.
  // Нужна для отслеживания статуса загрузки файла.
  request: (file: IUploadFile) => Promise<void>;
  onRequestSuccess: (fileId: string) => void;
  onRequestError: (fileId: string) => void;
  // TODO @mozalov: возможно стоит возвращать не строку, а какой-то объект валидации
  getFileValidationText?: (file: IUploadFile) => Promise<string>;
}

export const FileUploader = withUploadFilesProvider((props: IFileUploaderProps) => {
  const {request, controlError, getFileValidationText, onSelect, onRequestSuccess, onRequestError} = props;
  const {setFileStatus} = useContext(UploadFileControlContext);

  const [fileErrors, setFileErrors] = useState<IUploadFileError[]>([]);

  const switchToLoading = useCallback((fileId: string) => {
    setFileStatus(fileId, UploadFileStatus.Loading);
  }, [setFileStatus]);

  const switchToSuccess = useCallback((fileId: string) => {
    setFileStatus(fileId, UploadFileStatus.Uploaded);
    onRequestSuccess(fileId);
  }, [setFileStatus, onRequestSuccess]);

  const switchToError = useCallback((fileId: string) => {
    setFileStatus(fileId, UploadFileStatus.Error);
    onRequestError(fileId);
  }, [setFileStatus, onRequestError]);

  const upload = useCallback(async (file: IUploadFile) => {
    const {id} = file;
    switchToLoading(id);

    try {
      await request(file);
      switchToSuccess(id);
    } catch {
      switchToError(id);
    }
  }, [request, switchToSuccess, switchToLoading])

  const handleSelect = useCallback((files: IUploadFile[]) => {
    onSelect && onSelect(files);

    if (controlError) {
      return;
    }

    files.forEach(async file => {
      const validationMessage = getFileValidationText && await getFileValidationText(file);

      if (!validationMessage) {
        upload(file);
      } else {
        setFileErrors(state => [...state, {fileId: file.id, message: validationMessage}]);
      }
    });
  }, [upload, controlError, getFileValidationText, onSelect]);

  useValidationSetter(fileErrors);

  return (
    <UploadFileControl
      {...props}
      onSelect={handleSelect}
    />
  );
});
