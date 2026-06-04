import React, { useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { useDrop } from '../../hooks/useDrop.js';
import { useMemoObject } from '../../hooks/useMemoObject.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper/index.js';
import type { PopupPositionsType, ShortPopupPositionsType } from '../../internal/Popup/index.js';
import { useKeyListener } from '../../lib/events/keyListener.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { isBrowser } from '../../lib/globalObject.js';
import { useEmotion, useGlobal, useStyles } from '../../lib/renderEnvironment/index.js';
import type { InstanceWithRootNode } from '../../lib/rootNode/index.js';
import { useSizeControl } from '../../lib/size/useSizeControl.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import type { Nullable } from '../../typings/utility-types.js';
import { getJsRowStyles, getJsStyles, getJsTileStyles, globalClasses } from './FileUploader.styles.js';
import { FileUploaderControlContext } from './FileUploaderControlContext.js';
import type { FileUploaderControlProviderProps } from './FileUploaderControlProvider.js';
import { FileUploaderFile } from './FileUploaderFile.js';
import type { FileUploaderFileProps } from './FileUploaderFile.js';
import { FileUploaderFileList } from './FileUploaderFileList/FileUploaderFileList.js';
import { FileUploaderFileValidationResult } from './FileUploaderFileValidationResult.js';
import type {
  FileUploaderAttachedFile,
  FileUploaderUploadButtonPosition,
  FileUploaderValidationSummary,
  FileUploaderView,
} from './fileUtils.js';
import { FileUploaderFileStatus, getAttachedFile } from './fileUtils.js';
import { useControlLocale } from './hooks/useControlLocale.js';
import { useFileUploaderSize } from './hooks/useFileUploaderSize.js';
import { useUpload } from './hooks/useUpload.js';
import { UploadIcon } from './icons/UploadIcon.js';
import { withFileUploaderControlProvider } from './withFileUploaderControlProvider.js';

const stopPropagation: React.ReactEventHandler = (e) => e.stopPropagation();

type FileUploaderOverriddenProps = 'size';

interface _FileUploaderProps
  extends CommonProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, FileUploaderOverriddenProps> {
  /** Переводит контрол в состояние ошибки. */
  /** Состояние ошибки всего контрола */
  error?: boolean;

  /** Переводит контрол в состояние предупреждения. */
  /** Состояние предупреждения всего контрола. */
  warning?: boolean;

  /** Расположение тултипа с текстом валидации файла.
   * @default 'top left' */
  validationTooltipPosition?: ShortPopupPositionsType | PopupPositionsType;

  /** Включает отображение текста валидации файла во всплывающей подсказке вместо строки рядом с именем.
   * @default false */
  withValidationTooltip?: boolean;

  /** Включает отображение иконки предупреждения (восклицательный знак) при статусе предупреждения у файла.
   * @default false */
  withWarningIcon?: boolean;

  /** Ширина контрола. */
  width?: React.CSSProperties['width'];

  /** Размер контрола и вложенных элементов.
   * @default small */
  size?: SizeProp;

  /** Скрывает встроенный список файлов.
   * @default false */
  hideFiles?: boolean;

  /** Текст ссылки выбора файла.
   * @default "Выберите файл"
   */
  uploaderText?: string;

  /** Иконка в кнопке загрузки.
   */
  uploaderIcon?: React.ReactNode;

  /** Режим отображения списка файлов: строка (`row`) или плитка (`tile`).
   *  @default row
   */
  view?: FileUploaderView;

  /** Режим блока-саммари по ошибкам и предупреждениям:
   * - `auto` — от порога `validationSummaryStart`,
   * - `enabled` / `disabled` — всегда или никогда.
   *  @default auto
   */
  validationSummary?: FileUploaderValidationSummary;

  /** Порог числа файлов для показа саммари при `validationSummary="auto"`.
   * @default 5 */
  validationSummaryStart?: number;

  /** Расположение кнопки загрузки относительно списка: в начале или в конце.
   * @default start */
  uploadButtonPosition?: FileUploaderUploadButtonPosition;

  /** Включает асинхронный режим загрузки файлов.
   *  Отклонённый промис помечает файл(ы) ошибкой загрузки.
   */
  request?: (file: FileUploaderAttachedFile) => Promise<void>;

  /** Колбэк после успешного завершения `request` для файла. */
  onRequestSuccess?: (fileId: string) => void;

  /** Колбэк после ошибки `request` для файла. */
  onRequestError?: (fileId: string) => void;

  /** Проверка файла после выбора и до `request`: строка или `{ message, status }` — ошибка/предупреждение. Пустой результат — файл проходит.
   */
  validateBeforeUpload?: (
    file: FileUploaderAttachedFile,
  ) => Promise<Nullable<string | { message: string; status: FileUploaderFileStatus }>>;

  /**
   * Задаёт метод отрисовки файлов.
   * @default (props: FileUploaderFileProps) => <FileUploaderFile {...props} />
   */
  renderFile?: (props: FileUploaderFileProps) => React.ReactNode;
}

export interface FileUploaderRef extends InstanceWithRootNode {
  /** Устанавливает фокус на скрытом `input` выбора файла. */
  focus: () => void;
  /** Снимает фокус с `input` выбора файла. */
  blur: () => void;
  /** Очищает список файлов и значения `input`. */
  reset: () => void;
  /** Удаляет файл по id с вызовом `onRemove` и `onValueChange`. */
  removeFile: (fileId: string) => void;
}

export type FileUploader = FileUploaderRef;

export const FileUploaderDataTids = {
  root: 'FileUploader__root',
  content: 'FileUploader__content',
  link: 'FileUploader__link',
  input: 'FileUploader__input',
} as const;

const defaultRenderFile = (props: FileUploaderFileProps) => <FileUploaderFile {...props} />;

const _FileUploader = forwardRefAndName<FileUploaderRef, _FileUploaderProps>('FileUploader', (props, ref) => {
  const theme = useContext(ThemeContext);
  const globalObject = useGlobal();
  const { cx } = useEmotion();
  const jsStyles = useStyles(getJsStyles);
  const jsRowStyles = useStyles(getJsRowStyles);
  const jsTileStyles = useStyles(getJsTileStyles);
  const keyListener = useKeyListener();

  const {
    disabled,
    error,
    warning,
    withValidationTooltip = false,
    validationTooltipPosition,
    withWarningIcon = false,
    multiple = false,
    uploaderText,
    uploaderIcon,
    view = 'row',
    uploadButtonPosition = 'start',
    validationSummary = 'auto',
    validationSummaryStart = 5,
    width = theme.fileUploaderWidth,
    hideFiles = false,
    onBlur,
    onFocus,
    onChange,
    request,
    validateBeforeUpload,
    onRequestSuccess,
    onRequestError,
    size: sizeProp,
    renderFile = defaultRenderFile,
    ...inputProps
  } = props;
  const size = useSizeControl(sizeProp);

  const { files, setFiles, removeFile, reset, setFileValidationResult } = useContext(FileUploaderControlContext);

  const locale = useControlLocale();

  const inputRef = useRef<HTMLInputElement>(null);
  const fileDivRef = useRef<HTMLDivElement>(null);

  const isAsync = !!request;
  const isSingleMode = !multiple;

  const [hovered, setHovered] = useState(false);
  const upload = useUpload(request, onRequestSuccess, onRequestError);

  const tryValidateAndUpload = useCallback(
    (files: FileUploaderAttachedFile[]) => {
      files.forEach(async (file) => {
        const validationMessage = validateBeforeUpload && (await validateBeforeUpload(file));

        if (!validationMessage) {
          isAsync && upload(file);
        } else if (typeof validationMessage === 'object') {
          setFileValidationResult(
            file.id,
            FileUploaderFileValidationResult.error(validationMessage.message),
            validationMessage.status,
          );
        } else {
          setFileValidationResult(
            file.id,
            FileUploaderFileValidationResult.error(validationMessage),
            FileUploaderFileStatus.Error,
          );
        }
      });
    },
    [validateBeforeUpload, isAsync, upload, setFileValidationResult],
  );

  const isTileView = view === 'tile';
  const jsViewStyles = isTileView ? jsTileStyles : jsRowStyles;

  const sizeClassName = useFileUploaderSize(size, {
    small: jsViewStyles.sizeSmall(theme),
    medium: jsViewStyles.sizeMedium(theme),
    large: jsViewStyles.sizeLarge(theme),
  });

  const uploadButtonTileWithFileClassName = useFileUploaderSize(size, {
    small: jsTileStyles.uploadButtonTileWithFileSmall(theme),
    medium: jsTileStyles.uploadButtonTileWithFileMedium(theme),
    large: jsTileStyles.uploadButtonTileWithFileLarge(theme),
  });

  const uploadButtonIconGapClass = useFileUploaderSize(size, {
    small: jsViewStyles.uploadButtonIconGapSmall(theme),
    medium: jsViewStyles.uploadButtonIconGapMedium(theme),
    large: jsViewStyles.uploadButtonIconGapLarge(theme),
  });

  const sizeIconClass = useFileUploaderSize(size, {
    small: jsStyles.iconSmall(theme),
    medium: jsStyles.iconMedium(theme),
    large: jsStyles.iconLarge(theme),
  });

  const sizeWrapperClass = useFileUploaderSize(size, {
    small: jsTileStyles.uploadButtonWrapperSmall(theme),
    medium: jsTileStyles.uploadButtonWrapperMedium(theme),
    large: jsTileStyles.uploadButtonWrapperLarge(theme),
  });

  const sizeWrapperEmptyFileClass = useFileUploaderSize(size, {
    small: jsTileStyles.uploadButtonWrapperEmptyFileSmall(theme),
    medium: jsTileStyles.uploadButtonWrapperEmptyFileMedium(theme),
    large: jsTileStyles.uploadButtonWrapperEmptyFileLarge(theme),
  });

  const contentInnerClass = useFileUploaderSize(size, {
    small: jsStyles.contentInnerSmall(theme),
    medium: jsStyles.contentInnerMedium(theme),
    large: jsStyles.contentInnerLarge(theme),
  });

  /** common part **/
  const handleChange = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles || !newFiles.length) {
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
    (event: DragEvent) => {
      if (disabled) {
        return;
      }

      const { dataTransfer } = event;
      if (dataTransfer) {
        if (isSingleMode && dataTransfer.files.length > 1) {
          dataTransfer.dropEffect = 'none';
          return;
        }
        if (dataTransfer.files?.length > 0) {
          inputRef.current && (inputRef.current.files = dataTransfer.files);
          handleChange(dataTransfer.files);
        }
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

  const removeFileFromNativeInput = useCallback(
    (fileId: string) => {
      const dataTransfer = new DataTransfer();
      files
        .filter((f) => f.id !== fileId)
        .forEach((file) => {
          dataTransfer.items.add(file.originalFile);
        });
      inputRef.current && (inputRef.current.files = dataTransfer.files);
    },
    [files],
  );

  const handleRemoveFile = useCallback(
    (fileId: string) => {
      removeFile(fileId);
      removeFileFromNativeInput(fileId);
    },
    [removeFileFromNativeInput, removeFile],
  );

  const handleReset = useCallback(() => {
    reset();
    const dataTransfer = new DataTransfer();
    inputRef.current && (inputRef.current.files = dataTransfer.files);
  }, [reset, handleRemoveFile]);

  useImperativeHandle(
    ref,
    () => ({
      focus,
      blur,
      reset: handleReset,
      removeFile: handleRemoveFile,
      getRootNode: () => rootNodeRef.current,
    }),
    [ref, blur, focus, handleReset, handleRemoveFile],
  );

  const [focusedByTab, setFocusedByTab] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    handleChange(event.target.files);
    setHovered(false);
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

  const hasFiles = files.length > 0;
  const hasOneFile = files.length === 1;
  const hasOneFileForSingle = isSingleMode && hasOneFile && !hideFiles;

  const hasError = !!error || files[0]?.status === FileUploaderFileStatus.Error;
  const hasWarning = !!warning || files[0]?.status === FileUploaderFileStatus.Warning;

  const uploadButtonClassNames = cx(
    jsStyles.uploadButton(theme),
    jsViewStyles.uploadButton(),
    sizeClassName,
    hasOneFileForSingle && jsViewStyles.uploadButtonWithFile(theme),
    focusedByTab && jsStyles.uploadButtonFocus(theme),
    disabled && {
      [jsStyles.disabled(theme)]: true,
      [jsStyles.disabledBackground(theme)]: !hasFiles,
    },
    (focusedByTab || !hasOneFileForSingle) && {
      [jsStyles.warningButton(theme)]: hasWarning,
      [jsStyles.errorButton(theme)]: hasError,
    },
    hasOneFileForSingle && {
      [uploadButtonTileWithFileClassName]: isTileView,
      [jsTileStyles.verticalAlign()]: isTileView,
      [jsStyles.warningFile(theme)]: (!isTileView || hovered) && hasWarning,
      [jsStyles.errorFile(theme)]: (!isTileView || hovered) && hasError,
    },
    !disabled &&
      hovered && {
        [jsStyles.hovered(theme)]: true,
      },
    isDraggable && !disabled && jsStyles.dragOver(theme),
  );

  const canDrop = isWindowDraggable && !disabled;
  const uploadButtonWrapperClassNames = cx(
    isTileView && {
      [sizeWrapperClass]: true,
      [sizeWrapperEmptyFileClass]: !hasOneFileForSingle,
    },
    jsViewStyles.uploadButtonWrapper(),
    canDrop && jsStyles.windowDragOver(theme),
  );

  const uploadButtonIconClassNames = cx(
    jsStyles.icon(theme),
    sizeIconClass,
    disabled && jsStyles.iconDisabled(theme),
    uploadButtonIconGapClass,
  );

  const rootClassNames = cx(jsStyles.root(theme), !isTileView && jsRowStyles.root());

  const contentClassNames = cx(jsViewStyles.content(), {
    [jsViewStyles.contentWithFiles()]: hasOneFileForSingle,
    [contentInnerClass]: !isTileView && (!files.length || !isSingleMode),
  });

  const afterLinkTextClassNames = cx(
    globalClasses.afterLinkText,
    hasOneFileForSingle ? jsStyles.afterLinkText_HasFiles() : jsStyles.afterLinkText(),
  );

  const linkClassNames = cx(
    jsStyles.link(theme),
    !disabled && hovered && jsStyles.linkHovered(theme),
    disabled && jsStyles.linkDisabled(theme),
  );

  useEffect(() => {
    if (!files || !files.length || !inputRef.current) {
      return;
    }

    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file.originalFile));
    inputRef.current.files = dataTransfer.files;
  }, []);

  const rootNodeRef = useRef(null);

  const icon = uploaderIcon ?? <UploadIcon size={size} view={view} />;
  const chooseFileText = uploaderText ?? locale.chooseFile;
  const chooseFileLocale = `${chooseFileText}${String.fromCharCode(0xa0)}`; /* &nbsp; */
  const hideUploaderText = isTileView && uploaderText === '';
  const renderChooseFileText = () =>
    !hideUploaderText && (
      <span data-tid={FileUploaderDataTids.link} className={linkClassNames}>
        {!hasOneFileForSingle && chooseFileLocale}
      </span>
    );

  const renderFileList = () => {
    return (
      !hideFiles &&
      !isSingleMode &&
      !!files.length && (
        <FileUploaderFileList
          renderFile={renderFile}
          size={size}
          view={view}
          onRemove={handleRemoveFile}
          validationTooltipPosition={validationTooltipPosition}
          withValidationTooltip={withValidationTooltip}
          validationSummary={validationSummary}
          validationSummaryStart={validationSummaryStart}
          withWarningIcon={withWarningIcon}
          disabled={disabled}
        />
      )
    );
  };

  const fileProps: FileUploaderFileProps = {
    file: files[0],
    size,
    view,
    onRemove: handleRemoveFile,
    error,
    warning,
    withValidationTooltip,
    validationTooltipPosition,
    withWarningIcon,
    hovered,
    disabled,
  };

  const fileElement = renderFile(fileProps);

  return (
    <CommonWrapper {...props}>
      <div
        data-tid={FileUploaderDataTids.root}
        className={rootClassNames}
        style={useMemoObject({ width: isTileView && !multiple ? theme.fileUploaderTileWidth : width })}
        ref={rootNodeRef}
      >
        {uploadButtonPosition === 'end' && renderFileList()}
        <div className={uploadButtonWrapperClassNames}>
          <label
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            ref={labelRef}
            className={uploadButtonClassNames}
          >
            {!hasOneFileForSingle && <div className={uploadButtonIconClassNames}>{icon}</div>}
            <div data-tid={FileUploaderDataTids.content} className={contentClassNames}>
              {renderChooseFileText()}
              <div className={afterLinkTextClassNames}>
                {hasOneFileForSingle && (
                  <div ref={fileDivRef} className={jsStyles.singleFile()}>
                    {fileElement}
                  </div>
                )}
              </div>
            </div>
            <FocusControlWrapper onBlurWhenDisabled={() => setFocusedByTab(false)}>
              <input
                {...inputProps}
                data-tid={FileUploaderDataTids.input}
                ref={inputRef}
                tabIndex={disabled ? -1 : 0}
                type="file"
                disabled={disabled}
                multiple={multiple}
                className={jsStyles.visuallyHidden()}
                onClick={stopPropagation}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </FocusControlWrapper>
          </label>
        </div>
        {uploadButtonPosition === 'start' && renderFileList()}
      </div>
    </CommonWrapper>
  );
});

export interface FileUploaderProps extends _FileUploaderProps, FileUploaderControlProviderProps {}

/**
 * Контрол для выбора пользователем файла на компьютере и отображения статуса его отправки на сервер.
 */
export const FileUploader = withFileUploaderControlProvider<FileUploaderProps, FileUploaderRef>(
  React.memo(_FileUploader),
);

FileUploader.displayName = 'FileUploader';
