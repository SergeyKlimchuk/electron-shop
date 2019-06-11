import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PointNode } from 'src/models/map/point-node';

import { MapService } from './../../../../../services/map/map.service';

@Component({
  selector: 'app-points-list',
  templateUrl: './points-list.component.html',
  styleUrls: ['./points-list.component.styl']
})
export class PointsListComponent implements OnInit {

  labels = ['Страны', 'Города', 'Адреса'];
  label = this.labels[0];

  elements: PointNode[] = [];

  // Call stack of points
  pointsStack: PointNode[] = [];

  @Output()
  select = new EventEmitter<PointNode>();

  @Output()
  edit = new EventEmitter<PointNode>();

  @Output()
  delete = new EventEmitter<PointNode>();

  @Output()
  add = new EventEmitter<PointNode>();

  some: any = null;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.loadState();
  }

  back() {
    this.pointsStack.pop();
    this.loadState();
    this.select.emit(this.getLastStackElement());
  }

  getLastStackElement() {
    let element = null;
    if (this.pointsStack.length !== 0) {
      element = this.pointsStack[this.pointsStack.length - 1];
    }
    return element;
  }

  selectElement(element: PointNode) {
    if (this.pointsStack.length === 2) {
      return;
    }
    this.pointsStack.push(element);
    this.loadState();
    this.select.emit(this.getLastStackElement());
  }

  loadState() {
    this.label = this.labels[this.pointsStack.length];
    const currentState = this.getLastStackElement();
    switch (this.pointsStack.length) {
      case 0:
        this.mapService.getCountries().subscribe(
          countries => this.elements = countries
        );
        break;
      case 1:
        this.mapService.getCitiesInCountry(currentState.id).subscribe(
          cities => this.elements = cities
        );
        break;
      case 2:
        this.mapService.getAddressesInCity(currentState.id).subscribe(
          addresses => this.elements = addresses
        );
        break;
    }
  }
}
