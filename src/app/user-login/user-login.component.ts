
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';

import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

/**
 * The UserLoginFormComponent is used to handle user login functionality.
 * It allows users to enter their username and password, authenticate them,
 * and navigate to the movies page upon successful login.
 */

@Component({
    selector: 'app-user-login',
    standalone:true,
    imports: [MatButtonModule,MatCardModule,FormsModule,MatFormFieldModule,MatInputModule,MatDialogModule,HttpClientModule],
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss'],
    
})
export class UserLoginFormComponent implements OnInit {
    /**
     * The user data input object that holds the values from the login form.
     * 
     * @example { Username: "", Password: "" }
     */
    @Input() userData = { Username: "", Password: "" };
/**
     * Creates an instance of UserLoginFormComponent.
     * @param fetchApiData The service responsible for making API calls related to user login.
     * @param dialogRef The reference to the MatDialog for closing the dialog after login.
     * @param snackBar The MatSnackBar service used to display notifications to the user.
     * @param router The Router service used to navigate to different routes in the application.
     */
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router) { }
    
      /**
     * Lifecycle hook that is called when the component is initialized.
     * It can be used for any setup or initializations (currently empty).
     */  
    ngOnInit(): void {}
/**
     * Logs in the user by sending the login credentials (username and password) 
     * to the backend for authentication. On success, it stores the user details 
     * and JWT token in `localStorage`, closes the dialog, shows a success notification, 
     * and navigates to the movies page.
     * On failure, it shows an error notification to the user.
     */
    logInUser() : void {
        this.fetchApiData.userLogin(this.userData).subscribe({
            next: (result) => {
                // Store the current user and token in localStorage
               localStorage.setItem('currentUser', JSON.stringify(result.user.Username)); // Store user details
               localStorage.setItem('token', result.token); // Store JWT token
               this.dialogRef.close();
               this.snackBar.open("Login success",  "OK", {duration: 2000 });
               this.router.navigate(['movies']);
                

            },
            
            error: (err) => {
                this.snackBar.open("Login fail", "OK", {duration: 2000 });
            }
        });
    }
}