import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpClientModule,provideHttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map ,catchError} from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://flixmovies-1ddcfb2fa4c5.herokuapp.com/';


/**
 * Service for handling API calls related to the movie application.
 * Provides methods for user registration, login, fetching movies,
 * and interacting with user profiles and favorites.
 */
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
 /**
   * Constructs the service and injects the HttpClient to make HTTP requests.
   * 
   * @param {HttpClient} http - The HttpClient used to make HTTP requests.
   */
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
 /**
   * Registers a new user.
   * 
   * Sends the user's details to the backend for registration.
   * 
   * @param {any} userDetails - The user details to register.
   * @returns {Observable<any>} - The response from the backend.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // User login endpoint
  /**
   * Logs in a user.
   * 
   * Sends the user's login credentials to the backend.
   * 
   * @param {any} userDetails - The login credentials.
   * @returns {Observable<any>} - The response from the backend with user data and token.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies endpoint
  /**
   * Retrieves a list of all movies.
   * 
   * Fetches the movies from the backend with an authorization token.
   * 
   * @returns {Observable<any>} - The list of movies.
   */
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
  /**
   * Retrieves a single movie by its title.
   * 
   * @param {string} title - The title of the movie.
   * @returns {Observable<any>} - The movie details.
   */
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
  /**
   * Retrieves movies by a specific director.
   * 
   * @param {string} name - The name of the director.
   * @returns {Observable<any>} - The list of movies directed by the specified director.
   */
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
  /**
   * Retrieves movies by a specific genre.
   * 
   * @param {string} name - The name of the genre.
   * @returns {Observable<any>} - The list of movies in the specified genre.
   */
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
/**
   * Retrieves the logged-in user's profile data.
   * 
   * @returns {Observable<any>} - The user's profile data.
   */
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
/**
   * Retrieves a user's favorite movies.
   * 
   * @param {string} userId - The user's ID.
   * @returns {Observable<any>} - The list of the user's favorite movies.
   */
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
  /**
   * Adds a movie to the user's favorite list.
   * 
   * @param {string} movieId - The ID of the movie to add to favorites.
   * @returns {Observable<any>} - The response from the backend.
   */
  public addUserFavoriteMovie(movieId: string) {
    const token = localStorage.getItem('token');
    const username = JSON.parse(localStorage.getItem('currentUser')||'{}');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, {
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
  /**
   * Removes a movie from the user's favorite list.
   * 
   * @param {string} movieId - The ID of the movie to remove from favorites.
   * @returns {Observable<any>} - The response from the backend.
   */
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
  /**
   * Edits the user's profile.
   * 
   * @param {any} userDetails - The new user details to update the profile.
   * @returns {Observable<any>} - The response from the backend.
   */
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
  /**
   * Deletes the user's account.
   * 
   * @param {any} userDetails - The user details to identify the account to delete.
   * @returns {Observable<any>} - The response from the backend.
   */
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
/**
   * Helper method to extract response data from the API response.
   * 
   * @param {any} res - The HTTP response.
   * @returns {any} - The response data or an empty object if not available.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  /**
   * Handles HTTP error responses.
   * 
   * Logs the error details and returns a generic error message.
   * 
   * @param {HttpErrorResponse} error - The error response from the HTTP request.
   * @returns {any} - An observable error message.
   */
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