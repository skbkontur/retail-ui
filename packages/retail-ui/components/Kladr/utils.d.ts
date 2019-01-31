import { Place, PlaceDescription } from './Types';
import { Nullable } from '../../typings/utility-types';

export declare function placeName(
  region: PlaceDescription,
  _for?: Nullable<Place>
): string;
