import { Fields, AddressFields } from '../../../../types';
import { AddressElement } from '../../../AddressElement';
import { FiasData } from '../../../FiasData';

export interface FieldsToResponseTestCase {
  label: string;
  fields: AddressFields;
  resultFields: Fields[];
}

const CASE_01 = 'empty response';
const CASE_02 = 'not empty response';
const CASE_03 = 'fields without data';

const data = {
  region: {
    name: 'Краснодарский',
    abbreviation: 'край',
    fiasId: 'd00e1013-16bd-4c09-b3d5-3cb09fc54bd8',
    actuality: true,
    id: 'd59d399a-ecd0-4feb-9194-0588dd17f9b9',
    level: 'Region',
    okato: '03000000000',
    ifnsfl: '2300',
    ifnsul: '2300',
    code: '2300000000000',
  },
  city: {
    name: 'Сочи',
    abbreviation: 'г',
    fiasId: '79da737a-603b-4c19-9b54-9114c96fb912',
    actuality: true,
    id: 'c1178951-3fb9-4110-9ea2-4a8e05d2cd2f',
    parentFiasId: 'd00e1013-16bd-4c09-b3d5-3cb09fc54bd8',
    level: 'City',
    okato: '03426000000',
    oktmo: '03726000',
    code: '2300000700000',
  },
  intracityarea: {
    name: 'Лазаревский',
    abbreviation: 'р-н',
    fiasId: 'c1a53fdf-ae81-45fe-9fa2-7d0f6a8fee29',
    actuality: true,
    id: 'c1a53fdf-ae81-45fe-9fa2-7d0f6a8fee29',
    parentFiasId: '79da737a-603b-4c19-9b54-9114c96fb912',
    level: 'IntracityArea',
  },
};

export const fieldsToResponseTestCases: FieldsToResponseTestCase[] = [
  {
    label: CASE_01,
    fields: {},
    resultFields: [],
  },
  {
    label: CASE_02,
    fields: {
      [Fields.region]: new AddressElement(Fields.region, data.region.name, new FiasData(data.region)),
      [Fields.city]: new AddressElement(Fields.city, data.city.name, new FiasData(data.city)),
      [Fields.intracityarea]: new AddressElement(
        Fields.intracityarea,
        data.intracityarea.name,
        new FiasData(data.intracityarea),
      ),
    },
    resultFields: [Fields.region, Fields.city, Fields.intracityarea],
  },
  {
    label: CASE_03,
    fields: {
      [Fields.region]: new AddressElement(Fields.region, data.region.name, new FiasData(data.region)),
      [Fields.city]: new AddressElement(Fields.city, data.city.name),
      [Fields.intracityarea]: new AddressElement(Fields.intracityarea, data.intracityarea.name),
    },
    resultFields: [Fields.region],
  },
];
