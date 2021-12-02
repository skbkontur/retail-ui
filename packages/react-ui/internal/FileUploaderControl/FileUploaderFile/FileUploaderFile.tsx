import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { FileUploaderAttachedFile, FileUploaderFileStatus } from '../fileUtils';
import { formatBytes } from '../../../lib/utils';
import { TextWidthHelper } from '../../../internal/TextWidthHelper/TextWidthHelper';
import { truncate } from '../../../lib/stringUtils';
import { Spinner } from '../../../components/Spinner';
import { FileUploaderControlContext } from '../FileUploaderControlContext';
import { Tooltip } from '../../../components/Tooltip';
import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { DeleteIcon, ErrorIcon, OkIcon } from '../../icons/16px';
import { keyListener } from '../../../lib/events/keyListener';
import { isKeyEnter } from '../../../lib/events/keyboard/identifiers';
import { Nullable } from '../../../typings/utility-types';

import { jsStyles } from './FileUploaderFile.styles';

interface FileUploaderFileProps {
  file: FileUploaderAttachedFile;
  showSize?: boolean;
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

export const FileUploaderFile = (props: FileUploaderFileProps) => {
  const { file, showSize } = props;
  const { id, originalFile, status, validationResult } = file;
  const { name, size } = originalFile;

  const [hovered, setHovered] = useState<boolean>(false);
  const [focusedByTab, setFocusedByTab] = useState(false);
  const [truncatedFileName, setTruncatedFileName] = useState<Nullable<string>>(null);

  const textHelperRef = useRef<TextWidthHelper>(null);
  const fileNameElementRef = useRef<HTMLSpanElement>(null);

  const { removeFile } = useContext(FileUploaderControlContext);
  const theme = useContext(ThemeContext);

  const formattedSize = useMemo(() => formatBytes(size, 1), [size]);

  // важно запустить после рендера, чтобы успели проставиться рефы
  useEffect(() => {
    const fileNameWidth = textHelperRef.current?.getTextWidth() || 0;
    const fileNameElementWidth = fileNameElementRef.current?.getBoundingClientRect().width || 0;
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

  const icon: ReactNode = useMemo(() => {
    const deleteIcon = <DeleteIcon className={jsStyles.deleteIcon(theme)} />;

    if (hovered || focusedByTab) {
      return deleteIcon;
    }

    switch (status) {
      case FileUploaderFileStatus.Loading:
        return <Spinner type="mini" dimmed caption="" />;
      case FileUploaderFileStatus.Uploaded:
        return <OkIcon color={theme.fileUploaderIconColor} />;
      default:
        if (!isValid) {
          return <ErrorIcon />;
        }
        return deleteIcon;
    }
  }, [hovered, status, isValid, theme, focusedByTab]);

  const renderTooltipContent = useCallback((): ReactNode => {
    return isValid ? null : message;
  }, [isValid, message]);

  const contentClassNames = cx(jsStyles.content(), {
    [jsStyles.error(theme)]: !isValid,
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
  });

  return (
    <div
      data-tid="FileUploader__file"
      className={jsStyles.root()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Tooltip data-tid="FileUploader__fileTooltip" pos="right middle" render={renderTooltipContent}>
        <div className={contentClassNames}>
          <TextWidthHelper ref={textHelperRef} text={name} />
          <span data-tid="FileUploader__fileName" ref={fileNameElementRef} className={jsStyles.name()}>
            {truncatedFileName}
          </span>
          {!!showSize && formattedSize && (
            <span data-tid="FileUploader__fileSize" className={jsStyles.size()}>
              {formattedSize}
            </span>
          )}
          <div
            className={iconClassNames}
            data-tid="FileUploader__fileIcon"
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
