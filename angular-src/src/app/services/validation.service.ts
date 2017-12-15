import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  validateRegisterForm(user){
    if(user.email == undefined || user.password == undefined){
      return false;
    }else {
      return true;
    }
  }

  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateBooking(email, subject, room, start, end){
    if(email == undefined || subject == undefined || room == undefined || start == undefined || end == undefined){
      return 'Please fill all details';
    }
    var s_hour = start.substring(0,2);
    var s_min = start.substring(3,5);
    var e_hour = end.substring(0,2);
    var e_min = end.substring(3,5);
    if(s_hour > e_hour){
      return 'Please select valid time';
    }
    if(s_hour == e_hour && s_min > e_min){
      return 'Please select valid time';
    }
    if(s_hour == e_hour && s_min == e_min){
      return 'Please select valid time';
    }
  }
}
