import { DropdownItem } from './header-dropdown/dropdown-item';
import { UserService } from './../services/user/user.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2
} from '@angular/core';
import { trigger, transition, style, state } from '@angular/animations';

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

  public userFullName = this.userService.getFullName();
  leftSideElements: Array<any>;
  currentAnimation = null;
  last = 0;

  constructor(
    private userService: UserService,
    private renderer: Renderer2,
    private elem: ElementRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.leftSideElements = this.elem.nativeElement.querySelectorAll('.item');
  }

}
