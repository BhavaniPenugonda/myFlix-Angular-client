import { Component,OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';  // Import dialog component
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';  // Import dialog component
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';  // Import dialog component
/** 
* Component for displaying movie cards.
 * Allows users to view movie details, open dialogs for genre and director,
 * and add movies to their favorite list.
 */
@Component({
  selector: 'app-movie-card',
  standalone:true,
  imports: [MatButtonModule,MatCardModule,FormsModule,MatInputModule,MatDialogModule,MatIconModule,CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  /**
  * Constructor to inject the FetchApiDataService, MatDialog, and MatSnackBar.
  * 
  * @param {FetchApiDataService} fetchApiData - Service to fetch movie data and handle API requests.
  * @param {MatDialog} dialog - Dialog service to open dialogs.
  * @param {MatSnackBar} snackBar - SnackBar service to show user feedback.
  */
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, private snackBar: MatSnackBar) { }
  /**
   * Lifecycle hook that is called after the component has been initialized.
   * Fetches the list of movies when the component is initialized.
   */

ngOnInit(): void {
  this.getMovies();
}
/**
   * Fetches the list of all movies from the API and stores them in the movies array.
   * 
   * @returns {void}
   */
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // Open genre dialog
  /**
   * Opens a dialog to display information about the selected genre.
   * 
   * @param {string} genre - The genre of the movie.
   * @returns {void}
   */
  openGenreDialog(genre: any): void {
    
    this.dialog.open(GenreDialogComponent, {
      data: { genre: genre }
    });
  }

  // Open director dialog
  /**
   * Opens a dialog to display information about the selected director.
   * 
   * @param {any} director - The director of the movie.
   * @returns {void}
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director: director }
    });
  }

  // Open movie details dialog
  /**
   * Opens a dialog to show detailed information about the selected movie.
   * 
   * @param {string} title - The title of the movie.
   * @returns {void}
   */
  openMovieDetailsDialog(title: string): void {
    const movie = this.movies.find(m => m.Title === title);
    if (movie) {
      this.dialog.open(MovieDetailsDialogComponent, {
        data: { movie: movie }
      });
    }
  }

  // Add movie to favorites
  /**
   * Adds the selected movie to the user's favorites list.
   * 
   * @param {string} movieId - The ID of the movie to add to favorites.
   * @returns {void}
   */
  addToFavorites(movieId: string): void {
    this.fetchApiData.addUserFavoriteMovie(movieId).subscribe((response) => {
      this.snackBar.open('Movie added to favorites!', 'OK', { duration: 3000 });
    });
  }
}
