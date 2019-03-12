import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageableResponse } from 'src/models/system/pageable-response';

import { Dictionary } from './../../../models/dictionaries/dictionary';
import { DictionaryValue } from './../../../models/dictionaries/dictionary-value';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) { }

  getDictionary(dictionaryId: number) {
    return this.http.get<Dictionary>('/api/dictionaries/' + dictionaryId);
  }

  getDictionaries(page: number, size: number) {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (size) {
      params = params.set('size', size.toString());
    }
    return this.http.get<PageableResponse<Dictionary>>('/api/dictionaries', { params });
  }

  addDictionary(dictionary: Dictionary) {
    return this.http.post<Dictionary>(`/api/dictionaries`, dictionary);
  }

  deleteDictionary(dictionaryId: number) {
    return this.http.delete<void>(`/api/dictionaries/${dictionaryId}`);
  }

  addDictionaryValue(dictionaryId: number, dictionaryValue: DictionaryValue) {
    return this.http.post<DictionaryValue>(`/api/dictionaries/${dictionaryId}/values`, dictionaryValue);
  }

  getDictionaryValues(dictionaryId: number) {
    return this.http.get<DictionaryValue[]>(`/api/dictionaries/${dictionaryId}/values`);
  }

  deleteDictionaryValue(dictionaryValueId: number) {
    return this.http.delete<void>(`/api/dictionaries/0/values/${dictionaryValueId}`);
  }
}
