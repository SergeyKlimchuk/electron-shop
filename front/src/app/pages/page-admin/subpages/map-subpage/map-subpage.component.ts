import { Component, ViewChild } from '@angular/core';
import { Address } from 'src/models/map/address';
import { City } from 'src/models/map/city';
import { Country } from 'src/models/map/country';
import { PointNode } from 'src/models/map/point-node';

import { Point } from './../../../../../models/map/point';
import { MapService } from './../../../../services/map/map.service';
import { NotificationService } from './../../../../services/notification/notification.service';
import { PointsListComponent } from './points-list/points-list.component';

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

  @ViewChild(PointsListComponent)
  pointsList: PointsListComponent;

  constructor(private mapService: MapService,
              private notificationService: NotificationService) {

  }

  selectPoint(point: PointNode) {
    this.selectedPoint = point;
  }

  addNewPoint() {
    let node = null;
    if (this.selectedPoint == null) {
      node = new Country();
    } else if (this.selectedPoint instanceof Country) {
      node = new City();
    } else if (this.selectedPoint instanceof City) {
      node = new Address();
    }

    this.editPoint(node);
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
        this.refreshList();
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
          this.selectedPoint = null;
          this.notificationService.notify('Точка успешно сохранена!');
          this.refreshList();
        }
      );
    }
    this.editMode = false;
  }

  refreshList() {
    this.pointsList.refresh();
  }
}
