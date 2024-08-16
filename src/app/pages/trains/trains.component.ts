import { Component } from '@angular/core';
import { TrainsService } from '../../services/trains.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.scss']
})
export class TrainsComponent {


  constructor(private trainSrv: TrainsService,private http: HttpClient){
      
  }
 
  trainList: any[] = [];
  trainObj: any = { 



    
      "trainId": 0,
      "trainNo": 0,
      "trainName": "string",
      "departureStationId": 0,
      "arrivalStationId": 0,
      "departureTime": "string",
      "arrivalTime": "string",
      "totalSeats": 0,
      "departureDate": "2024-02-08T07:16:18.577Z"

  } 
  // };
  // showModal: boolean = false;

  ngOnInit(): void {
    this.getAllTrains();
  }

  getAllTrains() {
    this.trainSrv.getAllTrains().subscribe((res:any)=>{
      this.trainList =  res.data;
    })
  }

 

  // openModal() {
  //   this.showModal = true;
  // }

  // closeModal() {
  //   this.showModal = false;
  // }

  // saveTrain() {
  //   this.http.post("https://freeapi.gerasim.in/api/TrainApp/AddNewTrain", this.trainObj).subscribe((res: any) => {
  //     if (res.result) {
  //       alert(res.message);
  //       this.getAllTrains();
  //       this.trainObj = {}; // Clear the train object after saving
  //       this.closeModal();
  //     } else {
  //       alert(res.message);
  //     }
  //   });
  }

  


