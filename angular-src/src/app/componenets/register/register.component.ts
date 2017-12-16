import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  email: String;
  password: String;
  confirmPassword: String;

  constructor(
    private validationService: ValidationService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegister(){
    var user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    if(!this.validationService.validateRegisterForm(user)){
      this.flashMessagesService.show('Please fill all details', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if(!this.validationService.validateEmail(user.email)){
      this.flashMessagesService.show('Please enter valid email address', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessagesService.show(data.message, { cssClass: 'alert-danger', timeout: 3000 });
      }
    }, err => {
      console.log('an error occured : ' + err);
    });
  }

}
