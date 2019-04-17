import { Point } from './point';
import { MapZoom } from './map-zoom';

export class MapState {
  targetPoint: Point;
  markers: Point[];
  zoom: MapZoom;
}
