import { Component, ElementRef, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageInfo, ImagePayload } from '../image.types';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-image-input-modal',
	standalone: true,
  imports: [FormsModule, HttpClientModule, ThumbnailComponent],
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

  constructor(private http: HttpClient, private elementRef: ElementRef) { }

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
      this.http.post<any>('http://localhost:5000/images', formData).subscribe({
        next: data => {
          this.receivedImage = data;
          this.waiting = false;
          const event: CustomEvent = new CustomEvent('QueryDataCustomEvent', {
            bubbles: true,
            detail: data,
          });
          this.elementRef.nativeElement.dispatchEvent(event);
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
      this.http.post<any>('http://localhost:5000/images', payload, { headers: {'Access-Control-Allow-Origin': '*'}} ).subscribe({
        next: data => {
          this.receivedImage = data;
          this.waiting = false;
          const event: CustomEvent = new CustomEvent('QueryDataCustomEvent', {
            bubbles: true,
            detail: data,
          });
          this.elementRef.nativeElement.dispatchEvent(event);
        },
        error: error => { // catch errors and detect failure
          this.failed = true;
        }
      })
    }
  }
}
