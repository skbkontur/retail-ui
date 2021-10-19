import React, { useCallback, useContext, useState } from 'react';

import {
  IFileUploaderControlProps,
  IFileUploaderFileError,
  FileUploaderControl,
  FileUploaderControlRef,
} from '../../internal/FileUploaderControl';
import {
  IUploadFilesProviderProps,
  withFileUploaderControlProvider,
} from '../../internal/FileUploaderControl/FileUploaderControlProvider';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { FileUploaderControlContext } from '../../internal/FileUploaderControl/FileUploaderControlContext';
import { useValidationSetter } from '../../internal/FileUploaderControl/FileUploaderControlHooks';

export interface IFileUploaderProps extends IFileUploaderControlProps, IUploadFilesProviderProps {
  // FIXME @mozalov: возможно стоит вынести асинхронные пропсы в отдельный пропс

  // Функция, через которую отправляем файлы.
  // Нужна для отслеживания статуса загрузки файла.
  request?: (file: IUploadFile) => Promise<void>;
  onRequestSuccess?: (fileId: string) => void;
  onRequestError?: (fileId: string) => void

  // срабатывает после выбора файлов и перед попыткой отправить в request
  getFileValidationText?: (file: IUploadFile) => Promise<string>;
}

const _FileUploader = React.forwardRef<FileUploaderControlRef, IFileUploaderProps>((props: IFileUploaderProps, ref) => {
  const { request, error, getFileValidationText, onSelect, onRequestSuccess, onRequestError } = props;
  const { setFileStatus } = useContext(FileUploaderControlContext);

  const [fileErrors, setFileErrors] = useState<IFileUploaderFileError[]>([]);

  const isAsync = !!request;

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
    [request, switchToSuccess, switchToLoading, switchToError],
  );

  // FIXME @mozalov: подумать, мб стоит некоторый код перегруппировать

  // FIXME @mozalov: кажется handleSelect все же handleSelect и верхние методы лучше оставить тут.
  //  чтобы можно было валидировать дропзону по-другому

  // FIXME @mozalov: подумать, а как валидировать дропзону и уже от этого отталкиваться в плане выноса общих механизмов валидации
  // FIXME @mozalov: для дропзоны нуно поддержать getFileValidationText

  const handleSelect = useCallback(
    (files: IUploadFile[]) => {
      onSelect?.(files);

      // FIXME @mozalov: норм, что сейчас не валидируем файлы при error?

      if (error) {
        return;
      }

      files.forEach(async (file) => {
        const validationMessage = getFileValidationText && (await getFileValidationText(file));

        if (!validationMessage) {
          isAsync && upload(file);
        } else {
          setFileErrors((state) => [...state, { fileId: file.id, message: validationMessage }]);
        }
      });
    },
    [upload, error, getFileValidationText, onSelect, isAsync],
  );

  useValidationSetter(fileErrors);

  return <FileUploaderControl ref={ref} {...props} onSelect={handleSelect} />;
});

export const FileUploader = withFileUploaderControlProvider(_FileUploader);
