import { Component, Input } from '@angular/core';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Dictionary } from 'src/models/dictionaries/dictionary';

import { DictionaryValue } from './../../../../../../models/dictionaries/dictionary-value';
import { DictionaryService } from './../../../../../services/dictionary/dictionary.service';


@Component({
  selector: 'app-dictionary-values-list',
  templateUrl: './dictionary-values-list.component.html',
  styleUrls: ['./dictionary-values-list.component.styl']
})
export class DictionaryValuesListComponent {

  infoDataSource = new MatTableDataSource<DictionaryValue>();
  displayedColumns = ['name', 'options'];
  displayedFooterRows = [];

  addPanelVisible = false;
  newValue = new DictionaryValue();
  dictionaryId: number;
  @Input('dictionaryId')
  set setDictionaryId(dictionaryId: number) {
    if (!dictionaryId) {
      return;
    }
    this.dictionaryService.getDictionary(dictionaryId).subscribe(
      dictionary => this.dictionary = dictionary
    );
    this.dictionaryId = dictionaryId;
    this.loadValues();
  }

  dictionary: Dictionary;

  constructor(private dictionaryService: DictionaryService,
              private snackBar: MatSnackBar) { }

  loadValues() {
    this.dictionaryService.getDictionaryValues(this.dictionaryId).subscribe(
      (values) => {
        console.log(values);
        this.infoDataSource.data = values;
      },
      (error) => {
        alert('Ошибка при получении значений справочника!');
        console.error(error);
      }
    );
  }

  editValue(value: DictionaryValue) {
    this.newValue = value;
    this.showAddRow();
  }

  deleteValue(dictionaryValue: DictionaryValue) {
    this.dictionaryService.deleteDictionaryValue(dictionaryValue.id).subscribe(
      () => {
        this.infoDataSource.data = this.infoDataSource.data.filter( x => x.id !== dictionaryValue.id);
        this.snackBar.open('Успешно удалено!');
      },
      (error) => {
        alert('Ошибка при удалении значения справочника!');
        console.error('Ошибка при удалении значения справочника!', error);
      }
    );
  }

  addNewValue() {
    this.dictionaryService.addDictionaryValue(this.dictionaryId, this.newValue).subscribe(
      (response) => {
        this.loadValues();
        this.hideAddRow();
        this.newValue = new DictionaryValue();
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
