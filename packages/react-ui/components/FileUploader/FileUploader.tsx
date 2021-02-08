import React, { useCallback, useEffect, useRef, useState } from 'react';
import { jsStyles } from './FileUploader.styles';
import UploadIcon from '@skbkontur/react-icons/Upload';
import { Link } from '../Link';
import cn from 'classnames';
import { IFileWithBase64, readFiles } from './fileUtils';
import { ReadFileList } from './ReadFileList/ReadFileList';
import { ReadFile } from './ReadFile/ReadFile';

// FIXME @mozalov: написать комменты для каждого пропса
// FIXME @mozalov: локализаци
// FIXME @mozalov: тема
// FIXME @mozalov: обработать клавиши
// FIXME @mozalov: анимация
// FIXME @mozalov: иконки

const stopPropagation: React.ReactEventHandler = e => e.stopPropagation();

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
  const {name, accept, onChange, multiple = false} = props;

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

    const filesWithBase64 = await readFiles(Array.from(files));

    if (!filesWithBase64.length) return;
    // validate

    setFiles(filesWithBase64);
    onChange && onChange(filesWithBase64);
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

  const handleDeleteFile = useCallback((removeIndex: number) => {
    setFiles(files.filter((_, fileIndex) => removeIndex !== fileIndex));
  }, [files]);


  const uploadButtonClassNames = cn(jsStyles.uploadButton(), {
    [jsStyles.dragOver()]: isDraggable
  });

  const hasOneFile = files.length === 1;
  const hasOneFileForSingle = !multiple && hasOneFile;

  return (
    <div>
      {multiple && !!files.length && <ReadFileList files={files} onDelete={handleDeleteFile} />}
      <div
        className={uploadButtonClassNames}
        tabIndex={0}
        ref={rootRef}
        onClick={handleClick}
      >
        <div className={jsStyles.content()}>
          <Link tabIndex={-1}>
            {hasOneFileForSingle ? "Выбран файл" : "Выберите файл"}
          </Link>
          &nbsp;
          <div className={jsStyles.afterLinkText()} onClick={stopPropagation}>
            {hasOneFileForSingle
              ? <ReadFile index={0} file={files[0]} onDelete={handleDeleteFile} />
              : <>или перетащите сюда <UploadIcon color="#808080"/></>}
          </div>
        </div>
        <input
          ref={inputRef}
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
