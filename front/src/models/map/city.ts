import { Point } from './point';
import { Address } from './address';
import { Nameble } from '../core/nameble';
import { Identity } from '../core/identity';

export class City extends Point implements Identity, Nameble {
  id: number;
  name: string;
  nameEn: string;
  addresses: Address[];
}
