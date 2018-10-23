export interface FiasLocale {
  [key: string]: string;
}

export const defaultLocale: FiasLocale = {
  modal_title: 'Адрес',
  modal_button_ok: 'Сохранить',
  modal_button_cancel: 'Отменить',
  address_fill: 'Заполнить адрес',
  address_edit: 'Изменить адрес',
  address_not_verified: 'Заполнено не по справочнику адресов',
  address_not_found: 'Адрес не найден в справочнике',
  region_not_found: 'Регион не найден',
  district_not_found: 'Район не найден',
  city_not_found: 'Город не найден',
  settlement_not_found: 'Населенный пункт не найден',
  planningstructure_not_found:
    'Не найдены иные территории по указанному выше расположению',
  street_not_found: 'Не найдены улицы по указанному выше расположению',
  street_fill_before:
    'Заполните город или населенный пункт, чтобы выбрать улицу',
  stead_not_found: 'Не найдены участки по указанному выше расположению',
  stead_fill_before: 'Заполните улицу, чтобы выбрать номер участка',
  house_not_found: 'Не найдены дома по указанному выше расположению',
  house_fill_before: 'Заполните улицу, чтобы выбрать номер дома'
};
