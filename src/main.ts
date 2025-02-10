import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

const appConfig = {
  providers: [
    provideRouter(routes), // Provide the router with routes
    provideHttpClient(),
    provideAnimations(),
    
  ],
};


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
