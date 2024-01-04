import { Component, ElementRef, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageInfo, ImagePayload } from '../image.types';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { FormsModule } from '@angular/forms';
import { ImageService } from '../image.service';

@Component({
	selector: 'app-image-input-modal',
	standalone: true,
  imports: [FormsModule, ThumbnailComponent],
  templateUrl: './image-input-modal.component.html',
  styleUrl: './image-input-modal.component.css'
})
export class ImageInputModalComponent {
	activeModal = inject(NgbActiveModal);
  modalReference: NgbModal;

  // Form variables
  imageUrl: string;
  label: string;
  runDetection: boolean = true;
  uploadedFile: File;
  
  // bools to help with managing POST behavior
  waiting: boolean = false;
  failed: boolean = false;
  receivedImage: ImageInfo | undefined;

  constructor(private imageService: ImageService) { }

  resetModal() {
    this.waiting = false;
    this.receivedImage = undefined;
    this.failed = false;
    this.runDetection = true;
  }

  updateFile( event: any ) {
    this.uploadedFile = event.target.files[0];
  }

  updateUrl( event: any ) {
    this.imageUrl = event.target.value;
  }

  updateLabel( event: any ){
    this.label = event.target.value;
  }

  updateCheckbox( event: any ){
    this.runDetection = event.target.checked;
  }

  onSubmit() {
    // Reset the failed variable on re-attempts
    this.failed = false;
  
    // Indicate that we're waiting to render the scroll wheel
    this.waiting = true;
  
    if ( this.uploadedFile !== undefined ) {
      const formData: FormData = new FormData();
      formData.append('file', this.uploadedFile, this.uploadedFile.name);
      this.imageService.postImage( formData ).subscribe({
        next: data => {
          this.receivedImage = data;
          this.waiting = false;
        },
        error: error => { // catch errors and detect failure
          this.failed = true;
        }
      })
    }
    else {
      const payload: ImagePayload = {'detect': this.runDetection, 'path': this.imageUrl};
      if ( this.label !== undefined ) {
        payload.label = this.label;
      }
      this.imageService.postImage(payload).subscribe({
        next: data => {
          this.receivedImage = data;
          this.waiting = false;
        },
        error: error => { // catch errors and detect failure
          this.failed = true;
        }
      })
    }
  }
}
