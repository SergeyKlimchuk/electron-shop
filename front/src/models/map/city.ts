import { Point } from './point';
import { Address } from './address';

export class City extends Point {
  id: number;
  name: string;
  nameEn: string;
  addresses: Address[];
}
