import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'techno-space';
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `google`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/google.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `vk`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/vk.svg`)
    );
  }
}
