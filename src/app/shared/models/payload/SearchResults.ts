import {PagedResponse} from './PagedResponse';
import {Hotel} from '../hotel';
import {AmenitiesCount} from '../AmenitiesCount';

export interface SearchResults {
  results: PagedResponse<Hotel>;
  amenitiesCount: AmenitiesCount;
  minPrice: number;
  maxPrice: number;
}
