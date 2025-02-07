

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';





/**
 * The root component for the Angular application.
 * This component serves as the entry point for the app.
 * It includes the routing module and initializes routing functionality.
 */



@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * The title of the app. It can be displayed in the header or used dynamically in the template.
   * @type {string}
   */
  title = 'myFlix-Angular-client';

 
  }


