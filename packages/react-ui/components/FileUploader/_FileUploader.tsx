import React, { useCallback, useContext, useImperativeHandle, useRef } from 'react';
import UploadIcon from '@skbkontur/react-icons/Upload';

import { IUploadFile, readFiles, UploadFileStatus } from '../../lib/fileUtils';
import { Link } from '../Link';
import { cx } from '../../lib/theming/Emotion';
import { isKeyEnter } from '../../lib/events/keyboard/identifiers';
import { useMemoObject } from '../../hooks/useMemoObject';
import { FileUploaderControlContext } from '../../internal/FileUploaderControl/FileUploaderControlContext';
import { useControlLocale, useDrop } from '../../internal/FileUploaderControl/FileUploaderControlHooks';
import { UploadFile } from '../../internal/FileUploaderControl/UploadFile/UploadFile';
import { UploadFileList } from '../../internal/FileUploaderControl/UploadFileList/UploadFileList';
import { UploadFileValidationResult } from '../../internal/FileUploaderControl/UploadFileValidationResult';

import { jsStyles } from './FileUploader.styles';

const stopPropagation: React.ReactEventHandler = (e) => e.stopPropagation();

// FIXME @mozalov: протестировать поддержку react-ui-validations
// FIXME @mozalov: протестировать передачу ref
// FIXME @mozalov: а нужно ли дизейблить отдельные файлики при передаче disabled = true? - ДА, нужно убирать крестик и красить текст в серый

// FIXME @mozalov: написать тесты на компонент после ревью
export interface _IFileUploaderProps {
  /** Нативные свойства */
  id?: string;
  name?: string;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;

  /** Валидачия всего контрола */
  error?: boolean;
  warning?: boolean;

  /** Свойство ширины. Дефолтное значение - 362 */
  width?: React.CSSProperties['width'];

  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;

  /** Срабатывает при валидном чтении файла (превращение байтов в base64) */
  onSelect?: (files: IUploadFile[]) => void;
  /** Срабатывает при невалидном чтении файла (превращение байтов в base64) */
  onReadError?: (files: IUploadFile[]) => void;

  // FIXME @mozalov: возможно стоит вынести асинхронные пропсы в отдельный пропс

  /** Функция, через которую отправляем файлы. Используется для отслеживания статуса загрузки файла. */
  request?: (file: IUploadFile) => Promise<void>;
  /** Срабатывает при удачной попытке отправки через request */
  onRequestSuccess?: (fileId: string) => void;
  /** Срабатывает при неудачной попытке отправки через request */
  onRequestError?: (fileId: string) => void

  /** Функция валидации каждого файла. Срабатывает после выбора файлов и перед попыткой отправить в request. */
  getFileValidationText?: (file: IUploadFile) => Promise<string>;
}

export interface IFileUploaderRef {
  focus: () => void;
  blur: () => void;
}

export const _FileUploader = React.forwardRef<IFileUploaderRef, _IFileUploaderProps>(
  (props: _IFileUploaderProps, ref) => {
    const {
      id,
      name,
      disabled,
      accept,
      error,
      warning,
      onBlur,
      onFocus,
      onSelect,
      onReadError,
      multiple = false,
      width = 362,
      request,
      getFileValidationText,
      onRequestSuccess,
      onRequestError
    } = props;

    const { files, setFiles, removeFile, setFileStatus, setFileValidationResult } = useContext(FileUploaderControlContext);

    const locale = useControlLocale();

    const inputRef = useRef<HTMLInputElement>(null);

    const isAsync = !!request;
    const isSingleMode = !multiple;

    // FIXME @mozalov: подумать, а мб разбить компонент на хуки и логику подробить, чтобы компонент уменьшить

    /** methods for async control **/
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

    /** run upload and validation **/
    const _onSelect = useCallback(
      (files: IUploadFile[]) => {
        onSelect?.(files);

        files.forEach(async (file) => {
          const validationMessage = getFileValidationText && (await getFileValidationText(file));

          if (!validationMessage) {
            isAsync && upload(file);
          } else {
            setFileValidationResult(file.id, UploadFileValidationResult.error(validationMessage));
          }
        });
      },
      [upload, error, getFileValidationText, onSelect, isAsync],
    );

    /** common part **/
    const handleChange = useCallback(
      async (newFiles: FileList | null) => {
        if (!newFiles) return;

        let filesArray = Array.from(newFiles);

        if (isSingleMode) {
          filesArray = [filesArray[0]];
        }

        const uploadFiles = await readFiles(filesArray);

        const selectedFiles = uploadFiles.filter((v) => !!v.fileInBase64);
        const readErrorFiles = uploadFiles.filter((v) => !v.fileInBase64);

        if (isSingleMode && selectedFiles.length && files.length) {
          removeFile(files[0].id);
        }
        setFiles(selectedFiles);

        _onSelect?.(selectedFiles);
        onReadError?.(readErrorFiles);
      },
      [onReadError, _onSelect, setFiles, isSingleMode, files, removeFile],
    );

    const handleDrop = useCallback(
      (event) => {
        if (disabled) {
          return;
        }

        const { dataTransfer } = event;
        const { files } = dataTransfer;

        if (files?.length > 0) {
          handleChange(files);
          dataTransfer.clearData();
        }
      },
      [handleChange, disabled],
    );

    const { isDraggable, ref: rootRef } = useDrop<HTMLDivElement>({ onDrop: handleDrop });
    const { isDraggable: isWindowDraggable, ref: windowRef } = useDrop<Document>();

    windowRef.current = window.document;

    const focus = useCallback(() => {
      rootRef.current?.focus();
    }, []);

    const blur = useCallback(() => {
      rootRef.current?.blur();
    }, []);

    useImperativeHandle(ref, () => ({ focus, blur }), [ref]);

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(event.target.files);
      },
      [handleChange],
    );

    const uploadButtonClassNames = cx(jsStyles.uploadButton(), {
      [jsStyles.dragOver()]: isDraggable && !disabled,
      [jsStyles.warning()]: !!warning && !disabled,
      [jsStyles.error()]: !!error && !disabled,
      [jsStyles.disabled()]: disabled,
    });

    const uploadButtonWrapperClassNames = cx({
      [jsStyles.windowDragOver()]: isWindowDraggable && !disabled,
    });

    const handleClick = useCallback(() => {
      !disabled && inputRef.current?.click();
    }, [disabled]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLElement>) => {
        if (isKeyEnter(e)) {
          handleClick();
        }
      },
      [handleClick],
    );

    const handleFocus = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
      !disabled && onFocus?.(e);
    }, [disabled, onFocus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
      !disabled && onBlur?.(e);
    }, [disabled, onBlur]);

    const hasOneFile = files.length === 1;
    const hasOneFileForSingle = isSingleMode && hasOneFile;

    return (
      <div>
        {!isSingleMode && !!files.length && <UploadFileList />}
        <div className={uploadButtonWrapperClassNames}>
          <div
            className={uploadButtonClassNames}
            tabIndex={0}
            ref={rootRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            style={useMemoObject({width})}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <div className={jsStyles.content()}>
              <Link disabled={disabled} tabIndex={-1}>
                {hasOneFileForSingle ? locale.choosedFile : locale.chooseFile}
              </Link>
              &nbsp;
              <div className={jsStyles.afterLinkText()}>
                {hasOneFileForSingle ? (
                  <UploadFile file={files[0]} />
                ) : (
                  <>
                    {locale.orDragHere}&nbsp;
                    <UploadIcon color="#808080" />
                  </>
                )}
              </div>
            </div>
            <input
              id={id}
              ref={inputRef}
              type="file"
              name={name}
              accept={accept}
              disabled={disabled}
              multiple={multiple}
              className={jsStyles.fileInput()}
              onClick={stopPropagation}
              onChange={handleInputChange}
              // для того, чтобы срабатывало событие change при выборе одного и того же файла подряд
              value={''}
            />
          </div>
        </div>
      </div>
    );
  }
);

