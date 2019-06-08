import { Identity } from '../core/identity';
import { Nameble } from '../core/nameble';
import { Point } from './point';

export class Country extends Point implements Identity, Nameble {
  id: number;
  name: string;
}
