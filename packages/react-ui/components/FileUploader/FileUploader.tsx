import React, { useCallback, useContext, useImperativeHandle, useRef, useState } from 'react';

import { FileUploaderAttachedFile, getAttachedFile } from '../../internal/FileUploaderControl/fileUtils';
import { cx } from '../../lib/theming/Emotion';
import { useMemoObject } from '../../hooks/useMemoObject';
import { FileUploaderControlContext } from '../../internal/FileUploaderControl/FileUploaderControlContext';
import { FileUploaderFileValidationResult } from '../../internal/FileUploaderControl/FileUploaderFileValidationResult';
import { useControlLocale } from '../../internal/FileUploaderControl/hooks/useControlLocale';
import { useUpload } from '../../internal/FileUploaderControl/hooks/useUpload';
import { useDrop } from '../../hooks/useDrop';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { UploadIcon } from '../../internal/icons/16px';
import { FileUploaderControlProviderProps } from '../../internal/FileUploaderControl/FileUploaderControlProvider';
import { withFileUploaderControlProvider } from '../../internal/FileUploaderControl/withFileUploaderControlProvider';
import { keyListener } from '../../lib/events/keyListener';
import { FileUploaderFile } from '../../internal/FileUploaderControl/FileUploaderFile/FileUploaderFile';
import { FileUploaderFileList } from '../../internal/FileUploaderControl/FileUploaderFileList/FileUploaderFileList';
import { isBrowser } from '../../lib/client';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { jsStyles } from './FileUploader.styles';

const stopPropagation: React.ReactEventHandler = (e) => e.stopPropagation();

interface _FileUploaderProps extends CommonProps, React.InputHTMLAttributes<HTMLInputElement> {
  /** Состояние ошибки всего контрола */
  error?: boolean;
  /** Состояние предупреждения всего контрола */
  warning?: boolean;

  /** Свойство ширины. */
  width?: React.CSSProperties['width'];

  /** Функция, через которую отправляем файлы. Используется для отслеживания статуса загрузки файла. */
  request?: (file: FileUploaderAttachedFile) => Promise<void>;
  /** Срабатывает при удачной попытке отправки через request */
  onRequestSuccess?: (fileId: string) => void;
  /** Срабатывает при неудачной попытке отправки через request */
  onRequestError?: (fileId: string) => void;

  /** Функция валидации каждого файла. Срабатывает после выбора файлов и перед попыткой отправить в request. */
  getFileValidationText?: (file: FileUploaderAttachedFile) => Promise<Nullable<string>>;
}

export interface FileUploaderRef {
  focus: () => void;
  blur: () => void;
  /** Сбрасывает выбранные файлы */
  reset: () => void;
}

const _FileUploader = React.forwardRef<FileUploaderRef, _FileUploaderProps>((props: _FileUploaderProps, ref) => {
  const theme = useContext(ThemeContext);

  const {
    disabled,
    error,
    warning,
    multiple = false,
    width = theme.fileUploaderWidth,
    onBlur,
    onFocus,
    onChange,
    request,
    getFileValidationText,
    onRequestSuccess,
    onRequestError,
    ...inputProps
  } = props;

  const { files, setFiles, removeFile, setFileValidationResult, reset } = useContext(FileUploaderControlContext);

  const locale = useControlLocale();

  const inputRef = useRef<HTMLInputElement>(null);

  const isAsync = !!request;
  const isSingleMode = !multiple;

  const upload = useUpload(request, onRequestSuccess, onRequestError);

  const tryValidateAndUpload = useCallback(
    (files: FileUploaderAttachedFile[]) => {
      files.forEach(async (file) => {
        const validationMessage = getFileValidationText && (await getFileValidationText(file));

        if (!validationMessage) {
          isAsync && upload(file);
        } else {
          setFileValidationResult(file.id, FileUploaderFileValidationResult.error(validationMessage));
        }
      });
    },
    [upload, error, getFileValidationText, isAsync],
  );

  /** common part **/
  const handleChange = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;

      let filesArray = Array.from(newFiles);

      if (isSingleMode) {
        filesArray = [filesArray[0]];
      }

      const attachedFiles = filesArray.map(getAttachedFile);

      if (isSingleMode && attachedFiles.length && files.length) {
        removeFile(files[0].id);
      }

      if (attachedFiles.length) {
        setFiles(attachedFiles);
        tryValidateAndUpload(attachedFiles);
      }
    },
    [tryValidateAndUpload, setFiles, isSingleMode, files, removeFile],
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

  if (isBrowser) {
    windowRef.current = window.document;
  }

  const focus = useCallback(() => {
    keyListener.isTabPressed = true;
    inputRef.current?.focus();
  }, []);

  const blur = useCallback(() => {
    inputRef.current?.blur();
  }, []);

  useImperativeHandle(ref, () => ({ focus, blur, reset }), [ref]);

  const [focusedByTab, setFocusedByTab] = useState(false);
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      handleChange(event.target.files);
    },
    [handleChange, onChange],
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
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
    },
    [disabled, onFocus],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocusedByTab(false);
      if (!disabled) {
        onBlur?.(e);
      }
    },
    [disabled, onBlur],
  );

  const uploadButtonClassNames = cx(jsStyles.uploadButton(theme), {
    [jsStyles.uploadButtonFocus(theme)]: focusedByTab,
    [jsStyles.disabled(theme)]: disabled,
    [jsStyles.warning(theme)]: !!warning,
    [jsStyles.error(theme)]: !!error,
    [jsStyles.dragOver()]: isDraggable && !disabled,
  });

  const uploadButtonWrapperClassNames = cx({
    [jsStyles.windowDragOver()]: isWindowDraggable && !disabled,
  });

  const uploadButtonIconClassNames = cx(jsStyles.icon(theme), {
    [jsStyles.iconDisabled(theme)]: disabled,
  });

  const hasOneFile = files.length === 1;
  const hasOneFileForSingle = isSingleMode && hasOneFile;

  const linkClassNames = cx(jsStyles.link(theme), {
    [jsStyles.linkDisabled(theme)]: disabled,
  });

  return (
    <CommonWrapper {...props}>
      <div className={jsStyles.root(theme)} style={useMemoObject({ width })}>
        {!isSingleMode && !!files.length && <FileUploaderFileList />}
        <div className={uploadButtonWrapperClassNames}>
          <label ref={labelRef} className={uploadButtonClassNames}>
            <div className={jsStyles.content()}>
              <span data-tid={'FileUploader__link'} className={linkClassNames}>
                {hasOneFileForSingle ? locale.choosedFile : locale.chooseFile}
              </span>
              &nbsp;
              <div className={jsStyles.afterLinkText()}>
                {hasOneFileForSingle ? (
                  <FileUploaderFile file={files[0]} />
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
              {...inputProps}
              ref={inputRef}
              tabIndex={disabled ? -1 : 0}
              type="file"
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
    </CommonWrapper>
  );
});

export interface FileUploaderProps extends _FileUploaderProps, FileUploaderControlProviderProps {}

export const FileUploader = withFileUploaderControlProvider<FileUploaderProps, FileUploaderRef>(_FileUploader);
FileUploader.displayName = 'FileUploader';
