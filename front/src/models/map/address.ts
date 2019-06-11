import { Mainable } from './../core/mainable';
import { PointNode } from './point-node';

export class Address extends PointNode implements Mainable {
  beginWotkDay: Date;
  endWorkDay: Date;
  workDays: number[];
  isMain: boolean;
}
