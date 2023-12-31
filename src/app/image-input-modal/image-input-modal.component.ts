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
  imageUrl: string;
  label: string;
  waiting: boolean = false;
  failed: boolean = false;
  receivedImage: ImageInfo | undefined;

  constructor(private http: HttpClient, private elementRef: ElementRef) { }

  resetModal() {
    this.waiting = false;
    this.receivedImage = undefined;
    this.failed = false;
  }

  updateUrl( event: any ) {
    this.imageUrl = event.target.value;
  }

  updateLabel( event: any ){
    this.label = event.target.value;
  }

  onSubmit() {
    this.waiting = true;
    const payload: ImagePayload = {'detect': false, 'location': this.imageUrl};
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
