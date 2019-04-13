import { Location } from './location';

export class Place {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  location: Location;
}
