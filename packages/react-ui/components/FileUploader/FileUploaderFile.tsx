import type { ReactNode } from 'react';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { CommonWrapper, type CommonProps } from '../../internal/CommonWrapper';
import type { PopupPositionsType, ShortPopupPositionsType } from '../../internal/Popup';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import type {
  FileUploaderAttachedFile,
  FileUploaderIconType,
  FileUploaderView,
} from '../../internal/FileUploaderControl/fileUtils';
import { FileUploaderFileStatus, getFileUploaderTypeIcon } from '../../internal/FileUploaderControl/fileUtils';
import { formatBytes } from '../../lib/utils';
import { TextWidthHelper } from '../../internal/TextWidthHelper/TextWidthHelper';
import { truncate } from '../../lib/stringUtils';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { keyListener } from '../../lib/events/keyListener';
import { isKeyEnter } from '../../lib/events/keyboard/identifiers';
import type { Nullable } from '../../typings/utility-types';
import { Hint } from '../Hint';
import { Tooltip } from '../Tooltip';
import { getDOMRect } from '../../lib/dom/getDOMRect';
import { useFileUploaderSize } from '../../internal/FileUploaderControl/hooks/useFileUploaderSize';
import type { SizeProp } from '../../lib/types/props';
import { FileUploaderFileStatusIcon } from '../../internal/FileUploaderControl/FileUploaderFile/icons/FileUploaderFileStatusIcon';
import { FileUploaderFileTypeIcon } from '../../internal/FileUploaderControl/FileUploaderFile/icons/FileUploaderFileTypeIcon';
import {
  jsStyles,
  jsRowStyles,
  jsTileStyles,
} from '../../internal/FileUploaderControl/FileUploaderFile/FileUploaderFile.styles';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon';

export interface FileUploaderFileProps extends CommonProps {
  file: FileUploaderAttachedFile;
  showSize?: boolean;
  previewImg?: string;
  multiple?: boolean;
  disabled?: boolean;
  hovered?: boolean;
  focused?: boolean;
  size: SizeProp;
  /** Вид контрола
   *  - `row` — стандартное отображение в виде инпута
   *  - `tile` — вид карточки/плитки
   *  @default row
   */
  view?: FileUploaderView;
  /** Состояние ошибки контрола файла */
  error?: boolean;
  /** Состояние предупреждения контрола файла */
  warning?: boolean;
  /** Валидация с тултипом */
  withValidationTooltip?: boolean;
  /** Задает приоритетное расположение подсказки относительно контрола */
  validationTooltipPosition?: ShortPopupPositionsType | PopupPositionsType;
  /** Использовать иконку для ворнинга (восклицательный знак)*/
  withWarningIcon?: boolean;
  onRemove(id: string): void;
  /**
   * Добавляет иконку типа файла
   */
  fileTypeIcon?: React.ReactElement;
  /**
   * Задаёт показ подсказки с полным именем файла
   * @default true
   */
  showFilenameHint?: boolean;
}

const splitFileNameAndExtension = (filename: string): { name: string; extension: string } => {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return { name: filename, extension: '' };
  }
  const name = filename.substring(0, lastDotIndex);
  const extension = filename.substring(lastDotIndex + 1);
  return { name, extension };
};

const getTruncatedName = (fileNameWidth: number, fileNameElementWidth: number, name: string, isTileView = false) => {
  if (!fileNameWidth && !fileNameElementWidth) {
    return null;
  }

  if (fileNameWidth <= fileNameElementWidth) {
    return name;
  }

  const charWidth = Math.ceil(fileNameWidth / name.length);
  const maxCharsCountInSpan = Math.ceil(fileNameElementWidth / charWidth);

  if (isTileView) {
    const splitFileName = splitFileNameAndExtension(name);
    return `${truncate(splitFileName.name, maxCharsCountInSpan)}.${splitFileName.extension}`;
  }

  return truncate(name, maxCharsCountInSpan);
};

const calcTruncatedName = (
  textHelperRef: React.RefObject<TextWidthHelper>,
  fileNameElementRef: React.RefObject<HTMLSpanElement>,
  name: string,
  isTileView = false,
) => {
  const fileNameWidth = textHelperRef.current?.getTextWidth() || 0;
  const fileNameElementWidth = isTileView
    ? // даем возможность занять 2 строки с погрешностью в 50%
      getDOMRect(fileNameElementRef.current).width * 1.5
    : getDOMRect(fileNameElementRef.current).width;

  return getTruncatedName(fileNameWidth, fileNameElementWidth, name, isTileView);
};

export const FileUploaderFileDataTids = {
  file: 'FileUploader__file',
  fileTooltip: 'FileUploader__fileTooltip',
  fileName: 'FileUploader__fileName',
  fileSize: 'FileUploader__fileSize',
  fileIcon: 'FileUploader__fileIcon',
  fileTypeIcon: 'FileUploader__fileTypeIcon',
} as const;

/**
 * Компонент файла `FileUploaderFile` из FileUploader для отрисовки загруженного файла.
 */
export const FileUploaderFile = forwardRefAndName<HTMLDivElement, FileUploaderFileProps>(
  'FileUploaderFile',
  (props, ref) => {
    const {
      file,
      showSize = false,
      previewImg,
      error,
      warning,
      multiple,
      disabled = false,
      hovered = false,
      focused = false,
      size,
      view = 'row',
      withValidationTooltip,
      validationTooltipPosition,
      withWarningIcon,
      onRemove,
      showFilenameHint: showFullFilename = true,
      fileTypeIcon,
      ...rest
    } = props;
    const { id, originalFile, status, validationResult } = file;
    const { name, size: fileSize } = originalFile;

    const [hoveredFile, setHoveredFile] = useState<boolean>(hovered || false);
    const [focusedByTab, setFocusedByTab] = useState(focused || false);
    const [truncatedFileName, setTruncatedFileName] = useState<Nullable<string>>(null);

    const textHelperRef = useRef<TextWidthHelper>(null);
    const fileNameElementRef = useRef<HTMLSpanElement>(null);

    const theme = useContext(ThemeContext);

    const versionGTE5_5 = isThemeGTE(theme, '5.5');

    const isLoading = status === FileUploaderFileStatus.Loading;
    const isTileView = versionGTE5_5 && view === 'tile';
    const jsViewStyles = isTileView ? jsTileStyles : jsRowStyles;
    const validationTooltipPositionByView = validationTooltipPosition || (isTileView ? 'top center' : 'top left');

    const formattedSize = useMemo(() => formatBytes(fileSize, 1), [fileSize]);

    useEffect(() => {
      const truncatedName = calcTruncatedName(textHelperRef, fileNameElementRef, name, isTileView);

      setTruncatedFileName(truncatedName);
    });

    const handleRemove = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onRemove(id);
      },
      [id, onRemove],
    );

    const { isValid, message } = validationResult;

    const isError = file.status === FileUploaderFileStatus.Error || error;
    const isWarning = file.status === FileUploaderFileStatus.Warning || warning;
    const isInvalid = isError || !isValid;

    const sizeIconClass = useFileUploaderSize(size, {
      small: jsViewStyles.iconSmall(theme),
      medium: jsViewStyles.iconMedium(theme),
      large: jsViewStyles.iconLarge(theme),
    });

    const renderTooltipContent = useCallback((): ReactNode => {
      return !isValid && !error && message ? message : null;
    }, [isValid, error, message]);

    const sizeNameBlockClass = useFileUploaderSize(size, {
      small: jsStyles.contentSmall(theme),
      medium: jsStyles.contentMedium(theme),
      large: jsStyles.contentLarge(theme),
    });

    const sizeViewNameBlockClass = useFileUploaderSize(size, {
      small: jsViewStyles.contentSmall(theme),
      medium: jsViewStyles.contentMedium(theme),
      large: jsViewStyles.contentLarge(theme),
    });

    const validationTextClassName = cx({
      [jsStyles.validationTextWarning(theme)]: isWarning,
      [jsStyles.validationTextError(theme)]: isError,
    });

    const contentClassNames = cx(
      jsStyles.content(),
      jsViewStyles.content(),
      !versionGTE5_5 && (error || !isValid) && jsStyles.error(theme),
    );
    const nameTextClassNames = cx(jsViewStyles.name(), isTileView && !disabled && validationTextClassName);

    const handleMouseEnter = useCallback(() => {
      setHoveredFile(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setHoveredFile(false);
    }, []);

    const handleFocus = useCallback(() => {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      globalObject.requestAnimationFrame?.(() => {
        if (keyListener.isTabPressed) {
          setFocusedByTab(true);
        }
      });
    }, []);

    const handleBlur = useCallback(() => {
      setFocusedByTab(false);
    }, []);

    const handleIconKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLElement>) => {
        if (isKeyEnter(e)) {
          onRemove(id);
        }
      },
      [onRemove, id],
    );

    const iconClassNames = cx(jsStyles.icon(theme), {
      [jsStyles.icon5_5(theme)]: versionGTE5_5,
      [jsStyles.iconMultiple()]: !versionGTE5_5 && multiple,
      [sizeIconClass]: versionGTE5_5,
      [jsTileStyles.iconAction(theme)]: isTileView,
      [jsTileStyles.iconActionShow()]: isTileView && !disabled && (hovered || hoveredFile || focused || focusedByTab),
    });

    const sizeClassName = useFileUploaderSize(size, {
      small: jsStyles.sizeSmall(theme),
      medium: jsStyles.sizeMedium(theme),
      large: jsStyles.sizeLarge(theme),
    });

    const sizeClassNames = cx(
      jsStyles.size(theme),
      versionGTE5_5 && {
        [sizeClassName]: true,
        [jsViewStyles.size(theme)]: true,
        [jsTileStyles.sizeDisabled(theme)]: isTileView && disabled,
      },
    );

    const sizeFileTypeIconClass = useFileUploaderSize(size, {
      small: jsViewStyles.fileTypeIconSmall(theme),
      medium: jsViewStyles.fileTypeIconMedium(theme),
      large: jsViewStyles.fileTypeIconLarge(theme),
    });

    const isTruncated = truncatedFileName !== name;

    const fileTypeIconClassName = cx(
      sizeFileTypeIconClass,
      disabled && jsStyles.disabledFileTypeIconSvg(theme),
      isTileView && {
        [jsTileStyles.fileTypeIcon(theme)]: true,
        [jsTileStyles.fileTypeIconPreview()]: !!previewImg,
        [jsTileStyles.disabledFileTypeIcon(theme)]: disabled,
        [jsTileStyles.warningFileTypeIcon(theme)]: isWarning,
        [jsTileStyles.errorFileTypeIcon(theme)]: isError,
      },
      multiple && jsStyles.fileTypeIconMultiple(),
    );

    const nameBlockClassNames = cx(
      sizeNameBlockClass,
      versionGTE5_5 && sizeViewNameBlockClass,
      jsStyles.nameBlock(),
      disabled && jsViewStyles.disabled(theme),
      jsViewStyles.nameBlock(),
    );

    const fileType: FileUploaderIconType = getFileUploaderTypeIcon(
      file.originalFile,
      isError,
      isWarning && !!withWarningIcon,
    );
    const icon =
      isTileView && isLoading ? (
        <LoadingIcon size={size} />
      ) : (
        fileTypeIcon ?? <FileUploaderFileTypeIcon type={fileType} size={size} view={view} />
      );

    const splitTruncatedFileName = truncatedFileName && splitFileNameAndExtension(truncatedFileName);

    return (
      <CommonWrapper {...rest}>
        <div
          data-tid={FileUploaderFileDataTids.file}
          className={jsStyles.root()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={ref}
        >
          <Tooltip
            data-tid={FileUploaderFileDataTids.fileTooltip}
            pos={versionGTE5_5 ? validationTooltipPositionByView : 'right middle'}
            render={() => (withValidationTooltip || isTileView || !versionGTE5_5 ? renderTooltipContent() : null)}
          >
            <div className={contentClassNames}>
              {versionGTE5_5 && (
                <div
                  data-tid={FileUploaderFileDataTids.fileTypeIcon}
                  className={fileTypeIconClassName}
                  style={previewImg ? { backgroundImage: `url(${previewImg})` } : undefined}
                >
                  {(!isTileView || !previewImg) && icon}
                </div>
              )}
              <div className={nameBlockClassNames}>
                <TextWidthHelper ref={textHelperRef} text={name} />
                <Hint maxWidth={'100%'} text={showFullFilename && isTruncated ? name : null}>
                  <span
                    data-tid={FileUploaderFileDataTids.fileName}
                    ref={fileNameElementRef}
                    className={nameTextClassNames}
                  >
                    {splitTruncatedFileName && (
                      <>
                        {splitTruncatedFileName.name}
                        {splitTruncatedFileName.extension && <span>.{splitTruncatedFileName.extension}</span>}
                      </>
                    )}
                  </span>
                </Hint>
                {!(withValidationTooltip || isTileView) && versionGTE5_5 && (
                  <span className={validationTextClassName}>{renderTooltipContent()}</span>
                )}
              </div>
              {showSize && formattedSize && (
                <span data-tid={FileUploaderFileDataTids.fileSize} className={sizeClassNames}>
                  {formattedSize}
                </span>
              )}
              <div
                className={iconClassNames}
                data-tid={FileUploaderFileDataTids.fileIcon}
                tabIndex={0}
                onClick={handleRemove}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleIconKeyDown}
              >
                <FileUploaderFileStatusIcon
                  isTileView={isTileView}
                  status={status}
                  disabled={disabled}
                  hovered={hovered || hoveredFile}
                  focusedByTab={focused || focusedByTab}
                  isInvalid={isInvalid}
                  hasValidation={isError || isWarning}
                  size={size}
                />
              </div>
            </div>
          </Tooltip>
        </div>
      </CommonWrapper>
    );
  },
);
