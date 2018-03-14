import { Component, OnInit } from '@angular/core';
import { TravelsService } from '../travels.service';
import { TravelListItem } from '../models/travellistitem';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit {
  travels: TravelListItem[];
  error: string;
  constructor(private travelsService : TravelsService) { }

  ngOnInit() {
    this.getTravels();
  }

  public getTravels() {
    this.travelsService.getTravels().subscribe(
      travels => {this.travels = travels}
      , error => {this.handleError(error)}
    );
  }

  handleError(error:string) :void {
    console.log(error);
    this.error = error;
  }
}
