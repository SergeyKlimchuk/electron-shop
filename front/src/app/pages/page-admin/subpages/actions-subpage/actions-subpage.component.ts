import { MatDialog, MatSnackBar } from '@angular/material';
import { FileService } from './../../../../services/file/file.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Action } from './../../../../../models/actions/actions';
import { ActionService } from './../../../../services/action/action.service';
import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { LoadableImageComponent } from 'src/app/core/loadable-image/loadable-image.component';
import { ProductSelectDialog } from 'src/app/core/product-select/product-select.component';

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
    this.editedAction.imageUrl = await this.picture.uploadImage() as any;
    this.actionService.saveAction(this.editedAction).subscribe(
      () => {
        this.loadActions();
        this.editedAction = null;
      }
    );
  }
}
