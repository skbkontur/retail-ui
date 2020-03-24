import { FiasAddressResponse, FiasFields } from '../../../../types';

export interface RemoveFiasDataTestCase {
  label: string;
  addressResponse: FiasAddressResponse;
  field: FiasFields;
  parentField: FiasFields | undefined;
}

const CASE_01 = 'undefined for non-existent field';
const CASE_02 = 'undefined for field without parent';
const CASE_03 = 'parent that is in the next field';
const CASE_04 = 'parent that is not in the next field';

const testResponse = {
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
} as FiasAddressResponse;

export const getParentTestCases: RemoveFiasDataTestCase[] = [
  {
    label: CASE_01,
    addressResponse: testResponse,
    field: FiasFields.district,
    parentField: undefined,
  },
  {
    label: CASE_02,
    addressResponse: testResponse,
    field: FiasFields.region,
    parentField: undefined,
  },
  {
    label: CASE_03,
    addressResponse: testResponse,
    field: FiasFields.intracityarea,
    parentField: FiasFields.city,
  },
  {
    label: CASE_04,
    addressResponse: testResponse,
    field: FiasFields.city,
    parentField: FiasFields.region,
  },
];
