import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

const appConfig = {
  providers: [
    provideRouter(routes), // Provide the router with routes
    
  ],
};


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
