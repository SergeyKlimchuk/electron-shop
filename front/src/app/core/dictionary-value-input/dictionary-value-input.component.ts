import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckbox } from '@angular/material';
import { Subject } from 'rxjs';
import { DictionaryValue } from 'src/models/dictionaries/dictionary-value';

import { DictionaryService } from './../../services/dictionary/dictionary.service';

@Component({
  selector: 'app-dictionary-value-input',
  templateUrl: './dictionary-value-input.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: DictionaryValueInputComponent, multi: true },
  ],
  styleUrls: ['./dictionary-value-input.component.styl']
})
export class DictionaryValueInputComponent implements OnInit, ControlValueAccessor {

  @Input()
  dictionaryId: number;

  @Input()
  multiply = false;

  @Output()
  change = new EventEmitter<number>();

  @ViewChildren(MatCheckbox)
  checkboxes: QueryList<MatCheckbox>;

  dictionaryValues$ = new Subject<DictionaryValue[]>();
  value: number = null;
  private onChange: (value: number) => void;

  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.dictionaryService.getDictionaryValues(this.dictionaryId).subscribe(
      values => {
        this.dictionaryValues$.next(values);
      },
      error => {
        alert('Ошибка при получении значений справочника!');
        console.error(error);
      }
    );
  }

  public clear() {
    if (this.multiply) {
      this.checkboxes.forEach( x => x.checked = false );
    } else {
      this.value = null;
    }
  }

  public getValues() {
    return this.checkboxes.filter(x => x.checked).map(x => x.value);
  }

  public isValid() {
    return !!this.value;
  }

  changeValue(newValue: number) {
    if (this.onChange) {
      this.onChange(newValue);
    }
    this.change.emit(newValue);
  }

  writeValue(newValue: string): void {
    this.value = Number(newValue);
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(fn: any): void {
    console.log('1');
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('2');
  }

}
