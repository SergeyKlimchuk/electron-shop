import { MapService } from './../../services/map/map.service';
import { Component, OnInit, Input } from '@angular/core';
import { DeliveryAddress } from 'src/models/users/address';
import { City } from 'src/models/map/city';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.styl']
})
export class AddressEditComponent implements OnInit {

  @Input()
  address: DeliveryAddress = new DeliveryAddress();

  cities: City[] = [];

  constructor(private mapService: MapService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadCities();
  }

  private loadCities() {
    this.mapService.getCountries().subscribe(
      countries => {
        const cities: City[] = [];
        countries.forEach(x => x.cities.forEach(x1 => cities.push(x1)));
        this.cities = cities;
      },
      error => {
        this.notificationService.notifyAboutError('Не удалось получить список городов!', error);
      }
    );
  }

}
