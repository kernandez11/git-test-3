import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginPayload } from '../login-payload';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;

  public errorMsg; string;

  constructor(private authService: AuthService, private router: Router) {  
    this.loginForm = new FormGroup({ 
      username: new FormControl(),
      password: new FormControl()
    });
    this.loginPayload = {
      username: '', 
      password: ''
    }
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value; 

    this.authService.login(this.loginPayload).subscribe(data => {
      if(data){
        console.log("login successful");
        this.router.navigateByUrl('/home');
      } else {
        console.log("Login failed");  
      }
    }, error => {//this.errorMsg = error;
                 this.errorMsg = "bad credentials";
                 $(".alert").addClass('visible').removeClass('invisible');
    });

  }

}
