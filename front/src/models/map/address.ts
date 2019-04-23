import { Point } from './point';
import { Nameble } from '../core/nameble';
import { Identity } from '../core/identity';

export class Address extends Point implements Identity, Nameble {
  id: number;
  name: string;
  beginWotkDay: Date;
  endWotkDay: Date;
  workDays: number[];
}
