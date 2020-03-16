import { FiasFields, FiasAddressFields, FiasFieldsSettings } from '../../../../types';
import { FiasAddress } from '../../../FiasAddress';

export interface GetDiffFieldsTestCase {
  label: string;
  address_1: FiasAddress;
  address_2: FiasAddress;
  fieldsSettings?: FiasFieldsSettings;
  diffFields: FiasAddressFields;
}

const CASE_01 = 'both addresses are EMPTY';
const CASE_02 = 'address_1 IS empty, address_2 IS NOT empty';
const CASE_03 = 'address_1 IS NOT empty, address_2 IS empty';
const CASE_04 = 'address_1 IS EQUAL to address_2';
const CASE_05 = 'address_1 has the SAME fields but DIFFERENT values than address_2';
const CASE_06 = 'address_1 has MORE fields than address_2';
const CASE_07 = 'address_1 has LESS fields than address_2';
const CASE_08 = 'address_2 has field that is hidden in address_1';

const testResponse_1 = {
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
  street: {
    abbreviation: 'ул',
    actuality: true,
    code: '23000007000204600',
    fiasId: '8dc28275-33e0-40be-addc-d1096df828c4',
    id: '9cc6d4d9-7ad6-4c36-a9d1-b308985111c2',
    ifnsfl: '2366',
    ifnsul: '2366',
    level: 'Street',
    name: 'Фруктовая',
    okato: '03426000000',
    oktmo: '03726000001',
    parentFiasId: 'c1a53fdf-ae81-45fe-9fa2-7d0f6a8fee29',
    postalCode: '354209',
  },
};

const testResponse_2 = {
  region: {
    name: 'Свердловская',
    abbreviation: 'обл',
    fiasId: '92b30014-4d52-4e2e-892d-928142b924bf',
    actuality: true,
    id: 'e76abf09-3148-42f6-85db-51edb09e72b7',
    level: 'Region',
    okato: '65000000000',
    ifnsfl: '6600',
    ifnsul: '6600',
    postalCode: '620000',
    code: '6600000000000',
  },
  city: {
    name: 'Екатеринбург',
    abbreviation: 'г',
    fiasId: '2763c110-cb8b-416a-9dac-ad28a55b4402',
    actuality: true,
    id: 'c2404c2a-0af3-440f-9320-9cbd160c4557',
    parentFiasId: '92b30014-4d52-4e2e-892d-928142b924bf',
    level: 'City',
    okato: '65401000000',
    oktmo: '65701000',
    code: '6600000100000',
  },
};

export const getDiffFieldsTestCases: GetDiffFieldsTestCase[] = [
  {
    label: CASE_01,
    address_1: FiasAddress.createFromResponse({}),
    address_2: FiasAddress.createFromResponse({}),
    diffFields: {},
  },
  {
    label: CASE_02,
    address_1: FiasAddress.createFromResponse({}),
    address_2: FiasAddress.createFromResponse({
      city: testResponse_1.city,
    }),
    diffFields: FiasAddress.responseToFields({
      city: testResponse_1.city,
    }),
  },
  {
    label: CASE_03,
    address_1: FiasAddress.createFromResponse({
      city: testResponse_1.city,
      street: testResponse_1.street,
    }),
    address_2: FiasAddress.createFromResponse({}),
    diffFields: {},
  },
  {
    label: CASE_04,
    address_1: FiasAddress.createFromResponse({
      region: testResponse_1.region,
      city: testResponse_1.city,
      street: testResponse_1.street,
    }),
    address_2: FiasAddress.createFromResponse({
      region: testResponse_1.region,
      city: testResponse_1.city,
      street: testResponse_1.street,
    }),
    diffFields: {},
  },
  {
    label: CASE_05,
    address_1: FiasAddress.createFromResponse({
      region: testResponse_1.region,
      city: testResponse_1.city,
    }),
    address_2: FiasAddress.createFromResponse({
      region: testResponse_2.region,
      city: testResponse_2.city,
    }),
    diffFields: FiasAddress.responseToFields({
      region: testResponse_2.region,
      city: testResponse_2.city,
    }),
  },
  {
    label: CASE_06,
    address_1: FiasAddress.createFromResponse({
      region: testResponse_1.region,
      city: testResponse_1.city,
      intracityarea: testResponse_1.intracityarea,
    }),
    address_2: FiasAddress.createFromResponse({
      region: testResponse_1.region,
      city: testResponse_1.city,
    }),
    diffFields: FiasAddress.responseToFields({}),
  },
  {
    label: CASE_07,
    address_1: FiasAddress.createFromResponse({
      region: testResponse_1.region,
      city: testResponse_1.city,
    }),
    address_2: FiasAddress.createFromResponse({
      region: testResponse_1.region,
      city: testResponse_1.city,
      intracityarea: testResponse_1.intracityarea,
    }),
    diffFields: FiasAddress.responseToFields({
      intracityarea: testResponse_1.intracityarea,
    }),
  },
  {
    label: CASE_08,
    address_1: FiasAddress.createFromResponse({
      city: testResponse_1.city,
    }),
    address_2: FiasAddress.createFromResponse({
      region: testResponse_1.region,
      city: testResponse_1.city,
      intracityarea: testResponse_1.intracityarea,
    }),
    fieldsSettings: {
      [FiasFields.region]: {
        visible: false,
      },
      [FiasFields.city]: {
        visible: true,
      },
      [FiasFields.intracityarea]: {
        visible: true,
      },
    },
    diffFields: FiasAddress.responseToFields({
      intracityarea: testResponse_1.intracityarea,
    }),
  },
];
