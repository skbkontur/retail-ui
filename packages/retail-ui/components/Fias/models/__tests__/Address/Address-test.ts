import { Address } from '../../Address';
import { Fields, AddressFields } from 'retail-ui/components/Fias/types';
import { defaultLocale } from '../../../constants/locale';
import { removeFiasDataTestCases } from './__fixtures__/removeFiasData';
import { getParentTestCases } from './__fixtures__/getParent';
import { responseToFieldsTestCases } from './__fixtures__/responseToFields';
import { fieldsToResponseTestCases } from './__fixtures__/fieldsToResponse';
import { consistencyTestCases } from './__fixtures__/consistency';
import { validationTestCases } from './__fixtures__/validation';
import { verifyTestCases } from './__fixtures__/verify';

const getFieldsWithData = (fields: AddressFields): Fields[] => {
  const result: Fields[] = [];
  let field: Fields;
  for (field in fields) {
    if (fields.hasOwnProperty(field)) {
      const element = fields[field];
      if (element && element.data) {
        result.push(field);
      }
    }
  }
  return result;
};

describe('Address', () => {
  describe('getParent', () => {
    getParentTestCases.forEach(({ label, addressResponse, field, parentField }) => {
      const address = Address.createFromResponse(addressResponse);
      const parent = address.getParent(field);
      it(label, () => {
        if (parentField) {
          expect(parent && parent.type).toEqual(parentField);
        } else {
          expect(parent).not.toBeDefined();
        }
      });
    });
  });

  describe('removeFiasData', () => {
    removeFiasDataTestCases.forEach(({ label, addressResponse, fieldsToRemove, fieldsWithRemainedData }) => {
      const address = Address.removeFiasData(Address.createFromResponse(addressResponse), fieldsToRemove);
      const fieldsWithData = getFieldsWithData(address.fields);
      it(label, () => {
        expect(fieldsWithData).toEqual(expect.arrayContaining(fieldsWithRemainedData));
        expect(fieldsWithData.length).toEqual(fieldsWithRemainedData.length);
      });
    });
  });

  describe('verifyConsistency', () => {
    consistencyTestCases.forEach(({ label, addressResponse, verifyResponse }) => {
      const address = Address.createFromResponse(addressResponse);
      it(label, () => {
        expect(address.verifyConsistency()).toMatchObject(verifyResponse);
      });
    });
  });

  describe('verify', () => {
    verifyTestCases.forEach(
      ({ label, addressResponse, apiVerifyResponse, verifiedAddressResponse, verifiedFieldsWithData }) => {
        const address = Address.createFromResponse(addressResponse);
        const verifiedAddress = Address.verify(address, apiVerifyResponse);
        const fieldsWithData = getFieldsWithData(verifiedAddress.fields);
        it(label, () => {
          expect(Address.fieldsToResponse(verifiedAddress.fields)).toEqual(verifiedAddressResponse);
          expect(fieldsWithData).toEqual(expect.arrayContaining(verifiedFieldsWithData));
          expect(fieldsWithData.length).toEqual(verifiedFieldsWithData.length);
        });
      },
    );
  });

  describe('validate', () => {
    validationTestCases.forEach(({ label, address, errors }) => {
      it(label, () => {
        expect(Address.validate(address, defaultLocale).errors).toEqual(errors);
      });
    });
  });

  describe('getParentFields', () => {
    it('returns empty array for the top field', () => {
      expect(Address.getParentFields(Fields.region)).toEqual([]);
    });

    it('returns array of parent fields for the given one', () => {
      expect(Address.getParentFields(Fields.city)).toEqual([Fields.region, Fields.district]);
    });
  });

  describe('getChildFields', () => {
    it('returns empty array for the bottom field', () => {
      expect(Address.getChildFields(Fields.room)).toEqual([]);
    });

    it('returns array of child fields for the given one', () => {
      expect(Address.getChildFields(Fields.street)).toEqual([Fields.stead, Fields.house, Fields.room]);
    });
  });

  describe('responseToFields', () => {
    responseToFieldsTestCases.forEach(({ label, addressResponse, resultFields }) => {
      const fields = Address.responseToFields(addressResponse);
      const resultKeys = Object.keys(fields);
      it(label, () => {
        expect(resultFields).toEqual(expect.arrayContaining(resultKeys));
        expect(resultFields.length).toEqual(resultKeys.length);

        let field: Fields;
        for (field in addressResponse) {
          if (addressResponse.hasOwnProperty(field)) {
            const element = fields[field];
            expect(element).toBeDefined();
            expect(element && element.type).toEqual(field);
            expect(element && element.fiasData).toEqual(addressResponse[field]);
          }
        }
      });
    });
  });

  describe('fieldsToResponse', () => {
    fieldsToResponseTestCases.forEach(({ label, fields, resultFields }) => {
      const response = Address.fieldsToResponse(fields);
      const resultKeys = Object.keys(response);

      it(label, () => {
        expect(resultFields).toEqual(expect.arrayContaining(resultKeys));
        expect(resultFields.length).toEqual(resultKeys.length);

        let field: Fields;
        for (field in fields) {
          if (fields.hasOwnProperty(field)) {
            const element = fields[field];
            if (element && element.data) {
              expect(response[field]).toBeDefined();
              expect(element && element.fiasData).toEqual(response[field]);
            } else {
              expect(response[field]).not.toBeDefined();
            }
          }
        }
      });
    });
  });
});
