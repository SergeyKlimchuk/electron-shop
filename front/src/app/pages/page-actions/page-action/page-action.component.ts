import { Component, Input } from '@angular/core';

import { Action } from './../../../../models/actions/actions';

@Component({
  selector: 'app-page-action',
  templateUrl: './page-action.component.html',
  styleUrls: ['./page-action.component.styl']
})
export class PageActionComponent {

  @Input()
  action: Action = null;

  constructor() { }

}
