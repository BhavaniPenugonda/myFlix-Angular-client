import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import {FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient,HttpClientModule} from '@angular/common/http';

/**
 * The UserRegistrationFormComponent is used to display the registration form and 
 * send user data to the backend for registration.
 */
@Component({
  selector: 'app-user-registration-form',
  standalone:true,
  imports: [MatButtonModule,MatCardModule,FormsModule,MatFormFieldModule,MatInputModule,MatDialogModule,HttpClientModule],
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  
  

})

export class UserRegistrationFormComponent implements
  OnInit {
/**
   * The user data input object that holds the values from the registration form.
   * 
   * @example { Username: '', Password: '', Email: '', Birthday: '' }
   */
    @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  
    /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param fetchApiData The service responsible for API calls.
   * @param dialogRef The reference to the MatDialog for closing the dialog after registration.
   * @param snackBar The MatSnackBar service to show notifications to the user.
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }
  /**
   * Lifecycle hook that is called when the component is initialized.
   * You can add any initialization logic here if needed.
   */
  ngOnInit(): void {}
  
  // This is the function responsible for sending the form inputs to the backend
  /**
   * Registers a new user by sending the form data to the backend API.
   * If registration is successful, a success notification is shown and the dialog is closed.
   * If registration fails, an error notification is displayed.
   */
  registerUser(): void {
      this.fetchApiData.userRegistration(this.userData).subscribe({
        next: (result) => {
          
          this.snackBar.open("Registration success",  "OK", {
              duration: 2000
          });
          this.dialogRef.close();
      },
      error: (err) => {
          this.snackBar.open("Registration failed", "OK", {
              duration: 2000
          });
      }
  });
}
}

   

