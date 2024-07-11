//src/app/genre-info/genre-info.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/** 
 * Component representing a dialog box displaying info about a genre
*/
@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss']
})

export class GenreInfoComponent implements OnInit {

  /**
   * Called when creating an instance of the class
   * @param data pulled from the genre object 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string
    }
  ) { }

  ngOnInit(): void {
  }

}
