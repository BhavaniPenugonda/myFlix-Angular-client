

import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login/user-login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }
// This is the function that will open the dialog when the signup button is clicked  
openUserRegistrationDialog(): void {
  console.log('openUserLoginDialog called');
    this.dialog.open(UserRegistrationFormComponent, {
// Assigning the dialog a width
    width: '280px'
    });
  }
  // This is the function that will open the dialog when the Login button is clicked  
  openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
  // Assigning the dialog a width
      width: '280px'
      });
    }

  openMoviesDialog(): void {
      this.dialog.open(MovieCardComponent, {
        width: '500px'
      });
    }
  }


