import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PointNode } from 'src/models/map/point-node';
import { Point } from 'src/models/map/point';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: MapComponent, multi: true },
  ],
  styleUrls: ['./map.component.styl']
})
export class MapComponent implements ControlValueAccessor {

  icon: any = {
    url: 'http://localhost:4200/assets/icons/mark_icon.svg',
    scaledSize: {
      width: 48,
      height: 48
    }
  };

  @Input()
  markers: PointNode[] = [];

  @Input()
  set editMode(editMode: boolean) {
    this.EditMode = editMode;
  }
  EditMode = true;
  target: PointNode;
  camera: PointNode;

  updateEditPoint: (point: Point) => void;

  updatePointPosition(newPosition: {lat: number, lng: number}) {
    if (this.EditMode) {
      this.target.latitude = newPosition.lat;
      this.target.longitude = newPosition.lng;
      this.updateEditPoint(this.target);
    }
  }

  updateZoom(newZoom: number) {
    this.target.zoom = newZoom;
    this.updateEditPoint(this.target);
  }

  writeValue(editPoint: PointNode): void {
    this.target = editPoint;
    this.camera = Object.assign({}, editPoint);
  }
  registerOnChange(fn: any): void {
    this.updateEditPoint = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }
}
