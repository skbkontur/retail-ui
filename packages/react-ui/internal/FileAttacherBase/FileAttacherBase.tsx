import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { jsStyles } from './FileAttacherBase.styles';
import UploadIcon from '@skbkontur/react-icons/Upload';
import cn from 'classnames';
import {
  getUploadFile,
  isAllowedFileType,
  IUploadFile,
  readFiles,
  UploadFileError,
  UploadFileStatus,
} from '../../lib/fileUtils';
import { UploadFileList } from './UploadFileList/UploadFileList';
import { UploadFile } from './UploadFile/UploadFile';
import { Link } from '../../components/Link';
import { UploadFilesContext } from './UploadFilesContext';

// FIXME @mozalov: написать комменты для каждого пропса
// FIXME @mozalov: локализаци
// FIXME @mozalov: тема
// FIXME @mozalov: обработать клавиши
// FIXME @mozalov: иконки
// FIXME @mozalov: ховеры
// FIXME @mozalov: валидация
// FIXME @mozalov: максимальное количество файлов и размер
// FIXME @mozalov: вынести абстракцию ValidationResult

const stopPropagation: React.ReactEventHandler = e => e.stopPropagation();

export interface FileAttacherBaseProps {
  name?: string;
  multiple?: boolean;
  // TODO изучить как можно прикрутить валидацию
  allowedFileTypes?: string[];
  onChange?: (files: IUploadFile[]) => void;
  // onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
  disabled?: boolean;
  id?: string;
  maxCount?: number;
}

export const FileAttacherBase = (props: FileAttacherBaseProps) => {
  const {name, onChange, allowedFileTypes = [], multiple = false} = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const enterCounter = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);

  const {files, setFiles} = useContext(UploadFilesContext);

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

  const fileTypeValidate = useCallback(({ type }: File): boolean => {
    if (!allowedFileTypes.length) {
      return true;
    }

    if (!type) {
      return false;
    }

    return isAllowedFileType(type, allowedFileTypes);
  }, [allowedFileTypes]);

  const validate = (file: File): UploadFileError | undefined => {
    if (!fileTypeValidate(file)) {
      return UploadFileError.FileTypeError;
    }
  };

  const handleChange = useCallback(async (files: FileList | null) => {
    if (!files) return;

    // TODO @mozalov: вынести в хелпер
    let uploadFiles = Array.from(files)
      .map(file => {
        console.log({fileBeforeValidate: file});
        const validationResult = validate(file);
        console.log({getUploadFile: getUploadFile(file)});
        return {
          ...getUploadFile(file),
          status: !validationResult ? UploadFileStatus.Default : UploadFileStatus.Error,
          error: validationResult,
        };
      });

    console.log("After validate");
    const validFiles = uploadFiles.filter(file => file.status !== UploadFileStatus.Error);
    const fileUrls = await readFiles(validFiles.map(file => file.originalFile));

    console.log("After read");

    uploadFiles = uploadFiles.map(file => {
      const fileIndex = validFiles.indexOf(file);
      if (fileIndex > -1) {
        return {...file, url: fileUrls[fileIndex]};
      }

      return file;
    });

    if (!uploadFiles.length) return;

    console.log("Before set in state", uploadFiles);

    setFiles(uploadFiles);
    onChange && onChange(uploadFiles);
  }, [onChange, validate, setFiles]);

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
  });

  const hasOneFile = files.length === 1;
  const hasOneFileForSingle = !multiple && hasOneFile;

  return (
    <div>
      {multiple && !!files.length && <UploadFileList />}
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
              ? <UploadFile file={files[0]} />
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
        />
      </div>
    </div>
  );
};

FileAttacherBase.displayName = "FileAttacherBase";
