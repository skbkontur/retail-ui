export type ReadedFileType = string | ArrayBuffer | null;

export const readFile = (file: File): Promise<ReadedFileType> => (
  new Promise((resolve, reject): void => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  })
);

export const readFiles = (files: File[]): Promise<Array<ReadedFileType>> => {
  const filesPromises = files.map(file => readFile(file));
  return Promise.all(filesPromises);
};
