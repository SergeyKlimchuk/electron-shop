import { NotificationService } from './../../../../../services/notification/notification.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { DictionaryService } from 'src/app/services/dictionary/dictionary.service';
import { Dictionary } from 'src/models/dictionaries/dictionary';

@Component({
  selector: 'app-dictionary-types-list',
  templateUrl: './dictionary-types-list.component.html',
  styleUrls: ['./dictionary-types-list.component.styl']
})
export class DictionaryTypesListComponent implements OnInit {

  dataSource = new MatTableDataSource<Dictionary>();
  displayedColumns = ['name', 'options'];
  displayedFooterRows = [];

  addPanelVisible = false;

  editedDictionary: Dictionary = null;

  @Output()
  select = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dictionaryService: DictionaryService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.paginator.pageSize = 10;
    this.updatePage();
    this.setPageUpdateEvent();
  }

  setPageUpdateEvent() {
    this.paginator.page.subscribe(
      () => this.updatePage()
    );
  }

  showAddPanel() {
    this.editedDictionary = new Dictionary();
    this.displayedFooterRows = this.displayedColumns;
  }

  showEditPanel(dictionary: Dictionary) {
    this.editedDictionary = Object.assign({}, dictionary);
    this.displayedFooterRows = this.displayedColumns;
  }

  closeEditPanel() {
    this.editedDictionary = null;
    this.displayedFooterRows = [];
  }

  saveDictionary(dictionary: Dictionary) {
    const update = !!(dictionary.id);
    this.dictionaryService.addDictionary(dictionary).subscribe(
      () => {
        this.updatePage();
        if (update) {
          this.notificationService.notify('Справочник успешно обновлен!');
        } else {
          this.notificationService.notify('Справочник успешно добавлен!');
        }
        this.closeEditPanel();
      },
      (error) => {
        this.notificationService.notifyAboutError('Ошибка при добавления значения справочника!', error);
      }
    );
  }

  rowClick(dictionary: Dictionary) {
    this.select.emit(dictionary.id);
  }

  updatePage() {
    this.dictionaryService.getDictionaries(this.paginator.pageIndex, this.paginator.pageSize).subscribe(
      (dictionariesPageable) => {
        this.paginator.length = dictionariesPageable.totalElements;
        this.dataSource.data = dictionariesPageable.content;
      },
      (error) => {
        this.notificationService.notifyAboutError('При полуении справочников произошла ошибка!', error);
      }
    );
  }

  deleteValue(dictionary: Dictionary) {
    this.dictionaryService.deleteDictionary(dictionary.id).subscribe(
      () => {
        this.updatePage();
        this.notificationService.notify('Справочник удален!');
        this.select.emit(null);
      },
      (error) => {
        this.notificationService.notifyAboutError('При удалении справочника произошла ошибка!', error);
      }
    );
  }
}
