import React, { useCallback, useContext, useRef } from 'react';
import UploadIcon from '@skbkontur/react-icons/Upload';

import { IUploadFile, readFiles } from '../../lib/fileUtils';
import { Link } from '../../components/Link';
import { cx } from '../../lib/theming/Emotion';
import { isKeyEnter } from '../../lib/events/keyboard/identifiers';
import { useMemoObject } from '../../hooks/useMemoObject';

import { UploadFileList } from './UploadFileList/UploadFileList';
import { UploadFile } from './UploadFile/UploadFile';
import { UploadFileControlContext } from './UploadFileControlContext';
import { useControlLocale, useDrop } from './UploadFileControlHooks';
import { jsStyles } from './UploadFileControl.styles';

const stopPropagation: React.ReactEventHandler = (e) => e.stopPropagation();

export interface IUploadFileError {
  fileId: string;
  message: string;
}

// FIXME @mozalov: протестировать поддержку react-ui-validations

// FIXME @mozalov: написать тесты на компоненты после ревью
// FIXME @mozalov: написать комменты для каждого пропса (спросить надо ли у Егора)
export interface IUploadFileControlProps {
  // свойства эквивалентные нативным
  id?: string;
  name?: string;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;

  // FIXME @mozalov: проблема в том, что сейчас контрол мы валидируем так, что в controlError передаем данные и сам компонент обрамляем в тултип внутри, через react-validation не выйдет,
  // свойство валидации контрола
  error?: boolean;
  warning?: boolean;
  width?: React.CSSProperties['width'];

  // хендлер, срабатывает после выбора файлов (при валидном считывании файла)
  onSelect?: (files: IUploadFile[]) => void;
  // хендлер, срабатывает после выбора файлов (при невалидном считывании файла)
  onReadError?: (files: IUploadFile[]) => void;

  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
}

export const UploadFileControl = (props: IUploadFileControlProps) => {
  const {
    id,
    name,
    disabled,
    accept,
    error,
    warning,
    onBlur,
    onFocus,
    onSelect,
    onReadError,
    multiple = false,
    width = 362,
  } = props;

  const locale = useControlLocale();

  const inputRef = useRef<HTMLInputElement>(null);
  const { files, setFiles, removeFile } = useContext(UploadFileControlContext);

  const isSingleMode = !multiple;

  const handleChange = useCallback(
    async (newFiles: FileList | null) => {
      if (!newFiles) return;

      let filesArray = Array.from(newFiles);

      if (isSingleMode) {
        filesArray = [filesArray[0]];
      }

      const uploadFiles = await readFiles(filesArray);

      const selectedFiles = uploadFiles.filter((v) => !!v.fileInBase64);
      const readErrorFiles = uploadFiles.filter((v) => !v.fileInBase64);

      if (isSingleMode && selectedFiles.length && files.length) {
        removeFile(files[0].id);
      }
      setFiles(selectedFiles);

      onSelect?.(selectedFiles);
      onReadError?.(readErrorFiles);
    },
    [onReadError, onSelect, setFiles, isSingleMode, files, removeFile],
  );

  const handleDrop = useCallback(
    (event) => {
      if (disabled) {
        return;
      }

      const { dataTransfer } = event;
      const { files } = dataTransfer;

      if (files?.length > 0) {
        handleChange(files);
        dataTransfer.clearData();
      }
    },
    [handleChange, disabled],
  );

  const { isDraggable, ref: droppableRef } = useDrop<HTMLDivElement>({ onDrop: handleDrop });
  const { isDraggable: isWindowDraggable, ref: windowRef } = useDrop<Document>();

  windowRef.current = window.document;

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(event.target.files);
    },
    [handleChange],
  );

  const uploadButtonClassNames = cx(jsStyles.uploadButton(), {
    [jsStyles.dragOver()]: isDraggable && !disabled,
    [jsStyles.warning()]: !!warning && !disabled,
    [jsStyles.error()]: !!error && !disabled,
    [jsStyles.disabled()]: disabled,
  });

  const uploadButtonWrapperClassNames = cx({
    [jsStyles.windowDragOver()]: isWindowDraggable && !disabled,
  });

  const handleClick = useCallback(() => {
    !disabled && inputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (isKeyEnter(e)) {
        handleClick();
      }
    },
    [handleClick],
  );

  const handleFocus = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    !disabled && onFocus?.(e);
  }, [disabled, onFocus]);


  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    !disabled && onBlur?.(e);
  }, [disabled, onBlur]);

  const hasOneFile = files.length === 1;
  const hasOneFileForSingle = isSingleMode && hasOneFile;

  const style = useMemoObject({width});

  return (
    <div>
      {!isSingleMode && !!files.length && <UploadFileList />}
      <div className={uploadButtonWrapperClassNames}>
        <div
          className={uploadButtonClassNames}
          tabIndex={0}
          ref={droppableRef}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          style={style}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <div className={jsStyles.content()}>
            <Link disabled={disabled} tabIndex={-1}>
              {hasOneFileForSingle ? locale.choosedFile : locale.chooseFile}
            </Link>
            &nbsp;
            <div className={jsStyles.afterLinkText()}>
              {hasOneFileForSingle ? (
                <UploadFile file={files[0]} />
              ) : (
                <>
                  {locale.orDragHere}&nbsp;
                  <UploadIcon color="#808080" />
                </>
              )}
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
            value={''}
          />
        </div>
      </div>
    </div>
  );
};

UploadFileControl.displayName = 'UploadFileControl';
