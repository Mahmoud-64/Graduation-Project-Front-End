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

  getContactTypes(pageParam={}) {
    return this.http.get('/api/contacttype', {params: pageParam});
  }

  getContactType(id){
    return this.http.get(`/api/contacttype/${id}`);
  }

  addContactType(data){
    return this.http.post(`/api/contacttype`, data);
  }

  editContactType(id, data){
    return this.http.put(`/api/contacttype/${id}`, data);
  }

  deleteContactType(id){
    return this.http.delete(`/api/contacttype/${id}`);
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

  addNewContact(contact: any) {
    return this.http.post(`/api/contact`, contact);
  }

  getContacts(pageParam={}) {
    this.user_id = this.userService.user_id;
    return this.http.get(`/api/contact?current_user=${this.user_id}`, {params: pageParam});
  }

  getContact(id) {
    return this.http.get(`/api/contact/${id}`);
  }

  editContact(id, data) {
    return this.http.put(`/api/contact/${id}`, data);
  }

  deleteContact(contact_id){
    return this.http.delete(`/api/contact/${contact_id}`);
  }
}
