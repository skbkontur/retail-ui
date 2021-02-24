import React, { ReactNode, useCallback, useContext, useRef } from 'react';
import { jsStyles } from './FileAttacherBase.styles';
import UploadIcon from '@skbkontur/react-icons/Upload';
import cn from 'classnames';
import {
  getUploadFile,
  IUploadFile,
  readFiles,
} from '../../lib/fileUtils';
import { UploadFileList } from './UploadFileList/UploadFileList';
import { UploadFile } from './UploadFile/UploadFile';
import { Link } from '../../components/Link';
import { UploadFilesContext } from './UploadFilesContext';
import { useDrop } from './FileAttacherBaseHooks';
import { ValidationResult } from './ValidationResult';
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
  onChange?: (files: IUploadFile[]) => void;
  disabled?: boolean;
  id?: string;
  multiple?: boolean;

  controlError?: ReactNode;

  // TODO @mozalov: мб стоит поменять на массив пропсов fileError по fileId?
  fileValidate?: (file: IUploadFile, allowedFileTypes: string[]) => ValidationResult;
}

export const FileAttacherBase = (props: FileAttacherBaseProps) => {
  const {
    name,
    onChange,
    multiple = false,
    controlError
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const {files, setFiles} = useContext(UploadFilesContext);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(async (files: FileList | null) => {
    if (!files) return;

    let uploadFiles = Array.from(files).map(file => getUploadFile(file));
    // TODO @mozalov: мб валидировать до чтения?
    const fileUrls = await readFiles(uploadFiles.map(file => file.originalFile));

    if (!uploadFiles.length) return;

    uploadFiles.map((file, index) => ({...file, url: fileUrls[index]}));

    setFiles(uploadFiles);
  }, [onChange, setFiles]);

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

  const uploadButtonClassNames = cn(jsStyles.uploadButton(), {
    [jsStyles.dragOver()]: isDraggable,
    [jsStyles.windowDragOver()]: isWindowDraggable && !isDraggable,
    [jsStyles.error()]: !!controlError,
  });

  const hasOneFile = files.length === 1;
  const hasOneFileForSingle = !multiple && hasOneFile;

  const renderTooltipContent = useCallback((): ReactNode => {
    return controlError || null;
  }, [controlError]);

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
            <div className={jsStyles.afterLinkText()}>
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
