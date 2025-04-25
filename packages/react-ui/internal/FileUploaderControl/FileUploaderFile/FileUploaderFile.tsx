import type { ReactNode } from 'react';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { FileUploaderAttachedFile } from '../fileUtils';
import { formatBytes } from '../../../lib/utils';
import { TextWidthHelper } from '../../TextWidthHelper/TextWidthHelper';
import { truncate } from '../../../lib/stringUtils';
import { FileUploaderControlContext } from '../FileUploaderControlContext';
import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { keyListener } from '../../../lib/events/keyListener';
import { isKeyEnter } from '../../../lib/events/keyboard/identifiers';
import type { Nullable } from '../../../typings/utility-types';
import { Hint } from '../../../components/Hint';
import { Tooltip } from '../../../components/Tooltip';
import { getDOMRect } from '../../../lib/dom/getDOMRect';
import { useFileUploaderSize } from '../hooks/useFileUploaderSize';
import type { SizeProp } from '../../../lib/types/props';

import { jsStyles } from './FileUploaderFile.styles';
import { FileUploaderFileStatusIcon } from './FileUploaderFileStatusIcon';

interface FileUploaderFileProps {
  file: FileUploaderAttachedFile;
  showSize?: boolean;
  multiple?: boolean;
  size: SizeProp;
  /** Состояние ошибки контрола файла */
  error?: boolean;
  onRemove(id: string): void;
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

const calcTruncatedName = (
  textHelperRef: React.RefObject<TextWidthHelper>,
  fileNameElementRef: React.RefObject<HTMLSpanElement>,
  name: string,
) => {
  const fileNameWidth = textHelperRef.current?.getTextWidth() || 0;
  const fileNameElementWidth = getDOMRect(fileNameElementRef.current).width;

  return getTruncatedName(fileNameWidth, fileNameElementWidth, name);
};

const MIN_CHARS_LENGTH = 3;

export const FileUploaderFileDataTids = {
  file: 'FileUploader__file',
  fileTooltip: 'FileUploader__fileTooltip',
  fileName: 'FileUploader__fileName',
  fileSize: 'FileUploader__fileSize',
  fileIcon: 'FileUploader__fileIcon',
} as const;

export const FileUploaderFile = forwardRefAndName<HTMLDivElement, FileUploaderFileProps>(
  'FileUploaderFile',
  (props, ref) => {
    const { file, showSize, error, multiple, size, onRemove } = props;
    const { id, originalFile, status, validationResult } = file;
    const { name, size: fileSize } = originalFile;

    const [hovered, setHovered] = useState<boolean>(false);
    const [focusedByTab, setFocusedByTab] = useState(false);
    const [truncatedFileName, setTruncatedFileName] = useState<Nullable<string>>(null);

    const textHelperRef = useRef<TextWidthHelper>(null);
    const fileNameElementRef = useRef<HTMLSpanElement>(null);

    const { removeFile, setIsMinLengthReached, isMinLengthReached } = useContext(FileUploaderControlContext);
    const theme = useContext(ThemeContext);

    const formattedSize = useMemo(() => formatBytes(fileSize, 1), [fileSize]);

    useEffect(() => {
      if (setIsMinLengthReached) {
        const truncatedName = calcTruncatedName(textHelperRef, fileNameElementRef, name);

        setIsMinLengthReached((truncatedName?.length ?? 0) <= MIN_CHARS_LENGTH);
      }
    }, [name, isMinLengthReached]);

    useEffect(() => {
      const truncatedName = calcTruncatedName(textHelperRef, fileNameElementRef, name);

      setTruncatedFileName(truncatedName);
    });

    const removeUploadFile = useCallback(() => {
      removeFile(id);
      onRemove(id);
    }, [removeFile, id, onRemove]);

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

    const sizeIconClass = useFileUploaderSize(size, {
      small: jsStyles.iconSmall(),
      medium: jsStyles.iconMedium(),
      large: jsStyles.iconLarge(),
    });

    const renderTooltipContent = useCallback((): ReactNode => {
      return !isValid && !error && message ? message : null;
    }, [isValid, error, message]);

    const sizeContentClass = useFileUploaderSize(size, {
      small: jsStyles.contentSmall(theme),
      medium: jsStyles.contentMedium(theme),
      large: jsStyles.contentLarge(theme),
    });

    const contentClassNames = cx(jsStyles.content(), {
      [sizeContentClass]: true,
      [jsStyles.error(theme)]: isInvalid,
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
          removeUploadFile();
        }
      },
      [removeUploadFile],
    );

    const iconClassNames = cx(jsStyles.icon(theme), {
      [jsStyles.focusedIcon(theme)]: focusedByTab,
      [sizeIconClass]: true,
      [jsStyles.iconMultiple()]: multiple,
    });

    const isTruncated = truncatedFileName !== name;

    return (
      <div
        data-tid={FileUploaderFileDataTids.file}
        className={jsStyles.root()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
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
              <FileUploaderFileStatusIcon
                status={status}
                hovered={hovered}
                focusedByTab={focusedByTab}
                isInvalid={isInvalid}
                size={size}
              />
            </div>
          </div>
        </Tooltip>
      </div>
    );
  },
);
