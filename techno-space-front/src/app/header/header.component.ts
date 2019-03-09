import { Router } from '@angular/router';
import { DropdownItem } from './header-dropdown/dropdown-item';
import { UserService } from './../services/user/user.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { Roles } from 'src/models/users/roles';

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
    private router: Router,
    private elem: ElementRef) {
  }

  subscribeOnChangeUser() {
    this.userService.getCurrentUser().subscribe(
      (user) => {
        this.userFullName = `${user.name} ${user.lastName}`;
        if (user.roles.indexOf(Roles.admin) > -1) {
          const moveToAdminpage = new DropdownItem('Панель управления', e => {
            this.router.navigate(['/admin-panel']);
          });
          this.userDropdown.push(moveToAdminpage);
        }
        console.log(user.roles);
      },
      (error) => {
        console.log('getCurrentUser in header', error);
      }
    );
  }

  ngOnInit() {
    this.subscribeOnChangeUser();
  }

  ngAfterViewInit(): void {
    this.leftSideElements = this.elem.nativeElement.querySelectorAll('.item');
  }

}
