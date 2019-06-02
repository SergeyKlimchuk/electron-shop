import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boolean-input',
  templateUrl: './boolean-input.component.html',
  styleUrls: ['./boolean-input.component.styl']
})
export class BooleanInputComponent {

  @Output()
  change = new EventEmitter();

  state: boolean = null;

  no: boolean;
  yes: boolean;

  constructor() { }

  clear() {
    this.changeValue(null);
  }

  changeYes() {
    this.changeValue(true);
    this.change.emit();
  }

  changeNo() {
    this.changeValue(false);
    this.change.emit();
  }

  changeValue(value: boolean) {
    if (this.state === value) {
      this.state = null;
    } else {
      this.state = value;
    }
    this.yes = this.state === true;
    this.no = this.state === false;
  }

}
