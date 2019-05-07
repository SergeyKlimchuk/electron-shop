import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { Action } from './../../../models/actions/actions';
import { ActionService } from './../../services/action/action.service';

@Component({
  selector: 'app-page-actions',
  templateUrl: './page-actions.component.html',
  styleUrls: ['./page-actions.component.styl']
})
export class PageActionsComponent {

  actions$ = new Subject<Action[]>();
  selectedAction: Action;

  constructor(private actionService: ActionService) {
    this.loadActions();
  }

  loadActions() {
    this.actionService.getActions().subscribe(
      actionsResponse => {
        const actions = actionsResponse.content;
        this.actions$.next(actions);
        if (actions.length > 0) {
          this.selectAction(actions[0]);
        }
      }
    );
  }

  selectAction(action: Action) {
    this.selectedAction = action;
  }

}
