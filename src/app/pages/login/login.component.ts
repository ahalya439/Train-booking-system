import { Component, OnInit  , ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPassenger } from '../../models/Stations';
import { TrainsService } from '../../services/trains.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  @ViewChild('successModal') successModal!: ElementRef;
  @ViewChild('registerModel') registerModel!: ElementRef;

  loginForm!: FormGroup;
  registerForm!: FormGroup;
  registerObj: IPassenger = new IPassenger();

  loggedUserData: any;
  constructor(private formBuilder: FormBuilder,private trainSrv: TrainsService,private router: Router) {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      const localData = localStorage.getItem('trainUser');
      if (localData != null) {
        this.loggedUserData = JSON.parse(localData);
      }
    }
  }
 
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{4,}[0-9]*@[a-zA-Z0-9.-]+\.(org|in|com)$')]],
      phone: ['', [Validators.required, Validators.pattern("^[5-9][0-9]{9}$")]], // Update the pattern here
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


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
  openRegistersucess() {
    const model = document.getElementById('registerSuccess');
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

 
  closeLogin() {
    const model = document.getElementById('loginModel');
    if(model != null) {
      model.style.display ='none'
    }
  }



  validateFirstName() {
    return this.registerForm.get('firstName')?.invalid && (this.registerForm.get('firstName')?.dirty || this.registerForm.get('firstName')?.touched);
  }
  
  validateLastName() {  
    return this.registerForm.get('lastName')?.invalid && (this.registerForm.get('lastName')?.dirty || this.registerForm.get('lastName')?.touched);
  }     
  
  validateEmail() {
    return this.registerForm.get('email')?.invalid && (this.registerForm.get('email')?.dirty || this.registerForm.get('email')?.touched);
  }
  
  validatePhone() {
    return this.registerForm.get('phone')?.invalid && (this.registerForm.get('phone')?.dirty || this.registerForm.get('phone')?.touched);
  }
  
  validatePassword() {
    return this.registerForm.get('password')?.invalid && (this.registerForm.get('password')?.dirty || this.registerForm.get('password')?.touched);
  }
  
  onRegister() {
    console.log("valid");
    if (this.registerForm.valid){
    
      console.log("valid");
    this.trainSrv.createPassenger(this.registerObj).subscribe((res: any)=>{
      if(res.result) {
        // alert("Registration Success");
        this.showSuccessModal();
        const modal: any = this.successModal.nativeElement;
          modal.modal('show');
        console.log('success');   
        this.router.navigate(['/login']);
        localStorage.setItem('trainUser', JSON.stringify(res.data));
        this.loggedUserData =  res.data;
        this.closeRegister();
        setTimeout(() => {
          this.closeSuccessModal();
          this.router.navigate(['/login']);
        }, 1000);
       
    } else {
      alert(res.message);
    }
  });
}
}
showSuccessModal(): void {
  const modal: any = this.successModal.nativeElement;
  modal.classList.add('show');
  modal.style.display = 'block';
  
}
  // You may want to add backdrop management and other Bootstrap modal features as per your requirement


closeSuccessModal(): void {
  const modal: any = this.registerModel.nativeElement;
  modal.classList.remove('show');
  modal.style.display = 'none';
}



// onRegister() {
//   console.log("valid");
//   if (this.registerForm.valid) {
//     console.log("valid");
//     setTimeout(() => {
//       this.closeRegisterModal();
//     }, 2000);
//     this.trainSrv.createPassenger(this.registerObj).subscribe((res: any) => {
      
//       if (res.result) {
//         // Registration Success
       
//         this.showSuccessModal();
       
      

//         console.log('success');
//         localStorage.setItem('trainUser', JSON.stringify(res.data));
//         this.loggedUserData = res.data;
       
//         this.router.navigate(['/login']); // Close registerModal after 1 second
//       } else {
//         alert(res.message);
//       }
      
//     });
    
//   }
// }
// showSuccessModal(): void {
//   const modal: any = this.successModal.nativeElement;
//   modal.classList.add('show');
//   modal.style.display = 'block';
 
  
 
// }

// closeRegisterModal(): void {
//   const modal: any = this.registerModel.nativeElement;
//   modal.classList.remove('show');
//   modal.style.display = 'none';
//   document.getElementsByClassName('modal-backdrop')[0].remove();
//   this.registerForm.reset();
// }


  onLogin() {
    if (this.loginForm.valid) {
    this.trainSrv.login(this.registerObj).subscribe((res: any)=>{
      if(res.result) {
        // alert("Login Success");
        this.router.navigate(['/home']);
        localStorage.setItem('trainUser', JSON.stringify(res.data));
         this.loggedUserData =  res.data;
        this.closeLogin();
      } else {
        alert(res.message)
      }
    })
  }
}
}
