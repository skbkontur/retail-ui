export interface FiasLocale {
  [key: string]: string;
}

export const defaultLocale: FiasLocale = {
  modalTitle: 'Адрес',
  modalButtonOk: 'Сохранить',
  modalButtonCancel: 'Отменить',
  addressFill: 'Заполнить адрес',
  addressEdit: 'Изменить адрес',
  addressNotVerified: 'Адрес не найден в справочнике',
  addressNotFound: 'Адрес не найден',
  regionNotFound: 'Регион не найден',
  districtNotFound: 'Район не найден',
  cityNotFound: 'Город не найден',
  settlementNotFound: 'Населенный пункт не найден',
  planningstructureNotFound:
    'Не найдены иные территории по указанному выше расположению',
  streetNotFound: 'Не найдены улицы по указанному выше расположению',
  streetFillBefore: 'Заполните город или населенный пункт, чтобы выбрать улицу',
  steadNotFound: 'Не найдены участки по указанному выше расположению',
  steadFillBefore: 'Заполните улицу, чтобы выбрать номер участка',
  houseNotFound: 'Не найдены дома по указанному выше расположению',
  houseFillBefore: 'Заполните улицу, чтобы выбрать номер дома'
};
