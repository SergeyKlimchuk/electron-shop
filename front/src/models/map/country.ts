import { City } from './city';
import { Point } from './point';

export class Country extends Point {
  id: number;
  name: string;
  cities: City[];
}
