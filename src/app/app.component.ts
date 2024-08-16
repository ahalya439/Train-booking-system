import { Component, OnInit  } from '@angular/core'; 
import { IPassenger } from './models/Stations';
import { TrainsService } from './services/trains.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  registerObj: IPassenger = new IPassenger();
 loginObj = {
    phone: '',
    password: ''
  };
  registerForm!: FormGroup;
  loggedUserData: any;
  constructor(private formBuilder: FormBuilder,private trainSrv: TrainsService) {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      const localData = localStorage.getItem('trainUser');
      if (localData != null) {
        this.loggedUserData = JSON.parse(localData);
      }
    }
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get formControls() { return this.registerForm.controls; }


  logoff() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('trainUser');
      this.loggedUserData = undefined;
    }}
  openRegister() {
    const model = document.getElementById('registerModel');
    if(model != null) {
      model.style.display ='block'
    }
  }
  
  closeRegister() {
    const model = document.getElementById('registerModel');
    if(model != null) {
      model.style.display ='none'
    }
  }

  openLogin() {
    const model = document.getElementById('loginModel');
    if(model != null) {
      model.style.display ='block'
    }
  }
  
  closeLogin() {
    const model = document.getElementById('loginModel');
    if(model != null) {
      model.style.display ='none'
    }
  }
  onRegister() {
    
    this.trainSrv.createPassenger(this.registerObj).subscribe((res: any)=>{
      if(res.result) {
        alert("Registration Success");
        localStorage.setItem('trainUser', JSON.stringify(res.data));
        this.loggedUserData =  res.data;
        this.closeRegister();
      } else {
        alert(res.message)
      }
    })
  
  }
  onLogin() {
    this.trainSrv.login(this.registerObj).subscribe((res: any)=>{
      if(res.result) {
        alert("Login Success");
        localStorage.setItem('trainUser', JSON.stringify(res.data));
        this.loggedUserData =  res.data;
        this.closeLogin();
      } else {
        alert(res.message)
      }
    })
  }
}
