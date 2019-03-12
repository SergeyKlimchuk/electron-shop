import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit() {
    this.paginator.pageSize = 2;
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

}
