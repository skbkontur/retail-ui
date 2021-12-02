import React, { PropsWithChildren, useCallback, useState } from 'react';

import { useMemoObject } from '../../hooks/useMemoObject';

import { FileUploaderAttachedFile, FileUploaderFileStatus } from './fileUtils';
import { FileUploaderControlContext } from './FileUploaderControlContext';
import { FileUploaderFileValidationResult } from './FileUploaderFileValidationResult';
import { useControlLocale } from './hooks/useControlLocale';

export interface FileUploaderControlProviderProps {
  /** Срабатывает при выборе файлов */
  onSelect?: (files: FileUploaderAttachedFile[]) => void;
  /** Срабатывает при удалении файла из контрола */
  onRemove?: (fileId: string) => void;
  /** Срабатывает при onSelect, onRemove и других изменениях файлов. В files передает текущее состояние всего списка файлов */
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
  const { children, onValueChange, onRemove, onSelect } = props;

  const [files, setFiles] = useState<FileUploaderAttachedFile[]>([]);
  const locale = useControlLocale();

  const setFileStatus = useCallback(
    (fileId: string, status: FileUploaderFileStatus) => {
      setFiles((files) => {
        const newFiles = updateFile(files, fileId, (file) => {
          return {
            status,
            validationResult:
              status === FileUploaderFileStatus.Error
                ? FileUploaderFileValidationResult.error(locale.requestErrorText)
                : file.validationResult,
          };
        });
        onValueChange?.(newFiles);
        return newFiles;
      });
    },
    [locale, onValueChange],
  );

  const handleExternalSetFiles = useCallback(
    (files: FileUploaderAttachedFile[]) => {
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

  const setFileValidationResult = useCallback((fileId: string, validationResult: FileUploaderFileValidationResult) => {
    setFiles((files) => {
      const newFiles = updateFile(files, fileId, () => ({ validationResult }));
      onValueChange?.(newFiles);
      return newFiles;
    });
  }, [onValueChange]);

  const reset = React.useCallback(() => {
    setFiles(() => {
      const newFiles = [] as FileUploaderAttachedFile[];
      onValueChange?.(newFiles);
      return newFiles;
    });
  }, [onValueChange]);

  return (
    <FileUploaderControlContext.Provider
      value={useMemoObject({
        setFileStatus,
        files,
        setFiles: handleExternalSetFiles,
        removeFile,
        setFileValidationResult,
        reset
      })}
    >
      {children}
    </FileUploaderControlContext.Provider>
  );
};

FileUploaderControlProvider.displayName = 'FileUploaderControlProvider';
