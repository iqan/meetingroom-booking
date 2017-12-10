import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bookings: any[];

  constructor(private bookingService: BookingService, private authService: AuthService) { }

  ngOnInit() {
    this.getBookings();
  }

  getBookings(){
    this.authService.loadToken();
    var token = this.authService.authToken;

    this.bookingService.getBookings(token).subscribe(res => {
      if(res.success){
        this.bookings = res.data;
        this.bookings.forEach(booking => {
          var start = new Date(booking.start);
          var end = new Date(booking.end);

          var startTime = start.getHours() + ':' + start.getMinutes();
          var endTime = end.getHours() + ':' + end.getMinutes();

          booking.time = startTime + ' - ' + endTime;

          booking.date = start.getDate() + '-' + start.getMonth() + '-' + start.getFullYear();
        });
      } else {
        console.log(res);
      }
    });
  }
}
