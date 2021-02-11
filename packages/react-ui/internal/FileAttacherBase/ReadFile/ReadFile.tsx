import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { IReadFile } from '../../../lib/fileUtils';
import { jsStyles } from './ReadFile.styles';
import DeleteIcon from '@skbkontur/react-icons/Delete';
import ErrorIcon from '@skbkontur/react-icons/Error';
import OkIcon from '@skbkontur/react-icons/Ok';
import { formatBytes } from '../../../lib/utils';
import { TextWidthHelper } from '../../../internal/TextWidthHelper/TextWidthHelper';
import { truncate } from '../../../lib/stringUtils';
import { ReadFileItemStatus, ReadFileListContext } from '../ReadFileList/ReadFileListContext';
import { Spinner } from '../../../components/Spinner';

interface ReadFileProps {
  file: IReadFile;
  index: number;
  showSize?: boolean;

  onDelete: (index: number) => void;
}

interface ReadFileState {
  fileNameWidth: number;
  fileNameSpanWidth: number;
}

export const ReadFile = (props: ReadFileProps) => {
  const {file, onDelete, index, showSize} = props;
  const {name, size} = file;

  const textHelperRef = useRef<TextWidthHelper>(null);
  const fileNameSpanRef = useRef<HTMLSpanElement>(null);
  const {getFileStatus} = useContext(ReadFileListContext);

  const [state, setState] = useState<ReadFileState>({
    fileNameWidth: 0,
    fileNameSpanWidth: 0
  });

  const {fileNameWidth, fileNameSpanWidth} = state;

  const formattedSize = useMemo(() => formatBytes(size, 1), [size]);

  useEffect(() => {
    if (fileNameSpanRef.current && textHelperRef.current) {
      setState({
        fileNameWidth: textHelperRef.current?.getTextWidth(),
        fileNameSpanWidth: fileNameSpanRef.current?.getBoundingClientRect().width
      });
    }
  }, [fileNameSpanRef.current, textHelperRef.current]);

  // FIXME @mozalov: почитать про XSS
  const truncatedFileName = useMemo(() => {
    if (!fileNameWidth && !fileNameSpanWidth) {
      return null;
    }

    if (fileNameWidth <= fileNameSpanWidth) {
      return name;
    }

    const charWidth = Math.ceil(fileNameWidth / name.length);
    const maxCharsCountInSpan = Math.ceil(fileNameSpanWidth / charWidth);

    return truncate(name, maxCharsCountInSpan);
  }, [name, fileNameSpanWidth, fileNameWidth]);

  const handleDelete = useCallback(() => {
    onDelete(index);
  }, [index, onDelete]);

  const fileStatus = useMemo(() => getFileStatus(file.id), [getFileStatus, file.id]);

  const icon: ReactNode = useMemo(() => {
    switch (fileStatus) {
      case ReadFileItemStatus.Loading:
        return <Spinner type="mini" dimmed caption="" />;
      case ReadFileItemStatus.Error:
        return <ErrorIcon />;
      case ReadFileItemStatus.Success:
        return <OkIcon />;
      default:
        return <DeleteIcon color="#808080" onClick={handleDelete} />;
    }
  }, [fileStatus]);

  return (
    <div className={jsStyles.root()}>
      <TextWidthHelper ref={textHelperRef} text={name} />
      <span ref={fileNameSpanRef} className={jsStyles.name()}>{truncatedFileName}</span>
      {!!showSize && formattedSize && <span className={jsStyles.size()}>{formattedSize}</span>}
      <div className={jsStyles.icon()}>
        {icon}
      </div>
    </div>
  );
};

ReadFile.displayName = "ReadFile";
