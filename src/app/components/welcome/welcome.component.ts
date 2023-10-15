import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length > 0) {
        const currentRoute = urlSegments[urlSegments.length - 1].path;
        if (currentRoute === 'login' && this.tabGroup) {
          this.tabGroup.selectedIndex = 0; // Refers to the Login tab (index 0)
        } else if (currentRoute === 'register' && this.tabGroup) {
          this.tabGroup.selectedIndex = 1; // Refers to the Register tab (index 1)
        }
      }
    });
  }
}