import React, { useCallback, useEffect, useRef, useState } from 'react';
import { jsStyles } from './FileUploader.styles';
import { stopPropagation } from '../../lib/events/stopPropagation';
import UploadIcon from '@skbkontur/react-icons/Upload';
import { Link } from '../Link';
import { Gapped } from '../Gapped';
import cn from 'classnames';
import { ReadedFileType, readFiles } from './fileUtils';

// FIXME @mozalov: написать комменты для каждого пропса
// FIXME @mozalov: локализация

export interface FileUploaderProps {
  name?: string;
  multiple?: boolean;
  // TODO изучить как можно прикрутить валидацию
  accept?: string;
  onChange?: (files: ReadedFileType[]) => void;
  // onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
  disabled?: boolean;
  id?: string;
  // progress?: UploadListProgressProps;
  // itemRender?: ItemRender<T>;
  maxCount?: number;
}

export const FileUploader = (props: FileUploaderProps) => {
  const {name, multiple, accept, onChange} = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const enterCounter = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const preventDefault = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragOver = useCallback(event => {
    event.preventDefault();
  }, []);

  const handleDragEnter = useCallback(event => {
    preventDefault(event);
    enterCounter.current++;
    setIsDraggable(true);
  }, [preventDefault]);

  const handleDragLeave = useCallback(event => {
    enterCounter.current--;
    if (enterCounter.current === 0) {
      setIsDraggable(false);
    }
  }, []);


  const handleChange = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const readedFiles = await readFiles(Array.from(files));

    if (!readedFiles.length) return;
    // validate

    onChange && onChange(readedFiles);
  }, [onChange]);

  const handleDrop = useCallback(event => {
    preventDefault(event);
    setIsDraggable(false);
    enterCounter.current = 0;

    const {dataTransfer} = event;
    const {files} = dataTransfer;

    if (files?.length > 0) {
      handleChange(files);
      dataTransfer.clearData();
    }
  }, [preventDefault, handleChange]);

  useEffect(() => {
    rootRef.current?.addEventListener("dragenter", handleDragEnter);
    rootRef.current?.addEventListener("dragleave", handleDragLeave);
    rootRef.current?.addEventListener("drop", handleDrop);
    rootRef.current?.addEventListener("dragover", handleDragOver);

    return () => {
      rootRef.current?.removeEventListener("dragenter", handleDragEnter);
      rootRef.current?.removeEventListener("dragleave", handleDragLeave);
      rootRef.current?.removeEventListener("drop", handleDrop);
      rootRef.current?.removeEventListener("dragover", handleDragOver);
    };
  }, []);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.files);
  }, [handleChange]);

  const rootClassNames = cn(jsStyles.root(), {
    [jsStyles.dragOver()]: isDraggable
  })

  return (
    <div
      className={rootClassNames}
      onClick={handleClick}
      tabIndex={0}
      ref={rootRef}
    >
      <Gapped gap={5}>
        <div>
          <Link className={jsStyles.link()} tabIndex={-1}>
            Выберите файл
          </Link>&nbsp;или перетащите сюда
        </div>
        <UploadIcon color="#808080"/>
      </Gapped>
      <input
        ref={inputRef}
        // FIXME @mozalov: разрулить конфликт
        // @ts-ignore
        onClick={stopPropagation}
        className={jsStyles.fileInput()}
        type="file"
        name={name}
        multiple={multiple}
        onChange={handleInputChange}
        accept={accept}
      />
    </div>
  );
};

FileUploader.displayName = "FileUploader";
