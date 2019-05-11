import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadableImageComponent } from 'src/app/core/loadable-image/loadable-image.component';
import { ProductSelectDialog } from 'src/app/core/product-select/product-select.component';

import { Action } from './../../../../../models/actions/actions';
import { ActionService } from './../../../../services/action/action.service';

@Component({
  selector: 'app-actions-subpage',
  templateUrl: './actions-subpage.component.html',
  styleUrls: ['./actions-subpage.component.styl']
})
export class ActionsSubpageComponent implements OnInit {

  @ViewChild(LoadableImageComponent)
  picture: LoadableImageComponent;

  actions$ = new BehaviorSubject<Action[]>([]);
  selectedAction: Action = null;

  editMode = false;
  editedAction: Action;

  percentDiscount = true;

  constructor(private actionService: ActionService,
              private matDialog: MatDialog,
              private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.loadActions();
  }

  private loadActions() {
    this.actionService.getActions(0, 100).pipe(map(x => x.content)).subscribe(
      actions => this.actions$.next(actions)
    );
  }

  selectAction(action: Action) {
    this.selectedAction = action;
  }

  editAction(action: Action) {
    this.editedAction = action;
    this.editMode = true;
  }

  deleteAction(actionId: number) {
    this.actionService.deleteAction(actionId).subscribe(
      () => this.loadActions()
    );
  }

  addNewAction() {
    this.editedAction = new Action();
    this.editMode = true;
  }

  cancel() {
    this.selectedAction = null;
    this.editedAction = null;
    this.editMode = false;
  }

  openSelectProductsDialog() {
    this.matDialog.open(ProductSelectDialog, { data: this.editedAction.products }).afterClosed().subscribe(
      products => {
        if (products) {
          this.editedAction.products = products;
        }
      }
    );
  }

  async save() {
    this.editMode = false;
    await this.picture.uploadImage();
    this.actionService.saveAction(this.editedAction).subscribe(
      () => {
        this.loadActions();
        this.editedAction = null;
      }
    );
  }
}
