import React, {
  PropsWithChildren,
  useCallback,
  useState,
} from 'react';

import { useMemoObject } from '../../hooks/useMemoObject';
import { UploadFile, UploadFileStatus } from '../../lib/fileUtils';

import { FileUploaderControlContext } from './FileUploaderControlContext';
import { UploadFileValidationResult } from './UploadFileValidationResult';
import { useControlLocale } from './hooks/useControlLocale';

export interface FileUploaderControlProviderProps {
  /** Срабатывает при валидном чтении файла (превращение в base64) */
  onSelect?: (files: UploadFile[]) => void;
  /** Срабатывает при удалении файла из контрола */
  onRemove?: (fileId: string) => void;
  /** Срабатывает при onSelect и onRemove*/
  onValueChange?: (files: UploadFile[]) => void;
}

const updateFile = (
  files: UploadFile[],
  fileId: string,
  getFileUpdatedProps: (file: UploadFile) => Partial<UploadFile>,
): UploadFile[] => {
  const fileIndex = files.findIndex((file) => file.id === fileId);
  if (fileIndex === -1) return files;

  const newFiles = [...files];
  const file = files[fileIndex];

  const updatedProps = getFileUpdatedProps(file);

  newFiles[fileIndex] = {
    ...file,
    ...updatedProps,
  };

  return newFiles;
};

export const FileUploaderControlProvider = (props: PropsWithChildren<FileUploaderControlProviderProps>) => {
  const { children, onValueChange, onRemove, onSelect } = props;

  // в files попадат только те, что попали в onSelect
  const [files, setFiles] = useState<UploadFile[]>([]);
  const locale = useControlLocale();

  const setFileStatus = useCallback(
    (fileId: string, status: UploadFileStatus) => {
      setFiles((files) => {
        return updateFile(files, fileId, (file) => {
          return {
            status,
            validationResult:
              status === UploadFileStatus.Error
                ? UploadFileValidationResult.error(locale.requestErrorText)
                : file.validationResult,
          };
        });
      });
    },
    [locale],
  );

  const handleExternalSetFiles = useCallback(
    (files: UploadFile[]) => {
      onSelect?.(files);
      setFiles((state) => {
        const newFiles = [...state, ...files];
        onValueChange?.(newFiles);
        return newFiles;
      });
    },
    [onValueChange, onSelect],
  );

  const removeFile = useCallback(
    (fileId: string) => {
      onRemove?.(fileId);
      setFiles((state) => {
        const newFiles = state.filter((file) => file.id !== fileId);
        onValueChange?.(newFiles);
        return newFiles;
      });
    },
    [onValueChange, onRemove],
  );

  const setFileValidationResult = useCallback((fileId: string, validationResult: UploadFileValidationResult) => {
    setFiles((files) => updateFile(files, fileId, () => ({ validationResult })));
  }, []);

  return (
    <FileUploaderControlContext.Provider
      value={useMemoObject({
        setFileStatus,
        files,
        setFiles: handleExternalSetFiles,
        removeFile,
        setFileValidationResult,
      })}
    >
      {children}
    </FileUploaderControlContext.Provider>
  );
};

FileUploaderControlProvider.displayName = 'FileUploaderControlProvider';
