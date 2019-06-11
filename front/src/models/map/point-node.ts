import { NamedPoint } from './named-point';
import { Point } from './point';

export class PointNode extends Point implements NamedPoint {
  id: number;
  name: string;
  nameEn: string;
}
