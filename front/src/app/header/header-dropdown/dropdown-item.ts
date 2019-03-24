export class DropdownItem {

  private readonly text: string;
  private readonly clickFunc: (event: Event) => void;

  constructor(text: string, clickFunc: (event: Event) => void) {
    this.text = text;
    this.clickFunc = clickFunc;
  }

  public getText(): string {
    return this.text;
  }

  public click(event: Event): void {
    this.clickFunc(event);
  }

}
