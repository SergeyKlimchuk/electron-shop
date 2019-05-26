import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/models/users/address';

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.styl']
})
export class AddressViewComponent {

  @Input()
  address: Address;

  constructor() { }

}
