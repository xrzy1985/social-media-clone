import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <p>
      <mat-toolbar class="toolbar">
        <button mat-icon-button
          aria-label="side navigation icon"
          class="side-nav-icon">
          <mat-icon
            style="color: white;"
            aria-label="side navigation icon button"
            class="menu-icon"
            fontIcon="menu">
          </mat-icon>
        </button>
        <span class="title-span">TITLE</span>
        <span class="spacer"></span>
        <button mat-raised-button
          aria-label="log out button"
          class="log-out-button"
          color="warn"
          *ngIf="loggedIn">
          Log Out
        </button>
      </mat-toolbar>
    </p>
  `,
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  protected loggedIn: boolean;

  constructor() {
    this.loggedIn = false;
  }

  ngOnInit(): void {
  }

}
