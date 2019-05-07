import { Identity } from './../../../models/core/identity';

export class IdentitySelectionModel<T extends Identity> {

  selected: T[] = [];

  isSelected(x: T) {
    return this.selected.some(y => y.id === x.id);
  }

  select(x: T) {
    if (this.isSelected(x)) {
      return;
    }
    this.selected.push(x);
  }

  deselect(x: T) {
    if (!this.isSelected(x)) {
      return;
    }
    this.selected = this.selected.filter(z => z.id !== x.id);
  }

  toggle(x: T) {
    if (this.isSelected(x)) {
      this.deselect(x);
    } else {
      this.select(x);
    }
  }
}
