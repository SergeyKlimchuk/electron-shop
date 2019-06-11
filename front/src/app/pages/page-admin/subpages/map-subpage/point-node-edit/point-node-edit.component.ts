import { Component, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Mainable } from 'src/models/core/mainable';
import { City } from 'src/models/map/city';
import { Point } from 'src/models/map/point';
import { PointNode } from 'src/models/map/point-node';

import { Address } from './../../../../../../models/map/address';
import { Country } from './../../../../../../models/map/country';

@Component({
  selector: 'app-point-node-edit',
  templateUrl: './point-node-edit.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: PointNodeEditComponent, multi: true },
  ],
  styleUrls: ['./point-node-edit.component.styl']
})
export class PointNodeEditComponent implements ControlValueAccessor {

  disabled = false;
  isMainable = false;

  node: Country | City | Address;
  nodeWithoutChanges: Country | City | Address;
  isMain = false;
  update: (point: PointNode) => void;

  priorPoint: Point;

  @Output()
  pointEditMode = new EventEmitter<boolean>();
  selectPointMode = false;

  @Output()
  close = new EventEmitter();

  enableEditMode() {
    this.priorPoint = new PointNode();
    this.priorPoint.latitude = this.node.latitude;
    this.priorPoint.longitude = this.node.longitude;
    this.pointEditMode.emit(true);
    this.selectPointMode = true;
  }

  disableEditMode() {
    this.pointEditMode.emit(false);
    this.selectPointMode = false;
  }

  saveNodePosition() {
    this.disableEditMode();
  }

  revertNodePosition() {
    this.node.latitude = this.priorPoint.latitude;
    this.node.longitude = this.priorPoint.longitude;
    this.disableEditMode();
  }

  discarChanges() {
    this.node = Object.assign({}, this.nodeWithoutChanges);
  }

  writeValue(point: Country | City | Address): void {
    if (!point) {
      return;
    }
    if (this.nodeWithoutChanges) {
      this.node = point;
      return;
    }

    this.node = Object.assign({}, point);
    this.nodeWithoutChanges = point;

    const propertyIsMain = (point as Mainable).isMain;
    if (typeof propertyIsMain === 'boolean') {
      this.isMainable = true;
    }
    this.node = point;
  }
  registerOnChange(fn: any): void {
    this.update = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
