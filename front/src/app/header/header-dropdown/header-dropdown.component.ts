import { DropdownItem } from './dropdown-item';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-dropdown',
  templateUrl: './header-dropdown.component.html',
  styleUrls: ['./header-dropdown.component.styl']
})
export class HeaderDropdownComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  items: Array<DropdownItem>;

  constructor() { }

  ngOnInit() {
  }

}
