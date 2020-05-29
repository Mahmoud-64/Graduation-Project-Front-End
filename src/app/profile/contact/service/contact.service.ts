import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../../service/user.service';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public user_id: Number;
  public contactTypes;
  constructor(private http: HttpClient, private userService: UserService,) {
    this.contactTypes = new Subject;
  }

  getContactTypes() {
    return this.http.get('/api/contacttype').pipe(
      tap(val => {
        this.contactTypes.next(val['data']);
      })
    );
  }

  addContact(contact: any) {
    this.user_id = this.userService.user_id;
    let addContact = {
      contacts: contact,
      seeker_id: this.user_id,
    };
    console.log(addContact);

    return this.http.post(`/api/contact`, addContact);
  }

  getContacts() {
    this.user_id = this.userService.user_id;
    console.log(this.user_id);

    return this.http.get(`/api/contact?current_user=${this.user_id}`);
  }

  deleteContact(contact_id){
    return this.http.delete(`/api/contact/${contact_id}`);
  }
}
