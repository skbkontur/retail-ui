import { Checkbox } from '@skbkontur/react-ui';
import { People1Icon } from '@skbkontur/icons/icons/People1Icon/People1Icon';
import { ShapeCircleIcon } from '@skbkontur/icons/icons/ShapeCircleIcon/ShapeCircleIcon';
import { XIcon } from '@skbkontur/icons/icons/XIcon/XIcon';
import { ActionButton, MassActionsPanel } from '@skbkontur/mass-actions-panel';
import { useState } from 'react';

export const MassActionPanelPage = () => {
  const [checked, setChecked] = useState<boolean>(true);
  const [pickedRecordsCount, setPickedRecordsCount] = useState<number>(1);

  const checkboxHandler = (value: boolean) => {
    setChecked(value);
    setPickedRecordsCount((prevState) => (value ? prevState + 1 : prevState - 1));
  };

  return (
    <>
      <Checkbox checked={checked} onValueChange={setChecked}>
        Отобразить панель
      </Checkbox>
      {checked && (
        <MassActionsPanel
          pickedRecordsCount={pickedRecordsCount}
          closeIcon={<XIcon />}
          onHide={() => checkboxHandler(false)}
        >
          <ActionButton icon={<ShapeCircleIcon />} label="Расшифровать" />
          <ActionButton icon={<People1Icon />} label="Назначить ответственного" />
        </MassActionsPanel>
      )}
    </>
  );
};
