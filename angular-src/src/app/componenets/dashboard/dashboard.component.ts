import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('myModal')
  modal: ElementRef;

  bookings: any[];
  bookingDate: any;
  name: any;
  email: any;
  room: any;
  subject: any;
  start: any;
  end: any;
  user: any;
  rooms = [ "2C1 - VC", "2C2"];
  timings = [ "10:00","10:30","11:00", "11:30","12:00","12:30","13:00","13:30",
    "14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30", "19:00","19:30"
  ];
  validateEnd: boolean;
  
  constructor(
    private bookingService: BookingService, 
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.name = this.user.name;
      this.email = this.user.email;
    },
    err => {
      console.log('error getting profile');
      this.router.navigate(['/login']);
    });

    this.bookings = new Array<any>();
    this.bookingDate = new Date();
    this.getBookings();
  }

  getBookings(){
    this.authService.loadToken();
    var token = this.authService.authToken;

    this.bookingService.getBookings(token).subscribe(res => {
      if(res.success){
        var bookings = res.data;
        this.bookings = [];
        for(var i = 0; i < bookings.length; i++){
          var start = new Date(bookings[i].start);
          var end = new Date(bookings[i].end);

          var current = new Date(this.bookingDate);
          if(start.getDate() == current.getDate() &&
            start.getMonth() == current.getMonth() &&
            start.getFullYear() == current.getFullYear()){          
              var startTime = start.getHours() + ':' + start.getMinutes();
              var endTime = end.getHours() + ':' + end.getMinutes();
              bookings[i].time = startTime + ' - ' + endTime;  
              bookings[i].date = start.getDate() + '-' + start.getMonth() + '-' + start.getFullYear();

              this.bookings.push(bookings[i]);
          } else {
            
          }
        }
      } else {
        console.log(res);
      }
    });
  }

  onCurrentChange(changedDate){
    this.getBookings();
  }

  selectRoom(value){
    this.room = value;
  }
  selectStart(value){
    this.start = value;
  }
  selectEnd(value){
    this.end = value;
  }

  onAdd(){
    var s_hour = this.start.substring(0,2);
    var s_min = this.start.substring(3,5);
    var e_hour = this.end.substring(0,2);
    var e_min = this.end.substring(3,5);

    var tempDate = new Date(this.bookingDate);
    var s = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(),
        s_hour, s_min);

    var e = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(),
      e_hour, e_min);

    var newBooking = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      start: s,
      end: e,
      room: this.room
    };

    this.bookingService.addBooking(this.authService.authToken, newBooking)
      .subscribe( res => {
        if(res.success){
          this.flashMessagesService.show(res.message, { cssClass: 'alert-success', timeout: 3000 });
          this.getBookings();
        }  else {
          this.flashMessagesService.show(res.message, { cssClass: 'alert-danger', timeout: 3000 });
        }
      },
      err => {
        this.flashMessagesService.show("something went wrong. try again.", { cssClass: 'alert-danger', timeout: 3000 });
      });
  }

  update(booking){
    if (this.modal) {
        this.modal.nativeElement.show();
    }
  }

  doUpdate(booking){
    this.bookingService.updateBooking(this.authService.authToken, booking)
      .subscribe( res => {
        if(res.success){
          this.flashMessagesService.show(res.message, { cssClass: 'alert-success', timeout: 3000 });
          this.getBookings();
        }  else {
          this.flashMessagesService.show(res.message, { cssClass: 'alert-danger', timeout: 3000 });
        }
      },
      err => {
        this.flashMessagesService.show("something went wrong. try again.", { cssClass: 'alert-danger', timeout: 3000 });
      });
  }

  delete(booking){
    this.bookingService.deleteBooking(this.authService.authToken, booking._id)
      .subscribe( res => {
        if(res.success){
          this.flashMessagesService.show(res.message, { cssClass: 'alert-success', timeout: 3000 });
          this.getBookings();
        }  else {
          this.flashMessagesService.show(res.message, { cssClass: 'alert-danger', timeout: 3000 });
        }
      },
      err => {
        this.flashMessagesService.show("something went wrong. try again.", { cssClass: 'alert-danger', timeout: 3000 });
      });
  }
}
