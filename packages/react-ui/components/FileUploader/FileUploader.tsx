import React, { useCallback, useContext, useImperativeHandle, useRef, useState } from 'react';

import { UploadFile, readFiles } from '../../lib/fileUtils';
import { Link } from '../Link';
import { cx } from '../../lib/theming/Emotion';
import { useMemoObject } from '../../hooks/useMemoObject';
import { FileUploaderControlContext } from '../../internal/FileUploaderControl/FileUploaderControlContext';
import { UploadFileItem } from '../../internal/FileUploaderControl/UploadFileItem/UploadFileItem';
import { UploadFileList } from '../../internal/FileUploaderControl/UploadFileList/UploadFileList';
import { UploadFileValidationResult } from '../../internal/FileUploaderControl/UploadFileValidationResult';
import { useControlLocale } from '../../internal/FileUploaderControl/hooks/useControlLocale';
import { useUpload } from '../../internal/FileUploaderControl/hooks/useUpload';
import { useDrop } from '../../hooks/useDrop';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { UploadIcon } from '../../internal/icons/16px';

import { jsStyles } from './FileUploader.styles';
import { FileUploaderControlProviderProps } from '../../internal/FileUploaderControl/FileUploaderControlProvider';
import { withFileUploaderControlProvider } from '../../internal/FileUploaderControl/withFileUploaderControlProvider';
import { keyListener } from '../../lib/events/keyListener';

const stopPropagation: React.ReactEventHandler = (e) => e.stopPropagation();

interface _FileUploaderProps {
  /* Нативные свойства */
  id?: string;
  name?: string;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;

  /** Состояние ошибки всего контрола */
  error?: boolean;
  /** Состояние предупреждения всего контрола */
  warning?: boolean;

  /** Свойство ширины. Дефолтное значение - 362 */
  width?: React.CSSProperties['width'];

  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;

  /** Срабатывает при невалидном чтении файла (превращение в base64) */
  onReadError?: (files: UploadFile[]) => void;

  /** Функция, через которую отправляем файлы. Используется для отслеживания статуса загрузки файла. */
  request?: (file: UploadFile) => Promise<void>;
  /** Срабатывает при удачной попытке отправки через request */
  onRequestSuccess?: (fileId: string) => void;
  /** Срабатывает при неудачной попытке отправки через request */
  onRequestError?: (fileId: string) => void;

  /** Функция валидации каждого файла. Срабатывает после выбора файлов и перед попыткой отправить в request. */
  getFileValidationText?: (file: UploadFile) => Promise<Nullable<string>>;
}

export interface FileUploaderRef {
  focus: () => void;
  blur: () => void;
}

const _FileUploader = React.forwardRef<FileUploaderRef, _FileUploaderProps>(
  (props: _FileUploaderProps, ref) => {
    const {
      id,
      name,
      disabled,
      accept,
      error,
      warning,
      onBlur,
      onFocus,
      onReadError,
      multiple = false,
      width = 362,
      request,
      getFileValidationText,
      onRequestSuccess,
      onRequestError,
    } = props;

    const { files, setFiles, removeFile, setFileValidationResult } = useContext(FileUploaderControlContext);
    const theme = useContext(ThemeContext);

    const locale = useControlLocale();

    const inputRef = useRef<HTMLInputElement>(null);

    const isAsync = !!request;
    const isSingleMode = !multiple;

    const upload = useUpload(request, onRequestSuccess, onRequestError);

    const tryValidateAndUpload = useCallback(
      (files: UploadFile[]) => {
        files.forEach(async (file) => {
          const validationMessage = getFileValidationText && (await getFileValidationText(file));

          if (!validationMessage) {
            isAsync && upload(file);
          } else {
            setFileValidationResult(file.id, UploadFileValidationResult.error(validationMessage));
          }
        });
      },
      [upload, error, getFileValidationText, isAsync],
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

        if (selectedFiles.length) {
          setFiles(selectedFiles);
          tryValidateAndUpload(selectedFiles);
        }

        readErrorFiles.length && onReadError?.(readErrorFiles);
      },
      [onReadError, tryValidateAndUpload, setFiles, isSingleMode, files, removeFile],
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

    const { isDraggable, ref: labelRef } = useDrop<HTMLLabelElement>({ onDrop: handleDrop });
    const { isDraggable: isWindowDraggable, ref: windowRef } = useDrop<Document>();

    windowRef.current = window.document;

    const focus = useCallback(() => {
      keyListener.isTabPressed = true;
      inputRef.current?.focus();
    }, []);

    const blur = useCallback(() => {
      inputRef.current?.blur();
    }, []);

    useImperativeHandle(ref, () => ({ focus, blur }), [ref]);

    const [focusedByTab, setFocusedByTab] = useState(false);
    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(event.target.files);
      },
      [handleChange],
    );

    const handleFocus = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (!disabled) {
          // focus event fires before keyDown eventlistener
          // so we should check tabPressed in async way
          requestAnimationFrame(() => {
            if (keyListener.isTabPressed) {
              setFocusedByTab(true);
            }
          });
          onFocus?.(e);
        }
    }, [disabled, onFocus]);

    const handleBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setFocusedByTab(false);
      if (!disabled) {
        onBlur?.(e);
      }
    }, [disabled, onBlur]);

    const uploadButtonClassNames = cx(jsStyles.uploadButton(theme), {
      [jsStyles.uploadButtonFocus(theme)]: focusedByTab,
      [jsStyles.dragOver()]: isDraggable && !disabled,
      [jsStyles.warning(theme)]: !!warning && !disabled,
      [jsStyles.error(theme)]: !!error && !disabled,
      [jsStyles.disabled(theme)]: disabled,
    });

    const uploadButtonWrapperClassNames = cx({
      [jsStyles.windowDragOver()]: isWindowDraggable && !disabled,
    });

    const uploadButtonIconClassNames = cx(jsStyles.icon(theme), {
      [jsStyles.iconDisabled(theme)]: disabled,
    });

    const handleClick = useCallback(() => {
      !disabled && labelRef.current?.click();
    }, [disabled]);

    const hasOneFile = files.length === 1;
    const hasOneFileForSingle = isSingleMode && hasOneFile;

    const linkClassNames = cx(jsStyles.link(theme), {
      [jsStyles.linkDisabled(theme)]: disabled,
    });

    return (
      <div className={jsStyles.root(theme)} style={useMemoObject({ width })}>
        {!isSingleMode && !!files.length && <UploadFileList />}
        <div className={uploadButtonWrapperClassNames}>
          <label ref={labelRef} className={uploadButtonClassNames}>
            <div className={jsStyles.content()}>
              <Link
                className={linkClassNames}
                disabled={disabled}
                tabIndex={-1}
                onClick={handleClick}
              >
                {hasOneFileForSingle ? locale.choosedFile : locale.chooseFile}
              </Link>
              &nbsp;
              <div className={jsStyles.afterLinkText()}>
                {hasOneFileForSingle ? (
                  <UploadFileItem file={files[0]} />
                ) : (
                  <>
                    {locale.orDragHere}&nbsp;
                    <div className={uploadButtonIconClassNames}>
                      <UploadIcon />
                    </div>
                  </>
                )}
              </div>
            </div>
            <input
              id={id}
              ref={inputRef}
              tabIndex={disabled ? -1 : 0}
              type="file"
              name={name}
              accept={accept}
              disabled={disabled}
              multiple={multiple}
              className={jsStyles.fileInput()}
              onClick={stopPropagation}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              // для того, чтобы срабатывало событие change при выборе одного и того же файла подряд
              value={''}
            />
          </label>
        </div>
      </div>
    );
  },
);


export interface FileUploaderProps extends _FileUploaderProps, FileUploaderControlProviderProps {}

export const FileUploader = withFileUploaderControlProvider<FileUploaderProps, FileUploaderRef>(_FileUploader);
FileUploader.displayName = 'FileUploader';
