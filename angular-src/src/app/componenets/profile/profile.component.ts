import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  username = '';
  useremail = '';
  userpassword = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService : FlashMessagesService
  ) {
    this.getProfile();
   }

  ngOnInit() {
    
  }

  Update(){
    var update = {
      name: this.username,
      email: this.useremail,
      password: this.userpassword
    };
    this.authService.updateUser(update)
      .subscribe(res => {
        if(res.success){
          this.flashMessagesService.show(res.message, { cssClass: 'alert-success', timeout: 3000 });
          this.getProfile();
        } else {
          this.flashMessagesService.show(res.message, { cssClass: 'alert-danger', timeout: 3000 });
        }
      }, err => {
        this.flashMessagesService.show('Failed to update. Try again', { cssClass: 'alert-danger', timeout: 3000 });    
      });
  }

  getProfile(){
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.username = profile.user.name;
      this.useremail = profile.user.email;
    },
  err => {
    console.log('error getting profile');
    this.router.navigate(['/login']);
  });
  }
}
