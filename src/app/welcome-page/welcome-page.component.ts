import { Component,OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login/user-login.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

/**
 * WelcomePageComponent is responsible for displaying the welcome page of the application.
 * It allows users to open dialogs for user registration and login.
 */

@Component({
  selector: 'app-welcome-page',
  standalone:true,
  imports: [MatDialogModule,HttpClientModule],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {
  /**
   * Creates an instance of WelcomePageComponent.
   * @param dialog The MatDialog service to open dialogs for user login and registration.
   */
  constructor(public dialog: MatDialog) { }
  /**
   * Lifecycle hook: Called after Angular has initialized all data-bound properties of the component.
   */
  ngOnInit(): void {
  }

  /**
   * Opens the user registration dialog.
   * This dialog allows users to fill out the registration form.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

 /**
   * Opens the user login dialog.
   * This dialog allows users to log into their accounts.
   */ 
openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
