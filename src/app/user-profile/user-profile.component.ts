import { Component, OnInit } from '@angular/core';
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

import { CommonModule } from '@angular/common';

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
  /**
   * Holds the user profile data returned from the backend.
   */
  user: any = {};  // To hold the user data
  /**
   * Stores the original user data for comparison during editing.
   */
  userData: any = {}; // To store the original user data
  /**
   * Holds the user's favourite movies.
   */
  favouriteMovies: any[] = []; // To store the user's favourite movies

  // Bind form fields
  /**
   * Form fields for updating user profile information.
   * These fields are bound to the form inputs in the component's template.
   */
  userDetails = {
    Username: '',
    Email: '',
    Birthday: ''
  };
/**
   * Creates an instance of UserProfileComponent.
   * @param fetchApiData The service used to fetch and edit user data.
   * @param snackBar The service used to show notification messages.
   * @param router The Angular Router service to navigate between views.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
/**
   * Lifecycle hook called when the component is initialized. 
   * It fetches the user's profile data when the component loads.
   */
  ngOnInit(): void {
    this.getUserProfile();  // Fetch the user profile when the component is initialized
  }

  // Fetch the user's profile data from the backend
  /**
   * Fetches the user's profile data from the backend.
   * This function updates the `user`, `userData`, and `userDetails` properties
   * with the fetched data.
   */
  getUserProfile(): void {
    const username = localStorage.getItem('currentUser');
    this.fetchApiData.getUser().subscribe({
      next: (result) => {
        this.user = result;
        this.userData = { ...result };
        this.userDetails = {
          Username: this.user.Username,
          Email: this.user.Email,
          Birthday: this.user.Birthday
        };
      },
      error: (err) => {
        this.snackBar.open("Failed to fetch user profile", "OK", { duration: 2000 });
      }
    });
  }

  // Save the edited profile to the backend
  /**
   * Saves the edited profile information to the backend.
   * This function sends the updated user data and updates the profile upon success.
   * Displays success or error messages accordingly.
   */
  editUserProfile(): void {
    this.fetchApiData.editUser(this.userDetails).subscribe({
      next: (result) => {
        this.snackBar.open("Profile updated successfully!", "OK", { duration: 2000 });
        this.getUserProfile();  // Refresh the profile data after successful update
      },
      error: (err) => {
        this.snackBar.open("Profile update failed", "OK", { duration: 2000 });
      }
    });
  }

  // Fetch the user's favourite movies from the backend
  /**
   * Fetches the user's favourite movies from the backend.
   * Displays a message if the user is not logged in.
   */
  getUserFavouriteMovies(): void {
    const userId = localStorage.getItem('currentUser'); // Assuming userId is stored in localStorage
    // Check if userId is null
  if (userId === null) {
    this.snackBar.open("User is not logged in", "OK", { duration: 2000 });
    return;
  }
    this.fetchApiData.getFavouriteMovies(userId).subscribe({
      next: (result) => {
        this.favouriteMovies = result;
      },
      error: (err) => {
        this.snackBar.open("Failed to fetch favourite movies", "OK", { duration: 2000 });
      }
    });
  }

  // Remove movie from favourite list
  /**
   * Removes a movie from the user's favourite list.
   * @param movieId The ID of the movie to be removed from favourites.
   */
  removeFromFavourites(movieId: string): void {
    const userId = localStorage.getItem('currentUser');
    this.fetchApiData.deleteUserFavoriteMovie(movieId).subscribe({
      next: () => {
        this.snackBar.open("Movie removed from favourites!", "OK", { duration: 2000 });
        this.getUserFavouriteMovies();  // Refresh the favourite movies list after removal
      },
      error: (err) => {
        this.snackBar.open("Failed to remove movie from favourites", "OK", { duration: 2000 });
      }
    });
  }

  // Cancel editing and reset to original profile
  /**
   * Cancels the editing process and restores the original user data.
   */
  cancelEdit(): void {
    this.userDetails = { ...this.userData };
  }

  
  /**
   * Navigates the user to the movies page.
   */
  goToMovies(): void {
    this.router.navigate(['/movies']);
  }
}

