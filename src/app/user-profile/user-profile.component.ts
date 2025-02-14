import { Component, OnInit,PLATFORM_ID,Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';

import { MatDialogModule } from '@angular/material/dialog';

import { CommonModule, isPlatformBrowser} from '@angular/common';

/**
 * UserProfileComponent allows users to view and edit their profile information,
 * including username, email, and birthday. It also enables users to manage their 
 * favourite movies.
 */
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,FormsModule,MatFormFieldModule,MatInputModule,MatDialogModule,CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  favouriteMovies: any[] = []; // To store the user's favourite movies

  // Bind form fields
  /**
   * Form fields for updating user profile information.
   * These fields are bound to the form inputs in the component's template.
   */
  userDetails: any = { };
/**
   * Creates an instance of UserProfileComponent.
   * @param fetchApiData The service used to fetch and edit user data.
   * @param snackBar The service used to show notification messages.
   * @param router The Angular Router service to navigate between views.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}
/**
   * Lifecycle hook called when the component is initialized. 
   * It fetches the user's profile data when the component loads.
   */
  ngOnInit(): void {
    this.getUserProfile();  // Fetch the user profile when the component is initialized
    this.getUserFavouriteMovies();
  }

  // Fetch the user's profile data from the backend
  /**
   * Fetches the user's profile data from the backend.
   * This function updates the `user`, `userData`, and `userDetails` properties
   * with the fetched data.
   */
  getUserProfile(): void {
    let username: string | null = null;
    if (isPlatformBrowser(this.platformId)) {
      username = JSON.parse(localStorage.getItem('currentUser') || '{}'); // Get username from localStorage
    }
    if (username) {
    this.fetchApiData.getUser().subscribe({
      next: (data) => {
        this.userDetails = data;
      },
      error: (err) => {
        this.snackBar.open('Error fetching user details', 'OK', { duration: 2000 });
      },
    }); 
  }
}

  // Save the edited profile to the backend
  /**
   * Saves the edited profile information to the backend.
   * This function sends the updated user data and updates the profile upon success.
   * Displays success or error messages accordingly.
   */
  editUserProfile(): void {
    this.fetchApiData.editUser(this.userDetails).subscribe({
      next: (data) => {
        this.snackBar.open('Profile updated successfully', 'OK', { duration: 2000 });
        this.getUserProfile();  // Refresh the user details after updating
      },
      error: (err) => {
        this.snackBar.open('Error updating profile', 'OK', { duration: 2000 });
      },
    });
  }

  // Fetch the user's favourite movies from the backend
  /**
   * Fetches the user's favourite movies from the backend.
   * Displays a message if the user is not logged in.
   */
  getUserFavouriteMovies(): void {
    let userId: string | null = null;
    if (isPlatformBrowser(this.platformId)) {
      userId = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
    if (userId) {
      this.fetchApiData.getFavouriteMovies(userId).subscribe({
        next: (favMovies) => {
        this.fetchApiData.getAllMovies().subscribe(
        (movies: any[]) => {
        this.favouriteMovies = movies.filter((movie) =>
        favMovies.includes(movie._id)
        );
        console.log('Filtered favoriteMovies:', this.favouriteMovies); // log favorites
        }
        )
        },
        error: (err) => {
        this.snackBar.open('Error fetching favorite movies', 'OK', { duration: 2000 });
        },
        });
        }
  }
  

  // Remove movie from favourite list
  /**
   * Removes a movie from the user's favourite list.
   * @param movieId The ID of the movie to be removed from favourites.
   */
  removeFromFavourites(movieId: string): void {
    this.fetchApiData.deleteUserFavoriteMovie(movieId).subscribe({
      next: (response) => {
        this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
        this.getUserFavouriteMovies();  // Refresh the favorite movies after removing one
      },
      error: (err) => {
        this.snackBar.open('Error removing movie from favorites', 'OK', { duration: 2000 });
      },
    });
  }

  // Cancel editing and reset to original profile
  /**
   * Cancels the editing process and restores the original user data.
   */
  cancelEdit(): void {
    this.userDetails = { ...this.userDetails };
  }

  
  /**
   * Navigates the user to the movies page.
   */
  goToMovies(): void {
    this.router.navigate(['/movies']);
  }
}

