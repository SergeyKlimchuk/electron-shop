import { Point } from './point';

export class Address extends Point {
  id: number;
  info: string;
  beginWotkDay: Date;
  endWotkDay: Date;
  workDays: number[];
}
