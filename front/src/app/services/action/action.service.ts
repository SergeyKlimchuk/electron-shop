import { Action } from './../../../models/actions/actions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageableResponse } from 'src/models/system/pageable-response';
import { Product } from 'src/models/products/product';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private http: HttpClient) { }

  saveAction(action: Action) {
    return this.http.post<Action>('/api/actions', action);
  }

  getAction(id: number) {
    return this.http.get<Action>(`/api/actions/${id}`);
  }

  getActions(page: number = 1, size: number = 10, sort: string = null) {
    const params = new HttpParams();
    if (page) {
      params.set('page', page.toString());
    }
    if (size) {
      params.set('size', size.toString());
    }
    if (sort) {
      params.set('sort', sort);
    }
    return this.http.get<PageableResponse<Action>>('/api/actions');
  }

  getActiveActions(page: number = 1, size: number = 10) {
    const params = new HttpParams();
    if (page) {
      params.set('page', page.toString());
    }
    if (size) {
      params.set('size', size.toString());
    }
    params.set('active', 'true');
    return this.http.get<PageableResponse<Action>>('/api/actions');
  }

  updateAction(action: Action) {
    return this.http.put<Action>('/api/actions', action);
  }

  deleteAction(actionId: number) {
    return this.http.delete<void>(`/api/actions/${actionId}`);
  }
}
