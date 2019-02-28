import { DropdownItem } from './header-dropdown/dropdown-item';
import { UserService } from './../services/user/user.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl'],
})
export class HeaderComponent implements OnInit, AfterViewInit {

  public userDropdown = [
    new DropdownItem('Профиль', e => {}),
    new DropdownItem('Корзина', e => {}),
    new DropdownItem('Заказы', e => {}),
    new DropdownItem('Выйти', e => {})
  ];

  public userFullName = '';
  leftSideElements: Array<any>;
  currentAnimation = null;
  last = 0;

  constructor(
    private userService: UserService,
    private elem: ElementRef
  ) {
    userService.getCurrentUser().subscribe(
      (user) => {
        this.userFullName = `${user.name} ${user.lastName}`;
      },
      (error) => {
        console.log('getCurrentUser in header', error);
      }
    );
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.leftSideElements = this.elem.nativeElement.querySelectorAll('.item');
  }

}
