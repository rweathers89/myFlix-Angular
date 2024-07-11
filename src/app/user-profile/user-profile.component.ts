//src/app/user-profile/user-profile.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing the user profile page
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  //userData: any = {};
  //favoriteMovies: any[] = [];

  // Input for user data.
  @Input() userData: any = { userName: '', password: '', email: '', birthday: '', favoriteMovies: [] };
  //User object.
  user: any = {};
  // List of all movies.
  movies: any[] = [];
  // List of favorite movies.
  favoriteMovies: any[] = [];

  /** 
  * Called when creating an instance of the class
  * @param fetchApiData - connects the client to the API
  * @param router - the Router module for navigation
  * @param snackBar - provides feedback after user interaction by displaying notifications
  */

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {
    // this.userData = JSON.parse(localStorage.getItem("user") || "");
  }

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

  getUser(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Password = this.user.Password;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe((result) => {
      this.favoriteMovies = result.filter((movie: any) => this.user.favoriteMovies.includes(movie._id));
    });
  }


  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      console.log('Profile Update', result);
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('Profile updated successfully', 'OK', {
        duration: 2000
      });
    });
  }

  getFavoriteMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.favoriteMovies = this.user.favoriteMovies;
    this.favoriteMovies = this.user.FavoriteMovies;
    console.log(`Here is this users ${this.favoriteMovies}`);
  }

  removeFromFavorite(movie: any): void {
    if (confirm('Are you sure you want to remove this movie from your favorites?')) {
      this.fetchApiData.deleteFavoriteMovies(movie).subscribe((result) => {
        console.log('Deleted favorite movie', result);
        localStorage.clear();
        this.router.navigate(['user profile'])
      })
    }
  }

  /**
    this.user = this.fetchApiData.getUser();
    this.userData.favoriteMovies = this.user.favoriteMovies;

    
    this.fetchApiData.deleteFavoriteMovies(this.userData.id, movie.title).subscribe((res: any) => {
      this.userData.favoriteMovies = res.favoriteMovies;
      this.getFavoriteMovies();
    }, (err: any) => {
      console.error(err)
    })
  }
*/
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log('Deleted User', result);
        localStorage.clear();
        this.router.navigate(['welcome']);
      });
    }

  }
}
