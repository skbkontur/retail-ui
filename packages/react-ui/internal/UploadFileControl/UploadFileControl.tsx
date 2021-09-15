import React, { ReactNode, useCallback, useContext, useRef } from 'react';
import { jsStyles } from './UploadFileControl.styles';
import UploadIcon from '@skbkontur/react-icons/Upload';
import { IUploadFile, readFiles } from '../../lib/fileUtils';
import { UploadFileList } from './UploadFileList/UploadFileList';
import { UploadFile } from './UploadFile/UploadFile';
import { Link } from '../../components/Link';
import { UploadFileControlContext } from './UploadFileControlContext';
import { useControlLocale, useDrop } from './UploadFileControlHooks';
import { Tooltip } from '../../components/Tooltip';
import { cx } from '../../lib/theming/Emotion';
import { isKeyEnter } from '../../lib/events/keyboard/identifiers';

const stopPropagation: React.ReactEventHandler = e => e.stopPropagation();

export interface IUploadFileError {
  fileId: string;
  message: string;
}

// FIXME @mozalov: попробовать сделать так, чтобы компонент работал как нативный input file

// FIXME @mozalov: написать комменты для каждого пропса (спросить надо ли у Егора)
export interface IUploadFileControlProps {
  // свойства эквивалентные нативным
  id?: string;
  name?: string;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;

  // свойство валидации контрола
  controlError?: ReactNode;

  // хендлер, срабатывает после выбора файлов (при валидном считывании файла)
  onSelect?: (files: IUploadFile[]) => void;
  // хендлер, срабатывает после выбора файлов (при невалидном считывании файла)
  onReadError?: (files: IUploadFile[]) => void;
}

export const UploadFileControl = (props: IUploadFileControlProps) => {
  const {
    id,
    name,
    multiple = false,
    disabled,
    accept,
    controlError,
    onSelect,
    onReadError
  } = props;

  const locale = useControlLocale();

  const inputRef = useRef<HTMLInputElement>(null);
  const {files, setFiles} = useContext(UploadFileControlContext);

  const handleChange = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const uploadFiles = await readFiles(Array.from(files));

    const selectedFiles = uploadFiles.filter(v => !!v.fileInBase64);
    const readErrorFiles = uploadFiles.filter(v => !v.fileInBase64);

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
            type="file"
            name={name}
            accept={accept}
            disabled={disabled}
            multiple={multiple}
            className={jsStyles.fileInput()}
            onClick={stopPropagation}
            onChange={handleInputChange}
            // для того, чтобы срабатывало событие change при выборе одного и того же файла подряд
            value={""}
          />
        </div>
      </Tooltip>
    </div>
  );
};

UploadFileControl.displayName = "UploadFileControl";
