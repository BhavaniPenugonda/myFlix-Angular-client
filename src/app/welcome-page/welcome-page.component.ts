import { Component,OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login/user-login.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-welcome-page',
  standalone:true,
  imports: [MatDialogModule,HttpClientModule],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }
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
