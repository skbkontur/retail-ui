import { FiasLocale } from '../types';

export const componentsLocales: FiasLocale = {
  modalTitle: 'Адрес',
  modalButtonOk: 'Сохранить',
  modalButtonCancel: 'Отменить',

  addressFill: 'Заполнить адрес',
  addressEdit: 'Изменить адрес',
  addressNotVerified: 'Адрес не найден в справочнике',
  addressNotFound: 'Адрес не найден',
  addressFillParentOrSearch: 'Заполните поля выше, либо воспользуйтесь поиском',
  addressSelectItemFromList: 'Выберите значение из списка',

  searchNotFound: 'Адрес не найден',
  searchPlaceholder: 'Начните вводить адрес, например: Москва, Внуково',

  regionLabel: 'Регион',
  regionNotFound: 'Регион не найден',
  regionPlaceholder: 'Можно вводить код или название',

  districtLabel: 'Район',
  districtNotFound: 'Район не найден',
  districtPlaceholder: '',

  cityLabel: 'Город',
  cityNotFound: 'Город не найден',
  cityPlaceholder: '',

  intracityareaLabel: 'Внутригородская территория',
  intracityareaNotFound: 'Внутригородская территория не найдена',
  intracityareaPlaceholder: '',

  settlementLabel: 'Населенный пункт',
  settlementNotFound: 'Населенный пункт не найден',
  settlementPlaceholder: 'Село, деревня, станица и другие',

  planningstructureLabel: 'Иная территория',
  planningstructureNotFound: 'Не найдены иные территории по указанному выше расположению',
  planningstructurePlaceholder: 'Сад, парк, санаторий и другие',

  streetLabel: 'Улица',
  streetNotFound: 'Не найдены улицы по указанному выше расположению',
  streetFillBefore: 'Заполните город или населенный пункт, чтобы выбрать улицу',
  streetPlaceholder: '',

  steadLabel: 'Земельный участок',
  steadNotFound: 'Не найдены участки по указанному выше расположению',
  steadFillBefore: 'Заполните город или населенный пункт, чтобы выбрать номер участка',
  steadPlaceholder: '',

  houseLabel: 'Дом, сооружение',
  houseNotFound: 'Не найдены дома по указанному выше расположению',
  houseFillBefore: 'Заполните город или населенный пункт, чтобы выбрать номер дома',
  housePlaceholder: '',

  roomLabel: 'Квартира, офис',
  roomNotFound: 'Не найдены помещения по указанному выше расположению',
  roomFillBefore: 'Заполните номер дома, чтобы выбрать квартиру',
  roomPlaceholder: '',

  postalcodeLabel: 'Индекс',
  postalcodePlaceholder: '',
  postalcodeNotFound: 'Заполнено не по справочнику адресов',
  postalcodeNotValid: 'Значение не соответствует формату',
  postalcodeReplace: 'Заменить справочным',

  foreignAddressLabel: 'Адрес',
  foreignAddressPlaceholder: '',

  countryLabel: 'Страна',
  countryPlaceholder: 'Начните вводить название страны',
};
