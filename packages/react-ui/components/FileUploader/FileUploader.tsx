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
  /** Переводит контрол в состояние валидации "ошибка". */
  /** Состояние ошибки всего контрола */
  error?: boolean;

  /** Переводит контрол в состояние валидации "предупреждение" */
  warning?: boolean;

  /** Задает приоритетное расположение подсказки относительно контрола
   * @default 'top left' */
  validationTooltipPosition?: ShortPopupPositionsType | PopupPositionsType;

  /** Использовать тултип для отображения валидации
   * @default false */
  withValidationTooltip?: boolean;

  /** Использовать иконку для ворнинга (восклицательный знак)
   * @default false */
  withWarningIcon?: boolean;

  /** Задает длину компонента. */
  width?: React.CSSProperties['width'];

  /** Задаёт размер контрола.
   * @default small */
  size?: SizeProp;

  /** Скрывает отображение файлов.
   * @default false */
  hideFiles?: boolean;

  /** Пользовательский текст для загрузки файла
   * @default 'Загрузить файл'
   */
  uploaderText?: string;

  /** Пользовательская иконка для загрузки файла
   * @default UploadIcon
   */
  uploaderIcon?: React.ReactNode;

  /** Вид компонента
   *  - `row` — строчный вид
   *  - `tile` — плиточный вид
   *  @default row
   */
  view?: FileUploaderView;

  /** Отображать ли саммари с детализацией ошибок. Работает с версией темы >= 5_5.
   *  - `auto` — саммари отображается, если количество загруженных файлов >= validationSummaryStart
   *  - `enabled` — всегда включено
   *  - `disabled` — всегда отключено
   *  @default auto
   */
  validationSummary?: FileUploaderValidationSummary;

  /** Количество файлов, от которого показываем саммари (при validationSummary = `auto`)
   * @default 5 */
  validationSummaryStart?: number;

  /** Позиционирование области загрузки файла
   * @default start */
  uploadButtonPosition?: FileUploaderUploadButtonPosition;

  /** Задает функцию, через которую отправляются файлы. Используется для отслеживания статуса загрузки файла.
   * @param {FileUploaderAttachedFile} file - файл, статус загрузки которого необходимо отследить. */
  request?: (file: FileUploaderAttachedFile) => Promise<void>;

  /** Задает функцию, которая вызывается при удачной попытке отправки через request. */
  onRequestSuccess?: (fileId: string) => void;

  /** Задает функцию, которая вызывается при неудачной попытке отправки через request. */
  onRequestError?: (fileId: string) => void;

  /** Определяет функцию валидации каждого файла. Срабатывает после выбора файлов и перед попыткой отправить в request.
   * Чтобы вывести валидацию ошибки, промис должен вернуть строку или объект с ошибкой.
   *  @returns {Promise<Nullable<string | { message: string; status: FileUploaderFileStatus }>>} */
  validateBeforeUpload?: (
    file: FileUploaderAttachedFile,
  ) => Promise<Nullable<string | { message: string; status: FileUploaderFileStatus }>>;

  /**
   * Задает функцию, которая позволяет кастомизировать файлы. Через нее можно вешать кастомные валидации на каждый файл.
   * @default (props: FileUploaderFileProps) => <FileUploaderFile {...props} />
   * @param {FileUploaderFileProps} props - пропсы компонента `FileUploaderFile`, смотри примеры использования в документации.
   * @returns {ReactNode} элемент, который отрисовывает контент файла.
   */
  renderFile?: (props: FileUploaderFileProps) => React.ReactNode;
}

export interface FileUploaderRef extends InstanceWithRootNode {
  focus: () => void;
  blur: () => void;
  /** Сбрасывает выбранные файлы */
  reset: () => void;
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
    size = 'small',
    renderFile = defaultRenderFile,
    ...inputProps
  } = props;

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
 * `FileUploader` — контрол для выбора пользователем файла на компьютере и отображения статуса его отправки на сервер.
 *
 * Можно использовать для синхронной отправки данных, например, в форме. Или же можно использовать в асинхронном режиме.
 */
export const FileUploader = withFileUploaderControlProvider<FileUploaderProps, FileUploaderRef>(
  React.memo(_FileUploader),
);

FileUploader.displayName = 'FileUploader';
