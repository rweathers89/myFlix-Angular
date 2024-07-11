// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import to bring in the API call created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
  };

  /**
   * Initializes the UserLoginFormComponent.
   * @param {UserLoginService} fetchApiData - Service for user login.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the dialog.
   * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service.
   * @param {Router} router - Angular's Router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  //Angular lifecycle hook called after component initialization. 
  ngOnInit(): void { }

  //Logs in the user.
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      //Logic for a successful user login
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // Will close modal on success
      this.snackBar.open('User login successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies'])
    }, (result) => {
      console.log(result);
      this.snackBar.open('User login failed', 'OK', {
        duration: 2000
      });
    }
    );
  }
}