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
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,FormsModule,MatFormFieldModule,MatInputModule,MatDialogModule,CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};  // To hold the user data
  userData: any = {}; // To store the original user data
  favouriteMovies: any[] = []; // To store the user's favourite movies

  // Bind form fields
  userDetails = {
    Username: '',
    Email: '',
    Birthday: ''
  };

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();  // Fetch the user profile when the component is initialized
  }

  // Fetch the user's profile data from the backend
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
  cancelEdit(): void {
    this.userDetails = { ...this.userData };
  }

  // Optionally, navigate to another page (e.g., "movies") if needed
  goToMovies(): void {
    this.router.navigate(['/movies']);
  }
}

