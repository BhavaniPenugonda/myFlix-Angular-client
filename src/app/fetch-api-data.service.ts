import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map ,catchError} from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://bhavani-flixmovies.netlify.app/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/user', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // User login endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get one movie
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get director
  public getDirector(name: string) {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre
  public getGenre(name: string) {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
// Get user
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/userName', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Get Favourite movie of a user
  getFavouriteMovies(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + userId + '/favourites', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // Add a movie to favourite Movies
  public addUserFavoriteMovie(movieId: string) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.put(apiUrl + 'users/' + username + '/favorites/' + movieId, {}, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete a movie from favourite Movies
  public deleteUserFavoriteMovie(movieId: string) {
    const token = localStorage.getItem('token');
  
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + 'users/' + username + '/favorites/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Edit user
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    

    const username = localStorage.getItem('username');
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete user
  public deleteUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return new Error(
    'Something bad happened; please try again later.');
  }
}