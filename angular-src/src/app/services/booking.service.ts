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

  addBooking(token, booking){
    var headers = new Headers();
    headers.append('Authorization', 'bearer ' + token);

    return this.http.post('http://localhost:3000/bookings/', booking, { headers: headers })
      .map(res => res.json());
  }

  updateBooking(token, booking){
    var headers = new Headers();
    headers.append('Authorization', 'bearer ' + token);

    return this.http.put('http://localhost:3000/bookings/' + booking._id, booking, { headers: headers })
      .map(res => res.json());
  }

  deleteBooking(token, id){
    var headers = new Headers();
    headers.append('Authorization', 'bearer ' + token);

    return this.http.delete('http://localhost:3000/bookings/' + id, { headers: headers })
      .map(res => res.json());
  }
}