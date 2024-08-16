import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking, ISearchTrain, IStation, ResponseModel, TrainAppBookingPassengers } from '../../models/Stations';
import { StationsService } from '../../services/stations.service';
import { TrainsService } from '../../services/trains.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchObj: any = {
    fromStationId: '',
    toStationId: '',
    dateOfTravel: ''
  }
  searchForm!: FormGroup;
  stationList: IStation[] = [];
  trainsList: ISearchTrain[] = [];

  bokingObj: Booking = new Booking();
  bookingPassengers: TrainAppBookingPassengers = new TrainAppBookingPassengers();

  loggedUserData: any;
  constructor(
    private formBuilder: FormBuilder,
    private activactedRoute: ActivatedRoute,
    private stationSrv: StationsService,
    private trainSrv: TrainsService
  ) {
    this.activactedRoute.params.subscribe((paramObj: any) => {
      debugger;
      this.searchObj.fromStationId = paramObj.fromStationId;
      this.searchObj.toStationId = paramObj.toStationId;
      this.searchObj.dateOfTravel = paramObj.dateOfTravel;
      this.bokingObj.travelDate = this.searchObj.dateOfTravel;
      this.getAllTrains();
    });
    // Check if localStorage is available before accessing it
    if (typeof localStorage !== 'undefined') {
      const localData = localStorage.getItem('trainUser');
      if (localData != null) {
          this.loggedUserData = JSON.parse(localData);
          this.bokingObj.passengerId = this.loggedUserData.passengerID;
      }
  }
  }

  ngOnInit(): void {
    this.loadStations();
    this.initializeForm();
  }

  initializeForm(): void {
    this.searchForm = this.formBuilder.group({
      fromStationId: ['', Validators.required],
      toStationId: ['', Validators.required],
      dateOfTravel: ['', Validators.required]
    });
  }
  get formControls() {
    return this.searchForm.controls;
  }
  AddPassenger() {
    const data = JSON.stringify(this.bookingPassengers);
    const paserData = JSON.parse(data)

    this.bokingObj.TrainAppBookingPassengers.push(paserData);
  }
  onRemove(index: number) {
    this.bokingObj.TrainAppBookingPassengers.splice(index, 1)
  }

  openBooking(trainId: number) {
    this.bokingObj.trainId = trainId;
    const model = document.getElementById('bookmodel');
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeBooking() {
    const model = document.getElementById('bookmodel');
    if (model != null) {
      model.style.display = 'none';
      // Clear passenger information fields
      this.bookingPassengers.passengerName = '';
      this.bookingPassengers.age = 0;
      this.bokingObj = new Booking(); 
    }
  }
  // private refreshAndClearData() {
  //   // Reload current URL to refresh the page
  //   window.location.reload();

    
  // }

  loadStations() {
    this.stationSrv.getAllStations()?.subscribe((res: ResponseModel) => {
      this.stationList = res.data;
    }, (error: any) => {
      alert("Error Occoured" + JSON.stringify(error))
    })
  }

  getAllTrains(): void {
    // if (this.searchForm.valid) {
      this.trainSrv.getTrainsBetweenStations(this.searchObj).subscribe(
        (result: ResponseModel) => {
          this.trainsList = result.data;
        },
        (error: any) => {
          alert("Error Occurred: " + JSON.stringify(error));
        })}
    //   ),else {
    //   alert("Please fill in all the required fields correctly.");
    // }
  
  
  BookTicket() {
     
    this.bokingObj.bookingDate = new Date();
    this.bokingObj.totalSeats = this.bokingObj.TrainAppBookingPassengers.length;

    this.trainSrv.bookTrain(this.bokingObj).subscribe((result: ResponseModel) => {
      if (result.result) {
        alert('Booking Done Success')
        this. closeBooking();
       
      } else {
        alert(result.message)
      }
    }, (error: any) => {
      console.error('An error occurred while booking:', error);
      alert('An error occurred while booking. Please try again later.');
    })
  }

  
  

  /// Clear passengers array or any other relevant data
  };






//   searchObj: any = {
//     fromStationId: '',
//     toStationId: '',
//     dateOfTravel: ''
//   }
//   stationList: IStation[] = [];
//   trainsList: ISearchTrain[] = [];

//   bokingObj: Booking = new Booking();
//   bookingPassengers: TrainAppBookingPassengers = new TrainAppBookingPassengers();

//   loggedUserData: any;
//   constructor(private activactedRoute: ActivatedRoute, private stationSrv: StationsService, private trainSrv: TrainsService) {
//     this.activactedRoute.params.subscribe((paramObj: any) => {
//       debugger;
//       this.searchObj.fromStationId = paramObj.fromStationId;
//       this.searchObj.toStationId = paramObj.toStationId;
//       this.searchObj.dateOfTravel = paramObj.dateOfTravel;
//       this.bokingObj.travelDate = this.searchObj.dateOfTravel
//       this.getAllTrains();
//     })
//       if (typeof localStorage !== 'undefined') {
     
//       const localData = localStorage.getItem('trainUser');

//       if (localData != null) {
//           this.loggedUserData = JSON.parse(localData);
//           this.bokingObj.passengerId = this.loggedUserData.passengerID;
//           console.log('localStorage is not available in this environment.');
//       }
//   } 
//   }
//   ngOnInit(): void {
//     this.loadStations();
//   }
//   AddPassenger() {
//     const data = JSON.stringify(this.bookingPassengers);
//     const paserData = JSON.parse(data)

//     this.bokingObj.TrainAppBookingPassengers.push(paserData);
//   }
//   onRemove(index: number) {
//     this.bokingObj.TrainAppBookingPassengers.splice(index, 1)
//   }

//   openBooking(trainId: number) {
//     this.bokingObj.trainId = trainId;
//     const model = document.getElementById('bookmodel');
//     if (model != null) {
//       model.style.display = 'block'
//     }
//   }

//   closeBooking() {
//     const model = document.getElementById('bookmodel');
//     if (model != null) {
//       model.style.display = 'none'
//     }
//   }
//   loadStations() {
//     this.stationSrv.getAllStations().subscribe((res: ResponseModel) => {
//       this.stationList = res.data;
//     }, (error: any) => {
//       alert("Error Occoured" + JSON.stringify(error))
//     })
//   }

//   getAllTrains() {
//     this.trainSrv.getTrainsBetweenStations(this.searchObj).subscribe((result: ResponseModel) => {
//       this.trainsList = result.data;
//     }, (error: any) => {
//       alert("Error Occoured" + JSON.stringify(error))
//     })
//   }
//   BookTicket() {
//     this.bokingObj.bookingDate = new Date();
//     this.bokingObj.totalSeats = this.bokingObj.TrainAppBookingPassengers.length;

//     this.trainSrv.bookTrain(this.bokingObj).subscribe((result: ResponseModel) => {
//       if (result.result) {
//         alert('Booking Done Success')
//         // this.bookingPassengers = new TrainAppBookingPassengers();
//         // this.bokingObj.TrainAppBookingPassengers = [];
//         // this.reset(); // Assuming `ticketForm` is the form group object
//         this.closeBooking();
//       } else {
//         alert(result.message)
//       }
//     }, (error: any) => {
//       alert("Error Occoured" + JSON.stringify(error))
//     })
//   }
// }








// searchObj: any = {
//   fromStationId: '',
//   toStationId: '',
//   dateOfTravel: ''
// }
// stationList: IStation[] = [];
// trainsList: ISearchTrain[] = [];

// bokingObj: Booking = new Booking();
// bookingPassengers: TrainAppBookingPassengers = new TrainAppBookingPassengers();

// loggedUserData: any;
// constructor(private activactedRoute: ActivatedRoute, private stationSrv: StationsService, private trainSrv: TrainsService) {
//   this.activactedRoute.params.subscribe((paramObj: any) => {
//     debugger;
//     this.searchObj.fromStationId = paramObj.fromStationId;
//     this.searchObj.toStationId = paramObj.toStationId;
//     this.searchObj.dateOfTravel = paramObj.dateOfTravel;
//     this.bokingObj.travelDate = this.searchObj.dateOfTravel
//     this.getAllTrains();
//   })
//   const localData = localStorage.getItem('trainUser');
//   if (localData != null) {
//     this.loggedUserData = JSON.parse(localData);
//     this.bokingObj.passengerId = this.loggedUserData.passengerID;

//   }
// }
// ngOnInit(): void {
//   this.loadStations();
// }
// AddPassenger() {
//   const data = JSON.stringify(this.bookingPassengers);
//   const paserData = JSON.parse(data)

//   this.bokingObj.TrainAppBookingPassengers.push(paserData);
// }
// onRemove(index: number) {
//   this.bokingObj.TrainAppBookingPassengers.splice(index, 1)
// }

// openBooking(trainId: number) {
//   this.bokingObj.trainId = trainId;
//   const model = document.getElementById('bookmodel');
//   if (model != null) {
//     model.style.display = 'block'
//   }
// }

// closeBooking() {
//   const model = document.getElementById('bookmodel');
//   if (model != null) {
//     model.style.display = 'none'
//   }
// }
// loadStations() {
//   this.stationSrv.getAllStations().subscribe((res: ResponseModel) => {
//     this.stationList = res.data;
//   }, error => {
//     alert("Error Occoured" + JSON.stringify(error))
//   })
// }

// getAllTrains() {
//   this.trainSrv.getTrainsBetweenStations(this.searchObj).subscribe((result: ResponseModel) => {
//     this.trainsList = result.data;
//   }, error => {
//     alert("Error Occoured" + JSON.stringify(error))
//   })
// }
// BookTicket() {
//   this.bokingObj.bookingDate = new Date();
//   this.bokingObj.totalSeats = this.bokingObj.TrainAppBookingPassengers.length;

//   this.trainSrv.bookTrain(this.bokingObj).subscribe((result: ResponseModel) => {
//     if (result.result) {
//       alert('Booking Done Success')
//     } else {
//       alert(result.message)
//     }
//   }, error => {
//     alert("Error Occoured" + JSON.stringify(error))
//   })
// }
// }