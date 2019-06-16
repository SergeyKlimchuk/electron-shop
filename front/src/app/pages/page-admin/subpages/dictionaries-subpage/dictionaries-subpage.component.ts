import { Component } from '@angular/core';

@Component({
  selector: 'app-dictionaries-subpage',
  templateUrl: './dictionaries-subpage.component.html',
  styleUrls: ['./dictionaries-subpage.component.styl']
})
export class DictionariesSubpageComponent {

  selectedDictionaryId: number = null;

  selectDictionary(dictionaryId: number) {
    this.selectedDictionaryId = dictionaryId;
  }
}
