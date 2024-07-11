//src/app/welcome-page/welcome-page.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

import { MatDialog } from '@angular/material/dialog';

/**
 * Component representing the welcome page
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  /**
   * Initializes the WelcomePageComponent.
   * @param {MatDialog} dialog - Angular Material's MatDialog service.
   */
  constructor(public dialog: MatDialog) { }
  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void { }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}

