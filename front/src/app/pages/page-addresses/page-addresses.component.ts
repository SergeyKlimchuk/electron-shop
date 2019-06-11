import { Component } from '@angular/core';
import { MapState } from 'src/models/map/map-state';

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
