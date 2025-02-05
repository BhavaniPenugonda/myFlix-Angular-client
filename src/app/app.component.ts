

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';









@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

 
  }


