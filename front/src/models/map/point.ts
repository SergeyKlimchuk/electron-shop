import { Zoomed } from './zoomed';
import { Identity } from './../core/identity';
export class Point implements Identity, Zoomed {
  id: number;
  latitude = 0;
  longitude = 0;
  zoom = 0;
}
