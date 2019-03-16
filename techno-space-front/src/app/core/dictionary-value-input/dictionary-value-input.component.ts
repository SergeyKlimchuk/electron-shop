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
  value: number;
  private onChange: (value: number) => void;

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

  changeValue(newValue: number) {
    this.onChange(newValue);
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
