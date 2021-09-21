import React, { ReactNode, useCallback, useContext } from 'react';

import { IUploadFile } from '../../lib/fileUtils';
import { Tooltip } from '../../components/Tooltip';

import { UploadFileList } from './UploadFileList/UploadFileList';
import { UploadFileControlContext } from './UploadFileControlContext';
import { UploadFileControlButton } from './UploadFileControlButton/UploadFileControlButton';
import { useControlLocale } from './UploadFileControlHooks';
import { Link } from '../../components/Link';
import { jsStyles } from './UploadFileControlButton/UploadFileControlButton.styles';
import { UploadFile } from './UploadFile/UploadFile';
import UploadIcon from '@skbkontur/react-icons/Upload';

export interface IUploadFileError {
  fileId: string;
  message: string;
}
// FIXME @mozalov: вероятно нужно переместить типы в IUploadFileControlButton

// FIXME @mozalov: написать тесты на компоненты после ревью
// FIXME @mozalov: написать комменты для каждого пропса (спросить надо ли у Егора)
export interface IUploadFileControlProps {
  // свойства эквивалентные нативным
  id?: string;
  name?: string;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;

  // свойство валидации контрола
  controlError?: ReactNode;

  // хендлер, срабатывает после выбора файлов (при валидном считывании файла)
  onSelect?: (files: IUploadFile[]) => void;
  // хендлер, срабатывает после выбора файлов (при невалидном считывании файла)
  onReadError?: (files: IUploadFile[]) => void;
}

export const UploadFileControl = (props: IUploadFileControlProps) => {
  const { multiple = false, disabled, controlError } = props;

  const { files } = useContext(UploadFileControlContext);

  const renderTooltipContent = useCallback((): ReactNode => {
    return (!disabled && controlError) || null;
  }, [controlError, disabled]);

  const hasOneFile = files.length === 1;
  const hasOneFileForSingle = !multiple && hasOneFile;

  const locale = useControlLocale();

  return (
    <div>
      {multiple && !!files.length && <UploadFileList />}
      <Tooltip pos="right middle" render={renderTooltipContent}>
          <UploadFileControlButton {...props}>
            <Link disabled={disabled} tabIndex={-1}>
              {hasOneFileForSingle ? locale.choosedFile : locale.chooseFile}
            </Link>
            &nbsp;
            <div className={jsStyles.afterLinkText()}>
              {hasOneFileForSingle ? (
                <UploadFile file={files[0]} />
              ) : (
                <>
                  {locale.orDragHere}&nbsp;
                  <UploadIcon color="#808080" />
                </>
              )}
            </div>
          </UploadFileControlButton>
      </Tooltip>
    </div>
  );
};

UploadFileControl.displayName = 'UploadFileControl';
