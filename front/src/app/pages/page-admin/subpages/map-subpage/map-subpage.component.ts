import { NotificationService } from './../../../../services/notification/notification.service';
import { Component } from '@angular/core';
import { Address } from 'src/models/map/address';
import { City } from 'src/models/map/city';
import { Country } from 'src/models/map/country';
import { PointNode } from 'src/models/map/point-node';

import { Point } from './../../../../../models/map/point';
import { MapService } from './../../../../services/map/map.service';

@Component({
  selector: 'app-map-subpage',
  templateUrl: './map-subpage.component.html',
  styleUrls: ['./map-subpage.component.styl']
})
export class MapSubpageComponent {

  editMode = false;
  editPointMode = false;

  selectedPoint: PointNode = null;
  parentPoint: PointNode = null;

  markers: Point[] = [];

  constructor(private mapService: MapService,
              private notificationService: NotificationService) {

  }

  selectPoint(point: PointNode) {
    this.selectedPoint = point;
  }

  addNewPoint() {
    this.editPoint(new PointNode());
  }

  updateEditPointMode(enable: boolean) {
    this.editPointMode = enable;
  }

  editPoint(point: PointNode) {
    this.editMode = true;
    this.parentPoint = this.selectedPoint;
    this.selectedPoint = point;
  }

  deletePoint(point: PointNode) {
    let subscription = null;
    if (point instanceof Country) {
      subscription = this.mapService.deleteCountry(point.id);
    } else if (point instanceof City) {
      subscription = this.mapService.deleteCity(point.id);
    } else if (point instanceof Address) {
      subscription = this.mapService.deleteAddress(point.id);
    }
    subscription.subscribe(
      () => {
        this.notificationService.notify('Точка успешно удалена!');
        // TODO: reload page
      }
    );
  }

  closeEditMenu(point: PointNode) {
    if (point) {
      let subscription = null;
      if (point instanceof Country) {
        subscription = this.mapService.createCountry(point);
      } else if (point instanceof City) {
        subscription = this.mapService.createCity(this.parentPoint.id, point);
      } else if (point instanceof Address) {
        subscription = this.mapService.createAddress(this.parentPoint.id, point);
      }
      subscription.subscribe(
        entity => {
          this.notificationService.notify('Точка успешно сохранена!');
          // TODO: reload page
        }
      );
    }
    this.editMode = false;
  }

  back() {

  }
}
