import { Component, OnInit } from '@angular/core';
import { SliderPage } from 'src/app/slider/slider-page';

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.styl']
})
export class PageMainComponent implements OnInit {
  pages = new Array<SliderPage>();

  constructor() {
    this.pages.push(
      {
        url: '/actions/1',
        imgUrl: 'assets/resources/1_1920x360.jpg'
      },
      {
        url: '/actions/2',
        imgUrl: 'assets/resources/2_1920x360.jpg'
      },
      {
        url: '/actions/3',
        imgUrl: 'assets/resources/3_1920x360.jpg'
      },
      {
        url: '/actions/4',
        imgUrl: 'assets/resources/4_1920x360.jpg'
      }
    );
  }

  ngOnInit() {}
}
