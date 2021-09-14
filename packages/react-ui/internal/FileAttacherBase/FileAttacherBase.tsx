import React, { ReactNode, useCallback, useContext, useRef } from 'react';
import { jsStyles } from './FileAttacherBase.styles';
import UploadIcon from '@skbkontur/react-icons/Upload';
import { IUploadFile, readFiles } from '../../lib/fileUtils';
import { UploadFileList } from './UploadFileList/UploadFileList';
import { UploadFile } from './UploadFile/UploadFile';
import { Link } from '../../components/Link';
import { UploadFilesContext } from './UploadFilesContext';
import { useControlLocale, useDrop } from './FileAttacherBaseHooks';
import { Tooltip } from '../../components/Tooltip';
import { cx } from '../../lib/theming/Emotion';
import { isKeyEnter } from '../../lib/events/keyboard/identifiers';

// FIXME @mozalov: написать комменты для каждого пропса (спросить надо ли у Егора)
const stopPropagation: React.ReactEventHandler = e => e.stopPropagation();

export type FileError = {
  fileId: string;
  message: string;
};

export interface FileAttacherBaseProps {
  id?: string;
  name?: string;
  disabled?: boolean;
  multiple?: boolean;
  controlError?: ReactNode;

  onChange?: (files: IUploadFile[]) => void;
  onSelect?: (files: IUploadFile[]) => void;
  onRemove?: (fileId: string) => void;
  onReadError?: (files: IUploadFile[]) => void;
}

export const FileAttacherBase = (props: FileAttacherBaseProps) => {
  const {
    id,
    name,
    multiple = false,
    disabled,
    controlError,
    onSelect,
    onReadError
  } = props;

  const locale = useControlLocale();

  const inputRef = useRef<HTMLInputElement>(null);
  const {files, setFiles} = useContext(UploadFilesContext);

  const handleChange = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const uploadFiles = await readFiles(Array.from(files));

    const selectedFiles = uploadFiles.filter(v => !!v.fileInBase64);
    const readErrorFiles = uploadFiles.filter(v => !v.fileInBase64);

    // TODO @mozalov: подумать над тем, чтобы setFiles делать только в одном месте, в UploadFilesProvider
    setFiles(selectedFiles);

    onSelect && onSelect(selectedFiles);
    onReadError && onReadError(readErrorFiles);
  }, [onReadError, onSelect, setFiles]);

  const handleDrop = useCallback(event => {
    if (disabled) {
      return;
    }

    const {dataTransfer} = event;
    const {files} = dataTransfer;

    if (files?.length > 0) {
      handleChange(files);
      dataTransfer.clearData();
    }
  }, [handleChange, disabled]);

  const {isDraggable, ref: droppableRef} = useDrop<HTMLDivElement>({onDrop: handleDrop});
  const {isDraggable: isWindowDraggable, ref: windowRef} = useDrop<Document>({onDrop: handleDrop});

  windowRef.current = window.document;

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.files);
  }, [handleChange]);

  const uploadButtonClassNames = cx(jsStyles.uploadButton(), {
    [jsStyles.dragOver()]: isDraggable,
    [jsStyles.windowDragOver()]: isWindowDraggable && !isDraggable,
    [jsStyles.error()]: !!controlError,
    [jsStyles.disabled()]: disabled
  });

  const renderTooltipContent = useCallback((): ReactNode => {
    return (!disabled && controlError) || null;
  }, [controlError, disabled]);

  const handleClick = useCallback(() => {
    !disabled && inputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (isKeyEnter(e)) {
      handleClick();
    }
  }, [handleClick]);

  const hasOneFile = files.length === 1;
  const hasOneFileForSingle = !multiple && hasOneFile;

  return (
    <div>
      {multiple && !!files.length && <UploadFileList />}
      <Tooltip pos="right middle" render={renderTooltipContent}>
        <div
          className={uploadButtonClassNames}
          tabIndex={0}
          ref={droppableRef}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <div className={jsStyles.content()}>
            <Link disabled={disabled} tabIndex={-1}>
              {hasOneFileForSingle ? locale.choosedFile : locale.chooseFile}
            </Link>
            &nbsp;
            <div className={jsStyles.afterLinkText()}>
              {hasOneFileForSingle
                ? <UploadFile file={files[0]} />
                : <>{locale.orDragHere}&nbsp;<UploadIcon color="#808080"/></>}
            </div>
          </div>
          <input
            id={id}
            ref={inputRef}
            onClick={stopPropagation}
            className={jsStyles.fileInput()}
            type="file"
            name={name}
            disabled={disabled}
            multiple={multiple}
            // для того, чтобы срабатывало событие change при выборе одного и того же файла подряд
            value={""}
            onChange={handleInputChange}
          />
        </div>
      </Tooltip>
    </div>
  );
};

FileAttacherBase.displayName = 'FileAttacherBase';
