
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';


@Component({
    selector: 'app-user-login-form',
    standalone:true,
    imports: [MatButtonModule,MatCardModule,FormsModule,MatFormFieldModule,MatInputModule],
    templateUrl: './user-login-form.component.html',
    styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
    @Input() userData = { username: "", password: "" };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar) { }
    
    ngOnInit(): void {}

    logInUser() : void {
        this.fetchApiData.userLogin(this.userData).subscribe(res => {
            this.dialogRef.close();
            this.snackBar.open("Login success",  "OK", {
                duration: 2000
            });
            
        }, res => {
            this.snackBar.open("Login fail", "OK", {
                duration: 2000
            })
        })
    }
}