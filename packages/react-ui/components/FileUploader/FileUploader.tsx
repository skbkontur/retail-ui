import React, { useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { globalObject, isBrowser } from '@skbkontur/global-object';

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
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { Nullable } from '../../typings/utility-types';
import { FileUploaderFileValidationResult } from '../../internal/FileUploaderControl/FileUploaderFileValidationResult';
import { useFileUploaderSize } from '../../internal/FileUploaderControl/hooks/useFileUploaderSize';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { SizeProp } from '../../lib/types/props';

import { UploadIcon as UploadIcon2022 } from './UploadIcon';
import { globalClasses, jsStyles } from './FileUploader.styles';

const stopPropagation: React.ReactEventHandler = (e) => e.stopPropagation();

/**
 * @deprecated use SizeProp
 */
export type FileUploaderSize = SizeProp;

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
  size?: SizeProp;
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
  input: 'FileUploader__input',
} as const;

const defaultRenderFile = (file: FileUploaderAttachedFile, fileNode: React.ReactElement) => fileNode;

const _FileUploader = React.forwardRef<FileUploaderRef, _FileUploaderProps>((props: _FileUploaderProps, ref) => {
  const theme = useContext(ThemeContext);
  const _isTheme2022 = isTheme2022(theme);

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
    small: jsStyles.sizeSmall(theme),
    medium: jsStyles.sizeMedium(theme),
    large: jsStyles.sizeLarge(theme),
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

  if (isBrowser(globalObject)) {
    windowRef.current = globalObject.document;
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
      globalObject.requestAnimationFrame?.(() => {
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

  const uploadButtonClassNames = cx(
    jsStyles.uploadButton(theme),
    sizeClassName,
    focusedByTab && jsStyles.uploadButtonFocus(theme),
    disabled && jsStyles.disabled(theme),
    !disabled && hovered && jsStyles.hovered(theme),
    !!warning && jsStyles.warning(theme),
    !!error && jsStyles.error(theme),
    isDraggable && !disabled && jsStyles.dragOver(theme),
  );

  const canDrop = isWindowDraggable && !disabled;
  const uploadButtonWrapperClassNames = cx(
    !_isTheme2022 && canDrop && jsStyles.windowDragOver(theme),
    _isTheme2022 && canDrop && jsStyles.windowDragOver2022(theme),
  );

  const uploadButtonIconClassNames = cx(jsStyles.icon(theme), sizeIconClass, disabled && jsStyles.iconDisabled(theme));

  const hasOneFile = files.length === 1;
  const hasOneFileForSingle = isSingleMode && hasOneFile && !hideFiles;

  const contentClassNames = cx(jsStyles.content(), hasOneFileForSingle && jsStyles.contentWithFiles());

  const linkClassNames = cx(
    jsStyles.link(theme),
    !disabled && hovered && jsStyles.linkHovered(theme),
    disabled && jsStyles.linkDisabled(theme),
  );

  useEffect(() => {
    setIsLinkVisible(hasOneFileForSingle ? !isMinLengthReached : true);
  }, [isMinLengthReached, hasOneFileForSingle]);

  const rootNodeRef = useRef(null);

  const iconSizes: Record<SizeProp, number> = {
    small: parseInt(theme.btnIconSizeSmall),
    medium: parseInt(theme.btnIconSizeMedium),
    large: parseInt(theme.btnIconSizeLarge),
  };
  const icon = _isTheme2022 ? <UploadIcon2022 size={iconSizes[size]} /> : <UploadIcon />;

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
            <div
              data-tid={FileUploaderDataTids.content}
              className={cx(contentClassNames, { [contentInnerClass]: !files.length || !isSingleMode })}
            >
              {isLinkVisible && (
                <span data-tid={FileUploaderDataTids.link} className={linkClassNames}>
                  {hasOneFileForSingle ? locale.choosedFile : locale.chooseFile}
                </span>
              )}
              {isLinkVisible && String.fromCharCode(0xa0) /* &nbsp; */}
              <div
                className={cx(
                  globalClasses.afterLinkText,
                  hasOneFileForSingle ? jsStyles.afterLinkText_HasFiles(theme) : jsStyles.afterLinkText(theme),
                )}
              >
                {hasOneFileForSingle ? (
                  <div ref={fileDivRef} className={jsStyles.singleFile()}>
                    {renderFile(files[0], <FileUploaderFile file={files[0]} size={size} />)}
                  </div>
                ) : (
                  <>
                    {locale.orDragHere}&nbsp;
                    <div className={uploadButtonIconClassNames}>{icon}</div>
                  </>
                )}
              </div>
            </div>
            <input
              {...inputProps}
              data-tid={FileUploaderDataTids.input}
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
