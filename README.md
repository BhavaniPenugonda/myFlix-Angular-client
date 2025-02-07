# MyFlixAngularClient

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.1.

**Overview**
myFlix is a web application built using Angular that allows users to explore a collection of movies, view movie details, and manage a personal profile. Users can log in, register, and save their favorite movies to their profile.

This project connects to an existing server-side REST API to fetch movie data and handle user interactions such as logging in, registering, and saving favorite movies.



## Development server

To start a local development server, run:


ng serve

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

**Features**
User Registration and Login: Users can create an account and log in to access the movie details and save favorite movies.
Welcome Page: A page where users can either log in or register.
Movies List: Displays all movies after authentication.
Single Movie View: When a movie is clicked, users are taken to a detailed view of that movie.
Director and Genre Views: In the single movie view, users can click buttons to view more information about the movie's director and genre.
Favorites: Users can add or remove movies from their favorite list.


**Technical Requirements**
Angular: Version 9 or later.
Node.js: The latest version of Node.js and npm package manager.
Angular Material: Used for designing the application components.
REST API: The app communicates with a backend API that provides movie data, user data, and authentication.
Technical Documentation: The codebase contains comments using Typedoc and JSDoc for better understanding and documentation of the code.


**Prerequisites**
Before getting started, make sure you have the following installed:

Node.js (latest version)
npm (npm comes with Node.js)
Angular CLI (install globally using npm install -g @angular/cli)


**Installation**
Step 1: Clone the repository
Clone the repository to your local machine:


git clone https://github.com/bhavanipenugonda/myFlix-angular-client.git
cd myFlix-angular-client

Step 2: Install dependencies
Install the necessary dependencies using npm:



npm install
Step 3: Set up the environment
Ensure that the backend API (https://bhavani-flixmovies.netlify.app/) is running. You need this to interact with the movie data, user authentication, and other services.

Step 4: Run the application
To start the Angular development server, use:

ng serve
The app will be accessible at http://localhost:4200/welcome.


**Usage**
1. Welcome Page
The user will see a welcome page where they can either register or log in.
Users can enter their credentials (username, password) to log in.
2. Movies List
Once logged in, the user will be redirected to the movies list page, where they can see all the available movies.
3. Single Movie View
Clicking on a movie will take the user to a detailed view of that movie.
The movie view will contain the movie's details along with buttons to view more information about the director or genre.
4. Director & Genre Views
Clicking on the "Director" or "Genre" button in the movie details view will show more detailed information about the movie’s director or genre.
5. Favorites
The user can add or remove movies to/from their favorite list by clicking on the appropriate button.
6. Profile Management
Users can view and edit their profiles, such as updating their email or birthday.


**Services**
The application uses Angular services (FetchApiDataService) to interact with the API. The service contains methods like:

userRegistration(): Registers a new user.
userLogin(): Logs in a user and retrieves a token.
getAllMovies(): Fetches all movies.
getMovie(title: string): Fetches details of a specific movie.
getDirector(name: string): Fetches details of a director.
getGenre(name: string): Fetches details of a genre.
addUserFavoriteMovie(movieId: string): Adds a movie to the user's favorites.
deleteUserFavoriteMovie(movieId: string): Removes a movie from the user's favorites.


## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
