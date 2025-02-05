
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



@Component({
    selector: 'app-user-login',
    standalone:true,
    imports: [MatButtonModule,MatCardModule,FormsModule,MatFormFieldModule,MatInputModule,MatDialogModule,HttpClientModule],
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginFormComponent implements OnInit {
    @Input() userData = { Username: "", Password: "" };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router) { }
    
    ngOnInit(): void {}

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