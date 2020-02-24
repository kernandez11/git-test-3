import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPayload } from '../register-payload';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import $ from 'jquery';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { 
  
  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  public errorMsg;
  formSubmitted = false;

  constructor(private formBuilder:FormBuilder, private authService: AuthService, private router:Router) { 
    this.registerForm = this.formBuilder.group({
       username: [null, [Validators.required]],
       email: [null, [Validators.required, Validators.email]],
       password: [null, [Validators.required]],
       confirmPassword: [null, [Validators.required]],
    });
    this.registerPayload = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
}

  ngOnInit(){
  }

  onSubmit(){
    this.formSubmitted = true;

    this.registerPayload.username = this.registerForm.get('username').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.password = this.registerForm.get('password').value;
    this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword').value;

    this.authService.register(this.registerPayload).subscribe(data => {
      console.log("register success");
      this.router.navigateByUrl('/register-success')
    }, error => {
      this.errorMsg = "User already exists or there was a problem with your form";
      $(".alert").addClass('visible').removeClass('invisible');
      console.log("register failed");
    });
  }

}
