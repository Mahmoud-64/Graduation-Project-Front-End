import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
    private userService:UserService ) { }
  @Input() photo: String;
  ngOnInit(): void {

  }
  photoForm = new FormGroup({
    photo: new FormControl(null),

  })
  appendImage(event) {
    const image = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photo = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    
    this.photoForm.patchValue({
      photo: image
    })
    this.photoForm.get('photo').updateValueAndValidity();
  }
  
  uploadPhoto() {
    console.log(this.photoForm.get('photo').value);
    var formData: FormData = new FormData();
    formData.append('photo', this.photoForm.get('photo').value);
    this.userService.uploadProfilePhoto(formData);
    setTimeout(() => {
      this.activeModal.close(true)
    }, 1000);
    
  }



}
