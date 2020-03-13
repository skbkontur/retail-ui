import { FiasFields, FiasAddressFields } from '../../../types';
import { FiasLocaleHelper } from '../../../locale';
import { FiasAddress } from '../../FiasAddress';

import { removeFiasDataTestCases } from './__fixtures__/removeFiasData';
import { getParentTestCases } from './__fixtures__/getParent';
import { responseToFieldsTestCases } from './__fixtures__/responseToFields';
import { fieldsToResponseTestCases } from './__fixtures__/fieldsToResponse';
import { consistencyTestCases } from './__fixtures__/consistency';
import { validationTestCases } from './__fixtures__/validation';
import { verifyTestCases } from './__fixtures__/verify';
import { getDiffFieldsTestCases } from './__fixtures__/getDiffFields';

const getFieldsWithData = (fields: FiasAddressFields): FiasFields[] => {
  const result: FiasFields[] = [];
  let field: FiasFields;
  for (field in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, field)) {
      const element = fields[field];
      if (element && element.data) {
        result.push(field);
      }
    }
  }
  return result;
};

const deleteObjectMethods = (object: { [key: string]: any }): { [key: string]: any } => {
  const result = { ...object };

  Object.keys(result).forEach(key => {
    if (result[key] !== null && typeof result[key] === 'object') {
      result[key] = deleteObjectMethods(result[key]);
    }
    // anonymous functions break objects comparison
    if (typeof result[key] === 'function') {
      delete result[key];
    }
  });

  return result;
};

const defaultLocale = FiasLocaleHelper.get();

describe('Address', () => {
  describe('getParent', () => {
    getParentTestCases.forEach(({ label, addressResponse, field, parentField }) => {
      const address = FiasAddress.createFromResponse(addressResponse);
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
      const address = FiasAddress.removeFiasData(FiasAddress.createFromResponse(addressResponse), fieldsToRemove);
      const fieldsWithData = getFieldsWithData(address.fields);
      it(label, () => {
        expect(fieldsWithData).toEqual(expect.arrayContaining(fieldsWithRemainedData));
        expect(fieldsWithData.length).toEqual(fieldsWithRemainedData.length);
      });
    });
  });

  describe('verifyConsistency', () => {
    consistencyTestCases.forEach(({ label, addressResponse, verifyResponse }) => {
      const address = FiasAddress.createFromResponse(addressResponse);
      it(label, () => {
        expect(address.verifyConsistency()).toMatchObject(verifyResponse);
      });
    });
  });

  describe('verify', () => {
    verifyTestCases.forEach(
      ({ label, addressResponse, apiVerifyResponse, verifiedAddressResponse, verifiedFieldsWithData }) => {
        const address = FiasAddress.createFromResponse(addressResponse);
        const verifiedAddress = FiasAddress.verify(address, apiVerifyResponse);
        const fieldsWithData = getFieldsWithData(verifiedAddress.fields);
        it(label, () => {
          expect(FiasAddress.fieldsToResponse(verifiedAddress.fields)).toEqual(verifiedAddressResponse);
          expect(fieldsWithData).toEqual(expect.arrayContaining(verifiedFieldsWithData));
          expect(fieldsWithData.length).toEqual(verifiedFieldsWithData.length);
        });
      },
    );
  });

  describe('validate', () => {
    validationTestCases.forEach(({ label, address, errors }) => {
      it(label, () => {
        expect(FiasAddress.validate(address, defaultLocale).errors).toEqual(errors);
      });
    });
  });

  describe('getParentFields', () => {
    it('returns empty array for the top field', () => {
      expect(FiasAddress.getParentFields(FiasFields.region)).toEqual([]);
    });

    it('returns array of parent fields for the given one', () => {
      expect(FiasAddress.getParentFields(FiasFields.city)).toEqual([FiasFields.region, FiasFields.district]);
    });
  });

  describe('getChildFields', () => {
    it('returns empty array for the bottom field', () => {
      expect(FiasAddress.getChildFields(FiasFields.room)).toEqual([]);
    });

    it('returns array of child fields for the given one', () => {
      expect(FiasAddress.getChildFields(FiasFields.street)).toEqual([
        FiasFields.stead,
        FiasFields.house,
        FiasFields.room,
      ]);
    });
  });

  describe('responseToFields', () => {
    responseToFieldsTestCases.forEach(({ label, addressResponse, resultFields }) => {
      const fields = FiasAddress.responseToFields(addressResponse);
      const resultKeys = Object.keys(fields);
      it(label, () => {
        expect(resultFields).toEqual(expect.arrayContaining(resultKeys));
        expect(resultFields.length).toEqual(resultKeys.length);

        let field: FiasFields;
        for (field in addressResponse) {
          if (Object.prototype.hasOwnProperty.call(addressResponse, field)) {
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
      const response = FiasAddress.fieldsToResponse(fields);
      const resultKeys = Object.keys(response);

      it(label, () => {
        expect(resultFields).toEqual(expect.arrayContaining(resultKeys));
        expect(resultFields.length).toEqual(resultKeys.length);

        let field: FiasFields;
        for (field in fields) {
          if (Object.prototype.hasOwnProperty.call(fields, field)) {
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

  describe('getDiffFields', () => {
    getDiffFieldsTestCases.forEach(({ label, address_1, address_2, diffFields, fieldsSettings }) => {
      const result = address_1.getDiffFields(address_2, fieldsSettings);

      it(label, () => {
        expect(deleteObjectMethods(result)).toEqual(deleteObjectMethods(diffFields));
      });
    });
  });
});
