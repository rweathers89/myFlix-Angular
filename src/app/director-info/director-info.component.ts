//src/app/director-info/director-info.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Represents the Director Info Component.
 * This component is responsible for displaying information about a director,
 * including their details and associated movies.
 * @param {any} data - Data passed to the component, containing director data.
 */
@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss']
})
export class DirectorInfoComponent implements OnInit {
  director: any;
  movie: any;

  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Name: string;
      Bio: string;
      birthYear: string
    }
  ) { }

  //Angular lifecycle hook called after component initialization
  ngOnInit(): void { }

}

