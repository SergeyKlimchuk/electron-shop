import { City } from 'src/models/map/city';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MapState } from 'src/models/map/map-state';
import { MapZoom } from 'src/models/map/map-zoom';

import { MapService } from './../../services/map/map.service';
import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-page-addresses',
  templateUrl: './page-addresses.component.html',
  styleUrls: ['./page-addresses.component.styl']
})
export class PageAddressesComponent {
  state: MapState;
  error = false;

  constructor() {}

  icon = {
    url: 'http://localhost:4200/assets/icons/mark_icon.svg',
    scaledSize: {
      width: 48,
      height: 48
    }
  };

  showPointWithMarkers(newState: MapState) {
    console.log('Map state was updated:', newState);
    this.state = newState;
  }
}
