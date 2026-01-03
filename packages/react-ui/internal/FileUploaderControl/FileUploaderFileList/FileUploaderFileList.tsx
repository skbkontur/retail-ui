import React, { useContext, useState, useRef } from 'react';

import { useEmotion, useStyles } from '../../../lib/renderEnvironment/index.js';
import { FileUploaderControlContext } from '../FileUploaderControlContext.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import type { FileUploaderFileProps } from '../FileUploaderFile/FileUploaderFile.js';
import { FileUploaderFileStatus, type FileUploaderValidationSummary, type FileUploaderView } from '../fileUtils.js';
import { useFileUploaderSize } from '../hooks/useFileUploaderSize.js';
import type { SizeProp } from '../../../lib/types/props.js';
import type { PopupPositionsType, ShortPopupPositionsType } from '../../Popup/index.js';
import { useControlLocale } from '../hooks/useControlLocale.js';
import { pluralize } from '../../../lib/pluralize.js';
import { LocaleContext } from '../../../lib/locale/index.js';

import { getJsStyles, getJsTileStyles, getJsRowStyles } from './FileUploaderFileList.styles.js';

interface FileUploaderFileListProps {
  renderFile: (props: FileUploaderFileProps) => React.ReactNode;
  size: SizeProp;
  view?: FileUploaderView;
  validationSummary?: FileUploaderValidationSummary;
  validationSummaryStart?: number;
  onRemove(fileId: string): void;
  withValidationTooltip?: boolean;
  /** Задает приоритетное расположение подсказки относительно контрола
   * @default 'top left' */
  validationTooltipPosition?: ShortPopupPositionsType | PopupPositionsType;
  withWarningIcon?: boolean;
  disabled?: boolean;
}

export const FileUploaderFileDataTids = {
  fileList: 'FileUploader__fileList',
} as const;

export const FileUploaderFileList = (props: FileUploaderFileListProps) => {
  const {
    renderFile,
    size,
    view = 'row',
    validationSummary = 'auto',
    validationSummaryStart = 5,
    withValidationTooltip,
    validationTooltipPosition,
    withWarningIcon,
    disabled = false,
    onRemove,
  } = props;
  const { files } = useContext(FileUploaderControlContext);
  const { cx } = useEmotion();
  const jsStyles = useStyles(getJsStyles);
  const jsRowStyles = useStyles(getJsRowStyles);
  const jsTileStyles = useStyles(getJsTileStyles);
  const theme = useContext(ThemeContext);
  const locale = useControlLocale();
  const { langCode } = useContext(LocaleContext);

  const [focusedByTab, setFocusedByTab] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const mouseIsOverRef = useRef(false);

  const handleMouseEnter = (index: string | null) => {
    setHovered(index);
    mouseIsOverRef.current = true;
  };

  const handleMouseLeave = () => {
    setHovered(null);
    mouseIsOverRef.current = false;
  };

  const handleRemoveItem = (index: string) => {
    onRemove(index);
    if (hovered === index && mouseIsOverRef.current) {
      // Если текущий элемент был наведен, переключаемся на следующий элемент
      const currentIndex = files.findIndex((file) => file.id === index);
      if (currentIndex !== -1 && files[currentIndex + 1]) {
        setHovered(files[currentIndex + 1].id);
      } else {
        setHovered(null);
      }
    }
  };

  const isTileView = view === 'tile';
  const jsViewStyles = isTileView ? jsTileStyles : jsRowStyles;

  const fileWrapperClass = useFileUploaderSize(size, {
    small: jsViewStyles.fileWrapperSmall(theme),
    medium: jsViewStyles.fileWrapperMedium(theme),
    large: jsViewStyles.fileWrapperLarge(theme),
  });

  const summaryClass = useFileUploaderSize(size, {
    small: jsStyles.summarySmall(theme),
    medium: jsStyles.summaryMedium(theme),
    large: jsStyles.summaryLarge(theme),
  });

  const renderSummary = () => {
    if (validationSummary === 'disabled') {
      return null;
    }

    const warningLength = files.filter((file) => file.status === FileUploaderFileStatus.Warning).length;
    const errorLength = files.filter((file) => file.status === FileUploaderFileStatus.Error).length;

    if (validationSummary === 'auto' && files.length < validationSummaryStart) {
      return null;
    }

    if (!(warningLength + errorLength)) {
      return null;
    }

    return (
      <div className={cx(jsStyles.summary(theme), summaryClass)}>
        {errorLength > 0 && (
          <span className={jsStyles.summaryErrorText(theme)}>
            {errorLength}&nbsp;{pluralize(langCode, errorLength, ...locale.errors)}
          </span>
        )}
        {warningLength > 0 && (
          <span className={jsStyles.summaryWarningText(theme)}>
            {warningLength}&nbsp;{pluralize(langCode, warningLength, ...locale.warnings)}
          </span>
        )}
      </div>
    );
  };

  return (
    <div data-tid={FileUploaderFileDataTids.fileList} className={jsViewStyles.fileListWrapper(theme)}>
      {renderSummary()}
      {files.map((file, idx) => {
        const hasFocus = focusedByTab === file.id;
        const hasHover = hovered === file.id;
        const hasError = file.status === FileUploaderFileStatus.Error;
        const hasWarning = file.status === FileUploaderFileStatus.Warning;

        const fileWrapperClassNames = cx(jsStyles.fileWrapper(theme), fileWrapperClass, {
          [jsStyles.fileWrapperFocus(theme)]: hasFocus,
          [jsStyles.fileWrapperHover(theme)]: hasHover,
          ...(hasError && {
            [jsStyles.errorFile(theme)]: !isTileView || hasHover,
            [jsViewStyles.errorFileFocus(theme)]: hasFocus,
          }),
          ...(!isTileView &&
            hasError && {
              [jsStyles.removeBorderTopRadius()]: files[idx - 1]?.status === FileUploaderFileStatus.Error,
              [jsStyles.removeBorderBottomRadius()]: files[idx + 1]?.status === FileUploaderFileStatus.Error,
            }),
          ...(hasWarning && {
            [jsStyles.warningFile(theme)]: !isTileView || hasHover,
            [jsViewStyles.warningFileFocus(theme)]: hasFocus,
          }),
          ...(!isTileView &&
            hasWarning && {
              [jsStyles.removeBorderTopRadius()]: files[idx - 1]?.status === FileUploaderFileStatus.Warning,
              [jsStyles.removeBorderBottomRadius()]: files[idx + 1]?.status === FileUploaderFileStatus.Warning,
            }),
        });

        const fileProps: FileUploaderFileProps = {
          file,
          multiple: true,
          size,
          view,
          disabled,
          hovered: hasHover,
          focused: hasFocus,
          onRemove: handleRemoveItem,
          withValidationTooltip,
          validationTooltipPosition,
          withWarningIcon,
        };

        const fileElement = renderFile(fileProps);

        return (
          <div
            key={file.id}
            className={fileWrapperClassNames}
            onMouseEnter={() => handleMouseEnter(file.id)}
            onMouseLeave={() => handleMouseLeave()}
            onFocus={() => setFocusedByTab(file.id)}
            onBlur={() => setFocusedByTab(null)}
          >
            <div className={jsViewStyles.file()}>{fileElement}</div>
          </div>
        );
      })}
    </div>
  );
};

FileUploaderFileList.__KONTUR_REACT_UI__ = 'FileUploaderFileList';
FileUploaderFileList.displayName = 'FileUploaderFileList';
