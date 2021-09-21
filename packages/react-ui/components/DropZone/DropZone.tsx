import React, { ReactNode, useCallback, useContext, useState } from 'react';
import UploadIcon from '@skbkontur/react-icons/Upload';

import { Link } from '../Link';
import { IUploadFileError } from '../../internal/UploadFileControl';
import {
  IUploadFilesProviderProps,
  withUploadFilesProvider,
} from '../../internal/UploadFileControl/UploadFileControlProvider';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { UploadFileControlContext } from '../../internal/UploadFileControl/UploadFileControlContext';
import {
  IUploadFileControlButtonProps,
  UploadFileControlButton,
} from '../../internal/UploadFileControl/UploadFileControlButton/UploadFileControlButton';
import { jsStyles } from '../../internal/UploadFileControl/UploadFileControlButton/UploadFileControlButton.styles';
import { useControlLocale, useValidationSetter } from '../../internal/UploadFileControl/UploadFileControlHooks';


// FIXME @mozalov: Вариант 1: возможно стоит сделать контрол Toast, который по id будет хранить и показывать паску файлов
//  тогда придется хранить файлы прямо в тосте, или оборачивать его в контекст, беда

// FIXME @mozalov: Вариант 2: можно добавить тост прямо DropZone

// FIXME @mozalov: Вариант 3: можно описать в документации тоста, что нужно оборачивать в UpdateProvider,
//  который будет торчать наружу методами

// FIXME @mozalov: разделить переводы для каждого контрола

// FIXME @mozalov: дубль
export interface IDropZoneProps extends IUploadFileControlButtonProps, IUploadFilesProviderProps {
  request: (file: IUploadFile) => Promise<void>;
  onRequestSuccess?: (fileId: string) => void;
  onRequestError?: (fileId: string) => void;

  getFileValidationText?: (file: IUploadFile) => Promise<string>;

  // через пропс можно передавать дефолтные текста\картинки\jsx для облести дропзоны
  customContent?: ReactNode;
}

export const DropZone = withUploadFilesProvider((props: IDropZoneProps) => {
  // FIXME @mozalov: вынести код в хук
  const {
    request,
    controlError,
    getFileValidationText,
    disabled,
    onSelect,
    onRequestSuccess,
    onRequestError,
    customContent
  } = props;

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
      onRequestSuccess && onRequestSuccess(fileId);
    },
    [setFileStatus, onRequestSuccess],
  );

  const switchToError = useCallback(
    (fileId: string) => {
      setFileStatus(fileId, UploadFileStatus.Error);
      onRequestError && onRequestError(fileId);
    },
    [setFileStatus, onRequestError],
  );

  const upload = useCallback(
    async (file: IUploadFile) => {
      const { id } = file;
      switchToLoading(id);

      try {
        await request(file);
        switchToSuccess(id);
      } catch {
        switchToError(id);
      }
    },
    [request, switchToSuccess, switchToLoading],
  );

  const handleSelect = useCallback(
    (files: IUploadFile[]) => {
      onSelect && onSelect(files);

      if (controlError) {
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
    [upload, controlError, getFileValidationText, onSelect],
  );

  useValidationSetter(fileErrors);

  const locale = useControlLocale();

  return (
    <UploadFileControlButton {...props} onSelect={handleSelect} multiple>
      {customContent || <>
        <Link disabled={disabled} tabIndex={-1}>
          {locale.chooseFile}
        </Link>
        &nbsp;
        <div className={jsStyles.afterLinkText()}>
          {locale.orDragHere}&nbsp;
          <UploadIcon color="#808080" />
        </div>
      </>}
    </UploadFileControlButton>
  );
});
