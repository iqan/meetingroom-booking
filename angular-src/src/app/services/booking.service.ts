import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingService {

  baseAddress = ''; //'http://localhost:3000';

  constructor(private http: Http) { }

  getBookings(token){
    var headers = new Headers();
    headers.append('Authorization', 'bearer ' + token);

    return this.http.get(this.baseAddress + '/bookings/', { headers: headers })
      .map(res => res.json());
  }

  addBooking(token, booking){
    var headers = new Headers();
    headers.append('Authorization', 'bearer ' + token);

    return this.http.post(this.baseAddress + '/bookings/', booking, { headers: headers })
      .map(res => res.json());
  }

  updateBooking(token, booking){
    var headers = new Headers();
    headers.append('Authorization', 'bearer ' + token);

    return this.http.put(this.baseAddress + '/bookings/' + booking._id, booking, { headers: headers })
      .map(res => res.json());
  }

  deleteBooking(token, id){
    var headers = new Headers();
    headers.append('Authorization', 'bearer ' + token);

    return this.http.delete(this.baseAddress + '/bookings/' + id, { headers: headers })
      .map(res => res.json());
  }
}