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



@Component({
  selector: 'app-user-registration-form',
  standalone:true,
  imports: [MatButtonModule,MatCardModule,FormsModule,MatFormFieldModule,MatInputModule,MatDialogModule],
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements
  OnInit {

    @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }
  
  ngOnInit(): void {}
  
  // This is the function responsible for sending the form inputs to the backend
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

   

