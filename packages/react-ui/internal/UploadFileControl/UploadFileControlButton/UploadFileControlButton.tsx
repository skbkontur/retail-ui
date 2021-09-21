import React, { useCallback, useContext, useRef } from 'react';


import { cx } from '../../../lib/theming/Emotion';
import { UploadFileControlContext } from '../UploadFileControlContext';
import { isKeyEnter } from '../../../lib/events/keyboard/identifiers';
import { readFiles } from '../../../lib/fileUtils';
// FIXME @mozalov: возможно стоит вынести в отдельный фалй стилей
import { useDrop } from '../UploadFileControlHooks';
import { IUploadFileControlProps } from '../UploadFileControl';

import { jsStyles } from './UploadFileControlButton.styles';

const stopPropagation: React.ReactEventHandler = (e) => e.stopPropagation();

// FIXME @mozalov: добавить ширину в ветку file-uploader

export interface IUploadFileControlButtonProps extends IUploadFileControlProps {
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
}

// FIXME @mozalov: возможно нужно поменять ширину на 100%

export const UploadFileControlButton = (props: React.PropsWithChildren<IUploadFileControlButtonProps>) => {
  const { id, name, multiple = false, disabled, accept, controlError, onSelect, onReadError, children, width = 362, height = 32 } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const { setFiles } = useContext(UploadFileControlContext);

  const handleChange = useCallback(
    async (files: FileList | null) => {
      if (!files) return;

      const uploadFiles = await readFiles(Array.from(files));

      const selectedFiles = uploadFiles.filter((v) => !!v.fileInBase64);
      const readErrorFiles = uploadFiles.filter((v) => !v.fileInBase64);

      setFiles(selectedFiles);

      onSelect && onSelect(selectedFiles);
      onReadError && onReadError(readErrorFiles);
    },
    [onReadError, onSelect, setFiles],
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
  const { isDraggable: isWindowDraggable, ref: windowRef } = useDrop<Document>({ onDrop: handleDrop });

  windowRef.current = window.document;

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(event.target.files);
    },
    [handleChange],
  );

  const uploadButtonClassNames = cx(jsStyles.uploadButton(), {
    [jsStyles.dragOver()]: isDraggable,
    [jsStyles.windowDragOver()]: isWindowDraggable && !isDraggable,
    [jsStyles.error()]: !!controlError,
    [jsStyles.disabled()]: disabled,
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

  return (
    <div
      className={uploadButtonClassNames}
      tabIndex={0}
      ref={droppableRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{width, height}}
    >
      <div className={jsStyles.content()}>
        {children}
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
  );
};

UploadFileControlButton.displayName = 'UploadFileControlButton';
