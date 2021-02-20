import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { jsStyles } from './FileAttacherBase.styles';
import UploadIcon from '@skbkontur/react-icons/Upload';
import cn from 'classnames';
import {
  getUploadFile,
  isAllowedFileType,
  IUploadFile,
  readFiles,
  UploadFileValidationError,
} from '../../lib/fileUtils';
import { UploadFileList } from './UploadFileList/UploadFileList';
import { UploadFile } from './UploadFile/UploadFile';
import { Link } from '../../components/Link';
import { UploadFilesContext } from './UploadFilesContext';
import { useDrop } from './FileAttacherBaseHooks';
import { ValidationResult, ValidationResultType } from './ValidationResult';
import { Tooltip } from '../../components/Tooltip';

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
  // TODO изучить как можно прикрутить валидацию
  allowedFileTypes?: string[];
  onChange?: (files: IUploadFile[], error?: ValidationResult<FileAttacherBaseValidationError>) => void;
  // onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
  disabled?: boolean;
  id?: string;
  maxFilesCount?: number;
}

export enum FileAttacherBaseValidationError {
  MaxFilesError = 'MaxFilesError'
}

export const FileAttacherBase = (props: FileAttacherBaseProps) => {
  const {name, onChange, allowedFileTypes = [], maxFilesCount} = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const {files, setFiles, validationResult} = useContext(UploadFilesContext);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
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

  // TODO @mozalov: подумать как унести из компонента
  const fileValidate = useCallback((file: File): ValidationResult<UploadFileValidationError> => {
    if (!fileTypeValidate(file)) {
      return ValidationResult.error(UploadFileValidationError.FileTypeError);
    }
    return ValidationResult.ok();
  }, [fileTypeValidate]);

  const handleChange = useCallback(async (files: FileList | null) => {
    if (!files) return;

    // TODO @mozalov: вынести в хелпер
    let uploadFiles = Array.from(files)
      .map(file => {
        const validationResult = fileValidate(file);
        return {
          ...getUploadFile(file),
          validationResult
        };
      });

    const validFiles = uploadFiles.filter(file => file.validationResult.type !== ValidationResultType.Error);
    const fileUrls = await readFiles(validFiles.map(file => file.originalFile));

    uploadFiles = uploadFiles.map(file => {
      const fileIndex = validFiles.indexOf(file);
      if (fileIndex > -1) {
        return {...file, url: fileUrls[fileIndex]};
      }

      return file;
    });

    if (!uploadFiles.length) return;

    setFiles(uploadFiles);

    // FIXME @mozalov: вероятно стоит передавать в onChange только валидные файлы
    onChange && onChange(uploadFiles);
  }, [onChange, fileValidate, setFiles]);

  const handleDrop = useCallback(event => {
    const {dataTransfer} = event;
    const {files} = dataTransfer;

    if (files?.length > 0) {
      handleChange(files);
      dataTransfer.clearData();
    }
  }, [handleChange]);

  const {isDraggable, ref: droppableRef} = useDrop({onDrop: handleDrop});
  const {isDraggable: isWindowDraggable, ref: windowRef} = useDrop({onDrop: handleDrop});

  // @ts-ignore
  windowRef.current = window.document;

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.files);
  }, [handleChange]);

  const hasControlError = useMemo(() => (
    validationResult?.error === FileAttacherBaseValidationError.MaxFilesError
  ), [validationResult]);

  useEffect(() => {
    if(hasControlError) {
      inputRef.current?.blur();
    }
  }, [hasControlError]);

  const uploadButtonClassNames = cn(jsStyles.uploadButton(), {
    [jsStyles.dragOver()]: isDraggable,
    [jsStyles.windowDragOver()]: isWindowDraggable && !isDraggable,
    [jsStyles.error()]: hasControlError,
  });

  const multiple = !maxFilesCount || maxFilesCount !== 1;

  const hasOneFile = files.length === 1;
  const hasOneFileForSingle = !multiple && hasOneFile;

  const renderTooltipContent = useCallback((): ReactNode => {
    if (validationResult?.error === FileAttacherBaseValidationError.MaxFilesError) {
      return 'Можно отправить не больше двух файлов';
    }
    return null;
  }, [validationResult]);

  return (
    <div>
      {multiple && !!files.length && <UploadFileList />}
      <Tooltip pos="right middle" render={renderTooltipContent}>
        <div
          className={uploadButtonClassNames}
          tabIndex={0}
          ref={droppableRef}
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
      </Tooltip>
    </div>
  );
};

FileAttacherBase.displayName = "FileAttacherBase";
