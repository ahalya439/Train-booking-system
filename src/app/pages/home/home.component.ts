import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IStation, ResponseModel } from '../../models/Stations';
import { StationsService } from '../../services/stations.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stationList: IStation[] = [];
  travelObj: any = {
    fromStationId:'',
    toStationId:'',
    dateOfTravel:''
  } 

  constructor(private stationSrv:StationsService, private router: Router) {}

  

  onSearch(ticketForm: NgForm) {
    if (this.isFormValid(ticketForm) && this.travelObj.fromStationId !== this.travelObj.toStationId) {
      this.router.navigate(['/search', this.travelObj.fromStationId, this.travelObj.toStationId, this.travelObj.dateOfTravel]);
    }
  }

  isFormValid(ticketForm: NgForm): boolean {
    if (!ticketForm.valid) return false;

    const selectedDate = new Date(this.travelObj.dateOfTravel);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      ticketForm.controls['dateOfTravel'].setErrors({ 'pastDate': true });
      return false;
    }

    if (this.travelObj.fromStationId === this.travelObj.toStationId) {
      ticketForm.controls['toStationId'].setErrors({ 'sameStation': true });
      return false;
    }

    return true;
  }

  ngOnInit(): void {
    this.loadStations();
  }
  loadStations() {
    this.stationSrv.getAllStations().subscribe((res:ResponseModel)=>{
      this.stationList = res.data;
    }, (error: any)=>{
      alert("Error Occoured" + JSON.stringify(error))
    })
  }

 

}
