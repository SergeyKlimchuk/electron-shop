import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { DictionaryService } from 'src/app/services/dictionary/dictionary.service';

import { Dictionary } from './../../../../../models/dictionaries/dictionary';

@Component({
  selector: 'app-dictionaries-subpage',
  templateUrl: './dictionaries-subpage.component.html',
  styleUrls: ['./dictionaries-subpage.component.styl']
})
export class DictionariesSubpageComponent implements OnInit {

  dataSource = new MatTableDataSource<Dictionary>();
  selectedDictionaryIdSubject = new Subject<number>();
  displayedColumns = ['name', 'options'];
  displayedFooterRows = [];

  bufferedDictionary = new Dictionary();
  addPanelVisible = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dictionaryService: DictionaryService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.paginator.pageSize = 10;
    this.updatePage();
    this.setPageUpdateEvent();
  }

  updatePage() {
    console.log('Обновлена страница');
    this.dictionaryService.getDictionaries(this.paginator.pageIndex, this.paginator.pageSize).subscribe(
      (dictionariesPageable) => {
        // TODO: Add algorithm for fix case (Load this page, update db, press next page)
        this.paginator.length = dictionariesPageable.totalElements;
        this.dataSource.data = dictionariesPageable.content;
      },
      (error) => {
        alert('Error!');
        console.error(error);
      }
    );
  }

  setPageUpdateEvent() {
    this.paginator.page.subscribe(
      (success) => {
        console.log('Update values: ', success);
        this.updatePage();
      }
    );
  }

  rowClick(dictionary: Dictionary) {
    this.selectedDictionaryIdSubject.next(dictionary.id);
  }

  editValue(value: Dictionary) {
    this.bufferedDictionary = value;
    this.showAddRow();
  }

  deleteValue(value: Dictionary) {
    this.dictionaryService.deleteDictionary(value.id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter( x => x.id !== value.id);
        this.snackBar.open('Успешно удалено!');
      },
      (error) => {
        alert('Ошибка при удалении справочника!');
        console.error('Ошибка при удалении справочника!', error);
      }
    );
  }

  addNewValue() {
    this.dictionaryService.addDictionary(this.bufferedDictionary).subscribe(
      (response) => {
        this.hideAddRow();
        this.updatePage();
        this.bufferedDictionary = new Dictionary();
        this.snackBar.open('Успешно добавлено!');
      },
      (error) => {
        alert('Ошибка при добавления значения справочника!');
        console.error(error);
      }
    );
  }

  showAddValueForm() {
    this.showAddRow();
  }

  showAddRow() {
    this.displayedFooterRows = ['name', 'options'];
    this.addPanelVisible = true;
  }

  hideAddRow() {
    this.displayedFooterRows = [];
    this.addPanelVisible = false;
  }
}
