import React, { useCallback, useEffect, useRef, useState } from 'react';
import { jsStyles } from './FileUploader.styles';
import { stopPropagation } from '../../lib/events/stopPropagation';
import UploadIcon from '@skbkontur/react-icons/Upload';
import { Link } from '../Link';
import cn from 'classnames';
import { IFileWithBase64, readFiles } from './fileUtils';
import { ReadFileList } from './ReadFileList/ReadFileList';

// FIXME @mozalov: написать комменты для каждого пропса
// FIXME @mozalov: локализация

export interface FileUploaderProps {
  name?: string;
  multiple?: boolean;
  // TODO изучить как можно прикрутить валидацию
  accept?: string;
  onChange?: (files: IFileWithBase64[]) => void;
  // onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
  disabled?: boolean;
  id?: string;
  // progress?: UploadListProgressProps;
  // itemRender?: ItemRender<T>;
  maxCount?: number;
}

export const FileUploader = (props: FileUploaderProps) => {
  const {name, multiple = false, accept, onChange} = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const enterCounter = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const [files, setFiles] = useState<IFileWithBase64[]>([]);

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

    setFiles(readedFiles);
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

  const uploadButtonClassNames = cn(jsStyles.uploadButton(), {
    [jsStyles.dragOver()]: isDraggable
  })

  const hasOneFile = files.length === 1;

  console.log({files});
  const linkText = !multiple && hasOneFile ? "Выбран файл" : "Выберите файл";
  const buttonText = !multiple && hasOneFile && files[0].name;

  return (
    <div>
      {multiple && !!files.length && <ReadFileList files={files} />}
      <div
        className={uploadButtonClassNames}
        tabIndex={0}
        ref={rootRef}
      >
        <div>
          <Link
            className={jsStyles.link()}
            tabIndex={-1}
            onClick={handleClick}
          >
            {linkText}
          </Link>
          &nbsp;{buttonText || "или перетащите сюда"}
        </div>
        <UploadIcon color="#808080"/>
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
    </div>
  );
};

FileUploader.displayName = "FileUploader";
