import React, { useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { FileUploaderAttachedFile, getAttachedFile } from '../../internal/FileUploaderControl/fileUtils';
import { cx } from '../../lib/theming/Emotion';
import { InstanceWithRootNode } from '../../lib/rootNode';
import { useMemoObject } from '../../hooks/useMemoObject';
import { FileUploaderControlContext } from '../../internal/FileUploaderControl/FileUploaderControlContext';
import { useControlLocale } from '../../internal/FileUploaderControl/hooks/useControlLocale';
import { useUpload } from '../../internal/FileUploaderControl/hooks/useUpload';
import { useDrop } from '../../hooks/useDrop';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { UploadIcon } from '../../internal/icons/16px';
import { FileUploaderControlProviderProps } from '../../internal/FileUploaderControl/FileUploaderControlProvider';
import { withFileUploaderControlProvider } from '../../internal/FileUploaderControl/withFileUploaderControlProvider';
import { keyListener } from '../../lib/events/keyListener';
import { FileUploaderFile } from '../../internal/FileUploaderControl/FileUploaderFile/FileUploaderFile';
import { FileUploaderFileList } from '../../internal/FileUploaderControl/FileUploaderFileList/FileUploaderFileList';
import { isBrowser } from '../../lib/client';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { Nullable } from '../../typings/utility-types';
import { FileUploaderFileValidationResult } from '../../internal/FileUploaderControl/FileUploaderFileValidationResult';
import { useFileUploaderSize } from '../../internal/FileUploaderControl/hooks/useFileUploaderSize';

import { jsStyles } from './FileUploader.styles';

const stopPropagation: React.ReactEventHandler = (e) => e.stopPropagation();

export type FileUploaderSize = 'small' | 'medium' | 'large';

type FileUploaderOverriddenProps = 'size';

interface _FileUploaderProps
  extends CommonProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, FileUploaderOverriddenProps> {
  /** Состояние ошибки всего контрола */
  error?: boolean;
  /** Состояние предупреждения всего контрола */
  warning?: boolean;
  /** Свойство ширины. */
  width?: React.CSSProperties['width'];
  /**
   * Задаёт размер контрола.
   *
   * **Допустимые значения**: `"small"`, `"medium"`, `"large"`.
   */
  size?: FileUploaderSize;
  /** Свойство, скрывающее отображение файлов.  */
  hideFiles?: boolean;

  /** Функция, через которую отправляем файлы. Используется для отслеживания статуса загрузки файла. */
  request?: (file: FileUploaderAttachedFile) => Promise<void>;
  /** Срабатывает при удачной попытке отправки через request */
  onRequestSuccess?: (fileId: string) => void;
  /** Срабатывает при неудачной попытке отправки через request */
  onRequestError?: (fileId: string) => void;

  /**
   * Функция валидации каждого файла.
   * Срабатывает после выбора файлов и перед попыткой отправить в request.
   * Чтобы вывести валидацию ошибки, промис должен вернуть строку.
   * */
  validateBeforeUpload?: (file: FileUploaderAttachedFile) => Promise<Nullable<string>>;

  /**
   * Функция, позволяющая кастомизировать файлы.
   * Через нее можно вешать кастомные валидации на каждый файл.
   * */
  renderFile?: (file: FileUploaderAttachedFile, fileNode: React.ReactElement) => React.ReactNode;
}

export interface FileUploaderRef extends InstanceWithRootNode {
  focus: () => void;
  blur: () => void;
  /** Сбрасывает выбранные файлы */
  reset: () => void;
}

export const FileUploaderDataTids = {
  root: 'FileUploader__root',
  content: 'FileUploader__content',
  link: 'FileUploader__link',
} as const;

const defaultRenderFile = (file: FileUploaderAttachedFile, fileNode: React.ReactElement) => fileNode;

const _FileUploader = React.forwardRef<FileUploaderRef, _FileUploaderProps>((props: _FileUploaderProps, ref) => {
  const theme = useContext(ThemeContext);

  const {
    disabled,
    error,
    warning,
    multiple = false,
    width = theme.fileUploaderWidth,
    hideFiles = false,
    onBlur,
    onFocus,
    onChange,
    request,
    validateBeforeUpload,
    onRequestSuccess,
    onRequestError,
    size = 'small',
    renderFile = defaultRenderFile,
    ...inputProps
  } = props;

  const { files, setFiles, removeFile, reset, setFileValidationResult, isMinLengthReached } =
    useContext(FileUploaderControlContext);

  const locale = useControlLocale();

  const inputRef = useRef<HTMLInputElement>(null);
  const fileDivRef = useRef<HTMLDivElement>(null);

  const isAsync = !!request;
  const isSingleMode = !multiple;

  const [isLinkVisible, setIsLinkVisible] = useState(true);
  const upload = useUpload(request, onRequestSuccess, onRequestError);

  const tryValidateAndUpload = useCallback(
    (files: FileUploaderAttachedFile[]) => {
      files.forEach(async (file) => {
        const validationMessage = validateBeforeUpload && (await validateBeforeUpload(file));

        if (!validationMessage) {
          isAsync && upload(file);
        } else {
          setFileValidationResult(file.id, FileUploaderFileValidationResult.error(validationMessage));
        }
      });
    },
    [validateBeforeUpload, isAsync, upload, setFileValidationResult],
  );

  const sizeClassName = useFileUploaderSize(size, {
    small: cx(jsStyles.sizeSmall(theme)),
    medium: cx(jsStyles.sizeMedium(theme)),
    large: cx(jsStyles.sizeLarge(theme)),
  });

  const sizeIconClass = useFileUploaderSize(size, {
    small: jsStyles.iconSmall(theme),
    medium: jsStyles.iconMedium(theme),
    large: jsStyles.iconLarge(theme),
  });

  const contentInnerClass = useFileUploaderSize(size, {
    small: jsStyles.contentInnerSmall(theme),
    medium: jsStyles.contentInnerMedium(theme),
    large: jsStyles.contentInnerLarge(theme),
  });

  /** common part **/
  const handleChange = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) {
        return;
      }

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

  useImperativeHandle(ref, () => ({ focus, blur, reset, getRootNode: () => rootNodeRef.current }), [
    ref,
    blur,
    focus,
    reset,
  ]);

  const [focusedByTab, setFocusedByTab] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    handleChange(event.target.files);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
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
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocusedByTab(false);
    if (!disabled) {
      onBlur?.(e);
    }
  };

  const [hovered, setHovered] = useState(false);

  const uploadButtonClassNames = cx(jsStyles.uploadButton(theme), {
    [jsStyles.uploadButtonFocus(theme)]: focusedByTab,
    [jsStyles.disabled(theme)]: disabled,
    [jsStyles.hovered(theme)]: !disabled && hovered,
    [jsStyles.warning(theme)]: !!warning,
    [jsStyles.error(theme)]: !!error,
    [jsStyles.dragOver(theme)]: isDraggable && !disabled,
    [sizeClassName]: true,
  });

  const uploadButtonWrapperClassNames = cx({
    [jsStyles.windowDragOver(theme)]: isWindowDraggable && !disabled,
  });

  const uploadButtonIconClassNames = cx(jsStyles.icon(theme), {
    [jsStyles.iconDisabled(theme)]: disabled,
    [sizeIconClass]: true,
  });

  const hasOneFile = files.length === 1;
  const hasOneFileForSingle = isSingleMode && hasOneFile && !hideFiles;

  const contentClassNames = cx(jsStyles.content(), {
    [jsStyles.contentWithFiles()]: hasOneFileForSingle,
  });

  const linkClassNames = cx(jsStyles.link(theme), {
    [jsStyles.linkHovered(theme)]: !disabled && hovered,
    [jsStyles.linkDisabled(theme)]: disabled,
  });

  useEffect(() => {
    setIsLinkVisible(hasOneFileForSingle ? !isMinLengthReached : true);
  }, [isMinLengthReached, hasOneFileForSingle]);

  const rootNodeRef = useRef(null);

  return (
    <CommonWrapper {...props}>
      <div
        data-tid={FileUploaderDataTids.root}
        className={jsStyles.root(theme)}
        style={useMemoObject({ width })}
        ref={rootNodeRef}
      >
        {!hideFiles && !isSingleMode && !!files.length && <FileUploaderFileList renderFile={renderFile} size={size} />}
        <div className={uploadButtonWrapperClassNames}>
          <label
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            ref={labelRef}
            className={uploadButtonClassNames}
          >
            <div className={contentInnerClass}>
              <div data-tid={FileUploaderDataTids.content} className={contentClassNames}>
                {isLinkVisible && (
                  <span data-tid={FileUploaderDataTids.link} className={linkClassNames}>
                    {hasOneFileForSingle ? locale.choosedFile : locale.chooseFile}
                  </span>
                )}
                {isLinkVisible && String.fromCharCode(0xa0) /* &nbsp; */}
                <div className={hasOneFileForSingle ? jsStyles.afterLinkText_HasFiles() : jsStyles.afterLinkText()}>
                  {hasOneFileForSingle ? (
                    <div ref={fileDivRef} className={jsStyles.singleFile()}>
                      {renderFile(files[0], <FileUploaderFile file={files[0]} size={size} />)}
                    </div>
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

export const FileUploader = withFileUploaderControlProvider<FileUploaderProps, FileUploaderRef>(
  React.memo(_FileUploader),
);
FileUploader.displayName = 'FileUploader';
