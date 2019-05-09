import { Action } from './../../../../models/actions/actions';
import { ActionService } from './../../../services/action/action.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-action-view',
  templateUrl: './page-action-view.component.html',
  styleUrls: ['./page-action-view.component.styl']
})
export class PageActionViewComponent implements OnInit {

  action: Action;

  constructor(private route: ActivatedRoute,
              private actionService: ActionService) {
    const actionId = this.route.snapshot.paramMap.get('actionId');
    this.actionService.getAction(Number(actionId)).subscribe(
      action => this.action = action
    );
  }

  ngOnInit() {
  }

}
