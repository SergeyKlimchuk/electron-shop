import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { DeliveryAddress } from 'src/models/users/address';

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.styl']
})
export class UserAddressesComponent implements OnInit {

  addresses: DeliveryAddress[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadAddresses();
  }

  private loadAddresses() {
    this.userService.getCurrentUser().subscribe(
      user => this.addresses = user.addresses
    );
  }

  addAddress() {

  }

}
