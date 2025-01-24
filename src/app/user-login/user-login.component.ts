
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



@Component({
    selector: 'app-user-login',
    standalone:true,
    imports: [MatButtonModule,MatCardModule,FormsModule,MatFormFieldModule,MatInputModule,MatDialogModule],
    templateUrl: './user-login.component.html',
    styleUrl: './user-login.component.scss'
})
export class UserLoginFormComponent implements OnInit {
    @Input() userData = { username: "", password: "" };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar) { }
    
    ngOnInit(): void {}

    logInUser() : void {
        this.fetchApiData.userLogin(this.userData).subscribe({
            next: (result) => {
                this.dialogRef.close();
                this.snackBar.open("Login success",  "OK", {
                    duration: 2000
                });
            },
            error: (err) => {
                this.snackBar.open("Login fail", "OK", {
                    duration: 2000
                });
            }
        });
    }
}