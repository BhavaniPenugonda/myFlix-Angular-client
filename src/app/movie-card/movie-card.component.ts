import { Component,OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';  // Import dialog component
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';  // Import dialog component
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';  // Import dialog component


@Component({
  selector: 'app-movie-card',
  standalone:true,
  imports: [MatButtonModule,MatCardModule,FormsModule,MatInputModule,MatDialogModule,MatIconModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, private snackBar: MatSnackBar) { }
  

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // Open genre dialog
  openGenreDialog(genre: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genre: genre }
    });
  }

  // Open director dialog
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director: director }
    });
  }

  // Open movie details dialog
  openMovieDetailsDialog(title: string): void {
    const movie = this.movies.find(m => m.Title === title);
    if (movie) {
      this.dialog.open(MovieDetailsDialogComponent, {
        data: { movie: movie }
      });
    }
  }

  // Add movie to favorites
  addToFavorites(movieId: string): void {
    this.fetchApiData.addUserFavoriteMovie(movieId).subscribe((response) => {
      this.snackBar.open('Movie added to favorites!', 'OK', { duration: 3000 });
    });
  }
}
