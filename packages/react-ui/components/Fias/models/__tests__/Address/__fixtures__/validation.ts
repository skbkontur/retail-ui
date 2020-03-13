import { FiasLocaleHelper } from '../../../../locale';
import { FiasAddressResponse, FiasAddressErrors, FiasFields } from '../../../../types';
import { FiasAddress } from '../../../FiasAddress';

export interface ValidationTestCase {
  label: string;
  address: FiasAddress;
  errors: FiasAddressErrors;
}

const CASE_01 = 'empty address';
const CASE_02 = 'one valid field';
const CASE_03 = 'one invalid field without data';
const CASE_04 = 'one invalid field that is not allowed';
const CASE_05 = 'two fields - the top one is invalid';
const CASE_06 = 'two fields - the bottom one is invalid';

const defaultLocale = FiasLocaleHelper.get();

export const validationTestCases: ValidationTestCase[] = [
  {
    label: CASE_01,
    address: new FiasAddress(),
    errors: {},
  },
  {
    label: CASE_02,
    address: FiasAddress.createFromResponse({
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
    } as FiasAddressResponse),
    errors: {},
  },
  {
    label: CASE_03,
    address: FiasAddress.removeFiasData(
      FiasAddress.createFromResponse({
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
      } as FiasAddressResponse),
      [FiasFields.region],
    ),
    errors: {
      [FiasFields.region]: defaultLocale.addressNotVerified,
    },
  },
  {
    label: CASE_04,
    address: FiasAddress.createFromResponse({
      street: {
        name: 'Малопрудная',
        abbreviation: 'ул',
        fiasId: '1de47f19-2de3-4d4b-9a3c-472fdc858975',
        actuality: true,
        id: '599b198f-4519-4c61-969a-c1bec6902724',
        parentFiasId: '2763c110-cb8b-416a-9dac-ad28a55b4402',
        level: 'Street',
        okato: '65401364000',
        oktmo: '65701000',
        ifnsfl: '6658',
        ifnsul: '6658',
        postalCode: '620036',
        code: '66000001000155300',
      },
    } as FiasAddressResponse),
    errors: {
      [FiasFields.street]: defaultLocale.streetFillBefore,
    },
  },
  {
    label: CASE_05,
    address: FiasAddress.removeFiasData(
      FiasAddress.createFromResponse({
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
        district: {
          name: 'Алапаевский',
          abbreviation: 'р-н',
          fiasId: '8170e3ae-b1f3-492d-aeec-2a9733eff7c6',
          actuality: true,
          id: '1e4c1a5f-2dd6-4623-a856-beade6cf3126',
          parentFiasId: '92b30014-4d52-4e2e-892d-928142b924bf',
          level: 'District',
          okato: '65201000000',
          ifnsfl: '6677',
          ifnsul: '6677',
          postalCode: '624600',
          code: '6600200000000',
        },
      } as FiasAddressResponse),
      [FiasFields.region],
    ),
    errors: {
      [FiasFields.region]: defaultLocale.addressNotVerified,
    },
  },
  {
    label: CASE_06,
    address: FiasAddress.removeFiasData(
      FiasAddress.createFromResponse({
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
        district: {
          name: 'Алапаевский',
          abbreviation: 'р-н',
          fiasId: '8170e3ae-b1f3-492d-aeec-2a9733eff7c6',
          actuality: true,
          id: '1e4c1a5f-2dd6-4623-a856-beade6cf3126',
          parentFiasId: '92b30014-4d52-4e2e-892d-928142b924bf',
          level: 'District',
          okato: '65201000000',
          ifnsfl: '6677',
          ifnsul: '6677',
          postalCode: '624600',
          code: '6600200000000',
        },
      } as FiasAddressResponse),
      [FiasFields.district],
    ),
    errors: {
      [FiasFields.district]: defaultLocale.addressNotVerified,
    },
  },
];
