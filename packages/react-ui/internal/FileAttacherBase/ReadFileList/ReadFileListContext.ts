import * as React from "react";

export enum ReadFileItemStatus {
  Default = 'Default',
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error'
}

export interface ReadFileListContext {
  setFileStatus: (fileId: number, status: ReadFileItemStatus) => void;
  getFileStatus: (fileId: number) => ReadFileItemStatus;
}

export const ReadFileListContext = React.createContext({} as ReadFileListContext);
