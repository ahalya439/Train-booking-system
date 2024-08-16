// export interface IStation {
//     stationID: number;
//     stationName: string;
//     stationCode: string;
// }

// export interface ResponseModel { 
//     message: string,
//     result: boolean,
//     data: any;
// }

// export interface ISearchTrain {
//     trainId: number;
//     trainNo: number;
//     trainName: string;
//     departureStationName: string;
//     arrivalStationName: string;
//     arrivalTime: string;
//     departureTime: string;
//     totalSeats: number;
//     departureDate: string;
//     bookedSeats: number;
//   }

//   export class IPassenger  {
//     passengerID: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     password: string;

//     constructor() {
//         this.passengerID = 0;
//         this.firstName = '';
//         this.lastName = '';
//         this.email = '';
//         this.phone ='';
//         this.password ='';
//     }
//   }

//   export class Booking  {
//     bookingId: number;
//     trainId: number;
//     passengerId: number;
//     travelDate: string;
//     bookingDate: Date;
//     totalSeats: number;
//     TrainAppBookingPassengers: TrainAppBookingPassengers[];
//     constructor() {
//         this.TrainAppBookingPassengers = [];
//         this.bookingDate= new Date();
//         this.bookingId= 0;
//         this.passengerId= 5;
//         this.totalSeats =0;
//         this.trainId= 0;
//         this.travelDate = ''; 
//     } 
//   }

//   export class TrainAppBookingPassengers {
//     bookingPassengerId: number;
//     bookingId: number;
//     passengerName: string;
//     seatNo: number;
//     age: number;
//     constructor() { 
//         this.bookingPassengerId= 0;
//         this.bookingId= 0;
//         this.passengerName= '';
//         this.seatNo =0;
//         this.age= 0;  
//     }}
//   //   export class Train {
//   //     trainId: number;
//   //     trainNo: number;
//   //     trainName: string;
//   //     departureStationId: number;
//   //     arrivalStationId: number;
//   //     departureTime: string;
//   //     arrivalTime: string;
//   //     totalSeats: number;
//   //     departureDate: Date;
  
//   //     constructor() {
//   //         this.trainId = 0;
//   //         this.trainNo = 0;
//   //         this.trainName = '';
//   //         this.departureStationId = 0;
//   //         this.arrivalStationId = 0;
//   //         this.departureTime = '';
//   //         this.arrivalTime = '';
//   //         this.totalSeats = 0;
//   //         this.departureDate = new Date();
//   //     }
//   // }  
  
export interface IStation {
    stationID: number;
    stationName: string;
    stationCode: string;
  }
  
  export interface ResponseModel { 
    message: string,
    result: boolean,
    data: any;
  }
  
  export interface ISearchTrain {
    trainId: number;
    trainNo: number;
    trainName: string;
    departureStationName: string;
    arrivalStationName: string;
    arrivalTime: string;
    departureTime: string;
    totalSeats: number;
    departureDate: string;
    bookedSeats: number;
  }
  
  export class IPassenger  {
    passengerID: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  
    constructor() {
        this.passengerID = 0;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone ='';
        this.password ='';
    }
  }
  
  export class Booking  {
    bookingId: number;
    trainId: number;
    passengerId: number;
    travelDate: string;
    bookingDate: Date;
    totalSeats: number;
    TrainAppBookingPassengers: TrainAppBookingPassengers[];
    constructor() {
        this.TrainAppBookingPassengers = [];
        this.bookingDate= new Date();
        this.bookingId= 0;
        this.passengerId= 0;
        this.totalSeats =0;
        this.trainId= 0;
        this.travelDate = ''; 
    } 
  }
  
  export class TrainAppBookingPassengers {
    bookingPassengerId: number;
    bookingId: number;
    passengerName: string;
    seatNo: number;
    age: number;
    constructor() { 
        this.bookingPassengerId= 0;
        this.bookingId= 0;
        this.passengerName= '';
        this.seatNo =0;
        this.age= 0;  
    }
  }
  