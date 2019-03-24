import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SliderPage } from './slider-page';
import { state, style, transition, trigger, animate } from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.styl'],
  animations: [
    trigger('visibility', [

      state('visible', style({
        opacity: 1
      })),
      state('hidden', style({
        opacity: 0
      })),

      transition('visible => hidden', [
        animate('.2s')
      ]),
      transition('hidden => visible', [
        animate('.2s')
      ])
    ])
  ]
})
export class SliderComponent implements OnInit, OnDestroy {

  @Input()
  pages: Array<SliderPage>;

  currentPage = 0;
  maxPageIndex = 0;
  interval: any;

  constructor() { }

  ngOnInit() {
    this.maxPageIndex = this.pages.length - 1;
    this.interval = setInterval(_ => {
      this.nextSlide();
    }, 7000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  nextSlide() {
    if (this.currentPage === this.maxPageIndex) {
      this.currentPage = 0;
    } else {
      this.currentPage++;
    }
  }

  priorSlide() {
    if (this.currentPage === 0) {
      this.currentPage = this.maxPageIndex;
    } else {
      this.currentPage--;
    }
  }

}
