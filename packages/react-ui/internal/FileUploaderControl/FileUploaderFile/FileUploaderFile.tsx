import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { FileUploaderAttachedFile, FileUploaderFileStatus } from '../fileUtils';
import { formatBytes } from '../../../lib/utils';
import { TextWidthHelper } from '../../../internal/TextWidthHelper/TextWidthHelper';
import { truncate } from '../../../lib/stringUtils';
import { Spinner } from '../../../components/Spinner';
import { FileUploaderControlContext } from '../FileUploaderControlContext';
import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { DeleteIcon, ErrorIcon, OkIcon } from '../../icons/16px';
import { keyListener } from '../../../lib/events/keyListener';
import { isKeyEnter } from '../../../lib/events/keyboard/identifiers';
import { Nullable } from '../../../typings/utility-types';
import { Hint } from '../../../components/Hint';
import { Tooltip } from '../../../components/Tooltip';
import { getDOMRect } from '../../../lib/dom/getDOMRect';
import { FileUploaderSize } from '../../../components/FileUploader';

import { jsStyles } from './FileUploaderFile.styles';

interface FileUploaderFileProps {
  file: FileUploaderAttachedFile;
  showSize?: boolean;
  multiple?: boolean;
  size: FileUploaderSize;
  /** Состояние ошибки контрола файла */
  error?: boolean;
}

const getTruncatedName = (fileNameWidth: number, fileNameElementWidth: number, name: string) => {
  if (!fileNameWidth && !fileNameElementWidth) {
    return null;
  }

  if (fileNameWidth <= fileNameElementWidth) {
    return name;
  }

  const charWidth = Math.ceil(fileNameWidth / name.length);
  const maxCharsCountInSpan = Math.ceil(fileNameElementWidth / charWidth);

  return truncate(name, maxCharsCountInSpan);
};

export const FileUploaderFileDataTids = {
  file: 'FileUploader__file',
  fileTooltip: 'FileUploader__fileTooltip',
  fileName: 'FileUploader__fileName',
  fileSize: 'FileUploader__fileSize',
  fileIcon: 'FileUploader__fileIcon',
} as const;

export const FileUploaderFile = (props: FileUploaderFileProps) => {
  const { file, showSize, error, multiple, size } = props;
  const { id, originalFile, status, validationResult } = file;
  const { name, size: fileSize } = originalFile;

  const [hovered, setHovered] = useState<boolean>(false);
  const [focusedByTab, setFocusedByTab] = useState(false);
  const [truncatedFileName, setTruncatedFileName] = useState<Nullable<string>>(null);

  const textHelperRef = useRef<TextWidthHelper>(null);
  const fileNameElementRef = useRef<HTMLSpanElement>(null);

  const { removeFile } = useContext(FileUploaderControlContext);
  const theme = useContext(ThemeContext);

  const formattedSize = useMemo(() => formatBytes(fileSize, 1), [fileSize]);

  // важно запустить после рендера, чтобы успели проставиться рефы
  useEffect(() => {
    const fileNameWidth = textHelperRef.current?.getTextWidth() || 0;
    const fileNameElementWidth = getDOMRect(fileNameElementRef.current).width;
    const truncatedName = getTruncatedName(fileNameWidth, fileNameElementWidth, name);

    setTruncatedFileName(truncatedName);
  }, [name]);

  const removeUploadFile = useCallback(() => {
    removeFile(id);
  }, [removeFile, id]);

  const handleRemove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      removeUploadFile();
    },
    [removeUploadFile],
  );

  const { isValid, message } = validationResult;

  const isInvalid = error || !isValid;

  const icon: ReactNode = useMemo(() => {
    const deleteIcon = <DeleteIcon className={jsStyles.deleteIcon(theme)} />;

    if (hovered || focusedByTab) {
      return deleteIcon;
    }

    if (isInvalid) {
      return <ErrorIcon />;
    }

    switch (status) {
      case FileUploaderFileStatus.Loading:
        return <Spinner type="mini" dimmed caption="" />;
      case FileUploaderFileStatus.Uploaded:
        return <OkIcon color={theme.fileUploaderIconColor} />;
      default:
        return deleteIcon;
    }
  }, [hovered, status, isInvalid, theme, focusedByTab]);

  const sizeIconClass = useMemo(() => {
    switch (size) {
      case 'large':
        return jsStyles.iconLarge(theme);
      case 'medium':
        return jsStyles.iconMedium(theme);
      case 'small':
      default:
        return jsStyles.iconSmall(theme);
    }
  }, [size]);

  const renderTooltipContent = useCallback((): ReactNode => {
    return !isValid && !error && message ? message : null;
  }, [isValid, error, message]);

  const sizeContentClass = useMemo(() => {
    switch (size) {
      case 'large':
        return jsStyles.contentLarge(theme);
      case 'medium':
        return jsStyles.contentMedium(theme);
      case 'small':
      default:
        return jsStyles.contentSmall(theme);
    }
  }, [size]);

  const contentClassNames = cx(jsStyles.content(), {
    [jsStyles.error(theme)]: isInvalid,
    [sizeContentClass]: true,
    [jsStyles.contentError(theme)]: !!multiple,
  });

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  const handleFocus = useCallback(() => {
    // focus event fires before keyDown eventlistener
    // so we should check tabPressed in async way
    requestAnimationFrame(() => {
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
        removeUploadFile();
      }
    },
    [removeUploadFile],
  );

  const iconClassNames = cx(jsStyles.icon(theme), {
    [jsStyles.focusedIcon(theme)]: focusedByTab,
    [sizeIconClass]: true,
    [multiple ? jsStyles.iconMultiple() : jsStyles.iconSingle()]: true,
  });

  const isTruncated = truncatedFileName !== name;

  return (
    <div
      data-tid={FileUploaderFileDataTids.file}
      className={jsStyles.root()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Tooltip data-tid={FileUploaderFileDataTids.fileTooltip} pos="right middle" render={renderTooltipContent}>
        <div className={contentClassNames}>
          <TextWidthHelper ref={textHelperRef} text={name} />
          <Hint maxWidth={'100%'} text={isTruncated ? name : null}>
            <span data-tid={FileUploaderFileDataTids.fileName} ref={fileNameElementRef} className={jsStyles.name()}>
              {truncatedFileName}
            </span>
          </Hint>
          {!!showSize && formattedSize && (
            <span data-tid={FileUploaderFileDataTids.fileSize} className={jsStyles.size()}>
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
            {icon}
          </div>
        </div>
      </Tooltip>
    </div>
  );
};

FileUploaderFile.displayName = 'FileUploaderFile';
