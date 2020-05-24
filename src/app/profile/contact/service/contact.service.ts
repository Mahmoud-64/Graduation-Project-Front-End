import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public user_id: Number;
  constructor(private http: HttpClient, private userService: UserService) { }

  getContactTypes(){
    return this.http.get('/api/contacttype');
  }

  addContact(contact: any){
    this.user_id = this.userService.user_id;
    contact.seeker_id = this.user_id;
    console.log(contact);
    
    return this.http.post(`/api/contact`, contact);
  }

  getContacts(){
    this.user_id = this.userService.user_id;
    console.log(this.user_id);
    
    return this.http.get(`/api/contact?current_user=${this.user_id}`);
  }
}
