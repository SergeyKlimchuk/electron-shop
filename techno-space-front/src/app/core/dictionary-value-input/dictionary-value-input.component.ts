import { Subject } from 'rxjs';
import { DictionaryService } from './../../services/dictionary/dictionary.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DictionaryValue } from 'src/models/dictionaries/dictionary-value';

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

  dictionaryValues$ = new Subject<DictionaryValue[]>();
  value$ = new Subject<DictionaryValue>();

  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.dictionaryService.getDictionaryValues(this.dictionaryId).subscribe(
      values => {
        console.log('dictionary values', values);
        this.dictionaryValues$.next(values);
      },
      error => {
        alert('Ошибка при получении значений справочника!');
        console.error(error);
      }
    );
  }

  writeValue(obj: any): void {
    this.value$.next(obj);
  }
  registerOnChange(onChange: any): void {
    console.log('set "onChange"');
    this.value$.subscribe(
      value => {
        console.log('new selected value', value);
        onChange(value);
      }
    );
  }
  registerOnTouched(fn: any): void {
    console.log('1');
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('2');
  }

}
