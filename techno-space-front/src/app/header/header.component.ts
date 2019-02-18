import { DropdownItem } from './header-dropdown/dropdown-item';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  public userDropdown = [
    new DropdownItem('Профиль', (e) => {}),
    new DropdownItem('Корзина', (e) => {}),
    new DropdownItem('Заказы', (e) => {}),
    new DropdownItem('Выйти', (e) => {}),
  ];

  public userFullName = this.userService.getFullName();

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

}
