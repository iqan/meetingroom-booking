import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(){
    var user = {
      email: this.email,
      password: this.password
    };
    this.authService.authenticateUser(user).subscribe( data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessagesService.show(data.message, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }
}
