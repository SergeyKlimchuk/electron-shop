import { Component } from '@angular/core';
import { PointNode } from 'src/models/map/point-node';

@Component({
  selector: 'app-page-addresses',
  templateUrl: './page-addresses.component.html',
  styleUrls: ['./page-addresses.component.styl']
})
export class PageAddressesComponent {
  state: {target: PointNode, markers: PointNode[], zoom: number};
  error = false;

  constructor() {}

  icon = {
    url: 'http://localhost:4200/assets/icons/mark_icon.svg',
    scaledSize: {
      width: 48,
      height: 48
    }
  };

  showPointWithMarkers(event: {target: PointNode, markers: PointNode[], zoom: number}) {
    console.log('Map state was updated:', event.target);
    this.state = event;
  }
}
