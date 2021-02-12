import React, { useCallback, useContext } from 'react';
import { withUploadFilesProvider } from '../../internal/FileAttacherBase/UploadFilesProvider';
import {
  UploadFileStatus,
  UploadFilesContextProps,
} from '../../internal/FileAttacherBase/UploadFilesContext';
import { IUploadFile } from '../../lib/fileUtils';
import { FileAttacherBase, FileAttacherBaseProps } from '../../internal/FileAttacherBase';

// FIXME @mozalov: подумать как делать abort запроса по крестику
// FIXME @mozalov: добавить типы ошибок

export type RequestFunction = (
  file: IUploadFile,
  onSuccess: () => void,
  onError: (error: object) => void,
) => void;

export interface FileUploaderProps extends FileAttacherBaseProps {
  request: RequestFunction;
}

export const FileUploader = withUploadFilesProvider((props: FileUploaderProps) => {
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

  const upload = useCallback((file: IUploadFile) => {
    const {id} = file;
    handleStart(id);
    request(file, () => handleSuccess(id), () => handleError(id));
  }, [request, handleSuccess, handleError, handleStart])

  const handleChange = useCallback((files: IUploadFile[]) => {
    files.forEach(file => upload(file));
  }, [upload]);

  return (
    <FileAttacherBase
      {...props}
      onChange={handleChange}
    />
  );
});
