import { DictionaryValue } from './../../../models/dictionaries/dictionary-value';
import { Dictionary } from './../../../models/dictionaries/dictionary';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageableResponse } from 'src/models/system/pageable-response';

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
