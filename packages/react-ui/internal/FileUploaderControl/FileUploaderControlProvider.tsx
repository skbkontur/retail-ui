import React, { PropsWithChildren, useCallback, useState } from 'react';

import { useMemoObject } from '../../hooks/useMemoObject';
import { useEffectWithoutInitCall } from '../../hooks/useEffectWithoutInitCall';

import { FileUploaderAttachedFile, FileUploaderFileStatus } from './fileUtils';
import { FileUploaderControlContext } from './FileUploaderControlContext';
import { useControlLocale } from './hooks/useControlLocale';

export interface FileUploaderControlProviderProps {
  /** Срабатывает при выборе файлов */
  onAttach?: (files: FileUploaderAttachedFile[]) => void;
  /** Срабатывает при удалении файла из контрола */
  onRemove?: (fileId: string) => void;
  /** Срабатывает при onAttach, onRemove и других изменениях файлов. В files передает текущее состояние всего списка файлов */
  onValueChange?: (files: FileUploaderAttachedFile[]) => void;
}

const updateFile = (
  files: FileUploaderAttachedFile[],
  fileId: string,
  getFileUpdatedProps: (file: FileUploaderAttachedFile) => Partial<FileUploaderAttachedFile>,
): FileUploaderAttachedFile[] => {
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
  const { children, onValueChange, onRemove, onAttach } = props;

  const [files, setFiles] = useState<FileUploaderAttachedFile[]>([]);
  const locale = useControlLocale();

  useEffectWithoutInitCall(() => {
    onValueChange?.(files);
  }, [files]);

  // validationResult:
  // status === FileUploaderFileStatus.Error
  // FIXME @mozalov выпилисть перевод или обработать эту валидацию
  // ? FileUploaderFileValidationResult.error(locale.requestErrorText)
  // : file.validationResult,

  const setFileStatus = useCallback(
    (fileId: string, status: FileUploaderFileStatus) => {
      setFiles((files) =>
        updateFile(files, fileId, (file) => ({status})),
      );
    },
    [locale],
  );

  const handleExternalSetFiles = useCallback(
    (files: FileUploaderAttachedFile[]) => {
      onAttach?.(files);
      setFiles((state) => [...state, ...files]);
    },
    [onAttach],
  );

  const removeFile = useCallback(
    (fileId: string) => {
      onRemove?.(fileId);
      setFiles((state) => state.filter((file) => file.id !== fileId));
    },
    [onRemove],
  );

  const reset = React.useCallback(() => {
    setFiles(() => [] as FileUploaderAttachedFile[]);
  }, []);

  return (
    <FileUploaderControlContext.Provider
      value={useMemoObject({
        setFileStatus,
        files,
        setFiles: handleExternalSetFiles,
        removeFile,
        reset,
      })}
    >
      {children}
    </FileUploaderControlContext.Provider>
  );
};

FileUploaderControlProvider.displayName = 'FileUploaderControlProvider';
