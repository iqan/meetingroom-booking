import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingService {

  constructor(private http: Http) { }

  getBookings(token){
    var headers = new Headers();
    headers.append('Authorization', 'bearer ' + token);

    return this.http.get('http://localhost:3000/bookings/', { headers: headers })
      .map(res => res.json());
  }
}