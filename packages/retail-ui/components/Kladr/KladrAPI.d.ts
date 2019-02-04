import { Address, VerifyResult } from './Types';
import { Nullable } from '../../typings/utility-types';

export declare function search(
  searchText: string,
  levels: string,
  parentCode: Nullable<string>
): Promise<Address[]>;

export declare function searchIndex(
  code: string,
  house?: string
): Promise<string>;

export declare function verify(req: Address): Promise<VerifyResult>;
