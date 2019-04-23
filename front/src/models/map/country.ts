import { City } from './city';
import { Point } from './point';
import { Identity } from '../core/identity';
import { Nameble } from '../core/nameble';

export class Country extends Point implements Identity, Nameble {
  id: number;
  name: string;
  cities: City[];
}
