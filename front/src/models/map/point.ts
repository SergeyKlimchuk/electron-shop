import { Zoomed } from './zoomed';
import { Identity } from './../core/identity';
export class Point implements Identity, Zoomed {
  id: number;
  latitude: number;
  longitude: number;
  zoom: number;
}
