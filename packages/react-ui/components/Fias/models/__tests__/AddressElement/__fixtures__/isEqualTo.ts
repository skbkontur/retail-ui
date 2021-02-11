import { FiasFields } from '../../../../types';
import { FiasAddressElement } from '../../../FiasAddressElement';
import { FiasData } from '../../../FiasData';

export interface IsEqualToTestCase {
  label: string;
  element_1: FiasAddressElement;
  element_2: FiasAddressElement | undefined;
  isEqual: boolean;
}

const CASE_01 = 'element_2 is undefined';
const CASE_02 = 'element_2 has no data';
const CASE_03 = 'element_1 has no data';
const CASE_04 = 'both elements have no data';
const CASE_05 = 'elements are not equal';
const CASE_06 = 'elements are equal';

const testResponse = {
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

export const getIsEqualToTestCases: IsEqualToTestCase[] = [
  {
    label: CASE_01,
    element_1: new FiasAddressElement(FiasFields.region, testResponse.region.name, new FiasData(testResponse.region)),
    element_2: undefined,
    isEqual: false,
  },
  {
    label: CASE_02,
    element_1: new FiasAddressElement(FiasFields.region, testResponse.region.name, new FiasData(testResponse.region)),
    element_2: new FiasAddressElement(FiasFields.region, testResponse.region.name),
    isEqual: false,
  },
  {
    label: CASE_03,
    element_1: new FiasAddressElement(FiasFields.region, testResponse.region.name),
    element_2: new FiasAddressElement(FiasFields.region, testResponse.region.name, new FiasData(testResponse.region)),
    isEqual: false,
  },
  {
    label: CASE_04,
    element_1: new FiasAddressElement(FiasFields.region, testResponse.region.name),
    element_2: new FiasAddressElement(FiasFields.region, testResponse.region.name),
    isEqual: false,
  },
  {
    label: CASE_05,
    element_1: new FiasAddressElement(FiasFields.region, testResponse.region.name, new FiasData(testResponse.region)),
    element_2: new FiasAddressElement(FiasFields.city, testResponse.city.name, new FiasData(testResponse.city)),
    isEqual: false,
  },
  {
    label: CASE_06,
    element_1: new FiasAddressElement(FiasFields.region, testResponse.region.name, new FiasData(testResponse.region)),
    element_2: new FiasAddressElement(FiasFields.region, testResponse.region.name, new FiasData(testResponse.region)),
    isEqual: true,
  },
];
