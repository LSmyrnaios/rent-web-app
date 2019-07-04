/* TODO Use any for now, add amenities to every hotel model and create amenity model */
import { Room } from './room';

export interface Hotel {
  id: number;
  name: string;
  number_of_rooms: number;
  address: string;
  stars: string;
  email: string;
  lat: number;
  lng: number;
  description_short: string;
  description_long: string;
  amenities: any[];
  createdAt?: Date;
  updatedAt?: Date;
  rooms: Room[];
  photosUrls: string[];
}
