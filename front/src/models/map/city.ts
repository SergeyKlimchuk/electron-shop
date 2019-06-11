import { PointNode } from './point-node';
import { Mainable } from '../core/mainable';

export class City extends PointNode implements Mainable {
  isMain: boolean;
}
