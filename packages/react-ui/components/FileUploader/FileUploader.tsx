import React, { useRef } from 'react';
import { jsStyles } from './FileUploader.styles';
import { stopPropagation } from '../../lib/events/stopPropagation';
import UploadIcon from '@skbkontur/react-icons/Upload';
import { Link } from '../Link';
import { Gapped } from '../Gapped';

// FIXME @mozalov: написать комменты для каждого пропса
// FIXME @mozalov: локализация

export interface FileUploaderProps {
  name?: string;
  multiple?: boolean;
  // TODO изучить как можно прикрутить валидацию
  accept?: string;
  // onChange?: (info: UploadChangeParam) => void;
  // onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
  disabled?: boolean;
  id?: string;
  // progress?: UploadListProgressProps;
  // itemRender?: ItemRender<T>;
  maxCount?: number;
}

export const FileUploader = (props: FileUploaderProps) => {
  const {name, multiple, accept} = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = React.useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = React.useCallback(() => {

  }, []);

  return (
    <div className={jsStyles.root()} onClick={handleClick}>
      <Gapped gap={5}>
        <div>
          <Link className={jsStyles.link()}>
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
        onChange={handleChange}
        accept={accept}
      />
    </div>
  );
};

FileUploader.displayName = "FileUploader";
