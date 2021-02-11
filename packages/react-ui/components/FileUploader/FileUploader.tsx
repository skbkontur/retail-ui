import React, { useCallback, useContext } from 'react';
import { withReadFileListProvider } from '../../internal/FileAttacherBase/ReadFileList/ReadFileListProvider';
import {
  ReadFileItemStatus,
  ReadFileListContext,
} from '../../internal/FileAttacherBase/ReadFileList/ReadFileListContext';
import { IReadFile } from '../../lib/fileUtils';
import { FileAttacherBase, FileAttacherBaseProps } from '../../internal/FileAttacherBase';

// FIXME @mozalov: подумать как делать abort запроса по крестику
// FIXME @mozalov: добавить типы ошибок

export interface RequestArgs {
  file: IReadFile;
  onSuccess: () => void;
  onError: (error: object) => void;
}

export interface FileUploaderProps extends FileAttacherBaseProps {
  request: (args: RequestArgs) => void;
}

export const FileUploader = withReadFileListProvider((props: FileUploaderProps) => {
  const {request} = props;
  const {setFileStatus} = useContext(ReadFileListContext);

  const handleStart = useCallback((fileId: number) => {
    setFileStatus(fileId, ReadFileItemStatus.Loading);
  }, []);

  const handleSuccess = useCallback((fileId: number) => {
    setFileStatus(fileId, ReadFileItemStatus.Success);
  }, []);

  const handleError = useCallback((fileId: number) => {
    setFileStatus(fileId, ReadFileItemStatus.Error);
  }, []);

  const upload = useCallback((file: IReadFile) => {
    const {id} = file;
    handleStart(id);

    request({
      file,
      onSuccess: () => handleSuccess(id),
      onError: () => handleError(id)
    });
  }, [request, handleSuccess, handleError, handleStart])

  const handleChange = useCallback((files: IReadFile[]) => {
    files.forEach(file => upload(file));
  }, [upload]);

  return (
    <FileAttacherBase
      {...props}
      onChange={handleChange}
    />
  );
});
