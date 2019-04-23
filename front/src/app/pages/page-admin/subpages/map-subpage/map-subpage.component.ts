import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Country } from 'src/models/map/country';

import { Point } from './../../../../../models/map/point';
import { MapService } from './../../../../services/map/map.service';

interface NamedPoint extends Point {
  name: string;
}

@Component({
  selector: 'app-map-subpage',
  templateUrl: './map-subpage.component.html',
  styleUrls: ['./map-subpage.component.styl']
})
export class MapSubpageComponent {

  private readonly worldPoint: NamedPoint = { latitude: 50, longitude: 50, name: 'Мир' };

  labels = ['Страны', 'Города', 'Адреса'];
  label = this.labels[0];

  // All countries
  countries: Country[];
  // Call stack of points
  pointsStack = new Array<NamedPoint>();
  // Values of list
  values: NamedPoint[] = [];
  // Selected node for view thare childs
  selectedNode: NamedPoint = this.worldPoint;

  // Point for select new position on map
  targetPoint: {lat: number, lng: number} = { lat: 0, lng: 0 };
  // Cloned point for edit mode;
  targetNode: NamedPoint;

  editMode = false;
  editPointMode = false;

  icon = {
    url: 'http://localhost:4200/assets/icons/mark_icon.svg',
    scaledSize: {
      width: 48,
      height: 48
    }
  };

  constructor(private mapService: MapService) {
    this.mapService.getCountries().pipe(
      tap(x => this.countries = x),
      tap(x => this.values = x)
    ).subscribe();
  }

  private updateLabel() {
    this.label = this.labels[this.pointsStack.length];
  }

  private getValuesFromPoint(point: any) {
    let values: Point[];
    if (point.cities) {
      values = point.cities;
    } else if (point.addresses) {
      values = point.addresses;
    } else {
      return null;
    }
    return values as NamedPoint[];
  }

  selectPoint(point: NamedPoint) {
    this.selectedNode = point;
    const values = this.getValuesFromPoint(point);
    if (values == null) {
      return;
    }
    this.pointsStack.push(point);
    this.values = values;
    this.updateLabel();
  }

  back() {
    this.pointsStack.pop();
    if (this.pointsStack.length === 0) {
      this.selectedNode = this.worldPoint;
      this.values = this.countries;
    } else {
      const lastPoint = this.pointsStack[this.pointsStack.length - 1];
      this.selectedNode = lastPoint;
      this.values = this.getValuesFromPoint(lastPoint);
    }
    this.updateLabel();
  }

  editPoint(item: NamedPoint) {
    console.log('onEdit', item);
    this.targetPoint = { lat: item.latitude, lng: item.longitude };
    this.selectedNode = item;
    this.targetNode = Object.assign({}, item) as any;
    this.editMode = true;
  }

  exitFromEditMode() {
    this.editMode = false;
  }

  enableEditPointMode() {
    this.editPointMode = true;
  }

  discarChanges() {
    this.targetNode = Object.assign({}, this.selectedNode) as any;
  }

  saveNodePosition() {
    this.targetNode.latitude = this.targetPoint.lat;
    this.targetNode.longitude = this.targetPoint.lng;
    this.editPointMode = false;
    // TODO: SAVE TO BD
  }

  revertNodePosition() {
    this.targetNode.latitude = this.selectedNode.latitude;
    this.targetNode.longitude = this.selectedNode.longitude;
    this.editPointMode = false;
  }

  onDelete(item: Point) {
    console.log('onDelete', item);
  }

  saveNode() {
    console.log('save');
  }
}
