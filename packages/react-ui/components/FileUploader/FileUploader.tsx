import React, { useCallback, useContext, useState } from 'react';

import { IUploadFileControlProps, IUploadFileError, UploadFileControl } from '../../internal/UploadFileControl';
import {
  IUploadFilesProviderProps,
  withUploadFilesProvider,
} from '../../internal/UploadFileControl/UploadFileControlProvider';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { UploadFileControlContext } from '../../internal/UploadFileControl/UploadFileControlContext';
import { useValidationSetter } from '../../internal/UploadFileControl/UploadFileControlHooks';

export interface IFileUploaderProps extends IUploadFileControlProps, IUploadFilesProviderProps {
  // FIXME @mozalov: возможно стоит вынести асинхронные пропсы в отдельный пропс

  // Функция, через которую отправляем файлы.
  // Нужна для отслеживания статуса загрузки файла.
  request?: (file: IUploadFile) => Promise<void>;
  onRequestSuccess?: (fileId: string) => void;
  onRequestError?: (fileId: string) => void

  // срабатывает после выбора файлов и перед попыткой отправить в request
  getFileValidationText?: (file: IUploadFile) => Promise<string>;
}

export const FileUploader = withUploadFilesProvider((props: IFileUploaderProps) => {
  const { request, error, getFileValidationText, onSelect, onRequestSuccess, onRequestError } = props;
  const { setFileStatus } = useContext(UploadFileControlContext);

  const [fileErrors, setFileErrors] = useState<IUploadFileError[]>([]);

  const switchToLoading = useCallback(
    (fileId: string) => {
      setFileStatus(fileId, UploadFileStatus.Loading);
    },
    [setFileStatus],
  );

  const switchToSuccess = useCallback(
    (fileId: string) => {
      setFileStatus(fileId, UploadFileStatus.Uploaded);
      onRequestSuccess?.(fileId);
    },
    [setFileStatus, onRequestSuccess],
  );

  const switchToError = useCallback(
    (fileId: string) => {
      setFileStatus(fileId, UploadFileStatus.Error);
      onRequestError?.(fileId);
    },
    [setFileStatus, onRequestError],
  );

  const upload = useCallback(
    async (file: IUploadFile) => {
      const { id } = file;
      switchToLoading(id);

      try {
        await request?.(file);
        switchToSuccess(id);
      } catch {
        switchToError(id);
      }
    },
    [request, switchToSuccess, switchToLoading],
  );

  const handleSelect = useCallback(
    (files: IUploadFile[]) => {
      onSelect?.(files);

      if (error) {
        return;
      }

      files.forEach(async (file) => {
        const validationMessage = getFileValidationText && (await getFileValidationText(file));

        if (!validationMessage) {
          upload(file);
        } else {
          setFileErrors((state) => [...state, { fileId: file.id, message: validationMessage }]);
        }
      });
    },
    [upload, error, getFileValidationText, onSelect],
  );

  useValidationSetter(fileErrors);

  return <UploadFileControl {...props} onSelect={handleSelect} />;
});
